/**
 *  Beta - @Notes Won't catch all headers, but should be good enough for many cases
 *  Extract all the possible headers from a text extracted from PDF
 *  Manages the possible extra spaces
 *
 * @param text
 * @returns
 */
export const findHeaderTitles = (text: string): string[] => {
    // Split the text into lines
    const lines = text.split("\n");
  
    // Regular expression to match header-like titles
    // Matches lines starting with one or more numbers or letters, possibly followed by dots, and at least one space before the title
    const headerRegex = /^((\d+\.)|(\d+(\.\d+)+\.?)|([A-Za-z][\.\)]))\s+[A-Z0-9]+\w.*/;
  
    //   // replace any 1+ spaces with a single space
    //   lines = lines.map((line) => line.replace(/\s+/g, " "));
  
    // Filter lines in the bottom half that match the header pattern
    const headerLines = lines.filter((line) => headerRegex.test(line.trim()));
    console.log(headerLines);
  
    return headerLines;
  };
  
  /**
   * Split the text at the position (first or last) header found in text
   * @param text
   * @param position - first or last
   * @param excludeTOC - exclude page that appears like a table of contents
   * @returns {string[] | null} - [firstHalf, secondHalf]
   */
  export const splitAtHeader = (
    text: string,
    position: "first" | "last",
  ): string[] => {
    const headers = findHeaderTitles(text);
    if (headers.length === 0) {
      console.log("*** No headers found in text");
      return [text, ""];
    }
    const header = position === "first" ? headers[0] : headers[headers.length - 1];
    const index = text.indexOf(header);
    const firstHalf = text.substring(0, index);
    // ensure the seoncd half starts with the header
    const secondHalf = text.substring(index);
    return [firstHalf, secondHalf];
  };
  
  /**
   * Split the text at fraction of the text length based on newlines
   * @param text
   * @param fraction - fraction e.g. 50  (for hald)
   * @param method - split by newlines or words
   * @param fromEnd - split from the end so 0.2 would be the last 20% of the text
   */
  export const splitTextAtPercentage = (
    text: string,
    percentage: number,
    method: "nl" | "words" = "nl",
    fromEnd: boolean = false
  ): string[] => {
    const char = method === "nl" ? "\n" : " ";
    const sections: string[] = text.split(char); // lines or words
    const index = Math.floor(sections.length * (fromEnd ? 1 - percentage / 100 : percentage / 100));
    const firstHalf = sections.slice(0, index).join(char);
    const secondHalf = sections.slice(index).join(char);
    return [firstHalf, secondHalf];
  };
  
  /**
   *  Best guess bottom part of a page using either the last header
   *  or the last 20%  by nl if there is no header
   *
   */
  export const bottomOfPage = (text: string): string => {
    const [, secondHalf] = splitAtHeader(text, "last");
    if (secondHalf.length == 0) {
      return splitTextAtPercentage(text, 20, "nl", true)[1];
    } else return secondHalf;
  };
  
  /**
   * Determine if a page is a TOC based on the headers
   * Looks for headers:
   *  - if the volumne of header-text (char count) is more than 70% of the total text without newlines and , it's a TOC
   *  - OR if 80% of the headers end in a number, it's a TOC (page numbers at the end of the line)
   * @param text
   *
   */
  export const pageTextIsTOC = (text: string): boolean => {
    const headers = findHeaderTitles(text);
    const headerText = headers.join(" ");
    const cleanedText = text.replace(/\n/g, " ").replace(/\s+/g, " ");
    console.log("Header Text Length:", headerText.length, "Total Text Length:", cleanedText.length);
    if(headerText.length > cleanedText.length * 0.7) {
      return true;
    } else {
      // check if 80% of headers end in a number
      const endsInNumber = headers.filter((h) => h.match(/\d+$/)).length;
      if(endsInNumber / headers.length > 0.8) {
        return true;
      }
    }
    return false;
  
  };
  
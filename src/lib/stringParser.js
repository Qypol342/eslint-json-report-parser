/**
 * Extract lines within a specified range with context from a multiline string.
 *
 * @param {string} text - The multiline string to extract lines from.
 * @param {number} lineStart - The starting line number (1-based index).
 * @param {number} lineEnd - The ending line number (1-based index).
 * @param {number} contextLines - The number of lines to include above and below the specified range.
 * @returns {string} - The extracted lines with context within the specified range.
 */
export function extractLinesInRange(text, lineStart, lineEnd, contextLines) {
  const lines = text.split('\n');
  const startLine = Math.max(1, lineStart - contextLines);
  const endLine = Math.min(lines.length, lineEnd + contextLines);

  const extractedLines = [];
  for (let i = startLine; i <= endLine; i++) {
    extractedLines.push(`${i}: ${lines[i - 1]}`);
  }

  return extractedLines.join('\n');
}
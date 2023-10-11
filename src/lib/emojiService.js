/**
 * Get a color cube emoji from green to red based on the specified level.
 *
 * @param {number} level - The level from 1 to 5.
 * @returns {string} The color cube emoji representing the specified level.
 */
export function getColorCubeEmoji(level) {
  if (level < 1 || level > 5) {
    return "❌"; // Return an error emoji for invalid input
  }

  const colors = ["🟩", "🟨", "🟧", "🟥", "🔴"];
  return colors[level - 1];
}
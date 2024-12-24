// Generate all 4-digit combinations from "0000" to "9999"
const VALID_GUESSES = Array.from({ length: 10000 }, (_, i) => {
  return i.toString().padStart(4, '0');
});

// Export the list
export { VALID_GUESSES };

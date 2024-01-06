const LanguageDetect = require("languagedetect");
const langDetect = new LanguageDetect();

/**
 * Filters and replaces characters in the given text.
 * @param {string} text - The input text to be processed.
 * @returns {Object} - An object with 'status' indicating success or failure, and 'text' providing a descriptive message.
 */
function filterReplacingCharacters(text) {
  // Check if the input is a number
  if (!isNaN(text)) {
    return { status: false, text: "Input is a number" };
  }

  // Check for forbidden symbols
  const forbiddenSymbols = ["*"];
  const findForbiddenSymbol = forbiddenSymbols?.some((symbol) => text.includes(symbol));
  if (findForbiddenSymbol) {
    return { status: true, text: "Contains forbidden symbol '*'." };
  }

  // Check for alphanumeric characters
  const enRegex = /[a-zA-Z]/;
  const containsEnChars = enRegex.test(text);

  // Check for the presence of English letters when Ukrainian and Russian are detected
  const detectedLanguage = langDetect.detect(text);
  const [ua, ru, en] = detectedLanguage.find(([lang]) => lang === "ukrainian" || lang === "russian" || lang === "english") || [];

  // Check if English letters are present in Russian and Ukrainian text
  if (ru && ua && !en && containsEnChars) {
    return { status: true, text: "Contains English letters in Russian and Ukrainian text" };
  }

  // Check if English letters are present in Ukrainian text
  if (ua && !en && containsEnChars) {
    return { status: true, text: "Contains English letters in Ukrainian text" };
  }

  // Check if English letters are present in Russian text
  if (ru && !en && containsEnChars) {
    return { status: true, text: "Contains English letters in Russian text" };
  }

  // Handle cases where language is not detected
  if (!ru && !en && !ua) {
    return { status: true, text: "Language not detected" };
  }

  // Check if the language is 100% not Russian
  if (!ru && en) {
    return { status: false, text: "Language is not Russian. English detected" };
  }

  // Check if the language is 100% not Ukrainian
  if (!ru && ua) {
    return { status: false, text: "Language is not Russian. Ukrainian detected" };
  }

  // Check if Ukrainian is more likely than Russian
  if (ua && ru && ua[1] >= ru[1]) {
    return { status: false, text: "Language is Ukrainian" };
  }

  // Check if Russian is not present
  if (!ru) {
    return { status: true, text: "Russian language is not detected" };
  }

  // Check the percentage comparison between Ukrainian and Russian
  if (ua && ua[1] > ru[1]) {
    return { status: true, text: "Ukrainian language detected based on percentage comparison" };
  }

  // Check the percentage comparison between English and Russian
  if (en && en[1] > ru[1]) {
    return { status: true, text: "English language detected based on percentage comparison" };
  }

  return { status: false, text: "Successfully processed" };
}

// Export the function for use in other modules
module.exports = filterReplacingCharacters;

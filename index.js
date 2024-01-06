const LanguageDetect = require("languagedetect");
const langDetect = new LanguageDetect();

function filterReplacingCharacters(text) {
    const forbiddenSymbols = ["*"];
    const findForbiddenSymbol = forbiddenSymbols?.find((symbol) =>
      text.includes(symbol)
    );
  
    const enRegex = /[a-zA-Z]/;
    const enTest = enRegex.test(text)
  
    if (!isNaN(text)) {
      return { status: false };
    }
  
    // Проверка на * в предложении
  
    if (findForbiddenSymbol) {
      return { status: true, text: "Есть запрещенный символ" };
    }
  
    const regex = text?.match(
      /(?:^|\s)[а-яА-Яa-zA-Z]+\d+[а-яА-Яa-zA-Z]+(?:\s|$)/u
    );
    const result = !!regex;
  
    if (result) {
      return { status: true, text: "Цифры" };
    }
  
    const detectedLanguage = langDetect.detect(text);
  
    const totalWords = detectedLanguage.reduce((acc, cur) => acc + cur[1], 0);
    const languagePercentages = detectedLanguage.map((item) => [
      item[0],
      Number(((item[1] / totalWords) * 100).toFixed(1)),
    ]);
  
    const ua = languagePercentages.find((item) => item[0] === "ukrainian");
    const ru = languagePercentages.find((item) => item[0] === "russian");
    const en = languagePercentages.find((item) => item[0] === "english");
  
    console.log(text);
    console.log("\n");
    console.log(ua, ru, en);
    console.log("\n");
  
    // Проверка что в языке нет английского но есть УКР и РУ
    if(ru && ua && !en){
      if(enTest){
        return { status: true, text: "Есть EN буквы" };
      }
    }else if(ua && !en){
      if(enTest){
        return { status: true, text: "Есть EN буквы" };
      }
    }else if(ru && !en){
      if(enTest){
        return { status: true, text: "Есть EN буквы" };
      }
    }
  
  
    // Если не найден язык
    if (!ru && !en && !ua) {
      return { status: true, text: "Не найден язык" };
    }
  
    // Проверка если язык 100% не русский
    if (!ru && en) {
      return { status: false, text: "Язык не русский. АНГ" };
    }
  
    if (!ru && ua) {
      return { status: false, text: "Язык не русский. УКР" };
    }
  
    // Проверка что это укр
    if (ua && ru && ua[1] >= ru[1]) {
      return { status: false, text: "Проверка что УКР" };
    }
  
    // Проверка что он вообще есть
    if (!ru) {
      return { status: true, text: "Русского нету" };
    }
  
    // Проверка процентного соотнощения
    if (ua && ua[1] > ru[1]) {
      return { status: true, text: "Проверка процентного соотнощения с УКР" };
    }
  
    if (en && en[1] > ru[1]) {
      return { status: true, text: "Проверка процентного соотнощения с АНГ" };
    }
  
    return { status: false, text: "Успешно" };
  }

  
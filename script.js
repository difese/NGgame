let minValue;
let maxValue;
let answerNumber;
let answerPhrase;
let gameRun;
let orderNumber;
let phraseRandom;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

// СТАРТ
document.querySelector('#btnStart').addEventListener('click', function () {
  minValue = parseInt(document.querySelector('#min').value) || 0;
  minValue < -999 ? (minValue = -999) : minValue;
  minValue > 999 ? (minValue = 999) : minValue;
  maxValue = parseInt(document.querySelector('#max').value) || 100;
  maxValue > 999 ? (maxValue = 999) : maxValue;
  maxValue < -999 ? (maxValue = -999) : maxValue;
  if (minValue > maxValue) {
    [minValue, maxValue] = [maxValue, minValue];
  }
  document.querySelector('#min').value = minValue;
  document.querySelector('#max').value = maxValue;
  answerNumber = Math.floor((minValue + maxValue) / 2);
  gameRun = true;
  orderNumber = 1;
  orderNumberField.innerText = orderNumber;
  answerField.innerText = `Вы загадали число ${numberToWords(answerNumber)}?`;
});

// ЧИСЛО В ТЕКСТ
function numberToWords() {
  let oneToTen = [
    'один',
    'два',
    'три',
    'четыре',
    'пять',
    'шесть',
    'семь',
    'восемь',
    'девять',
    'десять',
  ];

  let elevenToNineteen = [
    'одиннадцать',
    'двенадцать',
    'тринадцать',
    'четырнадцать',
    'пятнадцать',
    'шестнадцать',
    'семнадцать',
    'восемнадцать',
    'девятнадцать',
  ];

  let twentyToNinety = [
    'двадцать',
    'тридцать',
    'сорок',
    'пятьдесят',
    'шестьдесят',
    'семьдесят',
    'восемьдесят',
    'девяносто',
  ];

  let hundreds = [
    'сто',
    'двести',
    'триста',
    'четыреста',
    'пятьсот',
    'шестьсот',
    'семьсот',
    'восемьсот',
    'девятьсот',
  ];

  let answerNumberAsText;
  let firstRank;
  let secondRank;
  let thirdRank;
  let sign = answerNumber < 0 ? 'минус' : '';

  if (Math.abs(answerNumber) > 10 && Math.abs(answerNumber) < 20) {
    answerNumberAsText = elevenToNineteen[(Math.abs(answerNumber) % 10) - 1];
  }
  else {
    thirdRank =
      hundreds[
        (Math.abs(answerNumber) - (Math.abs(answerNumber) % 100)) / 100 - 1
      ];
    secondRank =
      twentyToNinety[
        ((Math.abs(answerNumber) % 100) - (Math.abs(answerNumber) % 10)) / 10 -
          2
      ];
    firstRank = oneToTen[(Math.abs(answerNumber) % 10) - 1];
    answerNumberAsText = `${thirdRank == undefined ? '' : thirdRank} ${
      secondRank == undefined ? '' : secondRank
    } ${firstRank == undefined ? '' : firstRank}`
      .trim();
  }

  if (Math.abs(answerNumber) == 0) {
    return 0;
  }
  else {
    return (answerNumberAsText.length) < 20
      ? sign + ' ' + answerNumberAsText
      : answerNumber;
  }
}

// ОТВЕТ
function answerText() {
  phraseRandom = Math.round(Math.random() * 2);
  switch (phraseRandom) {
    case 0:
      return (`Думаю, это число ${numberToWords(answerNumber)}?\n\u{1F916}`);
    case 1:
      return (`Возможно, это число ${numberToWords(answerNumber)}?\n\u{1F913}`);
    case 2:
      return (`Видимо, вы загадали число ${numberToWords(answerNumber)}?\n\u{1F920}`);
  }
}

// БОЛЬШЕ
document.querySelector('#btnOver').addEventListener('click', function () {
  if (gameRun) {
    if (minValue === maxValue) {
      phraseRandom = Math.round(Math.random());
      answerPhrase =
        phraseRandom === 1
          ? `Вы загадали неправильное число!\n\u{1F914}`
          : `Я сдаюсь...\n\u{1F92F}`;
      answerField.innerText = answerPhrase;
      gameRun = false;
    } else {
      minValue = answerNumber + 1;
      answerNumber = Math.floor((minValue + maxValue) / 2);
      orderNumber++;
      orderNumberField.innerText = orderNumber;
      answerField.innerText = answerText();
    }
  }
});

// МЕНЬШЕ
document.querySelector('#btnLess').addEventListener('click', function () {
  if (gameRun) {
    if (minValue === maxValue) {
      phraseRandom = Math.round(Math.random());
      answerPhrase =
        phraseRandom === 1
          ? `Вы загадали неправильное число!\n\u{1F914}`
          : `Я сдаюсь..\n\u{1F92F}`;
      answerField.innerText = answerPhrase;
      gameRun = false;
    } else {
      maxValue = answerNumber - 1;
      answerNumber = Math.ceil((minValue + maxValue) / 2);
      orderNumber++;
      orderNumberField.innerText = orderNumber;
      answerField.innerText = answerText();
    }
  }
});

// ВЕРНО
document.querySelector('#btnEqual').addEventListener('click', function () {
  if (gameRun) {
    phraseRandom = Math.round(Math.random() * 4);
    switch (phraseRandom) {
      case 0:
        answerPhrase = `Я всегда угадываю!\n\u{1F60E}`;
        break;
      case 1:
        answerPhrase = `Элементарно, Ватсон!\n\u{1F9D0}`;
        break;
      case 2:
        answerPhrase = `Это было легко!\n\u{1F921}`;
        break;
      case 3:
        answerPhrase = `Я же волшебник!\n\u{1F9D9}`;
        break;
      case 4:
        answerPhrase = `Как же просто!\n\u{1F973}`;
        break;
    }
    answerField.innerText = answerPhrase;
    gameRun = false;
  }
});

// ЗАНОВО
document.querySelector('#btnRetry').addEventListener('click', function () {
  window.location.reload();
});

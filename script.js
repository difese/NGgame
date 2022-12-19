// Получаем минимальное целое число для игры ИЛИ 0, если NaN (false) - ДИЗЪЮНКЦИЯ (оператор ИЛИ - до первого true)
let minValue =
  parseInt(prompt('Минимальное значение числа для игры', '0')) || 0;
// Устанавливаем границы минимального значения числа для игры (от -999 до 999) - ТЕРНАРНЫЙ ОПЕРАТОР
minValue < -999 ? (minValue = -999) : minValue;
minValue > 999 ? (minValue = 999) : minValue;
console.log('Нижняя граница:', minValue);

// Получаем максимальное целое число для игры ИЛИ 100, если NaN (false) - ДИЗЪЮНКЦИЯ (оператор ИЛИ - до первого true)
let maxValue =
  parseInt(prompt('Максимальное значение числа для игры', '100')) || 100;
// Устанавливаем границы максимального значения числа для игры (от -999 до 999) - ТЕРНАРНЫЙ ОПЕРАТОР
maxValue > 999 ? (maxValue = 999) : maxValue;
maxValue < -999 ? (maxValue = -999) : maxValue;
console.log('Верхняя граница:', maxValue);

// Если минимальное значение числа для игры больше максимального, то меняем их местами - ДЕСТРУКТУРИЗАЦИЯ массива
if (minValue > maxValue) {
  [minValue, maxValue] = [maxValue, minValue];
  console.log('Люди, я люблю вас - будьте бдительны!:)');
}

// Предлагаем пользователю загадать число
alert(
  `Загадайте любое целое число от ${minValue} до ${maxValue}, a я его угадаю`
);

// Получаем первое предложение
let answerNumber = Math.floor((minValue + maxValue) / 2);
console.log('Нижняя граница старта:', minValue);
console.log('Верхняя граница старта:', maxValue);
console.log('Первый ответ:', answerNumber);
// Номер попытки
let orderNumber = 1;
// Флаг для проверки, что игра запущена
let gameRun = true;

// Получаем элементы для вывода номера попытки и ответа
const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

// Выводим номер попытки
orderNumberField.innerText = orderNumber;
// Выводим первое предположение
answerField.innerText = `Вы загадали число ${answerNumber}?`;

// Обработчик кнопки "Начать заново"
document.querySelector('#btnRetry').addEventListener('click', function () {
  // // Сбрасываем значение минимального числа
  // minValue = 0;
  // // Сбрасываем значение максимального числа
  // maxValue = 100;
  // // Сбрасываем значение номера попытки
  // orderNumber = 0;
  // Перезагружаем страницу
  // if (confirm('Хотите заново начать игру?')) {
  location.reload();
  // }
});

// Обработчик кнопки "Больше"
document.querySelector('#btnOver').addEventListener('click', function () {
  // Проверяем, что игра запущена
  if (gameRun) {
    // Проверяем, совпадают ли минимальное и максимальное числа
    if (minValue === maxValue) {
      // Получаем случайное число 0 или 1
      const phraseRandom = Math.round(Math.random());
      // Получаем случайную фразу
      const answerPhrase =
        phraseRandom === 1
          ? `Вы загадали неправильное число!\n\u{1F914}`
          : `Я сдаюсь...\n\u{1F92F}`;
      // Выводим фразу
      answerField.innerText = answerPhrase;
      // Останавливаем игру
      gameRun = false;
      // Если пользователь ввёл разные значения
    } else {
      // Устанавливаем новое минимальное число
      minValue = answerNumber + 1;
      console.log('+Минимальное значение', minValue);
      // Получаем новое предположение NB! Здесь происходит округление среднего арифметического "ВНИЗ" (к меньшему целому)
      answerNumber = Math.floor((minValue + maxValue) / 2);
      console.log('+Нижняя граница:', minValue);
      console.log('+Верхняя граница:', maxValue);
      console.log('+Больше', answerNumber, '?');
      // Увеличиваем номер попытки
      orderNumber++;
      // Выводим номер попытки
      orderNumberField.innerText = orderNumber;
      // Получаем случайное число от 0 до 2
      const phraseRandom = Math.round(Math.random() * 2);
      console.log('Случайное число:', phraseRandom);
      // Присваиваем вариант вопроса полученному числу
      switch (phraseRandom) {
        case 0:
          answerPhrase = `Думаю, это число ${answerNumber}?\n\u{1F916}`;
          break;
        case 1:
          answerPhrase = `Возможно, это число ${answerNumber}?\n\u{1F913}`;
          break;
        case 2:
          answerPhrase = `Видимо, вы загадали число ${answerNumber}?\n\u{1F920}`;
      }
      // Выводим предположение
      answerField.innerText = answerPhrase;
    }
  }
});

// Обработчик кнопки "Меньше"
document.querySelector('#btnLess').addEventListener('click', function () {
  // Проверяем, что игра запущена
  if (gameRun) {
    // Проверяем, совпадают ли минимальное и максимальное числа
    if (minValue === maxValue) {
      // Получаем случайное число 0 или 1
      const phraseRandom = Math.round(Math.random());
      // Получаем случайную фразу
      const answerPhrase =
        phraseRandom === 1
          ? `Вы загадали неправильное число!\n\u{1F914}`
          : `Я сдаюсь..\n\u{1F92F}`;
      // Выводим фразу
      answerField.innerText = answerPhrase;
      // Останавливаем игру
      gameRun = false;
      // Если пользователь ввёл разные значения
    } else {
      // Устанавливаем новое максимальное число
      maxValue = answerNumber - 1;
      console.log('-Максимальное значение', maxValue);
      // Получаем новое предположение NB! Здесь происходит округление среднего арифметического "ВВЕРХ" (к большему целому)
      answerNumber = Math.ceil((minValue + maxValue) / 2);
      console.log('-Нижняя граница:', minValue);
      console.log('-Верхняя граница:', maxValue);
      console.log('-Меньше', answerNumber, '?');
      // Увеличиваем номер попытки
      orderNumber++;
      // Выводим номер попытки
      orderNumberField.innerText = orderNumber;
      // Получаем случайное число от 0 до 2
      const phraseRandom = Math.round(Math.random() * 2);
      console.log('-Случайное число:', phraseRandom);
      // Присваиваем вариант вопроса полученному числу
      switch (phraseRandom) {
        case 0:
          answerPhrase = `Думаю, это число ${answerNumber}?\n\u{1F916}`;
          break;
        case 1:
          answerPhrase = `Возможно, это число ${answerNumber}?\n\u{1F913}`;
          break;
        case 2:
          answerPhrase = `Видимо, вы загадали число ${answerNumber}?\n\u{1F920}`;
      }
      // Выводим предположение
      answerField.innerText = answerPhrase;
    }
  }
});

// Обработчик кнопки "Верно"
document.querySelector('#btnEqual').addEventListener('click', function () {
  // Проверяем, что игра запущена
  if (gameRun) {
    // Получаем случайное число от 0 до 4
    const phraseRandom = Math.round(Math.random() * 4);
    console.log('=Случайное число:', phraseRandom);
    // Присваиваем вариант фразы полученному числу
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
    // Выводим фразу
    answerField.innerText = answerPhrase;
    // Останавливаем игру
    gameRun = false;
  }
});


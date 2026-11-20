const quizData = [
  {
    question: "1. Якою за рахунком планетою від Сонця є Уран?",
    options: ["П'ятою", "Шостою", "Сьомою", "Восьмою"],
    correct: 2,
  },
  {
    question: "2. Хто і коли відкрив планету Уран?",
    options: [
      "Галілео Галілей у 1610 році",
      "Вільям Гершель у 1781 році",
      "Йоганн Галле у 1846 році",
    ],
    correct: 1,
  },
  {
    question: "3. У чому полягає головна особливість обертання Урана?",
    options: [
      "Він взагалі не обертається навколо своєї осі",
      "Він обертається «лежачи на боці» (нахил осі майже 98°)",
      "Один оберт навколо осі триває 10 земних діб",
    ],
    correct: 1,
  },
  {
    question: "4. На честь кого названі супутники Урана?",
    options: [
      "Давньогрецьких титанів",
      "Персонажів творів Вільяма Шекспіра та Александра Поупа",
      "Відомих астрономів XVIII століття",
    ],
    correct: 1,
  },
  {
    question: "5. Який найбільший супутник Урана?",
    options: ["Міранда", "Оберон", "Аріель", "Титанія"],
    correct: 3,
  },
];

const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const resultBox = document.getElementById("quiz-result");

// Вивід запитань та варіантів відповідей на сторінку
function buildQuiz() {
  quizData.forEach((item, index) => {
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("quiz-question");

    let optionsHTML = "";
    item.options.forEach((option, optIndex) => {
      optionsHTML += `
                <label class="quiz-option">
                    <input type="radio" name="question${index}" value="${optIndex}">
                    <span>${option}</span>
                </label>
            `;
    });

    questionBlock.innerHTML = `
            <h3>${item.question}</h3>
            <div class="quiz-options">${optionsHTML}</div>
        `;
    quizContainer.appendChild(questionBlock);
  });
}

// Перевірка відповідей та підрахунок результату
submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((item, index) => {
    const selected = document.querySelector(
      `input[name="question${index}"]:checked`,
    );
    const optionsLabels = document.querySelectorAll(
      `input[name="question${index}"]`,
    );

    // Скидаємо попередні підсвічування
    optionsLabels.forEach((input) => {
      input.parentElement.classList.remove("correct-answer", "wrong-answer");
    });

    if (selected) {
      const userAnswer = parseInt(selected.value);
      if (userAnswer === item.correct) {
        score++;
        selected.parentElement.classList.add("correct-answer");
      } else {
        selected.parentElement.classList.add("wrong-answer");
        // Підсвічуємо правильну відповідь зеленим
        optionsLabels[item.correct].parentElement.classList.add(
          "correct-answer",
        );
      }
    } else {
      // Якщо відповідь не обрано, показуємо правильну
      optionsLabels[item.correct].parentElement.classList.add("correct-answer");
    }
  });

  if (score == 0) {
    resultBox.classList.remove("quiz-result");
    resultBox.classList.add("bg-horror");
    resultBox.innerHTML = ``;
  } else {
    resultBox.classList.remove("bg-horror");
    resultBox.classList.add("quiz-result");
    resultBox.innerHTML = `Ваш результат: <strong>${score} з ${quizData.length}</strong> правильних відповідей!`;
  }
  resultBox.style.display = "block";
});

buildQuiz();

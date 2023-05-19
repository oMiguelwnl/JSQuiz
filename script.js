// Initial Data

let currentQuestion = 0; // Questão atual

let correctAnswers = 0; // Total de respostas corretas

showQuestion(); // Exibe as Questões

// Events
document
  .querySelector(".scoreArea button")
  .addEventListener("click", resetEvent);

// Functions

//Mostra a Questão
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion]; // Seleciona a question.

    let pct = Math.floor((currentQuestion / questions.length) * 100); // Porecentagem referente ao total de perguntas.

    document.querySelector(".progress--bar").style.width = `${pct}%`; // A barra de progresso irá mudar de acordo com a porcentagem.

    document.querySelector(".scoreArea").style.display = "none"; //Esconde a ScoreArea
    document.querySelector(".questionArea").style.display = "block"; //Exibe a questionArea

    document.querySelector(".question").innerHTML = q.question; // Exibe a pergunta

    let optionsHtml = "";

    // Monta as questions e exibe as alternativas.

    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`;
    }
    document.querySelector(".options").innerHTML = optionsHtml;

    // Coloca o evento de click nessas perguntas
    document.querySelectorAll(".options .option").forEach((item) => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    finishedQuiz();
  }
}
function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute("data-op")); // Identifica em qual opção o usuário clicou.

  // Identifica se o usuário acertou ou errou a questão
  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }
  // Muda para a proxima question
  currentQuestion++;
  // Mostra a nova Question
  showQuestion();
}

function finishedQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100); // Porcentagem de pontos

  if (points < 30) {
    document.querySelector(".scoreText1").innerHTML = "Tá ruim, hein?";
    document.querySelector(".scorePct").style.color = "#ff0000";
  } else if (points >= 30 && points < 70) {
    document.querySelector(".scoreText1").innerHTML =
      "Tá bom, mas pode melhorar...";
    document.querySelector(".scorePct").style.color = "#ffff00";
  } else if (points >= 70) {
    document.querySelector(".scoreText1").innerHTML = "Parabéns!";
    document.querySelector(".scorePct").style.color = "#0d630d";
  }

  document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`;
  document.querySelector(
    ".scoreText2"
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

  document.querySelector(".scoreArea").style.display = "block"; //Exibe a ScoreArea
  document.querySelector(".questionArea").style.display = "none"; //Esconde a questionArea
  document.querySelector(".progress--bar").style.width = "100%"; // Completa a barra de progresso
}

function resetEvent() {
  correctAnswers = 0;
  currentQuestion = 0;
  showQuestion();
}

const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];
/*            LOGICA per le domande: vedi su README.md riga 103-125               */
let questionNumber = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 30;
const TEMP_LIMIT = 30; // Secondi per ogni domanda
let selectedAnswer = null;

/*                  TUTTI I DOM SELECTORS BY ID             */
const welcomeContainer = document.getElementById("welcome-page"); // ID HTML riga: 12
const questPage = document.getElementById("questions-page"); // ID HTML riga: 52
const proceedBtn = document.getElementById("proceed-btn"); // ID HTML riga: 45
const promiseCheckbox = document.getElementById("promise-check"); // ID HTML riga: 40

const questionText = document.getElementById("question-text"); // ID HTML riga: 71
const optionsDiv = document.getElementById("options-container"); // ID HTML riga: 72
const currentQuestNum = document.getElementById("current-quest-num"); // ID HTML riga: 78
const timerProgress = document.getElementById("timer-progress"); // ID HTML riga: 59
const timerCount = document.getElementById("timer-count"); // ID HTML riga: 64
const finalScore = document.getElementById("final-score"); // ID HTML riga: 89
const resultsScreen = document.getElementById("results-screen"); // ID HTML riga: 83

/*const welcomePage = document.querySelector(".welcome-content"); --> questo era errato in quanto avevamo già la funzione sopra welcomeContainer che era quella giusta per nascondere tutti gli elementi*/

promiseCheckbox.addEventListener("change", function () {
  if (this.checked) {
    proceedBtn.disabled = false;
    proceedBtn.className = "btn-enabled";
  } else {
    proceedBtn.disabled = true;
    proceedBtn.className = "btn-disabled";
  }
});
/*
proceedBtn.addEventListener("click", function () {
    welcomePage.style.display = "none";
    divQuestions.classList.remove("hidden");
});
*/
proceedBtn.addEventListener("click", function () {
  welcomeContainer.classList.add("hidden"); // .hidden class in CSS
  questPage.classList.remove("hidden");
  startExam(); // onclick del button, parte la funzione
});

/* PHASE 2: BENCHMARK | Q&A LOGICA */
function startExam() {
  let domanda = questions[questionNumber]; // prendo la domanda corrente dall'array
  questionText.textContent = domanda.question; // mostro il testo della domanda nel h2

  let risposte = domanda.incorrect_answers.concat(domanda.correct_answer); // unisco risposte corrette + sbagliate

  risposte.sort(function () {
    // mescolo le risposte
    return Math.random() - 0.5;
  });

  optionsDiv.innerHTML = ""; // svuoto il container delle domande

  for (let i = 0; i < risposte.length; i++) {
    // ciclo di tutte le risposte
    let bottone = document.createElement("button"); // creo un bottone
    bottone.textContent = risposte[i]; // assegna il testo della risposta al bottone
    bottone.classList.add("answer-btn"); // aggiunge classe CSS

    bottone.addEventListener("click", function () {
      selectAnswer(this, risposte[i]); // prova selezione risposta

      if (risposte[i] === domanda.correct_answer) {
        // controllo risposta corretta
        score++;
      }
      questionNumber++;

      if (questionNumber < questions.length) {
        // prossima domanda se ci sono ancora domande
        startExam(); // ricarica la funzione con la nuova domanda
      } else {
        questionText.textContent = "Quiz completato!";
        optionsDiv.innerHTML = "";

        questPage.classList.add("hidden"); // nasconde quiz
        resultsScreen.classList.remove("hidden"); // mostra risultati

        finalScore.textContent = score; // mostra punteggio
      }
    });
    optionsDiv.appendChild(bottone); // aggiungo il bottone nel container
  }
  currentQuestNum.textContent = questionNumber + 1; // aggiorno numero domanda
}

function selectAnswer(selectedButton, textValue) {
  // vedi su readme.me
  selectedAnswer = textValue; // Evidenza la risposta scelta

  const answerBtn = optionsDiv.getElementsByClassName("answer-btn");
  for (let btn of answerBtn) {
    btn.classList.remove("selected"); // .selected in CSS: riga 315,
    /* Prima di evidenziare il pulsante appena cliccato, il codice seleziona tutti i pulsanti di risposta all'interno
     * del contenitore e rimuove la classe CSS "selected". Questo garantisce che, se l'utente ha precedentemente cliccato su
     * un'opzione diversa, la precedente evidenziato viene cancellata, e impedisce più pulsanti che appaiano
     * selezionati contemporaneamente
     */
  }
  selectedButton.classList.add("selected"); // .selected in CSS: riga 315

  // TODO: qui metteremo la FUNCTION che: passa immediatamente alla domanda successiva senza ritardo
}

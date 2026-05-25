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
const TEMP_LIMIT = 60; // Secondi per ogni domanda
let selectedAnswer = null;

const TIMER_SVG = 339; // guarda su README.md

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

// const timerShake = document.querySelector(".timer-text") // ID HTML riga: 62



questions.sort(function () {
  return Math.random() - 0.5; // mescolo le risposte
});

promiseCheckbox.addEventListener("change", function () {
  if (this.checked) {
    proceedBtn.disabled = false;
    proceedBtn.className = "btn-enabled";
  } else {
    proceedBtn.disabled = true;
    proceedBtn.className = "btn-disabled";
  }
});

proceedBtn.addEventListener("click", function () {
  welcomeContainer.classList.add("hidden"); // .hidden class in CSS
  questPage.classList.remove("hidden");
  startExam(); // onclick del button, parte la funzione
});

/* TIMER */
function startTimer() {
  clearInterval(timerInterval); // clearInterval(): README.md riga 213
  timeLeft = TEMP_LIMIT; // Reimposta il tempo rimanente alla durata massima

  /* Inizio aggiornamento del DOM per i numeri del timer e il cerchio */
  timerCount.textContent = timeLeft;
  timerProgress.style.strokeDashoffset = 0; // style.strokeDashoffset: README.md riga 216
  timerProgress.style.stroke = "#00ffff" //  resetta colore ad ogni domanda

  timerCount.classList.remove("timer-shake"); // Rimuove l'animazione 'shake' all'inizio di una nuova domanda

  timerInterval = setInterval(function () {
    timeLeft--;
    timerCount.textContent = timeLeft;

    const offset = TIMER_SVG - (timeLeft / TEMP_LIMIT) * TIMER_SVG; // Calcola l'offset del trattegio del cerchio SVG per svuotare la linea del cerchio colorato nel tempo
    timerProgress.style.strokeDashoffset = offset;

    if (timeLeft <= 10) {
      timerProgress.style.stroke = "#ff4444"; // ← diventa rosso
      timerCount.classList.add("timer-shake"); // Attiva la vibrazione effect
    }
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerCount.classList.remove("timer-shake") // Rimuove l'effetto shake prima di cambiare pagina
      handleNextQuestion(); // Salta la domanda quando finiscono i secondi
    }
  }, 1000); // 1000: sono millisecondi, quindi rappresenta 1 second 
}

/* Un intermedio per gestire il procedimento delle domande e la pagina/screen finale */
function handleNextQuestion() {
  questionNumber++;

  if (questionNumber < questions.length) {
    startExam(); // 
  } else {
    clearInterval(timerInterval);
    questionText.textContent = "Quiz completato!";
    optionsDiv.innerHTML = "";

    questPage.classList.add("hidden");
    resultsScreen.classList.remove("hidden");

    finalScore.textContent = score;
  }
}

/* PHASE 2: BENCHMARK | Q&A LOGICA */
function startExam() {
  startTimer(); // Parte il timer immediatamente appena si caricano le domande

  let domanda = questions[questionNumber]; // prendo la domanda corrente dall'array
  renderQuestion(domanda); // passo il parametro per controllare se il testo è accapo o no

  let risposte = domanda.incorrect_answers.concat(domanda.correct_answer); // unisco risposte corrette + sbagliate

  risposte.sort(function () {
    return Math.random() - 0.5; // mescolo le risposte
  });

  optionsDiv.innerHTML = ""; // svuoto il container delle domande

  for (let i = 0; i < risposte.length; i++) {  // ciclo di tutte le risposte
    let bottone = document.createElement("button"); // creo un bottone
    bottone.textContent = risposte[i]; // assegna il testo della risposta al bottone
    bottone.classList.add("answer-btn"); // aggiunge classe CSS

    bottone.addEventListener("click", function () {
      selectAnswer(this, risposte[i]); // prova selezione risposta

      if (risposte[i] === domanda.correct_answer) { // controllo risposta corretta
        score++;
      }
      // questionNumber++;

      clearInterval(timerInterval);
      handleNextQuestion();

    });
    optionsDiv.appendChild(bottone); // aggiungo il bottone nel container
  }
  currentQuestNum.textContent = questionNumber + 1; // aggiorno numero domanda
}


function selectAnswer(selectedButton, textValue) {   // vedi su readme.me
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

/*Funzione per far si che ogni volta che la domanda va accapo si mette il grassetto come nella reference*/
function renderQuestion(domanda) { // la funzione viene spiegata anche nel readme
  questionText.innerHTML = "";   // svuota il contenitore divide il testo

  const testo = domanda.question?.trim();

  if (!testo) return;

  const parole = testo.split(" ");

  parole.forEach((parola, i) => {
    const span = document.createElement("span"); //crea uno span per ogni parola
    span.textContent = i < parole.length - 1 ? parola + " " : parola; //inserisce il testo nello span per mantenere gli spazi tra le parole
    questionText.appendChild(span); // lo inserisce nel DOM
  });


  requestAnimationFrame(function () { //  sincronizza con il refresh del monitor altrimenti misura prima che le posizioni della frase siano calcolate
    const spans = questionText.querySelectorAll("span")

    if (!spans.length) return
    // misura la posizione verticale della prima e dell'ultima parola
    const primaY = spans[0].getBoundingClientRect().top //getBoundingClientRect() restituisce la posizione reale dell’elemento sullo schermo e il .top prende la coordinata verticale
    const ultimaY = spans[spans.length - 1].getBoundingClientRect().top

    if (Math.abs(primaY - ultimaY) < 1) { // controlla quante righe ci sono
      questionText.textContent = testo
      return
    }

    let inizioUltimaRiga = parole.length - 1

    for (let i = 0; i < spans.length; i++) { // cerco la prima parola dell’ultima riga scorrendo tutti gli span
      const currentY = spans[i].getBoundingClientRect().top

      if (Math.abs(currentY - ultimaY) < 1) { // controllo se ho trovato l'inizio dell'ultima riga
        inizioUltimaRiga = i
        break;
      }
    }

    const intro = parole.slice(0, inizioUltimaRiga).join(" ") // creo prima riga
    const ultimaRiga = parole.slice(inizioUltimaRiga).join(" ") // creo ultima riga

    //ricostruisco l'html
    questionText.innerHTML = `${intro} <strong>${ultimaRiga}</strong>`
  })
}

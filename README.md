Build Week 1 
# Benchmark App — Epicode

## Descrizione del progetto

Questo progetto consiste nella realizzazione di una web app che replica un benchmark ispirato al layout di Epicode con delle funzionalità mostrate nelle reference fornite.

L’applicazione simula un esame online con timer, domande a risposta multipla o vero/falso e un sistema di navigazione completamente guidato dalla selezione della risposta.

<br>


# Obiettivo

Ricreare un’esperienza d’esame moderna e interattiva composta da:

1. **Pagina iniziale (Welcome Page)**
2. **Pagina del test/esame**
3. Gestione timer
4. Gestione avanzamento domande
5. Validazione del form iniziale

<br>

# Reference UI

## Welcome Screen

![Welcome Screen](./assets/reference/exam_01_welcome.png)

- Logo Epicode
- Titolo di benvenuto
- Istruzioni del benchmark
- Checkbox obbligatoria
- Pulsante Proceed

<br>

## Question Screen

![Question Screen](./assets/reference/exam_02_test.png)

- Domanda centrata
- Risposte multiple / vero-falso
- Timer di 60 secondi
- Numero domanda corrente
- Logo Epicode

<br>

---


# Funzionalità richieste

## 1. Welcome Page

La home iniziale deve contenere:

- Logo Epicode
- Titolo di benvenuto
- Descrizione del benchmark
- Lista delle istruzioni
- Checkbox obbligatoria:
  - l’utente conferma di:
    - essere da solo
    - non ricevere aiuto durante il test
- Pulsante “Proceed”

<br>

### Validazione

Il pulsante **Proceed** deve rimanere:

- disabilitato finché la checkbox non viene selezionata
- abilitato solo dopo l’accettazione della condizione

<br>

---

# Pagina Quiz

## Contenuto

- Una domanda alla volta
- Risposte multiple / vero-falso
- Cambio automatico domanda appena si clicca sulla risposta
- Timer di 60 secondi

<br>

---

# Timer

Ogni domanda:

- parte da 60 secondi
- si resetta automaticamente
- passa alla domanda successiva allo scadere del tempo

<br>

-----


## Funzione renderQuestion() // riga 214

Questa funzione serve per mettere automaticamente in **grassetto l’ultima riga** di una domanda quando il testo va a capo.

### Come funziona

1. La domanda viene divisa parola per parola usando `split(" ")`.
2. Ogni parola viene inserita dentro uno `<span>` separato.
3.  Dopo il rendering del browser, la funzione usa
`requestAnimationFrame()` per aspettare il corretto calcolo del layout
e `getBoundingClientRect()` per rilevare il ritorno a capo reale del testo.
4. Confrontando le coordinate, individua dove inizia l’ultima riga del testo.
5. Ricostruisce infine il contenuto mettendo l’ultima riga dentro un tag `<strong>`.

### Esempio

Testo originale:

```txt
Qual è la capitale della Francia
```
Output renderizzato:
```txt
Qual è la capitale della
FRANCIA
```


### Tecniche utilizzate
1. split() per dividere la stringa
2. createElement() per creare dinamicamente gli span
3. getBoundingClientRect() per rilevare il ritorno a capo reale del browser
4. slice() e join() per ricostruire il testo finale

<br>

-----

# Appunti

CSS: Outfit & INTER FONT
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@100..900&display=swap');

font-family: "Outfit", sans-serif; // TITLE FONT
font-size: 3.75rem; // 60px; 

font-family: "Inter", sans-serif; // DESCRIPTION FONT
font-size: 1rem; // 16px;

:root {
  --accent-color: #00ffff; // BUTTON COLOR & TIMER COLOR
  --answer-button-color: #d20094; // HOVER ANSWER COLOR & onClick COLOR
  --answer-count-color: #900080; // number count color
}

L'operatore tilde in CSS ( ~ )
noto come combinatore di fratelli successivi, seleziona un elemento che segue un altro specifico elemento (condividendo lo stesso genitore).
NON richiede che l'elemento sia immediatamente successivo, ma può trovarsi ovunque più avanti nel documento

### CSS: flex-shrink: 0;  // riga 136
Stabilisce quanto un elemento (flex-item) può ridursi rispetto agli altri elementi quando lo spazio all'interno del contenitore è limitato.
Il default numero è 'flex-shrink: 1', se impostiamo a 'flex-shrink: 0;' l'elemento non diventerà mai piccolo, mantenendo le sue dimensioni originali.

### JS: riga 101 - 106 ###
let currentQuestion = 0;
// Tiene traccia del numero della domanda che l'utente sta visualizzando, inizia da
// 0 (la prima domanda negli array JS)

let score = 0;
// Memorizza il numero di risposte corrette selezionate finora dall'utente
// Inizia da 0 e aumenta di 1 (uno) ogni volta che l'utente seleziona una risposta corretta.

let timerInterval = null;
// Questo contiene il meccanismo del timer in background, sopra in alto a destra
// Inizialmente è NULL perchè l'orologio non è ancora in funzione, finchè non viene caricata la prima domanda.

let timeLeft = 30; 
// E' il contatore in tempo reale che mosta quanti secondo mancano alla domanda apparsa e si aggiorna fino a 0

const TEMP_LIMIT = 30; // Secondi per ogni domanda
// Un tempo impostato fix che definisce il tempo massimo consentito per ogni domanda
// Essendo una CONST, questo numero non cambia mai durante l'esame

let selectedAnswer = null;
// Memorizza temporaneamente il testo della risposta su cui l'utente ha cliccato prima di procedere
// Inizia come NULL perchè non è stata ancora selezionata alcuna risposta


### JS function: selectAnswer() // riga 191 ###
la funzione, selectedAnswer(), è responsabile della gestione di ciò che accade nel momento esatto in cui un utente clicca su un pulsante/buttone di risposta durante il quiz.
In poche parole, svolge tre compiti principali
- Registra la scelta dell'utente,
- aggiorna UI,
- e procede nel prossimo


### JS: TIMER_SVG = 339 // riga 104
Perchè "339"? Questo è la logica:
Costante per il PERIMETRO del CERCHIO SVG,
2= r*r (diametro)
PI= PI greco, 3,14 (3,14159)
r= raggio // 54, riga 58 & 59 in HTML
FORMULA Matematico: (2 * PI * r) = 2 * 3,14159 * 54 = circa 339,29

2 * PI = 6.28318
6.28318 * 54 (r) = 339.29172
Circonferenza = 339

### JS: clearInterval() // riga 144
E' una funzione nativa utilizzata per bloccare l'esecuzione di un timer ciclico precedentemente avviato tramie setInterval()

### JS: style.strokeDashoffset // riga 148
- style.strokeDashoffset
E' una proprietà usata per manipolare l'omonima proprietà CSS 'strokeDashoffset'
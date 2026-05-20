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
6. UI responsive

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

-----

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
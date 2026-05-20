
const proceedBtn = document.getElementById('proceed-btn');
const questPage = document.getElementById('questions-page');
const promiseCheckbox = document.getElementById("promise-check");
const welcomePage = document.querySelector(".welcome-content");

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
    welcomePage.classList.add("hidden"); // .hidden class in CSS
    questPage.classList.remove("hidden");
startExam(); // onclick del button, parte la funzione
});


/* PHASE 2: BENCHMARK | Q&A LOGICA */
function startExam() {
    // TODO: da capire..
}

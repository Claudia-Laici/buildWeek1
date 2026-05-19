
let proceedBtn = document.getElementById('proceed-btn');
let divQuestions = document.getElementById('questions');
const promiseCheckbox = document.getElementById("promise-check");
let welcomePage = document.querySelector(".welcome-content")

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
    welcomePage.style.display = "none";
    divQuestions.classList.remove("hidden");
});
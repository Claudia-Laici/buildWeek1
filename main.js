
let proceedBtn = document.getElementById('proceed-btn');
let divQuestions = document.getElementById('questions')
let checked = false
/* let promiseCheckbox = document.getElementById('promise-check').checked; */


const promiseCheckbox = document.getElementById("promise-check");

promiseCheckbox.addEventListener("change", function prosegui() {
    if (this.checked) {
        proceedBtn.disabled = false;
        proceedBtn.className = "btn-enabled";
    } else {
        proceedBtn.disabled = true;
        proceedBtn.className = "btn-disabled";
    }
});


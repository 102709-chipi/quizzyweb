

function loadQuestion() {
    const questionText = document.querySelector(".question-text");
    const optionsContainer = document.querySelector(".options");
    const feedbackContainer = document.querySelector(".feedback");
    const questionImage = document.getElementById("questionImage");

    questionText.innerText = questions[currentQuestion].text;
    optionsContainer.innerHTML = "";
    feedbackContainer.innerHTML = "";

 
    if (currentQuestion === 0) {
        questionImage.style.display = "block";
    } else {
        questionImage.style.display = "none";
    }

 
    if (questions[currentQuestion].type === "open") {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("open-answer");
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") checkOpenAnswer(input);
        });

        const submitButton = document.createElement("button");
        submitButton.innerText = "Bevestigen";
        submitButton.onclick = () => checkOpenAnswer(input);

        optionsContainer.appendChild(input);
        optionsContainer.appendChild(submitButton);
    } else {
        questions[currentQuestion].options.forEach(option => {
            const button = document.createElement("button");
            button.classList.add("option");
            button.innerText = option;
            button.onclick = () => checkAnswer(option, button);
            optionsContainer.appendChild(button);
        });
    }

    updateProgressBar();
}

function checkAnswer(selected, button) {
    const feedbackContainer = document.querySelector(".feedback");
    if (selected === questions[currentQuestion].correct) {
        button.style.backgroundColor = "green";
        feedbackContainer.innerHTML = "<p>Goed gedaan! Je hebt het juiste antwoord gekozen.</p>";
        setTimeout(() => goToQuestion(currentQuestion + 1), 1000);
    } else {
        button.style.backgroundColor = "red";
        feedbackContainer.innerHTML = "<p>Fout! Het juiste antwoord is: " + questions[currentQuestion].correct + "</p>";
    }
}

function checkOpenAnswer(input) {
    const userAnswer = input.value.trim();
    const correctAnswer = questions[currentQuestion].correct;
    const feedbackContainer = document.querySelector(".feedback");

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        input.style.backgroundColor = "green";
        feedbackContainer.innerHTML = "<p>Goed gedaan! Je hebt het juiste antwoord gegeven.</p>";
    } else {
        input.style.backgroundColor = "red";
        feedbackContainer.innerHTML = "<p>Fout! Het juiste antwoord is: " + correctAnswer + "</p>";
    }

    setTimeout(() => goToQuestion(currentQuestion + 1), 1000);
}

function goToQuestion(index) {
    if (index < questions.length) {
        currentQuestion = index;
        loadQuestion();
    } else {
        showResults();
    }
}

function updateProgressBar() {
    const progressSteps = document.querySelectorAll(".progress-bar div");
    progressSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentQuestion);
    });
}

window.onload = function () {
    loadQuestion();
    document.querySelectorAll(".progress-bar div").forEach((step, index) => {
        step.addEventListener("click", () => goToQuestion(index));
    });
};

function showResults() {
    const correctAnswers = questions.filter((q, index) => {
        return q.correct === (q.type === "open" ? document.querySelectorAll(".open-answer")[index]?.value.trim() : null);
    }).length;

    const percentage = Math.round((correctAnswers / questions.length) * 100);
    let message = "";

    if (percentage === 100) {
        message = "Fantastisch! Je hebt alle vragen goed!";
    } else if (percentage >= 80) {
        message = "Heel goed gedaan! Bijna perfect!";
    } else if (percentage >= 50) {
        message = "Goed geprobeerd! Je kunt nog wat leren.";
    } else {
        message = "Blijf oefenen! Je kunt het beter doen.";
    }

    alert(`Quiz Resultaten:\nJe hebt ${correctAnswers} van de ${questions.length} vragen correct.\nDat is ${percentage}% goed!\n\n${message}`);

    restartQuiz();
}

function restartQuiz() {
    currentQuestion = 0;
    loadQuestion();
}

function nextQuestion() {
    currentQuestion = (currentQuestion + 1) % questions.length;
    document.getElementById("question").innerText = questions[currentQuestion].text;
}






let currentQuestion = 0;
let score = 0;
const questions = [
        {
            text: "Wat is DUO en wat doet het precies?",
            options: [
                "Het regelt studiefinanciering, leningen en diploma-uitreikingen.",
                "Het regelt de toelating tot universiteiten.",
                "Het biedt kortingen op studiematerialen.",
                "Het organiseert studentenkampen."
            ],
            correct: "Het regelt studiefinanciering, leningen en diploma-uitreikingen."
            
        },
        {
            text: "Wat kun je met DUO doen als je studiefinanciering ontvangt?",
            options: [
                "Je kunt je studiefinanciering aanvragen, beheren en je lening inzien.",
                "Je kunt nieuwe boeken kopen.",
                "Je kunt gratis reizen binnen Europa.",
                "Je kunt je studieresultaten verbeteren."
            ],
            correct: "Je kunt je studiefinanciering aanvragen, beheren en je lening inzien."
        },
        {
            text: "Wist je dat je bij DUO niet alleen studiefinanciering kunt aanvragen?",
            options: [
                "Ja, je kunt je diploma registreren en je gegevens bijwerken.",
                "Nee, DUO biedt alleen studiefinanciering.",
                "Ja, je kunt ook korting krijgen op de huur van een studentenhuis.",
                "Ja, je kunt studiekeuzes maken op basis van de financiering."
            ],
            correct: "Ja, je kunt je diploma registreren en je gegevens bijwerken."
        },
        {
            text: "Hoe lang kun je studiefinanciering krijgen via DUO?",
            options: [
                "Zolang je studie duurt, zolang het binnen de maximale studieduur blijft.",
                "Tot je 30 jaar oud bent.",
                "Voor 5 jaar, ongeacht de studieperiode.",
                "Tot je een diploma hebt behaald."
            ],
            correct: "Zolang je studie duurt, zolang het binnen de maximale studieduur blijft."
        },
        {
            text: "Kan je studiefinanciering blijven ontvangen als je in het buitenland studeert?",
            options: [
                "Ja, maar het hangt af van het land en de duur van je studie.",
                "Nee, je kunt geen studiefinanciering ontvangen als je naar het buitenland gaat.",
                "Ja, maar alleen als je in een EU-land studeert.",
                "Ja, maar je moet het zelf aanvragen bij een andere instantie."
            ],
            correct: "Ja, maar het hangt af van het land en de duur van je studie."
        },
        {
            text: "Wat kun je allemaal doen met je DigiD op DUO?",
            options: [
                "Je kunt veilig inloggen om je studiefinanciering te beheren en aanvragen.",
                "Je kunt alles regelen met de belastingdienst.",
                "Je kunt ook je rijbewijs aanvragen.",
                "Je kunt gratis toegang krijgen tot alle onderwijsinstellingen."
            ],
            correct: "Je kunt veilig inloggen om je studiefinanciering te beheren en aanvragen."
        },
        {
            text: "Waarom kun je soms een lening voor je studie aanvragen bij DUO?",
            options: [
                "Omdat de kosten van je studie en levensonderhoud hoog zijn.",
                "Omdat de overheid het verplicht stelt voor studenten.",
                "Omdat het geld dan niet meer terugbetaald hoeft te worden.",
                "Omdat je een studiebeurs krijgt."
            ],
            correct: "Omdat de kosten van je studie en levensonderhoud hoog zijn."
        },
        {
            text: "Kun je DUO gebruiken om je diploma na te kijken?",
            options: [
                "Ja, DUO biedt een systeem om je diploma te registreren en in te zien.",
                "Nee, je kunt je diploma alleen inzien bij je universiteit.",
                "Ja, je kunt je diploma downloaden in PDF-formaat.",
                "Nee, alleen je eindcijferlijst is zichtbaar."
            ],
            correct: "Ja, DUO biedt een systeem om je diploma te registreren en in te zien."
        },
        {
            text: "Wat kun je doen als je DUO-studiefinanciering onterecht is stopgezet?",
            options: [
                "Je kunt bezwaar maken tegen de beslissing van DUO.",
                "Je kunt gewoon wachten tot de volgende aanvraagperiode.",
                "Je kunt de instantie aanklagen.",
                "Je kunt gewoon opnieuw studiefinanciering aanvragen."
            ],
            correct: "Je kunt bezwaar maken tegen de beslissing van DUO."
        },
        {
            text: "Wat is het 'studievoorschot' en hoe werkt het via DUO?",
            type: "open",
            correct: "Het is een lening die je kunt aanvragen om je studie te bekostigen."
        },
        {
            text: "Wat is het verschil tussen een lening en een gift via DUO?",
            type: "open",
            correct: "Een lening kan omgezet worden in een gift als je op tijd afstudeert."
        },
        {
            text: "Kun je een lening bij DUO afsluiten voor een tweede studie?",
            type: "open",
            correct: "Ja, het is mogelijk, maar het recht op studiefinanciering kan vervallen."
        },
        {
            text: "Kan DUO je helpen als je in financiële problemen zit tijdens je studie?",
            type: "open",
            correct: "Ja, DUO biedt tijdelijke betalingsregelingen voor studenten in financiële problemen."
        },
        {
            text: "Kan je DUO-gegevens gebruiken om belastingaangifte te doen?",
            type: "open",
            correct: "Ja, je gegevens kunnen invloed hebben op je belastingaangifte."
        },
        {
            text: "Hoe kan DUO helpen bij het kiezen van de juiste opleiding?",
            type: "open",
            correct: "DUO biedt geen hulp bij het kiezen van een opleiding, maar wel bij de financiering."
        }
];
function loadQuestion() {
 const questionText = document.querySelector(".question-text");
 const optionsContainer = document.querySelector(".options");
 const feedbackContainer = document.querySelector(".feedback");
 const questionImage = document.getElementById("questionImage");
 questionText.innerText = questions[currentQuestion].text;
 optionsContainer.innerHTML = "";
 feedbackContainer.innerHTML = "";
 // Laat afbeelding alleen bij vraag 1 zien
 if (currentQuestion === 0) {
   questionImage.style.display = "block";
 } else {
   questionImage.style.display = "none";
 }
 // Open vraag
 if (questions[currentQuestion].type === "open") {
   const input = document.createElement("input");
   input.type = "text";
   input.classList.add("open-answer");
   input.placeholder = "Typ je antwoord hier...";
   input.addEventListener("keypress", function (event) {
     if (event.key === "Enter") checkOpenAnswer(input);
   });
   const submitButton = document.createElement("button");
   submitButton.innerText = "Bevestigen";
   submitButton.onclick = () => checkOpenAnswer(input);
   optionsContainer.appendChild(input);
   optionsContainer.appendChild(submitButton);
 } else {
   // Meerkeuzevraag
   questions[currentQuestion].options.forEach(option => {
     const button = document.createElement("button");
     button.classList.add("option");
     button.innerText = option;
     button.onclick = () => checkAnswer(option, button);
     optionsContainer.appendChild(button);
   });
 }
 updateProgressBar();
}
function checkAnswer(selected, button) {
 const feedbackContainer = document.querySelector(".feedback");
 const correct = questions[currentQuestion].correct;
 if (selected === correct) {
   score++;
   button.style.backgroundColor = "green";
   feedbackContainer.innerHTML = "<p>Goed gedaan! Je hebt het juiste antwoord gekozen.</p>";
   setTimeout(() => goToQuestion(currentQuestion + 1), 1000);
 } else {
   button.style.backgroundColor = "red";
   feedbackContainer.innerHTML = "<p>Fout! Het juiste antwoord is: " + correct + "</p>";
 }
}
function checkOpenAnswer(input) {
 const userAnswer = input.value.trim();
 const correctAnswer = questions[currentQuestion].correct;
 const feedbackContainer = document.querySelector(".feedback");
 if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
   score++;
   input.style.backgroundColor = "green";
   feedbackContainer.innerHTML = "<p>Goed gedaan! Je hebt het juiste antwoord gegeven.</p>";
 } else {
   input.style.backgroundColor = "red";
   feedbackContainer.innerHTML = "<p>Fout! Het juiste antwoord is: " + correctAnswer + "</p>";
 }
 setTimeout(() => goToQuestion(currentQuestion + 1), 1000);
}
function goToQuestion(index) {
 if (index < questions.length) {
   currentQuestion = index;
   loadQuestion();
 } else {
   showResults();
 }
}
function showResults() {
 // Sla score op voor resultpagina
 localStorage.setItem("quizScore", score);
 localStorage.setItem("quizTotal", questions.length);
 // Ga naar resultpagina
 window.location.href = "./JS/TMresult.html";
}
function updateProgressBar() {
 const progressSteps = document.querySelectorAll(".progress-bar div");
 progressSteps.forEach((step, index) => {
   step.classList.toggle("active", index === currentQuestion);
 });
}
function restartQuiz() {
 currentQuestion = 0;
 score = 0;
 loadQuestion();
}
window.onload = function () {
 loadQuestion();
 // Klikbare voortgangsbalk
 document.querySelectorAll(".progress-bar div").forEach((step, index) => {
   step.addEventListener("click", () => goToQuestion(index));
 });
};


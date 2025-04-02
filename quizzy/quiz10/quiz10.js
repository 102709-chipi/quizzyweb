function checkAnswer(button) {
    const buttons = document.querySelectorAll('.options button');


    const correctAnswer = Array.from(buttons).find(btn => btn.textContent.includes('D'));
    const isCorrect = button === correctAnswer;

  
    buttons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        if (btn !== correctAnswer) {
            btn.classList.add('incorrect');
        }
    });

    correctAnswer.classList.add('correct');


    const quizId = 'quiz10';
    const result = {
        selected: button.textContent,
        correct: isCorrect
    };
    localStorage.setItem(quizId, JSON.stringify(result));

   
    updateScore();
}


window.addEventListener('DOMContentLoaded', () => {
    const quizId = 'quiz10'; 
    const saved = JSON.parse(localStorage.getItem(quizId));
    if (saved) {
        const buttons = document.querySelectorAll('.options button');
        buttons.forEach(btn => {
            if (btn.textContent === saved.selected) {
                checkAnswer(btn);
            }
        });
    }
});


function updateScore() {
    let score = 0;
    for (let i = 1; i <= 10; i++) {
        const data = JSON.parse(localStorage.getItem(`quiz${i}`));
        if (data && data.correct) {
            score++;
        }
    }
    localStorage.setItem('finalScore', score);
}
const quizData = [
    {
        question: "Ce reprezintă un algoritm?",
        answers: {
            a: "O secvență de pași pentru a rezolva o problemă",
            b: "O limbă de programare",
            c: "Un fișier executabil",
        },
        correct: "a",
    },
    {
        question: "Ce este o variabilă?",
        answers: {
            a: "Un număr întotdeauna fix",
            b: "O locație în memorie pentru a stoca o valoare",
            c: "Un program care rulează pe computer",
        },
        correct: "b",
    },
    {
        question: "Ce simbol este folosit pentru atribuire în majoritatea limbajelor?",
        answers: {
            a: "=",
            b: "==",
            c: "===",
        },
        correct: "a",
    },
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');

function loadQuiz() {
    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${index + 1}. ${item.question}</p>`;

        const answersDiv = document.createElement('div');
        answersDiv.classList.add('answers');
        for (let [key, text] of Object.entries(item.answers)) {
            const button = document.createElement('button');
            button.innerHTML = text;
            button.dataset.correct = key === item.correct;
            button.onclick = () => selectAnswer(button, index);
            answersDiv.appendChild(button);
        }
        questionDiv.appendChild(answersDiv);
        quizContainer.appendChild(questionDiv);
    });

    submitButton.style.display = 'block';
    submitButton.onclick = showResult;
}

function selectAnswer(button, index) {
    const answers = button.parentElement.querySelectorAll('button');
    answers.forEach(btn => btn.style.backgroundColor = '#007BFF');
    button.style.backgroundColor = button.dataset.correct === 'true' ? '#28a745' : '#dc3545';
}

function showResult() {
    let correctAnswers = 0;
    document.querySelectorAll('.answers button[data-correct="true"]').forEach(button => {
        if (button.style.backgroundColor === 'rgb(40, 167, 69)') {
            correctAnswers++;
        }
    });

    const totalQuestions = quizData.length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;

    resultContainer.innerHTML = `<h2>Ai răspuns corect la ${correctAnswers}/${totalQuestions} întrebări (${scorePercentage.toFixed(0)}%).</h2>`;

    // Recomandări bazate pe performanță
    const recommendations = document.createElement('div');
    if (scorePercentage === 100) {
        recommendations.innerHTML = `
            <h3>Recomandări:</h3>
            <ul>
                <li>Explorează limbaje mai avansate precum Python sau JavaScript.</li>
                <li>Încercă proiecte practice de programare.</li>
            </ul>`;
    } else if (scorePercentage >= 50) {
        recommendations.innerHTML = `
            <h3>Recomandări:</h3>
            <ul>
                <li>Revizuiește conceptele de bază din programare.</li>
                <li>Încearcă tutoriale pe <a href="https://www.codecademy.com/" target="_blank">Codecademy</a>.</li>
            </ul>`;
    } else {
        recommendations.innerHTML = `
            <h3>Recomandări:</h3>
            <ul>
                <li>Începe cu introducerea în programare pe <a href="https://www.khanacademy.org/computing/computer-programming" target="_blank">Khan Academy</a>.</li>
                <li>Învață conceptele fundamentale: variabile, structuri de control.</li>
            </ul>`;
    }

    resultContainer.appendChild(recommendations);
}

window.onload = loadQuiz;

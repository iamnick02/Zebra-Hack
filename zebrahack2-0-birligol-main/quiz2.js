const quizData = [
    {
        question: "Ce reprezintă HTML?",
        answers: {
            a: "HyperText Markup Language",
            b: "Home Tool Markup Language",
            c: "Hyperlinks and Text Markup Language",
        },
        correct: "a",
    },
    {
        question: "Ce proprietate CSS este folosită pentru a schimba culoarea textului?",
        answers: {
            a: "text-color",
            b: "color",
            c: "font-color",
        },
        correct: "b",
    },
    {
        question: "Ce metodă JavaScript este folosită pentru a adăuga un element nou într-un DOM?",
        answers: {
            a: "appendChild()",
            b: "addElement()",
            c: "insertNode()",
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
                <li>Construiește un site complet utilizând HTML, CSS și JavaScript.</li>
                <li>Explorează framework-uri precum React sau Vue.js.</li>
            </ul>`;
    } else if (scorePercentage >= 50) {
        recommendations.innerHTML = `
            <h3>Recomandări:</h3>
            <ul>
                <li>Revizuiește proprietățile CSS și conceptele de bază din JavaScript.</li>
                <li>Încearcă proiecte simple precum pagini de portofoliu.</li>
            </ul>`;
    } else {
        recommendations.innerHTML = `
            <h3>Recomandări:</h3>
            <ul>
                <li>Începe cu tutoriale HTML și CSS pe <a href="https://www.freecodecamp.org/" target="_blank">freeCodeCamp</a>.</li>
                <li>Învață bazele DOM și cum să manipulezi elementele.</li>
            </ul>`;
    }

    resultContainer.appendChild(recommendations);
}

window.onload = loadQuiz;

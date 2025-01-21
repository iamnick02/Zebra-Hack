const quizData = [
    {
        question: "Care este complexitatea temporală a căutării binare?",
        answers: {
            a: "O(n)",
            b: "O(log n)",
            c: "O(n^2)",
        },
        correct: "b",
    },
    {
        question: "Ce structură de date folosește principiul LIFO?",
        answers: {
            a: "Coada",
            b: "Lista legată",
            c: "Stiva",
        },
        correct: "c",
    },
    {
        question: "Cum se numește traversarea unui arbore în care se vizitează nodul rădăcină după subarbori?",
        answers: {
            a: "Preordine",
            b: "Postordine",
            c: "Inordine",
        },
        correct: "b",
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
                <li>Continuă să explorezi probleme complexe de algoritmi pe <a href="https://leetcode.com/" target="_blank">LeetCode</a>.</li>
                <li>Încercă să aprofundezi optimizările algoritmilor.</li>
            </ul>`;
    } else if (scorePercentage >= 50) {
        recommendations.innerHTML = `
            <h3>Recomandări:</h3>
            <ul>
                <li>Revizuiește bazele algoritmilor pe <a href="https://www.geeksforgeeks.org/" target="_blank">GeeksforGeeks</a>.</li>
                <li>Rezolvă exerciții simple pe <a href="https://www.codewars.com/" target="_blank">CodeWars</a>.</li>
            </ul>`;
    } else {
        recommendations.innerHTML = `
            <h3>Recomandări:</h3>
            <ul>
                <li>Începe cu introducerea în algoritmi pe <a href="https://www.khanacademy.org/computing/computer-science/algorithms" target="_blank">Khan Academy</a>.</li>
                <li>Explorează structurile de date de bază.</li>
            </ul>`;
    }

    resultContainer.appendChild(recommendations);
}

window.onload = loadQuiz;

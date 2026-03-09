// ============================================================
// quiz.js — Quiz modal: display, navigation, scoring, results
// ============================================================

import { appData } from './data.js';

// Module-level quiz state
let currentQuizQuestion = 0;
let quizScore = 0;
let userAnswers = [];

export function setupQuiz() {
    const totalQuestionsEl = document.getElementById('totalQuestions');
    if (totalQuestionsEl) {
        totalQuestionsEl.textContent = appData.quizQuestions.length;
    }
}

export function openQuiz() {
    const modal = document.getElementById('quizModal');
    if (modal) {
        modal.classList.remove('hidden');
        resetQuiz();
        displayQuestion();
    }
}

export function closeQuiz() {
    const modal = document.getElementById('quizModal');
    if (modal) modal.classList.add('hidden');
}

export function restartQuiz() {
    resetQuiz();
    displayQuestion();
}

function resetQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    userAnswers = [];

    const quizContainer = document.getElementById('quizContainer');
    const quizResult = document.getElementById('quizResult');

    if (quizContainer) quizContainer.classList.remove('hidden');
    if (quizResult) quizResult.classList.add('hidden');
}

function displayQuestion() {
    const question = appData.quizQuestions[currentQuizQuestion];

    const currentQuestionEl = document.getElementById('currentQuestion');
    const questionTextEl = document.getElementById('questionText');

    if (currentQuestionEl) currentQuestionEl.textContent = currentQuizQuestion + 1;
    if (questionTextEl) questionTextEl.textContent = question.question;

    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', () => selectOption(index, optionDiv));
            optionsContainer.appendChild(optionDiv);
        });
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) prevBtn.style.display = currentQuizQuestion === 0 ? 'none' : 'block';
    if (nextBtn) {
        nextBtn.textContent = currentQuizQuestion === appData.quizQuestions.length - 1 ? 'Finish Quiz' : 'Next';
        nextBtn.disabled = userAnswers[currentQuizQuestion] === undefined;
    }
}

function selectOption(index, element) {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    userAnswers[currentQuizQuestion] = index;

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.disabled = false;
}

export function nextQuestion() {
    if (currentQuizQuestion < appData.quizQuestions.length - 1) {
        currentQuizQuestion++;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

export function previousQuestion() {
    if (currentQuizQuestion > 0) {
        currentQuizQuestion--;
        displayQuestion();
    }
}

function finishQuiz() {
    quizScore = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === appData.quizQuestions[index].correct) quizScore++;
    });

    const quizContainer = document.getElementById('quizContainer');
    const quizResult = document.getElementById('quizResult');

    if (quizContainer) quizContainer.classList.add('hidden');
    if (quizResult) quizResult.classList.remove('hidden');

    const percentage = Math.round((quizScore / appData.quizQuestions.length) * 100);
    const finalScoreEl = document.getElementById('finalScore');
    if (finalScoreEl) {
        finalScoreEl.textContent = `${quizScore}/${appData.quizQuestions.length} (${percentage}%)`;
    }

    const recommendationsEl = document.getElementById('recommendations');
    if (recommendationsEl) {
        recommendationsEl.innerHTML = getRecommendations(percentage);
    }
}

function getRecommendations(percentage) {
    if (percentage >= 80) {
        return `
      <h4>Excellent! 🎉</h4>
      <p>You have a strong understanding of cybersecurity basics. Keep staying informed about new threats and continue practicing good security habits.</p>
      <ul>
        <li>Follow cybersecurity news and updates</li>
        <li>Help others learn about online safety</li>
        <li>Consider advanced security training</li>
      </ul>
    `;
    } else if (percentage >= 60) {
        return `
      <h4>Good Job! 👍</h4>
      <p>You have a decent understanding but there's room for improvement. Focus on the areas where you missed questions.</p>
      <ul>
        <li>Review password security best practices</li>
        <li>Learn more about phishing identification</li>
        <li>Practice safe browsing habits</li>
      </ul>
    `;
    } else {
        return `
      <h4>Needs Improvement 📚</h4>
      <p>Consider spending more time learning about cybersecurity fundamentals. Your digital safety is important!</p>
      <ul>
        <li>Take our learning modules seriously</li>
        <li>Enable two-factor authentication on all accounts</li>
        <li>Be extra cautious with suspicious emails and links</li>
        <li>Consider cybersecurity awareness training</li>
      </ul>
    `;
    }
}

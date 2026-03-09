// ============================================================
// learning.js — Learning modules, progress bars, video tracking
// ============================================================

import { appData } from './data.js';

// ── Progress bar helpers ────────────────────────────────────

export function updateProgressBar(level, percentage) {
    const progressBar = document.querySelector(`#progress-${level}`);
    if (progressBar) {
        progressBar.style.width = `${Math.min(percentage, 100)}%`;
    }
}

export function updateOverallProgress(progressData) {
    const totalModules = 3;
    const completedCount = progressData.completedModules.length;
    const videosWatchedCount = progressData.videosWatched.length;
    const overallPercentage = Math.round((completedCount / totalModules) * 100);

    const overallProgressBar = document.getElementById('overall-progress');
    if (overallProgressBar) overallProgressBar.style.width = `${overallPercentage}%`;

    const percentageText = document.getElementById('overall-percentage');
    if (percentageText) percentageText.textContent = `${overallPercentage}%`;

    const completedModulesText = document.getElementById('completed-modules');
    if (completedModulesText) completedModulesText.textContent = `${completedCount}/${totalModules}`;

    const videosWatchedText = document.getElementById('videos-watched');
    if (videosWatchedText) videosWatchedText.textContent = `${videosWatchedCount}/${totalModules}`;

    const learningTimeText = document.getElementById('learning-time');
    if (learningTimeText) {
        const hours = Math.floor(progressData.totalLearningTime / 60);
        const minutes = Math.round(progressData.totalLearningTime % 60);
        learningTimeText.textContent = `${hours}h ${minutes}m`;
    }
}

// ── Video section helpers ───────────────────────────────────

export function showVideoSection(moduleId) {
    const videoSection = document.getElementById(`video-${moduleId}`);
    if (videoSection) {
        videoSection.style.display = 'block';
        observeVideoSection(videoSection, moduleId);
    }
}

export function hideVideoSection(moduleId) {
    const videoSection = document.getElementById(`video-${moduleId}`);
    if (videoSection) videoSection.style.display = 'none';
}

function observeVideoSection(videoSection, moduleId) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => markVideoAsWatched(moduleId), 3000);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(videoSection);
}

// ── Module start & completion ───────────────────────────────

/**
 * Starts a learning module, animates the progress bar to 100%,
 * then saves progress and shows the video section.
 *
 * @param {string} level - 'beginner' | 'intermediate' | 'advanced'
 * @param {object} progressData - shared progress state (from storage.js)
 * @param {function} saveProgressToStorage - callback to persist data
 */
export function startModule(level, progressData, saveProgressToStorage) {
    const button = document.querySelector(`[data-level="${level}"]`);
    const progressBar = document.querySelector(`#progress-${level}`);

    if (!button || !progressBar) return;

    const startTime = Date.now();

    button.textContent = 'Loading...';
    button.disabled = true;

    let progress = progressData[level] || 0;
    const targetProgress = 100;
    const increment = (targetProgress - progress) / 10;

    const interval = setInterval(() => {
        progress += increment;
        updateProgressBar(level, progress);

        if (progress >= targetProgress) {
            clearInterval(interval);

            const sessionTime = (Date.now() - startTime) / 1000 / 60; // minutes
            progressData.totalLearningTime += sessionTime;

            if (!progressData.completedModules.includes(level)) {
                progressData.completedModules.push(level);
            }
            progressData[level] = 100;

            button.textContent = 'Completed';
            button.classList.add('btn--secondary');
            button.classList.remove('btn--primary');
            button.disabled = false;

            showVideoSection(level);
            saveProgressToStorage();
            updateOverallProgress(progressData);
            showModuleCompletionMessage(level);
        }
    }, 200);
}

function markVideoAsWatched(moduleId) {
    // Access progressData from storage module via a shared ref
    // This is handled in app.js which passes progressData
    const event = new CustomEvent('videoWatched', { detail: { moduleId } });
    document.dispatchEvent(event);
}

// ── Completion notification ─────────────────────────────────

export function showModuleCompletionMessage(level) {
    const messages = {
        beginner: "🎉 Congratulations! You've completed the Beginner Basics module. Check out the video tutorial below!",
        intermediate: "🛡️ Great job! You've mastered Threat Detection. Watch the advanced video to learn more!",
        advanced: "🏆 Excellent! You've completed Advanced Security. You're now a cybersecurity expert!"
    };

    const notification = document.createElement('div');
    notification.className = 'completion-notification';
    notification.innerHTML = `
    <div class="notification-content">
      <p>${messages[level]}</p>
      <button onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-success);
    color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;

    document.body.appendChild(notification);
    setTimeout(() => { if (notification.parentElement) notification.remove(); }, 5000);
}

// ── Setup ───────────────────────────────────────────────────

export function setupLearningModules() {
    // Module buttons are wired up via onclick in HTML (startModule)
    // Additional setup can go here in the future
}

// ============================================================
// storage.js — LocalStorage persistence for progress tracking
// ============================================================

import { STORAGE_KEYS } from './data.js';
import { updateProgressBar, updateOverallProgress, showVideoSection, hideVideoSection } from './learning.js';

// Shared mutable progress state (exported so other modules can read/write it)
export let progressData = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    completedModules: [],
    videosWatched: [],
    totalLearningTime: 0,
    lastUpdated: new Date().toISOString()
};

export function saveProgressToStorage() {
    try {
        progressData.lastUpdated = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressData));
        localStorage.setItem(STORAGE_KEYS.COMPLETED_MODULES, JSON.stringify(progressData.completedModules));
        localStorage.setItem(STORAGE_KEYS.VIDEOS_WATCHED, JSON.stringify(progressData.videosWatched));
        localStorage.setItem(STORAGE_KEYS.LEARNING_TIME, progressData.totalLearningTime.toString());
        localStorage.setItem(STORAGE_KEYS.LAST_UPDATED, progressData.lastUpdated);
    } catch (error) {
        console.error('Error saving progress to localStorage:', error);
    }
}

export function loadProgressFromStorage() {
    try {
        const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        if (savedProgress) {
            Object.assign(progressData, JSON.parse(savedProgress));

            // Update progress bars
            updateProgressBar('beginner', progressData.beginner);
            updateProgressBar('intermediate', progressData.intermediate);
            updateProgressBar('advanced', progressData.advanced);

            // Update module buttons if completed
            progressData.completedModules.forEach(moduleId => {
                const button = document.querySelector(`[data-level="${moduleId}"]`);
                if (button) {
                    button.textContent = 'Completed';
                    button.classList.add('btn--secondary');
                    button.classList.remove('btn--primary');
                }
            });

            // Show videos for completed modules
            progressData.completedModules.forEach(moduleId => {
                showVideoSection(moduleId);
            });

            // Update overall progress
            updateOverallProgress(progressData);
        }
    } catch (error) {
        console.error('Error loading progress from localStorage:', error);
    }
}

export function resetProgress() {
    if (confirm('Are you sure you want to reset all your learning progress? This action cannot be undone.')) {
        try {
            // Clear localStorage
            Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));

            // Reset progress data
            Object.assign(progressData, {
                beginner: 0,
                intermediate: 0,
                advanced: 0,
                completedModules: [],
                videosWatched: [],
                totalLearningTime: 0,
                lastUpdated: new Date().toISOString()
            });

            // Reset UI
            ['beginner', 'intermediate', 'advanced'].forEach(level => {
                updateProgressBar(level, 0);
                const button = document.querySelector(`[data-level="${level}"]`);
                if (button) {
                    button.textContent = 'Start Module';
                    button.classList.add('btn--primary');
                    button.classList.remove('btn--secondary');
                }
                hideVideoSection(level);
            });

            updateOverallProgress(progressData);
            alert('Progress has been reset successfully!');
        } catch (error) {
            console.error('Error resetting progress:', error);
            alert('Error resetting progress. Please try again.');
        }
    }
}

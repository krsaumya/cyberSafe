// ============================================================
// app.js — Main entry point: imports all modules & wires them up
// ============================================================

import { appData } from './js/data.js';
import {
  progressData,
  saveProgressToStorage,
  loadProgressFromStorage,
  resetProgress
} from './js/storage.js';
import { setupNavigation, scrollToSection } from './js/navigation.js';
import {
  setupLearningModules,
  startModule as _startModule,
  updateProgressBar,
  updateOverallProgress
} from './js/learning.js';
import {
  setupNewsTicker,
  setupCrimeCards,
  setupThreatList
} from './js/threats.js';
import {
  setupTabs,
  setupLawsTable,
  setupSearchFunctionality
} from './js/laws.js';
import {
  setupPasswordChecker,
  setup2FAGuide,
  setupReportingChecklist
} from './js/tools.js';
import {
  setupQuiz,
  openQuiz as _openQuiz,
  closeQuiz as _closeQuiz,
  restartQuiz as _restartQuiz,
  nextQuestion as _nextQuestion,
  previousQuestion as _prevQuestion
} from './js/quiz.js';
import {
  setupScrollAnimations,
  injectNotificationStyles,
  initializeTooltips,
  validateEmail,
  formatDate,
  validateForm
} from './js/utils.js';

// ── Expose functions called from HTML onclick= attributes ────

window.scrollToSection = scrollToSection;
window.resetProgress = resetProgress;

window.startModule = (level) =>
  _startModule(level, progressData, saveProgressToStorage);

window.openQuiz = _openQuiz;
window.closeQuiz = _closeQuiz;
window.restartQuiz = _restartQuiz;
window.nextQuestion = _nextQuestion;
window.previousQuestion = _prevQuestion;

// Keep utility helpers accessible for console/testing
window.validateEmail = validateEmail;
window.formatDate = formatDate;
window.validateForm = validateForm;

// ── Keyboard shortcuts ───────────────────────────────────────

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') _closeQuiz();
});

// ── Video-watched event ──────────────────────────────────────

document.addEventListener('videoWatched', (e) => {
  const { moduleId } = e.detail;
  if (!progressData.videosWatched.includes(moduleId)) {
    progressData.videosWatched.push(moduleId);
    saveProgressToStorage();
    updateOverallProgress(progressData);
  }
});

// ── Error / performance monitoring ──────────────────────────

window.addEventListener('error', (e) => console.error('Application error:', e.error));
window.addEventListener('load', () =>
  console.log(`Page loaded in ${performance.now().toFixed(2)}ms`)
);

// ── Bootstrap ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  injectNotificationStyles();
  setupNavigation();
  setupNewsTicker();
  setupCrimeCards();
  setupTabs();
  setupLawsTable();
  setupPasswordChecker();
  setup2FAGuide();
  setupReportingChecklist();
  setupLearningModules();
  setupThreatList();
  setupQuiz();
  setupSearchFunctionality();
  loadProgressFromStorage();
  initializeTooltips();
  setupScrollAnimations();
});
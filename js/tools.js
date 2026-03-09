// ============================================================
// tools.js — Password checker, 2FA guide, reporting checklist
// ============================================================

import { appData, platformInstructions } from './data.js';

// ── Password Strength Checker ───────────────────────────────

export function setupPasswordChecker() {
    const passwordInput = document.getElementById('passwordInput');
    const strengthDiv = document.getElementById('passwordStrength');
    const tipsDiv = document.getElementById('passwordTips');

    if (!passwordInput || !strengthDiv || !tipsDiv) return;

    passwordInput.addEventListener('input', function () {
        const result = checkPasswordStrength(this.value);
        strengthDiv.className = `password-strength ${result.level}`;
        strengthDiv.textContent = result.message;
        tipsDiv.innerHTML = result.tips.length > 0
            ? `**Suggestions:**<br>${result.tips.join('<br>')}`
            : '';
    });
}

export function checkPasswordStrength(password) {
    let score = 0;
    const tips = [];

    if (password.length === 0) return { level: '', message: '', tips: [] };

    if (password.length >= 8) score++;
    else tips.push('• Use at least 8 characters');

    if (password.length >= 12) score++;
    else if (password.length >= 8) tips.push('• Consider using 12+ characters for better security');

    if (/[a-z]/.test(password)) score++;
    else tips.push('• Include lowercase letters');

    if (/[A-Z]/.test(password)) score++;
    else tips.push('• Include uppercase letters');

    if (/[0-9]/.test(password)) score++;
    else tips.push('• Include numbers');

    if (/[^a-zA-Z0-9]/.test(password)) score++;
    else tips.push('• Include special characters (!@#$%^&*)');

    if (!/(.)\\1{2,}/.test(password)) score++;
    else tips.push('• Avoid repeating characters');

    let level, message;
    if (score <= 2) {
        level = 'weak';
        message = 'Weak - Easy to guess';
    } else if (score <= 4) {
        level = 'medium';
        message = 'Medium - Could be stronger';
    } else {
        level = 'strong';
        message = 'Strong - Good password!';
    }

    return { level, message, tips };
}

// ── 2FA Guide ───────────────────────────────────────────────

export function setup2FAGuide() {
    const platformBtns = document.querySelectorAll('.platform-btn');
    const instructionsDiv = document.getElementById('platformInstructions');

    if (!instructionsDiv) return;

    platformBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            platformBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const platform = this.getAttribute('data-platform');
            if (platformInstructions[platform]) {
                instructionsDiv.innerHTML = platformInstructions[platform];
            }
        });
    });
}

// ── Reporting Checklist ─────────────────────────────────────

export function setupReportingChecklist() {
    const container = document.getElementById('reportingChecklist');
    if (!container) return;

    appData.reportingChecklist.forEach(item => {
        const label = document.createElement('label');
        label.className = 'checklist-item';
        label.innerHTML = `
      <input type="checkbox" class="checklist-checkbox">
      ${item}
    `;
        container.appendChild(label);
    });
}

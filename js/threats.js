// ============================================================
// threats.js — Cyber crime cards, threat list, news ticker
// ============================================================

import { appData } from './data.js';

export function setupNewsTicker() {
    const ticker = document.getElementById('newsTicker');
    if (ticker) {
        ticker.textContent = appData.newsAlerts.join(' • ');
    }
}

export function setupCrimeCards() {
    const container = document.getElementById('crimeCards');
    if (!container) return;

    appData.threats.forEach(threat => {
        const card = document.createElement('div');
        card.className = 'card crime-card';
        card.innerHTML = `
      <div class="card__body">
        <h3>${threat.type}</h3>
        <p>${threat.description}</p>
        <div class="crime-details">
          <h4>Prevention Tips:</h4>
          <ul class="prevention-list">
            ${threat.prevention.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
        card.addEventListener('click', function () {
            this.classList.toggle('expanded');
        });
        container.appendChild(card);
    });
}

export function setupThreatList() {
    const container = document.getElementById('threatList');
    if (!container) return;

    appData.newsAlerts.forEach(alert => {
        const item = document.createElement('div');
        item.className = 'threat-item';
        item.textContent = alert;
        container.appendChild(item);
    });
}

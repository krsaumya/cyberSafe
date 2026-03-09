// ============================================================
// laws.js — IT Act table, laws grid, tab switching, law search
// ============================================================

import { appData } from './data.js';

export function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    setupLawsGrid();
}

export function setupLawsGrid() {
    const container = document.getElementById('lawsGrid');
    if (!container) return;

    appData.laws.forEach(law => {
        const card = document.createElement('div');
        card.className = 'card law-card';
        card.innerHTML = `
      <div class="card__body">
        <h3>${law.crime}</h3>
        <p><strong>Legal Section:</strong> ${law.section}</p>
        <p><strong>Punishment:</strong> ${law.punishment}</p>
        <p>${law.description}</p>
      </div>
    `;
        container.appendChild(card);
    });
}

export function setupLawsTable() {
    const tbody = document.getElementById('lawsTableBody');
    if (!tbody) return;

    appData.laws.forEach(law => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${law.crime}</td>
      <td>${law.section}</td>
      <td>${law.punishment}</td>
      <td>${law.description}</td>
    `;
        tbody.appendChild(row);
    });
}

export function setupSearchFunctionality() {
    const searchInput = document.getElementById('lawSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#lawsTableBody tr');
        rows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
        });
    });
}

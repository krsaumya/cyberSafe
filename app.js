// Application data
const appData = {
  threats: [
    {
      type: "Phishing",
      description: "Fraudulent attempts to obtain sensitive information through deceptive emails or websites",
      prevention: ["Verify sender authenticity", "Check URLs carefully", "Don't click suspicious links", "Use email security features"]
    },
    {
      type: "Identity Theft", 
      description: "Unauthorized use of personal information for fraudulent purposes",
      prevention: ["Secure personal documents", "Monitor credit reports", "Use strong authentication", "Be cautious with personal data sharing"]
    },
    {
      type: "Ransomware",
      description: "Malware that encrypts files and demands payment for decryption", 
      prevention: ["Regular backups", "Keep software updated", "Avoid suspicious downloads", "Use reputable antivirus"]
    },
    {
      type: "DDoS Attacks",
      description: "Attempts to overwhelm servers with traffic to make them unavailable",
      prevention: ["Use DDoS protection services", "Implement rate limiting", "Monitor traffic patterns", "Have incident response plan"]
    }
  ],
  laws: [
    {
      crime: "Hacking",
      section: "IT Act Section 66", 
      punishment: "Up to 3 years imprisonment and ₹5 lakh fine",
      description: "Unauthorized access to computer systems"
    },
    {
      crime: "Identity Theft",
      section: "IT Act Section 66C",
      punishment: "Up to 3 years imprisonment and ₹1 lakh fine", 
      description: "Fraudulent use of another person's identity"
    },
    {
      crime: "Privacy Violation",
      section: "IT Act Section 66E",
      punishment: "Up to 3 years imprisonment and ₹2 lakh fine",
      description: "Publishing private images without consent"
    },
    {
      crime: "Cyber Terrorism", 
      section: "IT Act Section 66F",
      punishment: "Life imprisonment",
      description: "Acts intended to threaten unity, integrity, security of India"
    }
  ],
  newsAlerts: [
    "⚠️ New UPI scam targets Paytm users - verify before paying",
    "🚨 Fake KYC update messages circulating - banks never ask via SMS", 
    "⚡ WhatsApp phishing links spreading - don't click suspicious messages",
    "📱 Fake government apps detected - download only from official sources"
  ],
  quizQuestions: [
    {
      question: "What should you do if you receive a suspicious email asking for your bank details?",
      options: ["Reply with your information", "Click the link to verify", "Delete the email and report it", "Forward it to friends"],
      correct: 2,
      explanation: "Never provide personal information via email. Delete suspicious emails and report them to authorities."
    },
    {
      question: "How often should you change your passwords?", 
      options: ["Never", "Every few years", "When compromised or every 6-12 months", "Daily"],
      correct: 2,
      explanation: "Regular password updates help maintain security, especially if there's been a breach."
    },
    {
      question: "What makes a strong password?",
      options: ["Your name and birthdate", "A mix of letters, numbers, and symbols", "A common dictionary word", "Your phone number"],
      correct: 1, 
      explanation: "Strong passwords use a combination of different character types and are not easily guessable."
    }
  ],
  reportingChecklist: [
    "Take screenshots of suspicious messages or websites",
    "Save original email headers and source information", 
    "Do not delete evidence until advised by authorities",
    "Note dates, times, and any financial losses",
    "Collect contact information of any witnesses",
    "Report to cybercrime.gov.in immediately",
    "Contact your bank if financial fraud occurred", 
    "File a complaint with local police if needed"
  ]
};

// Quiz state
let currentQuizQuestion = 0;
let quizScore = 0;
let userAnswers = [];

// Platform 2FA instructions
const platformInstructions = {
  whatsapp: `
    <h4>Enable 2FA on WhatsApp:</h4>
    <ol>
      <li>Open WhatsApp and go to Settings</li>
      <li>Tap on Account → Two-step verification</li>
      <li>Tap Enable and create a 6-digit PIN</li>
      <li>Add an email address for account recovery</li>
      <li>Confirm your email address</li>
    </ol>
    <p><strong>Important:</strong> Keep your PIN and email safe. You'll need them to access your account.</p>
  `,
  gmail: `
    <h4>Enable 2FA on Gmail:</h4>
    <ol>
      <li>Go to your Google Account settings</li>
      <li>Select Security → 2-Step Verification</li>
      <li>Click "Get Started" and sign in</li>
      <li>Add your phone number</li>
      <li>Choose to receive codes via SMS or voice call</li>
      <li>Enter the verification code sent to your phone</li>
    </ol>
    <p><strong>Tip:</strong> Use the Google Authenticator app for better security.</p>
  `,
  instagram: `
    <h4>Enable 2FA on Instagram:</h4>
    <ol>
      <li>Go to your profile and tap the menu (≡)</li>
      <li>Tap Settings → Security → Two-Factor Authentication</li>
      <li>Tap "Get Started"</li>
      <li>Choose Text Message or Authentication App</li>
      <li>Follow the prompts to set up your preferred method</li>
      <li>Save your backup codes in a safe place</li>
    </ol>
    <p><strong>Note:</strong> Backup codes can help you regain access if you lose your phone.</p>
  `
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
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
}

// Navigation
function setupNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
      if (navMenu) {
        navMenu.classList.remove('active');
      }
    });
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = section.offsetTop - navbarHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// News Ticker
function setupNewsTicker() {
  const ticker = document.getElementById('newsTicker');
  if (ticker) {
    ticker.textContent = appData.newsAlerts.join(' • ');
  }
}

// Crime Cards
function setupCrimeCards() {
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
    
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
    
    container.appendChild(card);
  });
}

// Tabs functionality
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
  
  // Setup laws grid
  setupLawsGrid();
}

function setupLawsGrid() {
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

// Laws Table
function setupLawsTable() {
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

// Search functionality
function setupSearchFunctionality() {
  const searchInput = document.getElementById('lawSearch');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('#lawsTableBody tr');
    
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// Password Strength Checker
function setupPasswordChecker() {
  const passwordInput = document.getElementById('passwordInput');
  const strengthDiv = document.getElementById('passwordStrength');
  const tipsDiv = document.getElementById('passwordTips');
  
  if (!passwordInput || !strengthDiv || !tipsDiv) return;
  
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const result = checkPasswordStrength(password);
    
    strengthDiv.className = `password-strength ${result.level}`;
    strengthDiv.textContent = result.message;
    tipsDiv.innerHTML = result.tips.length > 0 ? 
      `<strong>Suggestions:</strong><br>${result.tips.join('<br>')}` : '';
  });
}

function checkPasswordStrength(password) {
  let score = 0;
  const tips = [];
  
  if (password.length === 0) {
    return { level: '', message: '', tips: [] };
  }
  
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
  
  if (!/(.)\1{2,}/.test(password)) score++;
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

// 2FA Setup Guide
function setup2FAGuide() {
  const platformBtns = document.querySelectorAll('.platform-btn');
  const instructionsDiv = document.getElementById('platformInstructions');
  
  if (!instructionsDiv) return;
  
  platformBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const platform = this.getAttribute('data-platform');
      
      // Remove active class from all buttons
      platformBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show instructions
      if (platformInstructions[platform]) {
        instructionsDiv.innerHTML = platformInstructions[platform];
      }
    });
  });
}

// Reporting Checklist
function setupReportingChecklist() {
  const container = document.getElementById('reportingChecklist');
  if (!container) return;
  
  appData.reportingChecklist.forEach(item => {
    const label = document.createElement('label');
    label.className = 'checklist-item';
    label.innerHTML = `
      <input type="checkbox" class="checklist-checkbox">
      <span class="checkmark"></span>
      <span>${item}</span>
    `;
    container.appendChild(label);
  });
}

// Learning Modules
function setupLearningModules() {
  const moduleButtons = document.querySelectorAll('.module-btn');
  
  moduleButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const level = this.getAttribute('data-level');
      const progressBar = this.parentElement.querySelector('.progress-fill');
      
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
          clearInterval(interval);
          this.textContent = 'Completed';
          this.classList.add('btn--secondary');
          this.classList.remove('btn--primary');
        }
      }, 200);
      
      this.textContent = 'Loading...';
      this.disabled = true;
    });
  });
}

// Threat List
function setupThreatList() {
  const container = document.getElementById('threatList');
  if (!container) return;
  
  appData.newsAlerts.forEach(alert => {
    const item = document.createElement('div');
    item.className = 'threat-item';
    item.textContent = alert;
    container.appendChild(item);
  });
}

// Quiz Functions
function setupQuiz() {
  // Initialize quiz with extended questions
  const extendedQuestions = [
    ...appData.quizQuestions,
    {
      question: "What is the safest way to connect to public Wi-Fi?",
      options: ["Connect directly", "Use a VPN", "Share your hotspot", "Use mobile data only"],
      correct: 1,
      explanation: "A VPN encrypts your connection, protecting your data on public networks."
    },
    {
      question: "Which of these is a sign of a phishing email?",
      options: ["Proper grammar", "Urgent action required", "Expected sender", "Relevant content"],
      correct: 1,
      explanation: "Phishing emails often create false urgency to make you act without thinking."
    },
    {
      question: "What should you do before downloading an app?",
      options: ["Check reviews and permissions", "Download immediately", "Share with friends first", "Ignore the source"],
      correct: 0,
      explanation: "Always verify app legitimacy and check what permissions it requests."
    },
    {
      question: "How often should you backup your important data?",
      options: ["Never", "Once a year", "Regularly (weekly/monthly)", "Only when reminded"],
      correct: 2,
      explanation: "Regular backups ensure you can recover from ransomware or hardware failure."
    },
    {
      question: "What is social engineering in cybersecurity?",
      options: ["Building social networks", "Manipulating people to reveal information", "Creating social media accounts", "Engineering social apps"],
      correct: 1,
      explanation: "Social engineering exploits human psychology rather than technical vulnerabilities."
    },
    {
      question: "Which is the most secure payment method online?",
      options: ["Debit card", "Credit card with 2FA", "Bank transfer", "Cash on delivery"],
      correct: 1,
      explanation: "Credit cards with two-factor authentication provide multiple layers of security."
    },
    {
      question: "What should you do if your account gets hacked?",
      options: ["Ignore it", "Change password immediately", "Delete the account", "Wait and see"],
      correct: 1,
      explanation: "Immediately change passwords and enable additional security measures."
    }
  ];
  
  appData.quizQuestions = extendedQuestions;
  const totalQuestionsEl = document.getElementById('totalQuestions');
  if (totalQuestionsEl) {
    totalQuestionsEl.textContent = extendedQuestions.length;
  }
}

function openQuiz() {
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.classList.remove('hidden');
    resetQuiz();
    displayQuestion();
  }
}

function closeQuiz() {
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.classList.add('hidden');
  }
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
  
  // Update navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn) {
    prevBtn.style.display = currentQuizQuestion === 0 ? 'none' : 'block';
  }
  if (nextBtn) {
    nextBtn.textContent = currentQuizQuestion === appData.quizQuestions.length - 1 ? 'Finish Quiz' : 'Next';
    nextBtn.disabled = userAnswers[currentQuizQuestion] === undefined;
  }
}

function selectOption(index, element) {
  // Remove previous selections
  document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
  
  // Mark current selection
  element.classList.add('selected');
  userAnswers[currentQuizQuestion] = index;
  
  // Enable next button
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.disabled = false;
  }
}

function nextQuestion() {
  if (currentQuizQuestion < appData.quizQuestions.length - 1) {
    currentQuizQuestion++;
    displayQuestion();
  } else {
    finishQuiz();
  }
}

function previousQuestion() {
  if (currentQuizQuestion > 0) {
    currentQuizQuestion--;
    displayQuestion();
  }
}

function finishQuiz() {
  // Calculate score
  quizScore = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === appData.quizQuestions[index].correct) {
      quizScore++;
    }
  });
  
  // Show results
  const quizContainer = document.getElementById('quizContainer');
  const quizResult = document.getElementById('quizResult');
  
  if (quizContainer) quizContainer.classList.add('hidden');
  if (quizResult) quizResult.classList.remove('hidden');
  
  const percentage = Math.round((quizScore / appData.quizQuestions.length) * 100);
  const finalScoreEl = document.getElementById('finalScore');
  if (finalScoreEl) {
    finalScoreEl.textContent = `${quizScore}/${appData.quizQuestions.length} (${percentage}%)`;
  }
  
  // Show recommendations
  const recommendations = getRecommendations(percentage);
  const recommendationsEl = document.getElementById('recommendations');
  if (recommendationsEl) {
    recommendationsEl.innerHTML = recommendations;
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

function restartQuiz() {
  resetQuiz();
  displayQuestion();
}

// Utility Functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeQuiz();
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
});

// Form validation helpers
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// Initialize tooltips
function initializeTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
}

function showTooltip(e) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = e.target.getAttribute('data-tooltip');
  document.body.appendChild(tooltip);
  
  const rect = e.target.getBoundingClientRect();
  tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    tooltip.remove();
  }
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('Application error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
  const loadTime = performance.now();
  console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    checkPasswordStrength,
    validateEmail,
    formatDate,
    validateForm
  };
}
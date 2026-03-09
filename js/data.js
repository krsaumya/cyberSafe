// ============================================================
// data.js — Static application data & constants
// ============================================================

export const appData = {
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
    },
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
  ],

  videoData: {
    beginner: {
      videoId: "inWWhr5tnEA",
      title: "Cybersecurity Basics for Beginners",
      description: "Learn fundamental cybersecurity concepts and practices"
    },
    intermediate: {
      videoId: "Dk-ZqQ-bfy4",
      title: "How to Detect Cyber Threats",
      description: "Advanced techniques for identifying potential security threats"
    },
    advanced: {
      videoId: "s19BxFpoSd0",
      title: "Advanced Cybersecurity Techniques",
      description: "Master-level cybersecurity practices and methodologies"
    }
  },

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

// Platform 2FA instructions
export const platformInstructions = {
  whatsapp: `
#### Enable 2FA on WhatsApp:

2. Open WhatsApp and go to Settings
4. Tap on Account → Two-step verification
6. Tap Enable and create a 6-digit PIN
8. Add an email address for account recovery
10. Confirm your email address

**Important:** Keep your PIN and email safe. You'll need them to access your account.
  `,
  gmail: `
#### Enable 2FA on Gmail:

2. Go to your Google Account settings
4. Select Security → 2-Step Verification
6. Click "Get Started" and sign in
8. Add your phone number
10. Choose to receive codes via SMS or voice call
12. Enter the verification code sent to your phone

**Tip:** Use the Google Authenticator app for better security.
  `,
  instagram: `
#### Enable 2FA on Instagram:

2. Go to your profile and tap the menu (≡)
4. Tap Settings → Security → Two-Factor Authentication
6. Tap "Get Started"
8. Choose Text Message or Authentication App
10. Follow the prompts to set up your preferred method
12. Save your backup codes in a safe place

**Note:** Backup codes can help you regain access if you lose your phone.
  `
};

// LocalStorage key constants
export const STORAGE_KEYS = {
  PROGRESS: 'cybersafe_progress',
  COMPLETED_MODULES: 'cybersafe_completed_modules',
  VIDEOS_WATCHED: 'cybersafe_videos_watched',
  LEARNING_TIME: 'cybersafe_learning_time',
  LAST_UPDATED: 'cybersafe_last_updated'
};

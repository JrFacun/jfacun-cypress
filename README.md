# 🚀 Cypress Test Execution Guide – 2025  
### Centralized Cypress Test Execution for Parabank and SauceDemo

---

## 📂 Table of Contents  
- [📥 Prerequisites](#️prerequisites)  
- [📥 Installation of Cypress](#installation-of-cypress)  
- [🏃 Running the Tests](#running-the-tests)  
  - [🧠 Headless Mode](#headless-mode)  
  - [🖥️ Headed Mode](#headed-mode)  
- [🧪 Features](#features)

---

## 📥 Prerequisites

Before installing Cypress, make sure the following tools are installed:

### 🟩 Install Node.js and npm

> Node.js comes with npm (Node Package Manager)

1. Visit the official Node.js website:  
   👉 https://nodejs.org/

2. Download the **LTS version** for your operating system.

3. Follow the installation steps.

4. Verify installation:
```bash
node -v
npm -v


🛠️ Install Git
Visit the official Git website:
👉 https://git-scm.com/

Download and install Git for your OS.

Verify installation:

bash
Copy
Edit
git --version

------

## 📥 Installation of Cypress

Follow these steps to get Cypress up and running:

### 1. 📦 Initialize a new Node.js project (if not already done)
```bash
npm init -y
```

### 2. 🧪 Install Cypress via NPM
```bash
npm install cypress --save-dev
```

### 3. 📂 Open Cypress for the first time
This will generate the Cypress folder structure (e.g., `/cypress/e2e`)
```bash
npx cypress open
```
---

## 🏃 Running the Tests

### 🧠 Headless Mode

These commands will run Cypress tests in headless mode using the CLI:

# Sauce Demo Login
npm run saucedemo-suite-headless

# Parabank Register
npm run parabank-register-headless

# Parabank Open Account
npm run parabank-open-account-headless

# Parabank Update Contact
npm run parabank-update-contact-headless

# Parabank Bill Payment
npm run parabank-bill-pay-headless

# Parabank Transfer Fund
npm run parabank-transfer-headless

# Parabank Request Loan
npm run parabank-request-loan-headless

# Parabank Find Transaction
npm run parabank-find-transaction-headless

# Parabank Account Overview
npm run parabank-account-overview-headless

# Pet Swagger API
npm run userAPI-headless



### 🖥️ Headed Mode

These commands will run Cypress tests in Chrome browser with GUI:

# Sauce Demo Login (headed mode)
npm run saucedemo-suite-headed

# Parabank Register (headed mode)
npm run parabank-register-headed

# Parabank Open Account (headed mode)
npm run parabank-open-account-headed

# Parabank Update Contact (headed mode)
npm run parabank-update-contact-headed

# Parabank Bill Payment (headed mode)
npm run parabank-bill-pay-headed

# Parabank Transfer Fund (headed mode)
npm run parabank-transfer-headed

# Parabank Request Loan (headed mode)
npm run parabank-request-loan-headed

# Parabank Find Transaction (headed mode)
npm run parabank-find-transaction-headed

# Parabank Account Overview (headed mode)
npm run parabank-account-overview-headed

# Pet Swagger API (headed mode)
npm run userAPI-headed


---

## 🧪 Features

### 🏦 Parabank Functional Tests:
- ✅ Account Overview  
- ✅ Bill Payment  
- ✅ Find Transaction  
- ✅ Logout  
- ✅ Open New Account  
- ✅ Register  
- ✅ Request Loan  
- ✅ Transfer Funds  
- ✅ Update Contact Info  

### 🧪 SauceDemo Functional Tests:
- ✅ Login (Successful & Unsuccessful)

---

📌 *For any issues encountered during test execution, feel free to file an issue or reach out via project collaboration channels.*
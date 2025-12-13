# 🔒 Verification Bot

A Discord bot built with [discord.js v14](https://discord.js.org/) that provides a **verification system** for new members.  
Users can click a button or run a command to verify themselves and automatically receive a role.

---

## ✨ Features
- `/verify setup` → Post a verification panel in a chosen channel.
- Button-based verification → Users click **Verify Me** to get the verified role.
- Auto-remove unverified role once verified.
- `/help` → Show all available commands.
- `/ping` → Quick connectivity check.
- `/stats` → Basic bot statistics.
- `/autojoin setup` → Auto-assign a role when users join.
- `/autojoin off` → Disable auto-assign.

---

## 📦 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/agent-nau/diskord-bot-101.git
   cd diskord-bot-101
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```env
   TOKEN=your_discord_bot_token
   CLIENT_ID=your_application_client_id
   ```

---

## 🚀 Usage

Start the bot:
```bash
npm start
```

For development (auto-restart on file changes):
```bash
npm run dev
```

---

## ⚙️ Configuration

- **Verified Role** → Role assigned when a user successfully verifies.
- **Unverified Role** → Role removed when a user verifies.
- **Verification Channel** → Channel where the verification panel is posted.

---

## 📂 Project Structure

```
verification-bot/
├── index.js          # Main bot entry point
├── keep-alive.js     # Optional uptime helper
├── package.json      # Project metadata & dependencies
├── package-lock.json # Dependency lock file
└── README.md         # Documentation
```

---

## 🛡️ License

```
MIT License

Copyright (c) 2025 Meg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

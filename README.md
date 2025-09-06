# Proof of Focus - Web3 Focus Training App

A gamified Web3 application built on Base L2 that helps users break free from dopamine addiction and improve focus through blockchain-verified focus sessions.

## 🎯 Overview

Proof of Focus combines the Pomodoro technique with Web3 technology to create verifiable proof of focus sessions. Users complete 50-minute focus sessions, earn evolving NFT badges, and build sustainable focus habits.

## ✨ Features

### Core Functionality
- **50-minute Focus Timer**: Pomodoro-style focus sessions with pause/resume
- **Blockchain Verification**: Each completed session creates a signed attestation
- **Progressive Badge System**: 7-level NFT badges that evolve based on completed sessions
- **Session Tracking**: Daily, weekly, and monthly progress statistics
- **Monthly Reflection**: Self-assessment and goal setting for continuous improvement

### Web3 Integration
- **Base L2 Network**: Built on Base Sepolia for fast, low-cost transactions
- **MetaMask Integration**: Seamless wallet connection
- **ERC-1155 NFT Badges**: Collectible badges representing focus achievements
- **Attestation System**: Cryptographic proof of focus sessions

### Badge Progression System
1. **Rookie** (1 session) - Your first focus session
2. **Streak Starter** (7 sessions) - Building consistency
3. **Lightning Focus** (14 sessions) - Developing momentum
4. **Diamond Mind** (21 sessions) - Achieving clarity
5. **Focus Master** (35 sessions) - Mastering concentration
6. **Zen Warrior** (50 sessions) - Reaching flow state
7. **Ultimate Focus** (100 sessions) - Peak performance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MetaMask browser extension
- Base Sepolia testnet ETH (from [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet))

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd proof-of-focus
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your environment variables:
\`\`\`
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=9b66d6253bd0d2268342a2840ab892d9
NEXT_PUBLIC_CONTRACT_ADDRESS=0xcb633D4936358aA8C3B16E66Ce78e7092DE373A9
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Web3**: Direct RPC integration, MetaMask
- **Blockchain**: Base L2 (Sepolia testnet)
- **NFTs**: ERC-1155 standard via thirdweb
- **Storage**: Local storage for session data

## 📱 Mobile Support

The app is designed mobile-first with PWA capabilities:
- Responsive design optimized for smartphones
- Touch-friendly interface
- Offline session tracking
- App-like experience

## 🎮 How to Use

1. **Connect Wallet**: Click "Connect Wallet" and connect your MetaMask
2. **Start Focus Session**: Click the play button to begin a 50-minute focus session
3. **Complete Session**: Stay focused until the timer completes
4. **Earn Badges**: Receive NFT badges based on your session count
5. **Track Progress**: View your statistics and monthly progress
6. **Monthly Reflection**: Set goals and reflect on your focus journey

## 🏗 Architecture

### Smart Contracts
- **FocusBadges.sol**: ERC-1155 contract for progressive badge system
- **Deployed on**: Base Sepolia testnet
- **Contract Address**: `0xcb633D4936358aA8C3B16E66Ce78e7092DE373A9`

### Key Components
- **Focus Timer**: Core pomodoro functionality with blockchain integration
- **Badge Collection**: NFT badge display and minting interface
- **Progress Tracking**: Statistics and calendar views
- **Profile Management**: Wallet connection and user settings

## 🔮 Future Enhancements

- **Farcaster Integration**: Share progress and compete with friends
- **Global Leaderboards**: Worldwide focus session rankings
- **Advanced Analytics**: Detailed focus pattern analysis
- **Team Challenges**: Collaborative focus sessions
- **Habit Stacking**: Integration with other productivity tools

## 🤝 Contributing

This project was built for a hackathon. Contributions and feedback are welcome!

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built on Base L2 for fast, affordable transactions
- Powered by thirdweb for NFT functionality
- Inspired by the Pomodoro Technique for focus training
- Designed to combat digital distractions and dopamine addiction

---

**Built with ❤️ for the Base ecosystem hackathon**
\`\`\`

\`\`\`json file="" isHidden

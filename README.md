
# ⚡ FreshRush: Agritech Supply-Chain Urgency System

FreshRush is a real-time produce decay monitoring and buyer matching platform designed for farmers to mitigate losses from buyer cancellations.

## 🚀 Key Features
- **Live Decay Countdown**: Real-time HH:MM:SS timer for every item.
- **Priority Pulse Stack**: Automatically floats items nearing decay to the top with visual urgency cues.
- **Smart Buyer Discovery**: 50km radius matching with price and distance sorting.
- **Intervention Alerts**: Critical notifications at 48h, 24h, 6h, and 1h milestones.
- **Farmer Command Center**: A sleek, glassmorphism-based dashboard for high-stakes decision making.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Lucide React
- **Animations**: Framer Motion
- **Styling**: Vanilla CSS (Modern CSS variables + Glassmorphism)
- **Time Logic**: date-fns

## 🏗️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Clone the repository
2. Run `npm install`
3. Start the dev server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure
- `src/components`: Modular UI blocks.
- `src/data/mockData.js`: Centralized mock store for demo logic.
- `src/hooks/useCountdown.js`: Core urgency engine.
- `src/App.jsx`: Main dashboard logic & layout.
- `src/index.css`: Global design system and tokens.

## 🔗 Backend Integration Guide
The codebase contains marked sections for backend integration:
1. **Produce Fetching**: Replace `MOCK_PRODUCE` in `App.jsx` with an API call to `/api/produce`.
2. **Buyer Matching**: The matching logic in the right panel should be replaced with a POST call to `/api/match` passing `product_id`.
3. **Geo-Location**: Use browser Geolocation API to pass coordinates to the radius filter.
4. **WebSockets**: Integrate Socket.io for real-time buyer bids and status updates.

---
*Built for the Future of Sustainable Agriculture.*

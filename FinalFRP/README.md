# 🚛 FuelRoute-Pro

**FuelRoute-Pro** is a smart fuel transportation cost estimator that calculates route-based costs across truck, rail, ship, and pipeline modes. It intelligently evaluates distances, commodity weights, and transit times to give users actionable insights into fuel logistics.

---

## 🔍 What It Does

- 🚚 Calculate transport cost per tonne–mile
- 🌐 Support global routes using geo-coordinates
- 📊 Estimate transit duration based on real-world constraints
- 🤖 Integrate with AI models via Ollama for deeper insights
- ⚙️ Compare routes and optimize decision-making
- 🎯 Choose lowest cost or shortest distance preference

## 🚀 Getting Started

1. In both the `backend` and `frontend` directories run `npm install` to install
   dependencies.
2. From the `backend` directory execute `node scripts/setup.js` to walk through
   creating the `.env` file.
3. Populate `.env` with required keys such as `OPENAI_API_KEY` and
   `GOOGLE_MAPS_API_KEY`.
4. The `.env` file lives inside `backend/` and should not be committed to the
   repository.

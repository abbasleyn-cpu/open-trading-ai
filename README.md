# Open Trading AI 2.0

Free, browser-first day-trading research assistant.

## Included
- Live public Binance candle data (REST history + WebSocket updates)
- Live public GDELT news feed
- Browser-side FinBERT financial sentiment via Transformers.js
- Local WebGPU LLM via WebLLM (Llama 3.2 1B Instruct)
- EMA 9 / EMA 21, RSI 14, volume context
- Risk calculator and rules-based setup guidance
- BUY / SELL / WAIT analysis only
- No exchange account connection
- No order placement or trade execution

## Important
Signals are research/educational output, not guarantees or personalized financial advice. Market data and news feeds can fail, be delayed, or be incomplete.

## Run
```bash
npm install
npm run dev
```

## Vercel
This is a static Vite app. Vercel can deploy it without a server-side trading backend.

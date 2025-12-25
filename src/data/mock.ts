export const marketSymbols = [
  { symbol: "EURUSD", price: 1.0862, change: 0.12, category: "Forex" },
  { symbol: "USDJPY", price: 149.32, change: -0.05, category: "Forex" },
  { symbol: "XAUUSD", price: 2031.5, change: 0.3, category: "Metals" },
  { symbol: "XAGUSD", price: 24.13, change: -0.22, category: "Metals" },
  { symbol: "US30", price: 38211, change: 0.45, category: "Indices" },
  { symbol: "NAS100", price: 17120, change: -0.12, category: "Indices" },
  { symbol: "UKOIL", price: 73.2, change: 0.8, category: "CFDs" },
  { symbol: "BTCUSD", price: 42880, change: 1.25, category: "CFDs" }
];

export const newsFeed = [
  { id: "n1", title: "USD steady ahead of Fed guidance", time: "09:30" },
  { id: "n2", title: "Gold holds range on rate outlook", time: "10:15" },
  { id: "n3", title: "Oil jumps on supply news", time: "11:20" }
];

export const economicCalendar = [
  { id: "c1", event: "US CPI", time: "14:30", impact: "High" },
  { id: "c2", event: "EU PMI", time: "16:00", impact: "Medium" },
  { id: "c3", event: "JP BoJ Speech", time: "18:00", impact: "High" }
];

export const missions = [
  { id: "m1", title: "Complete KYC", progress: 0 },
  { id: "m2", title: "Open Trading Account", progress: 0 },
  { id: "m3", title: "First Deposit", progress: 0 },
  { id: "m4", title: "First Trade", progress: 0 },
  { id: "m5", title: "Enable Price Alert", progress: 0 }
];

export const rewardsCatalog = [
  { id: "r1", title: "Cashback Voucher", cost: 120 },
  { id: "r2", title: "VIP Support Pass", cost: 220 },
  { id: "r3", title: "Education Bundle", cost: 80 }
];

export const faqItems = [
  { id: "f1", q: "How long does KYC take?", a: "Typically 1-2 business days." },
  { id: "f2", q: "Where is my deposit?", a: "Check Wallet > Transactions for status." },
  { id: "f3", q: "How do I close a trade?", a: "Go to Trade and tap Close on a position." }
];

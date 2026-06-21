// ===== NOVA B2B - Currency Converter =====

const currencies = {
  USD: { symbol: "$", flag: "🇺🇸", rate: 1 },
  PKR: { symbol: "₨", flag: "🇵🇰", rate: 278 },
  EUR: { symbol: "€", flag: "🇪🇺", rate: 0.92 },
  AED: { symbol: "د.إ", flag: "🇦🇪", rate: 3.67 },
  GBP: { symbol: "£", flag: "🇬🇧", rate: 0.79 },
  CNY: { symbol: "¥", flag: "🇨🇳", rate: 7.24 },
};

let selectedCurrency = "USD";

// ===== INJECT CONVERTER BAR =====
const converterHTML = `
<div id="currency-bar">
  <span id="currency-label">🌍 Currency:</span>
  <div id="currency-buttons">
    ${Object.entries(currencies).map(([code, c]) => `
      <button class="cur-btn ${code === 'USD' ? 'active' : ''}" onclick="changeCurrency('${code}')">
        ${c.flag} ${code}
      </button>
    `).join('')}
  </div>
</div>

<style>
#currency-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  background: rgba(20, 25, 45, 0.7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 10px 32px;
  position: sticky;
  top: 110px;
  z-index: 90;
}
#currency-label {
  font-size: 13px;
  color: #aaa;
  white-space: nowrap;
}
#currency-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.cur-btn {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 40px;
  padding: 5px 14px;
  color: #ccc;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;
  font-family: inherit;
}
.cur-btn:hover {
  border-color: #a855f7;
  color: white;
}
.cur-btn.active {
  background: linear-gradient(95deg, #f97316, #a855f7);
  border-color: transparent;
  color: white;
  font-weight: 600;
}
</style>
`;

// Insert after header
const header = document.querySelector('header');
if (header) {
  header.insertAdjacentHTML('afterend', converterHTML);
}

// ===== CHANGE CURRENCY =====
function changeCurrency(code) {
  selectedCurrency = code;

  // Update active button
  document.querySelectorAll('.cur-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Update all prices on page
  updateAllPrices();
}

// ===== CONVERT PRICE =====
function convertPrice(usdString) {
  // Extract first number from price string like "$12.50 - $18.90"
  const numbers = usdString.replace(/[^0-9.\\-]/g, ' ').trim().split(/\s+/).filter(n => n && n !== '-');
  const cur = currencies[selectedCurrency];

  if (numbers.length >= 2) {
    const low = (parseFloat(numbers[0]) * cur.rate).toFixed(2);
    const high = (parseFloat(numbers[1]) * cur.rate).toFixed(2);
    return `${cur.symbol}${low} - ${cur.symbol}${high}`;
  } else if (numbers.length === 1) {
    const val = (parseFloat(numbers[0]) * cur.rate).toFixed(2);
    return `${cur.symbol}${val}`;
  }
  return usdString;
}

// ===== UPDATE ALL PRICES ON PAGE =====
function updateAllPrices() {
  document.querySelectorAll('.price-b2b, .price').forEach(el => {
    const original = el.getAttribute('data-usd') || el.textContent;
    if (!el.getAttribute('data-usd')) {
      el.setAttribute('data-usd', original);
    }
    el.textContent = convertPrice(el.getAttribute('data-usd'));
  });
}

// Run on load to set data-usd attributes
setTimeout(updateAllPrices, 500);

// Also run whenever new products are rendered (for dynamic grids)
const observer = new MutationObserver(() => {
  updateAllPrices();
});
const grids = document.querySelectorAll('#productGrid, #featuredGrid');
grids.forEach(g => {
  if (g) observer.observe(g, { childList: true });
});

// ===== NOVA B2B - AI Chatbot =====

const chatbotHTML = `
<div id="nova-chatbot">
  <div id="chat-toggle-wrap">
    <span id="nova-label">✨ Nova Assistant</span>
    <button id="chat-toggle" onclick="toggleChat()">
      <span class="nova-star">⭐</span>
      <span class="nova-star">✦</span>
      <span class="nova-star">★</span>
    </button>
  </div>

  <div id="chat-window">
    <div id="chat-header">
      <div id="chat-title">
        <span>⚡</span>
        <div>
          <div style="font-weight:700; font-size:15px;">NOVA Assistant</div>
          <div style="font-size:11px; color:#a855f7;">● Online</div>
        </div>
      </div>
      <button onclick="toggleChat()" id="chat-close">✕</button>
    </div>

    <div id="chat-messages">
      <div class="msg bot-msg">
        👋 Hi! I'm your NOVA B2B Assistant.<br><br>
        Ask me anything like:<br>
        • <em>"Find me bulk headphones"</em><br>
        • <em>"Cheapest products?"</em><br>
        • <em>"What suppliers do you have?"</em>
      </div>
    </div>

    <div id="chat-input-area">
      <input type="text" id="chat-input" placeholder="Ask about products..." />
      <button onclick="sendMessage()" id="chat-send">➤</button>
    </div>
  </div>
</div>

<style>
#nova-chatbot {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
  font-family: 'Poppins', system-ui, sans-serif;
}
#chat-toggle-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
#nova-label {
  background: linear-gradient(95deg, #f97316, #a855f7);
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  white-space: nowrap;
  animation: labelBlink 2s infinite alternate;
  box-shadow: 0 2px 10px rgba(168,85,247,0.4);
}
@keyframes labelBlink {
  0% { opacity: 1; }
  100% { opacity: 0.6; }
}

/* Pulse ring */
#chat-toggle::before {
  content: '';
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid rgba(168,85,247,0.6);
  animation: pulseRing 1.8s ease-out infinite;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@keyframes pulseRing {
  0% { transform: translate(-50%, -50%) scale(0.9); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

#chat-toggle {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #6d28d9, #1e1b4b);
  border: 2px solid rgba(168,85,247,0.5);
  cursor: pointer;
  font-size: 14px;
  position: relative;
  box-shadow: 0 0 20px rgba(168,85,247,0.6), 0 0 40px rgba(249,115,22,0.2);
  animation: bounce 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate, shake 5s ease-in-out infinite;
  overflow: visible;
}

/* Cosmic face */
#chat-toggle::after {
  content: '🌟';
  position: absolute;
  font-size: 28px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Stars orbiting */
.nova-star {
  position: absolute;
  font-size: 8px;
  animation: orbit linear infinite;
  pointer-events: none;
}
.nova-star:nth-child(1) { animation-duration: 3s; top: -4px; left: 50%; }
.nova-star:nth-child(2) { animation-duration: 4s; top: 50%; right: -4px; animation-delay: -1s; }
.nova-star:nth-child(3) { animation-duration: 5s; bottom: -4px; left: 30%; animation-delay: -2s; }

@keyframes orbit {
  0% { transform: rotate(0deg) translateX(36px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(36px) rotate(-360deg); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes glow {
  0% { box-shadow: 0 0 15px rgba(168,85,247,0.6), 0 0 30px rgba(249,115,22,0.2); }
  100% { box-shadow: 0 0 25px rgba(168,85,247,0.9), 0 0 50px rgba(249,115,22,0.5); }
}
@keyframes shake {
  0%, 85%, 100% { transform: translateY(0) rotate(0deg); }
  88% { transform: translateY(0) rotate(-8deg); }
  91% { transform: translateY(0) rotate(8deg); }
  94% { transform: translateY(0) rotate(-5deg); }
  97% { transform: translateY(0) rotate(5deg); }
}
#chat-window {
  display: none;
  flex-direction: column;
  position: absolute;
  bottom: 74px;
  right: 0;
  width: 320px;
  height: 440px;
  background: rgba(10, 15, 30, 0.97);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(168,85,247,0.3);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.6);
}
#chat-window.open { display: flex; }
#chat-header {
  background: linear-gradient(95deg, rgba(249,115,22,0.2), rgba(168,85,247,0.2));
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
#chat-title { display: flex; align-items: center; gap: 10px; font-size: 22px; }
#chat-close { background: none; border: none; color: #aaa; font-size: 18px; cursor: pointer; }
#chat-close:hover { color: #fff; }
#chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scrollbar-width: thin;
  scrollbar-color: #a855f7 transparent;
}
.msg {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 13px;
  line-height: 1.5;
}
.bot-msg {
  background: rgba(168,85,247,0.15);
  border: 1px solid rgba(168,85,247,0.2);
  color: #e2e8f0;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}
.user-msg {
  background: linear-gradient(95deg, #f97316, #a855f7);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}
.typing-msg {
  background: rgba(168,85,247,0.1);
  border: 1px solid rgba(168,85,247,0.15);
  color: #888;
  align-self: flex-start;
  font-style: italic;
  font-size: 12px;
}
#chat-input-area {
  display: flex;
  padding: 12px;
  gap: 8px;
  border-top: 1px solid rgba(255,255,255,0.08);
  background: rgba(0,0,0,0.2);
}
#chat-input {
  flex: 1;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 40px;
  padding: 10px 16px;
  color: white;
  font-size: 13px;
  outline: none;
}
#chat-input:focus { border-color: #a855f7; }
#chat-send {
  background: linear-gradient(135deg, #f97316, #a855f7);
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
#chat-send:hover { opacity: 0.85; }
</style>
`;

document.body.insertAdjacentHTML('beforeend', chatbotHTML);

document.getElementById('chat-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function toggleChat() {
  const win = document.getElementById('chat-window');
  win.classList.toggle('open');
}

function addMessage(text, type) {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `msg ${type}`;
  div.innerHTML = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user-msg');
  input.value = '';
  const typing = addMessage('⚡ Typing...', 'typing-msg');
  setTimeout(() => {
    typing.remove();
    addMessage(getResponse(text.toLowerCase()), 'bot-msg');
  }, 800);
}

// ===== SMART RESPONSES =====
function getResponse(msg) {

  // Greetings
  if (match(msg, ['hi','hello','hey','salam','assalam','hii','helo'])) return "👋 Hello! Welcome to NOVA B2B! How can I help you today? You can ask me about products, pricing, suppliers, or shipping!";
  if (match(msg, ['how are you','how r u','kaisa','kaise'])) return "⚡ I'm doing great and ready to help you find the best B2B deals! What are you looking for today?";
  if (match(msg, ['good morning','good evening','good night','good afternoon'])) return "😊 Good day! Welcome to NOVA B2B — your global trade partner. How can I assist you?";
  if (match(msg, ['who are you','what are you','aap kaun','tell me about yourself'])) return "⚡ I'm NOVA Assistant — your smart B2B buying guide! I can help you find products, compare prices, check suppliers, and answer any trade questions.";
  if (match(msg, ['bye','goodbye','tata','khuda hafiz','alvida'])) return "👋 Goodbye! Thank you for visiting NOVA B2B. Come back anytime for the best bulk deals!";
  if (match(msg, ['thank','thanks','shukriya','jazakallah'])) return "😊 You're welcome! Happy to help. Is there anything else you need?";
  if (match(msg, ['ok','okay','alright','got it','theek','acha'])) return "👍 Great! Let me know if you need help with anything else!";
  if (match(msg, ['help','madad','support'])) return "🤝 I'm here to help! You can ask me about:\n• 📦 Products & pricing\n• 🏭 Suppliers\n• 🚚 Shipping & delivery\n• 📋 MOQ (Minimum Order Quantity)\n• 💰 Bulk discounts";

  // Headphones
  if (match(msg, ['headphone','headphones','earphone','audio','heaphone'])) return "🎧 We have <strong>Wireless Headphones</strong> by Shenzhen Audio!\n\n💰 Price: $12.50/pc\n📦 MOQ: 100 pcs\n✅ OEM available\n🛡️ 2 year warranty\n\nClick any product card to view full details!";

  // Smart Watch
  if (match(msg, ['watch','smart watch','smartwatch','ghadi'])) return "⌚ We have <strong>Smart Watch</strong> by Guangdong Tech!\n\n💰 Price: $18.90/pc\n📦 MOQ: 50 pcs\n✅ Latest features, bulk discounts available!";

  // T-Shirt
  if (match(msg, ['shirt','tshirt','t-shirt','cotton','apparel','clothes','kapray','clothing'])) return "👕 We have <strong>Cotton T-Shirts</strong> by Ningbo Textile!\n\n💰 Price: $3.20/pc\n📦 MOQ: 500 pcs\n✅ Custom printing & OEM available!";

  // Mug
  if (match(msg, ['mug','cup','steel mug','stainless','mug'])) return "☕ We have <strong>Stainless Steel Mugs</strong> by Yiwu Home!\n\n💰 Price: $2.50/pc\n📦 MOQ: 200 pcs\n✅ Custom logo printing available!";

  // Lamp
  if (match(msg, ['lamp','light','led','desk lamp','bulb'])) return "💡 We have <strong>LED Desk Lamps</strong> by Zhongshan Lighting!\n\n💰 Price: $6.80/pc\n📦 MOQ: 100 pcs\n✅ Energy saving, modern design!";

  // Backpack
  if (match(msg, ['backpack','bag','bags','baig','back pack'])) return "🎒 We have <strong>Backpacks</strong> by Guangzhou Bags!\n\n💰 Price: $8.90/pc\n📦 MOQ: 80 pcs\n✅ Waterproof, custom colors available!";

  // Speaker
  if (match(msg, ['speaker','speakers','smart speaker','bluetooth speaker','sound'])) return "🔊 We have <strong>Smart Speakers</strong> by Fujian Audio!\n\n💰 Price: $22.50/pc\n📦 MOQ: 60 pcs\n✅ WiFi + Bluetooth, premium sound quality!";

  // Yoga Mat
  if (match(msg, ['yoga','mat','yoga mat','exercise mat','gym'])) return "🧘 We have <strong>Yoga Mats</strong> by Zhejiang Sports!\n\n💰 Price: $4.50/pc\n📦 MOQ: 300 pcs\n✅ Eco-friendly, anti-slip, custom colors!";

  // Electronics
  if (match(msg, ['electronics','electronic','gadget','gadgets','tech'])) return "📱 Our Electronics category includes:\n\n🎧 Wireless Headphones — $12.50\n⌚ Smart Watch — $18.90\n💡 LED Desk Lamp — $6.80\n🔊 Smart Speaker — $22.50\n\nAll with bulk discounts available!";

  // Sports
  if (match(msg, ['sports','sport','fitness','exercise','workout'])) return "⚽ Our Sports category includes:\n\n🧘 Yoga Mat — $4.50/pc (MOQ 300)\n🎒 Backpack — $8.90/pc (MOQ 80)\n\nPerfect for sports retailers!";

  // Home
  if (match(msg, ['home','garden','kitchen','household','ghar'])) return "🏠 Our Home & Garden category includes:\n\n☕ Stainless Mug — $2.50/pc\n💡 LED Desk Lamp — $6.80/pc\n\nGreat for home goods importers!";

  // Cheapest
  if (match(msg, ['cheap','cheapest','lowest price','sasta','budget','affordable','low price','kam price'])) return "💰 Our cheapest products:\n\n1️⃣ Stainless Mug — $2.50/pc\n2️⃣ Cotton T-Shirt — $3.20/pc\n3️⃣ Yoga Mat — $4.50/pc\n4️⃣ LED Desk Lamp — $6.80/pc\n\nAll available in bulk with great discounts!";

  // Most expensive
  if (match(msg, ['expensive','highest','premium','best quality','luxury'])) return "⭐ Our premium products:\n\n1️⃣ Smart Speaker — $22.50/pc\n2️⃣ Smart Watch — $18.90/pc\n3️⃣ Wireless Headphones — $12.50/pc\n\nTop quality, trusted suppliers!";

  // All products
  if (match(msg, ['all products','show all','what do you have','products','all items','kya hai','list'])) return "📦 All NOVA B2B Products:\n\n🎧 Wireless Headphones — $12.50\n⌚ Smart Watch — $18.90\n👕 Cotton T-Shirt — $3.20\n☕ Stainless Mug — $2.50\n💡 LED Desk Lamp — $6.80\n🎒 Backpack — $8.90\n🔊 Smart Speaker — $22.50\n🧘 Yoga Mat — $4.50\n\nVisit our Products page for full details!";

  // Suppliers
  if (match(msg, ['supplier','suppliers','company','companies','manufacturer','brand'])) return "🏭 Our Verified Suppliers:\n\n• Shenzhen Audio — Electronics\n• Guangdong Tech — Wearables\n• Ningbo Textile — Apparel\n• Yiwu Home — Homeware\n• Zhongshan Lighting — Lighting\n• Guangzhou Bags — Bags\n• Fujian Audio — Audio\n• Zhejiang Sports — Sports\n\nAll verified & trusted! ✅";

  // MOQ
  if (match(msg, ['moq','minimum order','minimum','kitna','how many','quantity'])) return "📦 Minimum Order Quantities:\n\n🎧 Headphones — 100 pcs\n⌚ Smart Watch — 50 pcs\n👕 T-Shirt — 500 pcs\n☕ Mug — 200 pcs\n💡 Desk Lamp — 100 pcs\n🎒 Backpack — 80 pcs\n🔊 Speaker — 60 pcs\n🧘 Yoga Mat — 300 pcs";

  // Shipping
  if (match(msg, ['shipping','delivery','deliver','ship','transport','courier','cargo'])) return "✈️ NOVA B2B Shipping Info:\n\n🌍 We ship worldwide\n⏱️ Standard: 15-25 business days\n⚡ Express: 7-10 business days\n📦 DHL, FedEx, Sea Freight available\n\nContact supplier directly for exact shipping quotes!";

  // Payment
  if (match(msg, ['payment','pay','price','cost','kitna','how much','rate','dollar'])) return "💳 Payment Options on NOVA B2B:\n\n✅ Bank Transfer (T/T)\n✅ PayPal\n✅ Letter of Credit (L/C)\n✅ Trade Assurance\n\nAll transactions are secure & protected!";

  // Discount
  if (match(msg, ['discount','offer','sale','deal','bulk','wholesale','reduce'])) return "🎉 Bulk Discount Info:\n\n📦 Order 500+ pcs → 5% off\n📦 Order 1000+ pcs → 10% off\n📦 Order 5000+ pcs → 15% off\n\nContact the supplier directly to negotiate custom pricing!";

  // OEM / Custom
  if (match(msg, ['oem','custom','customize','logo','branding','private label'])) return "🏷️ OEM & Custom Orders:\n\nMost of our suppliers offer:\n✅ Custom logo printing\n✅ Private label packaging\n✅ Custom colors & designs\n✅ Sample orders available\n\nAsk your supplier for OEM options!";

  // Sample
  if (match(msg, ['sample','test','try','demo'])) return "📦 Want to test before bulk ordering?\n\nMost suppliers offer sample orders! Just click <strong>Request Sample</strong> on any product card and the supplier will get back to you within 24 hours. ✅";

  // Quality
  if (match(msg, ['quality','guarantee','warranty','assurance','trusted'])) return "✅ NOVA B2B Quality Promise:\n\n🛡️ All suppliers are verified\n⭐ Ratings & reviews available\n🔍 Quality inspection available\n💯 Trade assurance protection\n\nYour investment is safe with us!";

  // About NOVA
  if (match(msg, ['nova','nova b2b','about','platform','website','what is'])) return "⚡ About NOVA B2B:\n\nNOVA B2B is a global trade platform connecting buyers and suppliers worldwide.\n\n🌍 50+ countries\n🏭 500+ verified suppliers\n📦 10,000+ products\n✅ Secure transactions\n\nYour trusted B2B partner!";

  // Contact
  if (match(msg, ['contact','email','phone','reach','call','whatsapp'])) return "📞 Contact NOVA B2B:\n\n📧 Email: support@novab2b.com\n📱 WhatsApp: +1 234 567 890\n🌐 Website: novab2b.com\n⏰ Available 24/7\n\nWe're here to help!";

  // Pakistan
  if (match(msg, ['pakistan','karachi','lahore','islamabad','pkr'])) return "🇵🇰 NOVA B2B ships to Pakistan!\n\n✅ PKR pricing available (use currency switcher)\n✅ Karachi port delivery available\n✅ Pakistani suppliers also listed\n✅ Urdu support coming soon!\n\nHappy sourcing from Pakistan! 🎉";

  // Default
  return "🤔 I'm not sure about that, but I can help you with:\n\n• 📦 Product search & pricing\n• 🏭 Supplier information\n• 🚚 Shipping & delivery\n• 💰 Bulk discounts\n• 📋 MOQ details\n\nTry asking: <em>'Show me all products'</em> or <em>'What is the cheapest item?'</em>";
}

function match(msg, keywords) {
  return keywords.some(k => msg.includes(k));
            }
    

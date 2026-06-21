const allProducts = [
    { id:1, name:"Wireless Headphones", price:"$12.50", moq:"100 pcs", supplier:"Shenzhen Audio", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" },
    { id:2, name:"Smart Watch", price:"$18.90", moq:"50 pcs", supplier:"Guangdong Tech", img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" },
    { id:3, name:"Cotton T-Shirt", price:"$3.20", moq:"500 pcs", supplier:"Ningbo Textile", img:"https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=300&h=300&fit=crop" },
    { id:4, name:"Stainless Mug", price:"$2.50", moq:"200 pcs", supplier:"Yiwu Home", img:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=300&fit=crop" },
    { id:5, name:"LED Desk Lamp", price:"$6.80", moq:"100 pcs", supplier:"Zhongshan Lighting", img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop" },
    { id:6, name:"Backpack", price:"$8.90", moq:"80 pcs", supplier:"Guangzhou Bags", img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop" },
    { id:7, name:"Smart Speaker", price:"$22.50", moq:"60 pcs", supplier:"Fujian Audio", img:"https://images.unsplash.com/photo-1589003077984-894e133ddfab?w=300&h=300&fit=crop" },
    { id:8, name:"Yoga Mat", price:"$4.50", moq:"300 pcs", supplier:"Zhejiang Sports", img:"https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=300&h=300&fit=crop" }
];

let visible = 6;
const grid = document.getElementById('productGrid');
const featuredGrid = document.getElementById('featuredGrid');
const loadBtn = document.getElementById('loadMoreBtn');

// ===== TOAST (alert ki jagah) =====
function showToast(msg) {
    let toast = document.getElementById('nova-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'nova-toast';
        toast.style.cssText = `
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
            background: linear-gradient(95deg, #f97316, #a855f7);
            color: white; padding: 14px 28px; border-radius: 60px;
            font-weight: bold; z-index: 9999; font-size: 15px;
            box-shadow: 0 4px 24px rgba(249,115,22,0.4);
            opacity: 0; transition: opacity 0.4s;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// ===== RENDER PRODUCTS =====
function renderProducts(container, products) {
    if (!container) return;
    if (products.length === 0) {
        container.innerHTML = '<p style="color:#aaa; padding:20px; grid-column:1/-1;">No products found.</p>';
        return;
    }
    container.innerHTML = products.map(p => `
        <div class="product-card" onclick="window.location.href='product-details.html'" style="cursor:pointer;">
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <h3>${p.name}</h3>
            <div class="supplier-name">🏭 ${p.supplier}</div>
            <div class="price-b2b">${p.price}</div>
            <div class="moq">📦 MOQ: ${p.moq}</div>
            <button class="order-btn" onclick="event.stopPropagation(); window.location.href='order.html'">📋 Order Now</button>
        </div>
    `).join('');
}

if (grid) renderProducts(grid, allProducts.slice(0, visible));
if (featuredGrid) renderProducts(featuredGrid, allProducts.slice(0, 4));

// ===== LOAD MORE =====
if (loadBtn) {
    loadBtn.addEventListener('click', () => {
        visible = allProducts.length;
        renderProducts(grid, allProducts);
        loadBtn.textContent = '✅ All products loaded';
        loadBtn.disabled = true;
    });
}

// ===== SEARCH (actually kaam karta hai) =====
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

function doSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        if (grid) renderProducts(grid, allProducts.slice(0, visible));
        return;
    }
    const results = allProducts.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.supplier.toLowerCase().includes(query)
    );
    if (grid) {
        renderProducts(grid, results);
    } else {
        window.location.href = 'products.html';
    }
}

if (searchBtn) searchBtn.addEventListener('click', doSearch);
if (searchInput) searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });

// ===== PRODUCT DETAIL PAGE =====
const colorSelect = document.getElementById('colorSelect');
const addCart = document.getElementById('addToCartBtn');
if (colorSelect && addCart) {
    colorSelect.addEventListener('change', (e) => showToast(`🎨 Variant selected: ${e.target.value}`));
    addCart.addEventListener('click', () => showToast('✅ Quote request sent to supplier!'));
}

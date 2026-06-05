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

function renderProducts(container, products) {
    if (!container) return;
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div class="supplier-name"> ${p.supplier}</div>
            <div class="price-b2b">${p.price}</div>
            <div class="moq"> MOQ: ${p.moq}</div>
            <button class="order-btn" data-id="${p.id}"> Request sample</button>
        </div>
    `).join('');
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', () => alert(' Inquiry sent to supplier (demo)'));
    });
}

if (grid) renderProducts(grid, allProducts.slice(0, visible));
if (featuredGrid) renderProducts(featuredGrid, allProducts.slice(0, 4));

if (loadBtn) {
    loadBtn.addEventListener('click', () => {
        visible = allProducts.length;
        renderProducts(grid, allProducts);
        loadBtn.style.display = 'none';
    });
}

// search alert
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
if (searchBtn) {
    searchBtn.addEventListener('click', () => alert(` Searching B2B: ${searchInput.value}`));
}

// details page
const colorSelect = document.getElementById('colorSelect');
const addCart = document.getElementById('addToCartBtn');
if (colorSelect && addCart) {
    colorSelect.addEventListener('change', (e) => alert(` Variant: ${e.target.value}`));
    addCart.addEventListener('click', () => alert(' Quote request sent to supplier'));
}
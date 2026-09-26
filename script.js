// Khandwa Central Repository - Database Memory Array
let dataset = [
    { id: 1, ownerName: "Anand Vardhan Shukla", title: "Premium Suite Near Crossing", category: "Home", duration: "1 Day", price: 1200, rentType: "day", loc: "Padawa", houseNo: "Suite 302", contact: "9425011111", landmark: "Near Main Overbridge", bachelors: "Allowed", img: "https://unsplash.com", live: true, status: "Mujeer Certified", txnId: "Preloaded" },
    { id: 2, ownerName: "Gopal Rathore", title: "Modern Luxury Department Flat", category: "Department", duration: "More than 3 Months", price: 14000, rentType: "month", loc: "Gulmohar", houseNo: "Flat F-4, Block B", contact: "9893222222", landmark: "Opposite Public Jogging Park", bachelors: "Families Only", img: "https://unsplash.com", live: true, status: "Verified Safe", txnId: "Preloaded" },
    { id: 3, ownerName: "Syed Imran Ali", title: "Budget Single Room Setup for Boys", category: "Room", duration: "Monthly", price: 3500, rentType: "month", loc: "Rameshwar", houseNo: "Plot 45", contact: "7000133333", landmark: "Behind Career Coaching Hub", bachelors: "Allowed", img: "https://unsplash.com", live: true, status: "Student Choice", txnId: "Preloaded" }
];

let temporaryFormObject = null;

// Dual Tab Component Router
function showView(view) {
    const disc = document.getElementById('portal-discover-view');
    const form = document.getElementById('view-landlord-form');
    const banner = document.getElementById('hero-banner');
    const fBtn = document.getElementById('tab-discover-btn');
    const hBtn = document.getElementById('tab-host-btn');

    if (view === 'find') {
        if(disc) disc.style.display = 'block'; 
        if(form) form.style.display = 'none'; 
        if(banner) banner.style.display = 'block';
        if(fBtn) fBtn.classList.add('active'); 
        if(hBtn) hBtn.classList.remove('active');
    } else {
        if(disc) disc.style.display = 'none'; 
        if(form) form.style.display = 'block'; 
        if(banner) banner.style.display = 'none';
        if(fBtn) fBtn.classList.remove('active'); 
        if(hBtn) hBtn.classList.add('active');
    }
}

// Global UI Rendering Pipeline Channels
function renderUserMarketplace(items) {
    const container = document.getElementById('listingsContainer');
    if(!container) return; 
    container.innerHTML = '';
    
    const liveItems = items.filter(item => item.live);
    
    if (liveItems.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding:60px; color: var(--text-muted); font-size:15px;">No rental units found matching your filters.</p>`;
        return;
    }
    
    liveItems.forEach(item => {
        container.innerHTML += `
            <div class="prop-card">
                <div class="prop-img-frame" style="background-image: url('${item.img}')">
                    <span class="pill-badge">🛡️ ${item.status}</span>
                    <span class="duration-badge">${item.duration}</span>
                </div>
                <div class="prop-details">
                    <div>
                        <div class="price-row">
                            <span class="prop-price">₹${item.price.toLocaleString('en-IN')}</span>
                            <span class="prop-rent-type">/${item.rentType}</span>
                        </div>
                        <div class="card-heading-title">${item.title}</div>
                        <div class="prop-loc">📍 ${item.loc} Area, Khandwa</div>
                        <div class="prop-meta">
                            📢 <b>Landmark:</b> ${item.landmark}<br>
                            👥 <b>Type:</b> ${item.category} | <b>Rules:</b> ${item.bachelors}
                        </div>
                    </div>
                    <button class="btn-unlock-action" onclick="openDetailsModal(${item.id})">Unlock Owner Contact</button>
                </div>
            </div>`;
    });
}

function renderAdminModerationQueue() {
    const container = document.getElementById('adminQueueContainer');
    if(!container) return; 
    container.innerHTML = '';
    
    const pending = dataset.filter(item => !item.live);
    
    if (pending.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); font-style: italic; font-size:14px; padding:10px;">Verification logs clean.</p>`;
        return;
    }
    
    pending.forEach(item => {
        container.innerHTML += `
            <div class="admin-item">
                <h4>✓ QR Txn ID Submitted</h4>
                <div style="margin: 8px 0; font-size:13px; color:var(--text-muted); line-height:1.5;">
                    <span style="color:#10b981; font-weight:bold;">💸 UTR ID: ${item.txnId}</span><br>
                    <strong>Owner:</strong> ${item.ownerName} (${item.contact})<br>
                    <strong>Heading:</strong> ${item.title}<br>
                    <strong>Rent Value:</strong> ₹${item.price.toLocaleString('en-IN')}/${item.rentType}
                </div>
                <div class="admin-actions">
                    <button class="btn-adm btn-approve" onclick="approveProperty(${item.id})">Approve & Live</button>
                    <button class="btn-adm btn-reject" onclick="rejectProperty(${item.id})">Reject</button>
                </div>
            </div>`;
    });
}

function applySearchFilters() {
    const loc = document.getElementById('searchLoc').value;
    const cat = document.getElementById('searchCategory').value;
    const dur = document.getElementById('searchDuration').value;
    const budget = document.getElementById('searchBudget').value;
    
    const filtered = dataset.filter(node => {
        const matchLoc = (loc === 'all' || node.loc === loc);
        const matchCat = (cat === 'all' || node.category === cat);
        const matchDur = (dur === 'all' || node.duration === dur);
        let matchBudget = true;
        if (budget !== 'all') { matchBudget = (node.price <= parseInt(budget)); }
        return matchLoc && matchCat && matchDur && matchBudget;
    });
    renderUserMarketplace(filtered);
}

function openDetailsModal(id) {
    const item = dataset.find(p => p.id === id); if(!item) return;
    document.getElementById('detailsModalContent').innerHTML = `
        <div class="info-row"><span>Verified Mujeer Owner:</span> <strong>${item.ownerName}</strong></div>
        <div class="info-row"><span>📞 Active Phone Number:</span> <strong>${item.contact}</strong></div>
        <div class="info-row"><span>🏢 Structural Address:</span> <span>House ${item.houseNo}, ${item.loc} Area, Khandwa</span></div>
        <div class="info-row"><span>💵 Tariff Valuation:</span> <span style="color:var(--success); font-weight:bold;">₹${item.price.toLocaleString('en-IN')}/${item.rentType}</span></div>
        <div class="info-row"><span>🧭 Target Landmark:</span> <span>${item.landmark}</span></div>
        <div class="info-row"><span>⚠️ Housing Constraints:</span> <span>${item.bachelors}</span></div>`;
    document.getElementById('detailsModal').classList.add('active');
}

function closeDetailsModal() { document.getElementById('detailsModal').classList.remove('active'); }

function triggerPaymentModal(e) {
    e.preventDefault();
    const rawCat = document.getElementById('formType').value;
    const rawDur = document.getElementById('formDuration').value;
    const rentCycle = (rawDur === '1 Day' || rawDur === '1-8 Days') ? 'day' : 'month';
    let userImg = document.getElementById('formImgUrl').value;
    if(!userImg.trim()) userImg = "https://unsplash.com";
    
    temporaryFormObject = {
        id: Date.now(), ownerName: document.getElementById('formOwner').value, contact: document.getElementById('formPhone').value,
        title: document.getElementById('formTitle').value, houseNo: document.getElementById('formHouseNo').value, landmark: document.getElementById('formLandmark').value,
        bachelors: document.getElementById('formBachelors').value, category: rawCat, duration: rawDur, price: parseInt(document.getElementById('formRent').value),
        rentType: rentCycle, loc: document.getElementById('formLoc').value, img: userImg, live: false, status: "Mujeer Certified"
    };
    document.getElementById('gatewayPaymentModal').classList.add('active');
}

// 🛠️ CRITICAL FIX: GRAB EXACT ID MATCH FROM index.html WITH FALLBACKS
function confirmPaymentAndSendToAdmin() {
    const txnInput = document.getElementById('formTxnId');
    
    if(!txnInput || txnInput.value.trim().length < 8) {
        alert("⚠️ Please type a valid 12-Digit UTR Transaction ID to verify your listing payment.");
        return;
    }
    
    if(temporaryFormObject) {
        temporaryFormObject.txnId = txnInput.value.trim();
        dataset.push(temporaryFormObject);
        temporaryFormObject = null;
    }
    closeModal(); 
    document.getElementById('propertyForm').reset(); 
    txnInput.value = '';
    alert("🔒 Payment Log Logged Successfully! Sent to Admin Dashboard.");
    renderAdminModerationQueue(); 
    showView('find');
}

function approveProperty(id) {
    const idx = dataset.findIndex(item => item.id === id);
    if(idx !== -1) { dataset[idx].live = true; alert("Listing synchronized live globally!"); renderUserMarketplace(dataset); renderAdminModerationQueue(); }
}

function rejectProperty(id) { dataset = dataset.filter(item => item.id !== id); alert("Asset registration logs purged."); renderAdminModerationQueue(); }
function closeModal() { document.getElementById('gatewayPaymentModal').classList.remove('active'); }

renderUserMarketplace(dataset);
renderAdminModerationQueue();


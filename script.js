const forbiddenWords = ['porno', 'sensitif', 'badword', 'anjing', 'kontol'];

function containsForbiddenWords(text) {
    const lowerText = text.toLowerCase();
    return forbiddenWords.some(word => lowerText.includes(word.toLowerCase()));
}

let curhatList = [];  // Array of objects: [{id: number, text: string, balasan: array}]

const btnKirim = document.getElementById('btn-kirim');
const btnBalas = document.getElementById('btn-balas');
const btnLihatBalasan = document.getElementById('btn-lihat-balasan');
const sectionKirim = document.getElementById('section-kirim');
const sectionBalas = document.getElementById('section-balas');
const sectionLihatBalasan = document.getElementById('section-lihat-balasan');
const curhatInput = document.getElementById('curhat-input');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const balasContainer = document.getElementById('balas-container');
const lihatBalasanContainer = document.getElementById('lihat-balasan-container');
const backToMenu = document.getElementById('back-to-menu');
const backToMenuLihatBalasan = document.getElementById('back-to-menu-lihat-balasan');

function showSection(section) {
    sectionKirim.classList.add('hidden');
    sectionBalas.classList.add('hidden');
    sectionLihatBalasan.classList.add('hidden');
    section.classList.remove('hidden');
    section.style.opacity = 0;
    setTimeout(() => section.style.opacity = 1, 10);
}

btnKirim.addEventListener('click', () => showSection(sectionKirim));
btnBalas.addEventListener('click', () => {
    showSection(sectionBalas);
    displayForBalas();  // Perbarui tampilan balas
});
btnLihatBalasan.addEventListener('click', () => {
    showSection(sectionLihatBalasan);
    displayLihatBalasan();
});
backToMenu.addEventListener('click', () => showSection(document.querySelector('header')));
backToMenuLihatBalasan.addEventListener('click', () => showSection(document.querySelector('header')));

submitBtn.addEventListener('click', () => {
    const text = curhatInput.value.trim();
    if (text === '') {
        errorMessage.textContent = 'Cerita tidak boleh kosong!';
        return;
    }
    if (containsForbiddenWords(text)) {
        errorMessage.textContent = 'Teks mengandung kata sensitif/porno!';
        return;
    }
    const newId = curhatList.length;
    curhatList.push({id: newId, text: text, balasan: []});
    alert('Cerita berhasil dikirim!');
    curhatInput.value = '';
    errorMessage.textContent = '';
});

function displayForBalas() {
    balasContainer.innerHTML = '';  // Kosongkan container dulu
    const unbalasanCerita = curhatList.filter(curhat => curhat.balasan.length === 0);  // Ambil hanya cerita yang belum dibalas
    
    if (unbalasanCerita.length === 0) {
        // Jika tidak ada cerita yang belum dibalas
        balasContainer.innerHTML = '<p>Tidak ada cerita lagi yang belum dibalas.</p>';
    } else {
        unbalasanCerita.forEach((curhat, index) => {
            const originalIndex = curhat.id;  // ID asli cerita
            const curhatDiv = document.createElement('div');
            curhatDiv.className = 'curhat-item';
            curhatDiv.innerHTML = `
                <p><strong>Cerita ${originalIndex + 1}:</strong> ${curhat.text}</p>
                <textarea id="balas-input-${originalIndex}" placeholder="Tulis balasan Anda..."></textarea>
                <button id="submit-balas-${originalIndex}">Kirim Balasan</button>
                <p id="balas-error-${originalIndex}" style="color: red;"></p>
                <div id="balas-display-${originalIndex}"></div>
            `;
            balasContainer.appendChild(curhatDiv);
            
            const submitBalasBtn = document.getElementById(`submit-balas-${originalIndex}`);
            submitBalasBtn.addEventListener('click', () => {
                const balasText = document.getElementById(`balas-input-${originalIndex}`).value.trim();
                const errorBalas = document.getElementById(`balas-error-${originalIndex}`);
                const balasDisplay = document.getElementById(`balas-display-${originalIndex}`);
                
                if (balasText === '') {
                    errorBalas.textContent = 'Balasan tidak boleh kosong!';
                    return;
                }
                
                if (containsForbiddenWords(balasText)) {
                    errorBalas.textContent = 'Balasan mengandung kata sensitif/porno!';
                    return;
                }
                
                curhatList[originalIndex].balasan.push(balasText);  // Tambahkan balasan ke cerita asli
                balasDisplay.innerHTML = `<p style="color: #28a745;">Balasan Anda: ${balasText}</p>`;
                errorBalas.textContent = '';
                document.getElementById(`balas-input-${originalIndex}`).value = '';  // Reset textarea
                // Sekarang, refresh tampilan untuk menghilangkan form
                displayForBalas();  // Panggil ulang fungsi untuk update
            });
        });
    }
}

function displayLihatBalasan() {
    lihatBalasanContainer.innerHTML = '';
    curhatList.forEach((curhat, index) => {
        const curhatDiv = document.createElement('div');
        curhatDiv.className = 'curhat-item';
        curhatDiv.innerHTML = `
            <p><strong>Cerita ${index + 1}:</strong> ${curhat.text}</p>
            <p><strong>Balasan:</strong></p>
            <ul id="balasan-list-${index}"></ul>
        `;
        lihatBalasanContainer.appendChild(curhatDiv);
        
        const balasanList = document.getElementById(`balasan-list-${index}`);
        if (curhat.balasan.length > 0) {
            curhat.balasan.forEach(balasan => {
                const li = document.createElement('li');
                li.textContent = balasan;
                balasanList.appendChild(li);
            });
        } else {
            balasanList.innerHTML = '<li>Tidak ada balasan.</li>';
        }
    });
}

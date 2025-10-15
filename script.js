// Array kata-kata terlarang
const forbiddenWords = ['porno', 'sensitif', 'badword', 'anjing', 'kontol'];

// Fungsi untuk memeriksa kata terlarang
function containsForbiddenWords(text) {
    const lowerText = text.toLowerCase();
    return forbiddenWords.some(word => lowerText.includes(word.toLowerCase()));
}

// Array untuk menyimpan cerita
let curhatList = [];

// Elemen DOM
const btnKirim = document.getElementById('btn-kirim');
const btnBalas = document.getElementById('btn-balas');
const btnLihat = document.getElementById('btn-lihat');
const sectionKirim = document.getElementById('section-kirim');
const sectionBalas = document.getElementById('section-balas');
const sectionLihat = document.getElementById('section-lihat');
const curhatInput = document.getElementById('curhat-input');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const curhatContainer = document.getElementById('curhat-container');
const balasContainer = document.getElementById('balas-container');
const backToMenu = document.getElementById('back-to-menu');
const backToMenuLihat = document.getElementById('back-to-menu-lihat');

// Fungsi untuk menampilkan section
function showSection(section) {
    // Sembunyikan semua section
    sectionKirim.classList.add('hidden');
    sectionBalas.classList.add('hidden');
    sectionLihat.classList.add('hidden');
    // Tampilkan section yang dipilih
    section.classList.remove('hidden');
    section.style.opacity = 0; // Untuk animasi
    setTimeout(() => section.style.opacity = 1, 10);
}

// Event untuk menu utama
btnKirim.addEventListener('click', () => showSection(sectionKirim));
btnBalas.addEventListener('click', () => {
    showSection(sectionBalas);
    displayForBalas();  // Tampilkan daftar untuk balas
});
btnLihat.addEventListener('click', () => {
    showSection(sectionLihat);
    displayCurhat();  // Tampilkan daftar cerita
});

// Event untuk kembali ke menu
backToMenu.addEventListener('click', () => showSection(document.querySelector('header')));  // Kembali ke header
backToMenuLihat.addEventListener('click', () => showSection(document.querySelector('header')));

// Event untuk submit cerita
submitBtn.addEventListener('click', () => {
    const text = curhatInput.value.trim();
    
    if (text === '') {
        errorMessage.textContent = 'Cerita tidak boleh kosong!';
        return;
    }
    
    if (containsForbiddenWords(text)) {
        errorMessage.textContent = 'Teks mengandung kata sensitif/porno. Tidak bisa dikirim!';
        return;
    }
    
    curhatList.push(text);
    alert('Cerita berhasil dikirim!');
    curhatInput.value = '';
    errorMessage.textContent = '';
});

// Fungsi untuk menampilkan daftar cerita di section Lihat
function displayCurhat() {
    curhatContainer.innerHTML = '';
    curhatList.forEach((curhat, index) => {
        const curhatDiv = document.createElement('div');
        curhatDiv.className = 'curhat-item';
        curhatDiv.innerHTML = `
            <p><strong>Cerita ${index + 1}:</strong> ${curhat}</p>
            <button id="lapor-btn-${index}" class="lapor-btn">Lapor</button>
        `;
        curhatContainer.appendChild(curhatDiv);
        
        document.getElementById(`lapor-btn-${index}`).addEventListener('click', () => {
            curhatList.splice(index, 1);
            displayCurhat();
            alert('Cerita telah dilaporkan dan dihapus!');
        });
    });
}

// Fungsi untuk menampilkan daftar cerita di section Balas, dengan form balasan
function displayForBalas() {
    balasContainer.innerHTML = '';
    curhatList.forEach((curhat, index) => {
        const curhatDiv = document.createElement('div');
        curhatDiv.className = 'curhat-item';
        curhatDiv.innerHTML = `
            <p><strong>Cerita ${index + 1}:</strong> ${curhat}</p>
            <textarea id="balas-input-${index}" placeholder="Tulis balasan Anda..."></textarea>
            <button id="submit-balas-${index}">Kirim Balasan</button>
            <p id="balas-error-${index}" style="color: red;"></p>
            <div id="balas-display-${index}"></div> <!-- Untuk menampilkan balasan -->
        `;
        balasContainer.appendChild(curhatDiv);
        
        const submitBalasBtn = document.getElementById(`submit-balas-${index}`);
        submitBalasBtn.addEventListener('click', () => {
            const balasText = document.getElementById(`balas-input-${index}`).value.trim();
            const errorBalas = document.getElementById(`balas-error-${index}`);
            const balasDisplay = document.getElementById(`balas-display-${index}`);
            
            if (balasText === '') {
                errorBalas.textContent = 'Balasan tidak boleh kosong!';
                return;
            }
            
            if (containsForbiddenWords(balasText)) {
                errorBalas.textContent = 'Balasan mengandung kata sensitif/porno. Tidak bisa dikirim!';
                return;
            }
            
            balasDisplay.innerHTML = `<p style="color: #28a745;">Balasan Anda: ${balasText}</p>`;
            errorBalas.textContent = '';  // Hapus error
            document.getElementById(`balas-input-${index}`).value = '';  // Reset textarea
        });
    });
}

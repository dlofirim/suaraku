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
    displayForBalas();
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
    balasContainer.innerHTML = '';
    curhatList.forEach((curhat, index) => {
        if (curhat.balasan.length === 0) {  // Hanya tampilkan form jika belum ada balasan
            const curhatDiv = document.createElement('div');
            curhatDiv.className = 'curhat-item';
            curhatDiv.innerHTML = `
                <p><strong>Cerita ${index + 1}:</strong> ${curhat.text}</p>
                <textarea id="balas-input-${index}" placeholder="Tulis balasan Anda..."></textarea>
                <button id="submit-balas-${index}">Kirim Balasan</button>
                <p id="balas-error-${index}" style="color: red;"></p>
                <div id="balas-display-${index}"></div>
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
                    errorBalas.textContent = 'Balasan mengandung kata sensitif/porno!';
                    return;
                }
                
                curhatList[index].balasan.push(balasText);  // Tambahkan balasan
                balasDisplay.innerHTML = `<p style="color: #28a745;">Balasan Anda: ${balasText}</p>`;
                errorBalas.textContent = '';
                document.getElementById(`balas-input-${index}`).value = '';
                // Form sudah digunakan, tidak perlu action lain
            });
        } else {
            // Jika sudah ada balasan, tampilkan pesan
            const curhatDiv = document.createElement('div');
            curhatDiv.className = 'curhat-item';
            curhatDiv.innerHTML = `<p><strong>Cerita ${index + 1}:</strong> ${curhat.text} (Sudah dibalas)</p>`;
            balasContainer.appendChild(curhatDiv);
        }
    });
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

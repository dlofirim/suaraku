const forbiddenWords = ['porno', 'sensitif', 'badword', 'anjing', 'kontol'];

function containsForbiddenWords(text) {
    const lowerText = text.toLowerCase();
    return forbiddenWords.some(word => lowerText.includes(word.toLowerCase()));
}

let curhatList = [];  // Sekarang array of objects: [{id: number, text: string, balasan: array}]

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
    errorMessage

// Array kata-kata terlarang (contoh sederhana, bisa ditambahkan lebih banyak)
const forbiddenWords = ['porno', 'sensitif', 'badword', 'anjing', 'kontol']; // Case-insensitive

// Array balasan acak (pesan positif dan aman)
const replies = [
    'Anda tidak sendirian, semangat ya!',
    'Saya di sini untuk mendengarkan. Semoga lebih baik.',
    'Mari kita hadapi bersama. Anda kuat!',
    'Ingat, setiap masalah ada solusinya.'
];

// Fungsi untuk memeriksa kata terlarang
function containsForbiddenWords(text) {
    const lowerText = text.toLowerCase();
    return forbiddenWords.some(word => lowerText.includes(word.toLowerCase()));
}

// Array untuk menyimpan curhatan
let curhatList = [];

// Elemen DOM
const curhatInput = document.getElementById('curhat-input');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const curhatContainer = document.getElementById('curhat-container');

// Event listener untuk submit curhatan
submitBtn.addEventListener('click', () => {
    const text = curhatInput.value.trim();
    
    if (text === '') {
        errorMessage.textContent = 'Curhatan tidak boleh kosong!';
        return;
    }
    
    if (containsForbiddenWords(text)) {
        errorMessage.textContent = 'Teks mengandung kata sensitif/porno. Tidak bisa dikirim!';
        return;
    }
    
    // Tambahkan curhatan ke array dan tampilkan
    curhatList.push(text);
    displayCurhat();
    curhatInput.value = '';  // Reset form
    errorMessage.textContent = '';  // Hapus pesan error
});

// Fungsi untuk menampilkan daftar curhatan
function displayCurhat() {
    curhatContainer.innerHTML = '';  // Kosongkan container
    
    curhatList.forEach((curhat, index) => {
        const curhatDiv = document.createElement('div');
        curhatDiv.className = 'curhat-item';
        curhatDiv.innerHTML = `
            <p><strong>Curhatan ${index + 1}:</strong> ${curhat}</p>
            <button id="balas-btn-${index}" class="balas-btn">Balas</button>
            <button id="lapor-btn-${index}" class="lapor-btn">Lapor</button>
        `;
        
        curhatContainer.appendChild(curhatDiv);
        
        // Event untuk tombol balas
        document.getElementById(`balas-btn-${index}`).addEventListener('click', () => {
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            
            if (containsForbiddenWords(randomReply)) {
                alert('Balasan mengandung kata sensitif. Tidak bisa dikirim!');
                return;
            }
            
            // Tampilkan balasan di bawah curhatan
            const replyPara = document.createElement('p');
            replyPara.textContent = `Balasan: ${randomReply}`;
            replyPara.style.color = '#28a745';  // Warna hijau untuk balasan
            curhatDiv.appendChild(replyPara);
        });
        
        // Event untuk tombol lapor
        document.getElementById(`lapor-btn-${index}`).addEventListener('click', () => {
            curhatList.splice(index, 1);  // Hapus dari array
            displayCurhat();  // Update tampilan
            alert('Curhatan telah dilaporkan dan dihapus!');
        });
    });
}

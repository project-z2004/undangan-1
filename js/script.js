// Init libraries
document.getElementById("openInv").addEventListener("click", function () {

    // tampilkan konten utama
    document.getElementById("mainContent").classList.remove("d-none");

    // play music (opsional)
    const bgm = document.getElementById("bgm");
    bgm.play().catch(()=>{});

    // animasi scroll ke bagian pertama konten
    setTimeout(() => {
        document.getElementById("mainContent").scrollIntoView({
            behavior: "smooth"
        });
    }, 300);
});
document.addEventListener("DOMContentLoaded", function(){
  AOS.init({duration:700, once:true, anchorPlacement:'top-bottom'});
  const lightbox = GLightbox({selector:'.glightbox'});

  // elements
  const openBtn = document.getElementById('openInv');
  const main = document.getElementById('mainContent');
  const bgm = document.getElementById('bgm');
  const musicBtn = document.getElementById('musicBtn');
  const waShare = document.getElementById('waShare');

  // Open invitation -> show main content and try play music
  openBtn.addEventListener('click', function(e){
    e.preventDefault();
    main.classList.remove('d-none');
    window.scrollTo({top:0,behavior:'smooth'});
    // try play (may be blocked until user interacts)
    bgm.play().catch(()=>{ /* autoplay blocked */ });
  });

  // Music toggle logic
  function updateMusicBtn(){
    musicBtn.textContent = bgm.paused ? '🎵' : '🔊';
  }
  musicBtn.addEventListener('click', function(){
    if(bgm.paused) bgm.play();
    else bgm.pause();
    updateMusicBtn();
  });
  // keep state on load
  bgm.addEventListener('play', updateMusicBtn);
  bgm.addEventListener('pause', updateMusicBtn);

//   // Countdown
//   const countdownEl = document.getElementById('countdown');
//   // set your event date here (YYYY, M-1, D, H, M, S)
//   const eventDate = new Date(2025, 0, 21, 12, 0, 0).getTime(); // 20 Jan 2025 08:00

  // COUNTDOWN
// Tanggal acara
const eventDate = new Date("2025-12-05T21:25:00").getTime();

// Set interval tiap detik
setInterval(() => {
  
  const now = new Date().getTime();             // Waktu sekarang
  const distance = eventDate - now;             // Selisih waktu
  
  // Konversi ke hari / jam / menit / detik
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Tampilkan ke HTML
  document.getElementById("countdown").innerHTML = `
    <div class="countdown-item"><strong>${days}</strong><br>Hari</div>
    <div class="countdown-item"><strong>${hours}</strong><br>Jam</div>
    <div class="countdown-item"><strong>${minutes}</strong><br>Menit</div>
    <div class="countdown-item"><strong>${seconds}</strong><br>Detik</div>
  `;

  // Jika acara sudah lewat
  if (distance < 0) {
  const cd = document.getElementById("countdown");
  cd.innerHTML = "Acara telah dimulai!";
  cd.style.color = "#ff4d4d";        // warna merah lembut
  cd.style.fontWeight = "bold";      // huruf tebal
  cd.style.fontSize = "24px";        // ukuran font lebih besar
  cd.style.textAlign = "center";     // rata tengah
  cd.style.marginTop = "10px";       // jarak atas
}

}, 1000);




//   updateCountdown();
//   const cdInterval = setInterval(updateCountdown, 1000);

//   // RSVP (localStorage simple)
//   const rsvpForm = document.getElementById('rsvpForm');
//   const rsvpList = document.getElementById('rsvpList');
//   const LS_KEY = 'wedding_rsvp_v1';

//   function loadRsvp(){
//     const raw = localStorage.getItem(LS_KEY);
//     if(!raw) return [];
//     try{ return JSON.parse(raw) } catch(e) { return [] }
//   }
//   function saveRsvp(arr){ localStorage.setItem(LS_KEY, JSON.stringify(arr)) }

//   function renderRsvp(){
//     const items = loadRsvp();
//     if(items.length === 0){
//       rsvpList.innerHTML = '<div class="text-muted small">Belum ada konfirmasi.</div>';
//       return;
//     }
//     rsvpList.innerHTML = items.map(it => `
//       <div class="rsvp-item d-flex justify-content-between align-items-center">
//         <div>
//           <strong>${escapeHtml(it.name)}</strong>
//           <div class="small text-muted">${escapeHtml(it.note)}</div>
//         </div>
//         <div class="small text-muted">${new Date(it.time).toLocaleString()}</div>
//       </div>
//     `).join('');
//   }

  rsvpForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('rsvpName').value.trim();
    const note = document.getElementById('rsvpNote').value.trim();
    if(!name || !note) return;
    const arr = loadRsvp();
    arr.unshift({name, note, time: Date.now()});
    saveRsvp(arr);
    renderRsvp();
    rsvpForm.reset();
    // show small toast feedback (simple)
    alert('Terima kasih! RSVP Anda sudah tercatat.');
  });
  renderRsvp();

  // WhatsApp share (predefined message)
  waShare.addEventListener('click', function(e){
    e.preventDefault();
    const text = encodeURIComponent("Assalamualaikum, saya mengundang Anda: Zal & Putri — Sabtu, 20 Jan 2025. Lihat undangan: (link_undangan)");
    const link = `https://wa.me/?text=${text}`;
    window.open(link, '_blank');
  });

  // small helper
  function escapeHtml(unsafe){
    return unsafe.replace(/[&<"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','"':'&quot;',"'":'&#039;'}[m]) });
  }
});





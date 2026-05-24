// ========== SPLASH SCREEN ( hilang selama 2 detikan)==========
window.addEventListener('load', () => {
  setTimeout(() => {
    const intro = document.getElementById('layar-intro');
    intro.classList.add('sembunyi');
    setTimeout(() => {
      intro.style.display = 'none';
      jalankanReveal();
    }, 650);
  }, 2400);
});

// ========== SCROLL REVEAL (  ==========
function jalankanReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function resetReveal() {
  setTimeout(() => {
    const aktif = document.querySelector('.halaman.aktif');
    if (!aktif) return;
    aktif.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'));
    setTimeout(jalankanReveal, 80);
  }, 80);
}

// ========== SKENARIO terminal PER HALAMAN (animasi saat mengeklik klik tombol di navbar)==========
const termSkenario = {
  home: [
    { type: 'prompt', cmd: 'cd ~' },
    { type: 'out', kelas: 'tl-hi', teks: '[setyo@kali ~]$ ' },
    { type: 'space' },
    { type: 'out', kelas: 'tl-dir', teks: '~/home/setyo' }
  ],
  about: [
    { type: 'prompt', cmd: 'cat about.txt' },
    { type: 'out', kelas: 'tl-hi', teks: '>> Loading profile...' },
    { type: 'out', kelas: 'tl-fil', teks: '  Name    : Setyo Nugroho' },
    { type: 'out', kelas: 'tl-fil', teks: '  School  : SMKN 2 Mojokerto' },
    { type: 'out', kelas: 'tl-fil', teks: '  OS      : Kali Linux' }
  ],
  dukungan: [
    { type: 'prompt', cmd: 'ls -la projects/' },
    { type: 'out', kelas: 'tl-hi', teks: 'total 3 projects found' },
    { type: 'out', kelas: 'tl-dir', teks: 'drwxr  toko-online/' },
    { type: 'out', kelas: 'tl-dir', teks: 'drwxr  portfolio-kali/' },
    { type: 'out', kelas: 'tl-fil', teks: '-rw--  next-project.sh' }
  ],
  contact: [
    { type: 'prompt', cmd: 'nano contact.sh' },
    { type: 'out', kelas: 'tl-hi', teks: '[ GNU nano 6.2 ]' },
    { type: 'out', kelas: 'tl-fil', teks: '  Email    : setyo@email.com' },
    { type: 'out', kelas: 'tl-fil', teks: '  GitHub   : github.com/setyo' },
    { type: 'out', kelas: 'tl-fil', teks: '  Location : Mojokerto, ID' }
  ]
};

// ========== animasi terminall==========
function animTerminal(baris, selesai) {
  const body = document.getElementById('term-body');
  body.innerHTML = '';
  let delay = 0;
  baris.forEach(item => {
    if (item.type === 'space') {
      delay += 80;
      setTimeout(() => {
        const br = document.createElement('div');
        br.style.height = '6px';
        body.appendChild(br);
      }, delay);
    } else if (item.type === 'prompt') {
      delay += 100;
      setTimeout(() => {
        const bPrompt = document.createElement('div');
        bPrompt.className = 'term-line';
        bPrompt.innerHTML = `<span class="tl-user">setyo</span><span class="tl-at">@</span><span class="tl-host">kali</span><span class="tl-out">:~$</span> <span class="tl-cmd typewriter">${item.cmd}</span>`;
        body.appendChild(bPrompt);
      }, delay);
      delay += 500;
    } else if (item.type === 'out') {
      delay += 120;
      setTimeout(() => {
        const bOut = document.createElement('div');
        bOut.className = 'term-line term-out-line';
        bOut.innerHTML = `<span class="${item.kelas}">${item.teks}</span>`;
        body.appendChild(bOut);
      }, delay);
    }
  });
  delay += 180;
  setTimeout(() => {
    const cursor = document.createElement('div');
    cursor.className = 'term-line';
    cursor.innerHTML = `<span class="tl-user">setyo</span><span class="tl-at">@</span><span class="tl-host">kali</span><span class="tl-out">:~$</span> <span class="term-cursor"></span>`;
    body.appendChild(cursor);
  }, delay);
  setTimeout(selesai, delay + 300);
}

// ========== animasi perpindahan antar halaman ==========
const animasiMap = { home: 'anim-fade', about: 'anim-kiri', dukungan: 'anim-kanan', contact: 'anim-zoom' };

function gantiHalaman(nama) {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('tampil');
  animTerminal(termSkenario[nama] || termSkenario.home, () => {
    document.querySelectorAll('.halaman').forEach(hal => hal.classList.remove('aktif', 'anim-fade', 'anim-kiri', 'anim-kanan', 'anim-zoom'));
    document.querySelectorAll('.nav-links button').forEach(btn => btn.classList.remove('aktif'));
    const hal = document.getElementById(`halaman-${nama}`);
    if (hal) {
      hal.classList.add('aktif', animasiMap[nama]);
    }
    const tombol = document.getElementById(`btn-${nama}`);
    if (tombol) tombol.classList.add('aktif');
    const kubus = document.getElementById('dekorasi-kubus');
    if (kubus) kubus.style.display = nama === 'home' ? 'block' : 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      overlay.classList.remove('tampil');
      resetReveal();
    }, 150);
  });
}

// ========== Kpemgiriman pesan==========
function kirimPesan() {
  const nama = document.getElementById('input-nama').value.trim();
  const email = document.getElementById('input-email').value.trim();
  const pesan = document.getElementById('input-pesan').value.trim();
  if (!nama || !email || !pesan) {
    alert('[ERROR] Semua field harus diisi!');
    return;
  }
  const notif = document.getElementById('notif-sukses');
  notif.style.display = 'block';
  document.getElementById('input-nama').value = '';
  document.getElementById('input-email').value = '';
  document.getElementById('input-pesan').value = '';
  setTimeout(() => notif.style.display = 'none', 4000);
}
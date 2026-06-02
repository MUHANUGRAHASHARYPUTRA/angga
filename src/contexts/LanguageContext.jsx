import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      playground: "Playground",
      contact: "Contact",
      hire: "Hire Me →"
    },
    hero: {
      open: "OPEN TO OPPORTUNITIES",
      role1: "Web",
      role2: "Developer.",
      sub: "Information Systems · Universitas Hasanuddin · Makassar",
      work: "View My Work ↓",
      cv: "Print CV Receipt"
    },
    about: {
      title: "ABOUT ME",
      headlinePre: "A builder who loves ",
      headlineHighlight: "bold",
      headlinePost: " things.",
      bio: "I am Angga, an Information Systems student at Hasanuddin University, born on April 16, 2006. I am passionate about web development — from designing bold UIs to building efficient systems. I believe good design isn't just beautiful, but also bold.",
      classOf: "Class of 2024"
    },
    skills: {
      title: "SKILLS",
      sub: "Tap the emojis!",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
      learning: "Learning"
    },
    projects: {
      title: "PROJECTS",
      sub: "Works I've built so far.",
      filters: ["All", "Web App", "UI/UX", "Other"],
      live: "Live →",
      github: "GitHub ↗"
    },
    contact: {
      title: "LET'S TALK",
      sub: "Got an exciting project? Or just want to say hi — hit me up!",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "SEND MESSAGE →"
    },
    testimonials: {
      title: "WALL OF LOVE",
      sub: "What they say about me",
      items: [
        { name: "Lecturer", text: "Angga is highly creative and detail-oriented. His neobrutalism UI concepts are always bold and functional." },
        { name: "Project Partner", text: "Working with him is super fun! He never stops experimenting with new UI interactions." },
        { name: "Client", text: "The website he built for my property business was flawless. Clean code and bold design!" }
      ]
    },
    setup: {
      title: "DAILY SETUP",
      sub: "Weapons of mass construction",
      items: {
        laptop: "MacBook - Main workhorse",
        coffee: "Coffee - Coding fuel",
        keyboard: "Keyboard - Click clack"
      }
    },
    faq: {
      title: "QUIRKY FAQ",
      sub: "Questions nobody asked",
      tapToView: "Tap to view reply",
      items: [
        { q: "Can you fix my printer or hack my ex's Facebook?", a: "No. I'm a Web Developer, not a service guy." },
        { q: "Why is this website so bright?", a: "So you don't fall asleep reading my CV." },
        { q: "What's with the Neobrutalism?", a: "Because standard corporate design is boring." }
      ]
    },
    funzone: {
      title: "BORED?",
      desc: "Let's listen to my favorite music or explore other interesting things!",
      btn: "ENTER FUN ZONE 🚀"
    },
    playground: {
      title: "ANGGA'S PLAYGROUND",
      back: "← Back Home",
      boombox: "THE MIXTAPE",
      arcade: "GAME ZONE",
      tabChill: "🎧 CHILL ZONE",
      tabGame: "🕹️ GAME ZONE"
    },
    minesweeper: {
      title: "WATCH OUT FOR BUGS!",
      score: "SCORE",
      winTitle: "CLEAN CODE!",
      winDesc: "You avoided all the bugs!",
      loseTitle: "SYSTEM CRASH!",
      loseDesc: "You clicked a bug!",
      retry: "TRY AGAIN ↻"
    },
    whackabug: {
      title: "WHACK-A-BUG",
      score: "SCORE",
      start: "START GAME ▶",
      timesUp: "TIME'S UP!",
      result: "You whacked",
      retry: "PLAY AGAIN ↻"
    },
    keyboardsmash: {
      title: "HOW FAST CAN YOU CODE?",
      desc: "Mash any key on your keyboard as fast as you can, OR tap the screen repeatedly to hack the system!",
      start: "START HACKING",
      loseTitle: "ACCESS DENIED",
      loseDesc: "Your fingers are too slow, bro.",
      winTitle: "ACCESS GRANTED",
      winDesc: "I'm in. You're officially a hacker.",
      retry: "RETRY",
      time: "TIME"
    },
    retrotv: {
      hint: "↓ PRESS POWER TO TURN ON ↓",
      tune: "TUNE",
      intro: "Welcome to Angga's TV channel!"
    },
    memorymatch: {
      title: "MEMORY MATCH",
      moves: "MOVES",
      win: "YOU MATCHED THEM ALL!",
      retry: "PLAY AGAIN ↻"
    },
    tictactoe: {
      title: "BRUTAL TIC-TAC-TOE",
      bot: "BOT",
      player: "YOU",
      win: "Unbelievable. You won.",
      lose: "Ha! Beaten by an HTML bot!",
      draw: "It's a draw.",
      retry: "REMATCH ↻"
    },
    screensmasher: {
      title: "SCREEN SMASHER",
      desc: "Tap the screen to smash the glass and relieve your stress.",
      reset: "CLEAN UP 🧹"
    },
    polaroids: {
      title: "MESSY DESK",
      desc: "Drag the polaroids around.",
      c1: "Bug? No, that's a feature.",
      c2: "Fuel for code.",
      c3: "It works on my machine.",
      c4: "Just center a div."
    }
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      skills: "Keahlian",
      projects: "Proyek",
      playground: "Area Bermain",
      contact: "Kontak",
      hire: "Pekerjakan Saya →"
    },
    hero: {
      open: "TERBUKA UNTUK PELUANG",
      role1: "Pengembang",
      role2: "Web.",
      sub: "Sistem Informasi · Universitas Hasanuddin · Makassar",
      work: "Lihat Karya Gue ↓",
      cv: "Cetak Struk CV"
    },
    about: {
      title: "TENTANG GUE",
      headlinePre: "Seorang builder yang suka hal-hal ",
      headlineHighlight: "bold.",
      headlinePost: "",
      bio: "Saya Angga, mahasiswa Sistem Informasi Universitas Hasanuddin, lahir 16 April 2006. Saya passionate di web development — dari merancang UI yang bold sampai membangun sistem yang efisien. Saya percaya desain yang baik bukan cuma cantik, tapi juga berani.",
      classOf: "Angkatan 2024"
    },
    skills: {
      title: "KEAHLIAN GUE",
      sub: "Pencet emotnya!",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
      learning: "Pembelajaran"
    },
    projects: {
      title: "PROYEK GUE",
      sub: "Karya yang pernah saya bangun.",
      filters: ["Semua", "Web App", "UI/UX", "Lainnya"],
      live: "Langsung →",
      github: "GitHub ↗"
    },
    contact: {
      title: "MARI BICARA AMA GUE",
      sub: "Punya project seru? Atau cuma mau say hi — hit me up!",
      name: "Nama",
      email: "Email",
      message: "Pesan",
      send: "KIRIM PESAN →"
    },
    testimonials: {
      title: "PUJIAN GUE",
      sub: "Apa kata mereka tentang gue",
      items: [
        { name: "Dosen", text: "Angga sangat kreatif dan berani mengambil risiko dalam desain antarmuka. Konsep neobrutalism-nya selalu out-of-the-box." },
        { name: "Teman Kelompok", text: "Asli seru banget kerja bareng Angga! Orangnya nggak pernah kehabisan ide aneh yang ternyata keren buat UI." },
        { name: "Klien", text: "Website properti yang dia bikin rapi banget kodingannya. Desainnya juga bold dan nggak ngebosenin!" }
      ]
    },
    setup: {
      title: "SENJATA TEMPUR",
      sub: "Alat yang menemani gue ngoding",
      items: {
        laptop: "MacBook - Mesin utama",
        coffee: "Kopi Hitam - Bahan bakar koding",
        keyboard: "Keyboard Mekanikal - Biar berisik"
      }
    },
    faq: {
      title: "Q&A NYELENEH",
      sub: "Pertanyaan yang sering ditanyain",
      tapToView: "Ketuk untuk melihat balasan",
      items: [
        { q: "Bisa benerin printer atau hack Facebook mantan?", a: "Nggak. Gue Web Developer, bukan kang servis." },
        { q: "Kenapa desain web ini terang banget?", a: "Biar mata lu melek pas baca CV gue." },
        { q: "Kenapa pake gaya desain ginian?", a: "Biar beda aja, desain korporat mah udah banyak." }
      ]
    },
    funzone: {
      title: "LAGI BOSAN?",
      desc: "Mari dengarkan musik kesukaan gue atau hal menarik lainnya!",
      btn: "MASUK KE AREA BERMAIN 🚀"
    },
    playground: {
      title: "AREA BERMAIN ANGGA",
      back: "← Kembali",
      boombox: "TAPE DECK",
      arcade: "ZONA GAME",
      tabChill: "🎧 ZONA SANTAI",
      tabGame: "🕹️ ZONA GAME"
    },
    minesweeper: {
      title: "AWAS RANJAU BUG!",
      score: "SKOR",
      winTitle: "KODE BERSIH!",
      winDesc: "Kamu berhasil menghindari semua bug!",
      loseTitle: "SISTEM CRASH!",
      loseDesc: "Kamu nginjek bug!",
      retry: "COBA LAGI ↻"
    },
    whackabug: {
      title: "PUKUL BUG",
      score: "SKOR",
      start: "MULAI MAIN ▶",
      timesUp: "WAKTU HABIS!",
      result: "Kamu berhasil mukul",
      retry: "MAIN LAGI ↻"
    },
    keyboardsmash: {
      title: "SEBERAPA CEPAT LU NGODING?",
      desc: "Pencet sembarang tombol di keyboard secepat mungkin, ATAU tap layar berkali-kali untuk meretas sistem!",
      start: "MULAI HACKING",
      loseTitle: "AKSES DITOLAK",
      loseDesc: "Jari lo kurang gesit bro.",
      winTitle: "AKSES DITERIMA",
      winDesc: "Gue berhasil masuk. Lu resmi jadi hacker.",
      retry: "COBA LAGI",
      time: "WAKTU"
    },
    retrotv: {
      hint: "↓ TEKAN TOMBOL MERAH UNTUK MENYALAKAN ↓",
      tune: "GANTI",
      intro: "Selamat datang di channel TV Angga!"
    },
    memorymatch: {
      title: "TEBAK KARTU",
      moves: "LANGKAH",
      win: "KAMU MENEBAK SEMUANYA!",
      retry: "MAIN LAGI ↻"
    },
    tictactoe: {
      title: "TIC-TAC-TOE BRUTAL",
      bot: "BOT",
      player: "KAMU",
      win: "Mustahil. Lu menang.",
      lose: "Yah! Kalah sama bot HTML!",
      draw: "Cuma seri doang.",
      retry: "TANTANG LAGI ↻"
    },
    screensmasher: {
      title: "HANCURKAN LAYAR",
      desc: "Ketuk layar untuk memecahkan kaca dan melepaskan stresmu.",
      reset: "SAPU KACA 🧹"
    },
    polaroids: {
      title: "MEJA BERANTAKAN",
      desc: "Geser-geser foto polaroid sesukamu.",
      c1: "Bug? Bukan, ini fitur.",
      c2: "Bahan bakar koding.",
      c3: "Di laptop gue jalan kok.",
      c4: "Cuma nyenterin div aja susah."
    }
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('id'); // Default to ID as requested

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'id' : 'en');
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

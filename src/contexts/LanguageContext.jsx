import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
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
      sub: "Tap the monsters!",
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
    }
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      skills: "Keahlian",
      projects: "Proyek",
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
      sub: "Pencet monsternya!",
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

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
      cv: "Download CV"
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
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
      learning: "Learning"
    },
    projects: {
      title: "PROJECTS",
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
      cv: "Unduh CV"
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
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
      learning: "Pembelajaran"
    },
    projects: {
      title: "PROYEK GUE",
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

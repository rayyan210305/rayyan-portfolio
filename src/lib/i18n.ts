export type Lang = "id" | "en";

export const translations = {
  // ── Navbar ──
  nav: {
    about: { id: "Tentang Saya", en: "About" },
    projects: { id: "Proyek", en: "Projects" },
    experience: { id: "Pengalaman", en: "Experience" },
    education: { id: "Pendidikan", en: "Education" },
    contact: { id: "Kontak", en: "Contact" },
  },

  // ── Hero ──
  hero: {
    subtitle: { id: "Mahasiswa Teknik Komputer", en: "Computer Engineering Student" },
    tagline: {
      id: "Passionate about network architecture & web engineering",
      en: "Passionate about network architecture & web engineering",
    },
    viewWork: { id: "Lihat Proyek Saya ↓", en: "View My Work ↓" },
    contactMe: { id: "Hubungi Saya →", en: "Contact Me →" },
  },

  // ── About ──
  about: {
    title: { id: "Tentang Saya", en: "About Me" },
    bio1: {
      id: "Mahasiswa Teknik Komputer yang memiliki ketertarikan pada bidang networking dan web development. Saat ini saya terus mengembangkan kemampuan dalam membangun sistem berbasis web, memahami infrastruktur jaringan, serta memanfaatkan AI sebagai tools untuk membantu proses development dan pembelajaran.",
      en: "A Computer Engineering student passionate about networking and web development. I continuously develop my skills in building web-based systems, understanding network infrastructure, and leveraging AI as a tool to assist development and learning processes.",
    },
    bio2: {
      id: "Saya memiliki tujuan untuk berkembang menjadi Network & Web Engineer yang mampu membangun sistem yang efektif dan terintegrasi.",
      en: "My goal is to grow into a Network & Web Engineer who can build effective and integrated systems.",
    },
    skillsTitle: { id: "Skills & Tools", en: "Skills & Tools" },
    skillGroups: {
      languages: { id: "Bahasa Pemrograman", en: "Languages" },
      webDev: { id: "Web Development", en: "Web Development" },
      networking: { id: "Jaringan", en: "Networking" },
      tools: { id: "Alat", en: "Tools" },
    },
  },

  // ── Education ──
  education: {
    title: { id: "Latar Belakang Akademik", en: "Academic Background" },
    university: { id: "Universitas Syiah Kuala", en: "Universitas Syiah Kuala" },
    major: { id: "Teknik Komputer — Semester 7", en: "Computer Engineering — Semester 7" },
    location: {
      id: "Fakultas Teknik, Darussalam — Banda Aceh. Saat ini fokus pada Network Engineering dan Web Development dengan pengalaman praktis dalam membangun proyek nyata.",
      en: "Faculty of Engineering, Darussalam — Banda Aceh. Currently focusing on Network Engineering and Web Development with hands-on experience in building real-world projects.",
    },
    coursework: { id: "MATA KULIAH TERKAIT", en: "RELEVANT COURSEWORK" },
    courses: {
      computerNetworks: { id: "Jaringan Komputer", en: "Computer Networks" },
      webDevelopment: { id: "Pengembangan Web", en: "Web Development" },
      databaseSystems: { id: "Sistem Basis Data", en: "Database Systems" },
      operatingSystems: { id: "Sistem Operasi", en: "Operating Systems" },
      softwareEngineering: { id: "Rekayasa Perangkat Lunak", en: "Software Engineering" },
      dataStructures: { id: "Struktur Data", en: "Data Structures" },
    },
  },

  // ── Experience ──
  experience: {
    title: { id: "Pengalaman", en: "Experience" },
    items: [
      {
        role: { id: "Ketua Himpunan Mahasiswa Teknik Komputer", en: "Head of Computer Engineering Student Association" },
        company: { id: "Himpunan Mahasiswa Teknik Komputer", en: "Computer Engineering Student Association" },
        period: "2026/2027",
        description: {
          id: "Memimpin organisasi mahasiswa Teknik Komputer, mengkoordinasi program kerja, dan memastikan kelancaran kegiatan kemahasiswaan.",
          en: "Leading the Computer Engineering student organization, coordinating work programs, and ensuring smooth student activities.",
        },
        tags: ["Leadership", "Organization", "Event Management"],
      },
      {
        role: { id: "Wakil Ketua Reuni Cinta Almamater", en: "Vice Chairman of Almamater Love Reunion" },
        company: { id: "Fakultas Teknik, Universitas Syiah Kuala", en: "Faculty of Engineering, Universitas Syiah Kuala" },
        period: "2025",
        description: {
          id: "Membantu mempersiapkan dan melaksanakan acara Reuni Cinta Almamater, mengoordinasi tim panitia, serta memastikan acara berjalan lancar.",
          en: "Assisted in preparing and executing the Almamater Love Reunion event, coordinating the committee team, and ensuring the event ran smoothly.",
        },
        tags: ["Event Planning", "Team Coordination", "Communication"],
      },
    ],
  },

  // ── Projects ──
  projects: {
    title: { id: "Proyek Unggulan", en: "Featured Projects" },
    featured: { id: "★ Unggulan", en: "★ Featured" },
    featuredTitle: "LP3 Putra XVII 2026 — Sistem Absensi QR",
    featuredDesc: {
      id: "Sistem absensi digital berbasis barcode & QR code untuk Lomba Perkemahan Pramuka Pesantren (LP3) Putra XVII 2026, Satuan Komunitas Gerakan Pramuka Aceh. Peserta di-scan via kamera, QR di-generate otomatis, dan kehadiran tercatat real-time.",
      en: "Digital attendance system using barcode & QR code for the LP3 Putra XVII 2026 Scout Camping Competition, Aceh Scout Community Unit. Participants are scanned via camera, QR codes are auto-generated, and attendance is recorded in real-time.",
    },
    // image alts
    imgLogin: {
      id: "Halaman Login Admin — autentikasi PIN untuk akses sistem",
      en: "Admin Login Page — PIN authentication for system access",
    },
    imgDashboard: {
      id: "Dashboard LP3 — statistik kehadiran & scan log",
      en: "LP3 Dashboard — attendance statistics & scan log",
    },
    imgScanner: {
      id: "Halaman scanner absensi QR/Barcode",
      en: "QR/Barcode attendance scanner page",
    },
    imgParticipants: {
      id: "Data peserta LP3 Putra XVII",
      en: "LP3 Putra XVII participant data",
    },
    imgAttendance: {
      id: "Histori absensi real-time",
      en: "Real-time attendance history",
    },
    liveDemo: { id: "Demo Langsung →", en: "Live Demo →" },
    // other projects
    portfolioTitle: "Portfolio Website",
    portfolioDesc: {
      id: "Website portfolio pribadi dengan desain modern menggunakan Three.js, glass morphism, dan visualisasi 3D network.",
      en: "Personal portfolio website with modern design using Three.js, glass morphism, and 3D network visualization.",
    },
  },

  // ── Contact ──
  contact: {
    title: { id: "Mari Terhubung", en: "Let's Connect" },
    subtitle: {
      id: "Saya selalu tertarik dengan peluang baru, kolaborasi, atau sekadar ngobrol tentang teknologi.",
      en: "I'm always interested in new opportunities, collaborations, or just a friendly chat about technology.",
    },
    name: { id: "Nama", en: "Name" },
    email: { id: "Email", en: "Email" },
    message: { id: "Pesan", en: "Message" },
    sending: { id: "Mengirim...", en: "Sending..." },
    sent: { id: "Terkirim! ✓", en: "Sent! ✓" },
    send: { id: "Kirim Pesan", en: "Send Message" },
    error: {
      id: "Gagal mengirim. Coba lagi atau email saya langsung.",
      en: "Failed to send. Try again or email me directly.",
    },
  },
} as const;

export type TranslationKey = typeof translations;

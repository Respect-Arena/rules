export type Penalty = {
  id: string;
  category: string; // Dynamic category key
  title: string;
  description: string;
  penalties: {
    first: string;
    second: string;
    third: string;
  };
  wipe: boolean;
  keywords: string[];
};

export type Category = {
  label: string;
  color: string;
};

export const DEFAULT_CATEGORIES: Record<string, Category> = {
  general: {
    label: "مخالفات رول بلي عامة",
    color: "#3b82f6",
  },
  ethical: {
    label: "مخالفات أخلاقية وسلوكية",
    color: "#ef4444",
  }
};

export const PENALTIES_DATA: Penalty[] = [
  {
    id: "rdm",
    category: "general",
    title: "القتل العشوائي (RDM)",
    description: "قتل لاعب آخر بدون سبب درامي أو قصة مسبقة أو دوافع واقعية.",
    penalties: {
      first: "سجن 60 دقيقة",
      second: "حظر 3 أيام",
      third: "حظر 7 أيام",
    },
    wipe: false,
    keywords: ["قتل", "ضرب", "رصاص", "بدون سبب", "عشوائي"],
  },
  {
    id: "vdm",
    category: "general",
    title: "دهس اللاعبين (VDM)",
    description: "استخدام المركبة كسلاح لقتل أو صدم الآخرين أو التسبب في ضرر متعمد.",
    penalties: {
      first: "سجن 45 دقيقة",
      second: "حظر يومين",
      third: "حظر 5 أيام",
    },
    wipe: false,
    keywords: ["دهس", "سيارة", "صدم", "مركبة", "قتل بالسيارة"],
  },
  {
    id: "combat-logging",
    category: "general",
    title: "الهروب من السيناريو (Combat Logging)",
    description: "إغلاق اللعبة أو تسجيل الخروج أثناء مطاردة الشرطة أو موقف درامي نشط.",
    penalties: {
      first: "سجن 120 دقيقة",
      second: "حظر 3 أيام",
      third: "حظر 7 أيام",
    },
    wipe: false,
    keywords: ["هروب", "خروج", "فصل", "كرش", "مطاردة", "شرطة"],
  },
  {
    id: "glitch-abuse",
    category: "technical",
    title: "استغلال الثغرات",
    description: "استخدام 'قلتش' أو ثغرة في اللعبة للحصول على مال، أسلحة، أو ميزات غير قانونية.",
    penalties: {
      first: "حظر نهائي",
      second: "لا يوجد",
      third: "لا يوجد",
    },
    wipe: true,
    keywords: ["قلتش", "ثغرة", "تكرار", "فلوس", "مود", "هاك"],
  },
  {
    id: "staff-insult",
    category: "ethical",
    title: "إهانة الإدارة",
    description: "عدم احترام طاقم العمل، التلفظ عليهم، أو التشكيك في نزاهتهم بشكل غير لائق.",
    penalties: {
      first: "حظر 7 أيام",
      second: "حظر نهائي",
      third: "لا يوجد",
    },
    wipe: false,
    keywords: ["ادارة", "سب", "قذف", "احترام", "كلام", "مسؤول"],
  },
  {
    id: "bad-language",
    category: "ethical",
    title: "القذف والتنمر",
    description: "استخدام ألفاظ نابية، قذف، أو التنمر على اللاعبين خارج نطاق الشخصية.",
    penalties: {
      first: "حظر 3 أيام",
      second: "حظر 7 أيام",
      third: "حظر نهائي",
    },
    wipe: false,
    keywords: ["سب", "شتم", "قذف", "تنمر", "اخلاق"],
  },
  {
    id: "bank-robbery",
    category: "crime",
    title: "قوانين السطو",
    description: "تجاوز العدد المسموح به في السطو أو استخدام أسلحة غير مصرح بها في السيناريو.",
    penalties: {
      first: "سجن 90 دقيقة + مصادرة",
      second: "حظر يومين",
      third: "حظر 5 أيام",
    },
    wipe: false,
    keywords: ["بنك", "سرقة", "سطو", "رهينة", "خطف"],
  },
];

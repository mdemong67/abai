/** Albums sourced from https://abai.ie/ photo & video gallery structure */

export const portfolioMeta = {
  en: {
    title: "Our portfolio",
    intro:
      "Explore ABAI's photo and video archives — decades of cultural programmes, community picnics, executive meetings, sports, and national celebrations across Ireland.",
    photoGallery: "Photo gallery",
    videoGallery: "Video gallery",
    filterAll: "All albums",
    searchPlaceholder: "Search events, years, places…",
    photosLabel: "photos",
    viewAlbum: "View album",
    close: "Close",
    prev: "Previous",
    next: "Next",
    yearsHeading: "Browse by year",
    categoriesHeading: "Categories",
    stats: [
      { value: "20+", label: "Photo albums" },
      { value: "2007", label: "Community since" },
      { value: "1", label: "Video gallery" },
      { value: "Ireland", label: "Nationwide events" },
    ],
    videoTitle: "Video gallery",
    videoText:
      "Relive community moments through ABAI video highlights — event recordings, cultural performances, and committee addresses shared with members.",
    videoCta: "Video highlights coming soon",
    archiveNote:
      "Albums mirror the heritage collections published on abai.ie, preserving Bangladeshi diaspora history in Ireland for members and future generations.",
    empty: "No albums match your search. Try another year or category.",
  },
  bn: {
    title: "আমাদের পোর্টফোলিও",
    intro:
      "ABAI-র ছবি ও ভিডিও আর্কাইভ অন্বেষণ করুন — আয়ারল্যান্ড জুড়ে দশকের সাংস্কৃতিক অনুষ্ঠান, পিকনিক, কার্যনির্বাহী সভা, ক্রীড়া ও জাতীয় উদযাপন।",
    photoGallery: "ফটো গ্যালারি",
    videoGallery: "ভিডিও গ্যালারি",
    filterAll: "সব অ্যালবাম",
    searchPlaceholder: "ইভেন্ট, বছর, স্থান খুঁজুন…",
    photosLabel: "ছবি",
    viewAlbum: "অ্যালবাম দেখুন",
    close: "বন্ধ",
    prev: "আগের",
    next: "পরের",
    yearsHeading: "বছর অনুযায়ী",
    categoriesHeading: "বিভাগ",
    stats: [
      { value: "২০+", label: "ফটো অ্যালবাম" },
      { value: "২০০৭", label: "কমিউনিটি থেকে" },
      { value: "১", label: "ভিডিও গ্যালারি" },
      { value: "আয়ারল্যান্ড", label: "দেশব্যাপী ইভেন্ট" },
    ],
    videoTitle: "ভিডিও গ্যালারি",
    videoText:
      "ABAI ভিডিও হাইলাইটের মাধ্যমে কমিউনিটি মুহূর্ত — ইভেন্ট রেকর্ডিং, সাংস্কৃতিক অনুষ্ঠান ও কমিটির বাণী সদস্যদের সাথে ভাগ করা হয়।",
    videoCta: "ভিডিও হাইলাইট শীঘ্রই",
    archiveNote:
      "অ্যালবামগুলো abai.ie-তে প্রকাশিত ঐতিহ্য সংগ্রহের প্রতিফলন — আয়ারল্যান্ডে বাংলাদেশি প্রবাসী ইতিহাস সদস্য ও ভবিষ্যৎ প্রজন্মের জন্য সংরক্ষিত।",
    empty: "আপনার অনুসন্ধানে কোনো অ্যালবাম নেই। অন্য বছর বা বিভাগ চেষ্টা করুন।",
  },
};

export const categoryKeys = ["all", "cultural", "community", "sports", "committee", "religious", "diplomatic"];

export const categories = {
  en: {
    all: "All",
    cultural: "Cultural & national days",
    community: "Mela, picnic & AGM",
    sports: "Sports & matches",
    committee: "Executive committee",
    religious: "Religious programmes",
    diplomatic: "Diplomatic visits",
  },
  bn: {
    all: "সব",
    cultural: "সাংস্কৃতিক ও জাতীয় দিবস",
    community: "মেলা, পিকনিক ও AGM",
    sports: "ক্রীড়া ও ম্যাচ",
    committee: "কার্যনির্বাহী কমিটি",
    religious: "ধর্মীয় অনুষ্ঠান",
    diplomatic: "কূটনৈতিক সফর",
  },
};

export const portfolioAlbums = [
  {
    id: "ec-election-2022",
    year: 2022,
    category: "committee",
    featured: true,
    photoCount: 24,
    location: { en: "Ireland", bn: "আয়ারল্যান্ড" },
    title: {
      en: "Executive committee election 2022",
      bn: "কার্যনির্বাহী কমিটি নির্বাচন ২০২২",
    },
    description: {
      en: "ABAI formed its second executive committee after the election on 11 September 2022. The new committee began work immediately, continuing transparent community leadership.",
      bn: "১১ সেপ্টেম্বর ২০২২ নির্বাচনের পর ABAI দ্বিতীয় কার্যনির্বাহী কমিটি গঠন করে। নতুন কমিটি তৎক্ষণাৎ কাজ শুরু করে স্বচ্ছ কমিউনিটি নেতৃত্ব অব্যাহত রাখে।",
    },
  },
  {
    id: "independence-day-2012",
    year: 2012,
    category: "cultural",
    featured: true,
    photoCount: 18,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: {
      en: "Independence Day celebration",
      bn: "স্বাধীনতা দিবস উদযাপন",
    },
    description: {
      en: "Community celebration of Bangladesh Independence Day with families, flags, cultural performances, and speeches honouring national heritage in Ireland.",
      bn: "আয়ারল্যান্ডে জাতীয় ঐতিহ্যের সম্মানে পরিবার, পতাকা, সাংস্কৃতিক অনুষ্ঠান ও বক্তৃতাসহ বাংলাদেশ স্বাধীনতা দিবস উদযাপন।",
    },
  },
  {
    id: "ekushey-2012",
    year: 2012,
    category: "cultural",
    photoCount: 16,
    location: { en: "Ireland-wide", bn: "সারা আয়ারল্যান্ড" },
    title: { en: "Ekushey February 2012", bn: "একুশে ফেব্রুয়ারি ২০১২" },
    description: {
      en: "International Mother Language Day observance — paying tribute to the Language Movement and celebrating Bangla heritage with the diaspora.",
      bn: "আন্তর্জাতিক মাতৃভাষা দিবস পালন — ভাষা আন্দোলনের প্রতি শ্রদ্ধা ও প্রবাসী সম্প্রদায়ের সাথে বাংলা ঐতিহ্য উদযাপন।",
    },
  },
  {
    id: "bsai-meeting-2012",
    year: 2012,
    category: "committee",
    photoCount: 10,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: { en: "BSAI meeting — 5 March 2012", bn: "BSAI সভা — ৫ মার্চ ২০১২" },
    description: {
      en: "Coordination meeting with Bangladeshi community stakeholders to plan joint programmes and welfare initiatives.",
      bn: "যৌথ কর্মসূচি ও কল্যাণ উদ্যোগ পরিকল্পনায় বাংলাদেশি কমিউনিটি অংশীদারদের সাথে সমন্বয় সভা।",
    },
  },
  {
    id: "tafseer-mahfil-1",
    year: 2012,
    category: "religious",
    photoCount: 12,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: { en: "Tafseer mahfil 1", bn: "তাফসীর মাহফিল ১" },
    description: {
      en: "Religious gathering for Quranic reflection and community fellowship, part of ABAI's spiritual programme calendar.",
      bn: "কুরআনি চিন্তাভাবনা ও কমিউনিটি মৈত্রীর ধর্মীয় সমাবেশ — ABAI-র আধ্যাত্মিক কর্মসূচির অংশ।",
    },
  },
  {
    id: "tafseer-mahfil-2",
    year: 2012,
    category: "religious",
    photoCount: 12,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: { en: "Tafseer mahfil 2", bn: "তাফসীর মাহফিল ২" },
    description: {
      en: "Second tafseer mahfil of the year — continuing religious education and unity among members.",
      bn: "বছরের দ্বিতীয় তাফসীর মাহফিল — সদস্যদের মধ্যে ধর্মশিক্ষা ও ঐক্য অব্যাহত।",
    },
  },
  {
    id: "interview-harrington",
    year: 2012,
    category: "diplomatic",
    photoCount: 8,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: {
      en: "Interview with Ms. Harrington",
      bn: "মিস হ্যারিংটনের সাক্ষাৎকার",
    },
    description: {
      en: "Community engagement session documenting dialogue with local representatives and integration initiatives.",
      bn: "স্থানীয় প্রতিনিধিদের সাথে সংলাপ ও একীভবন উদ্যোগ নথিভুক্তকরণে কমিউনিটি সংলাপ।",
    },
  },
  {
    id: "ec-meetings",
    year: 2012,
    category: "committee",
    photoCount: 14,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: {
      en: "Executive committee meetings",
      bn: "কার্যনির্বাহী কমিটি সভা",
    },
    description: {
      en: "Photographs from executive committee meetings — planning events, membership drives, and transparent governance.",
      bn: "কার্যনির্বাহী কমিটি সভার ছবি — ইভেন্ট, সদস্য সংগ্রহ ও স্বচ্ছ পরিচালনা পরিকল্পনা।",
    },
  },
  {
    id: "mela-2011",
    year: 2011,
    category: "community",
    featured: true,
    photoCount: 22,
    location: { en: "St Anne's Park, Raheny, Dublin 16", bn: "সেন্ট অ্যান্স পার্ক, রাহনি, ডাবলিন ১৬" },
    title: {
      en: "Community mela — 18 July 2011",
      bn: "কমিউনিটি মেলা — ১৮ জুলাই ২০১১",
    },
    description: {
      en: "Summer mela at St Anne's Park with food stalls, children's activities, Bangla music, and families from across the community.",
      bn: "সেন্ট অ্যান্স পার্কে গ্রীষ্মকালীন মেলা — খাবার স্টল, শিশু কার্যক্রম, বাংলা গান ও সারা কমিউনিটির পরিবার।",
    },
  },
  {
    id: "high-commission-visit-2010",
    year: 2010,
    category: "diplomatic",
    photoCount: 15,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: {
      en: "Bangladesh High Commission visit",
      bn: "বাংলাদেশ হাই কমিশন সফর",
    },
    description: {
      en: "Visit of the Bangladesh High Commission to Dublin — strengthening ties between the diaspora and diplomatic mission.",
      bn: "ডাবলিনে বাংলাদেশ হাই কমিশনের সফর — প্রবাসী ও কূটনৈতিক মিশনের সম্পর্ক দৃঢ় করা।",
    },
  },
  {
    id: "high-commission-reception-2010",
    year: 2010,
    category: "diplomatic",
    photoCount: 12,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: {
      en: "High Commission reception by ABAI",
      bn: "ABAI-র হাই কমিশন রিসেপশন",
    },
    description: {
      en: "ABAI-hosted reception welcoming diplomatic guests and celebrating shared Bangladeshi identity in Ireland.",
      bn: "কূটনৈতিক অতিথি স্বাগত ও আয়ারল্যান্ডে বাংলাদেশি পরিচয় উদযাপনে ABAI-র আয়োজিত রিসেপশন।",
    },
  },
  {
    id: "chess-2010",
    year: 2010,
    category: "sports",
    photoCount: 10,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: { en: "Chess competition 2010", bn: "দাবা প্রতিযোগিতা ২০১০" },
    description: {
      en: "Community chess tournament bringing together youth and elders for friendly competition and social bonding.",
      bn: "যুব ও বয়স্কদের বন্ধুত্বপূর্ণ প্রতিযোগিতা ও সামাজিক বন্ধনে কমিউনিটি দাবা টুর্নামেন্ট।",
    },
  },
  {
    id: "dublin-killarney-2009",
    year: 2009,
    category: "sports",
    photoCount: 20,
    location: { en: "Dublin & Killarney", bn: "ডাবলিন ও কিলার্নি" },
    title: {
      en: "Match — Dublin vs Killarney",
      bn: "ম্যাচ — ডাবলিন বনাম কিলার্নি",
    },
    description: {
      en: "Inter-city community football match fostering camaraderie between Bangladeshi groups across Ireland.",
      bn: "আয়ারল্যান্ড জুড়ে বাংলাদেশি দলের মধ্যে বন্ধুত্বে আন্তঃনগর ফুটবল ম্যাচ।",
    },
  },
  {
    id: "cmc-inauguration-2009",
    year: 2009,
    category: "religious",
    photoCount: 14,
    location: { en: "Clondalkin", bn: "ক্লনডালকিন" },
    title: {
      en: "Inauguration of Clondalkin Muslim Center",
      bn: "ক্লনডালকিন মুসলিম সেন্টার উদ্বোধন",
    },
    description: {
      en: "Community attendance at the inauguration ceremony of the Clondalkin Muslim Center — interfaith solidarity.",
      bn: "ক্লনডালকিন মুসলিম সেন্টার উদ্বোধনী অনুষ্ঠানে কমিউনিটি উপস্থিতি — আন্তধর্মীয় ঐক্য।",
    },
  },
  {
    id: "boishakhi-picnic-2009",
    year: 2009,
    category: "community",
    featured: true,
    photoCount: 26,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: {
      en: "Pohela Boishakh mela & picnic 2009",
      bn: "পহেলা বৈশাখ মেলা ও পিকনিক ২০০৯",
    },
    description: {
      en: "Combined Pohela Boishakh celebration and family picnic — colours, traditional dress, food, and Bangla New Year joy.",
      bn: "পহেলা বৈশাখ ও পারিবারিক পিকনিক — রং, ঐতিহ্যবাহী পোশাক, খাবার ও নববর্ষের আনন্দ।",
    },
  },
  {
    id: "agm-2009",
    year: 2009,
    category: "committee",
    photoCount: 12,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: { en: "Annual general meeting 2009", bn: "বার্ষিক সাধারণ সভা ২০০৯" },
    description: {
      en: "AGM photographs documenting member participation, reports, and democratic decision-making.",
      bn: "সদস্য অংশগ্রহণ, প্রতিবেদন ও গণতান্ত্রিক সিদ্ধান্ত নথিভুক্তকরণে AGM-র ছবি।",
    },
  },
  {
    id: "cricket-team-2008",
    year: 2008,
    category: "sports",
    photoCount: 16,
    location: { en: "Ireland", bn: "আয়ারল্যান্ড" },
    title: {
      en: "Bangladesh A cricket team in Ireland",
      bn: "আয়ারল্যান্ডে বাংলাদেশ এ ক্রিকেট দল",
    },
    description: {
      en: "Visit and matches involving the Bangladesh A cricket team — celebrating sport and national pride abroad.",
      bn: "বাংলাদেশ এ ক্রিকেট দলের সফর ও ম্যাচ — বিদেশে ক্রীড়া ও জাতীয় গৌরব উদযাপন।",
    },
  },
  {
    id: "picnic-2008",
    year: 2008,
    category: "community",
    photoCount: 18,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: { en: "Community picnic 2008", bn: "কমিউনিটি পিকনিক ২০০৮" },
    description: {
      en: "Annual summer picnic for members and families — outdoor games, BBQ, and children's activities.",
      bn: "সদস্য ও পরিবারের বার্ষিক গ্রীষ্মকালীন পিকনিক — খোলা খেলা, বারবিকিউ ও শিশু কার্যক্রম।",
    },
  },
  {
    id: "flood-fundraising-2008",
    year: 2008,
    category: "community",
    photoCount: 10,
    location: { en: "Ireland-wide", bn: "সারা আয়ারল্যান্ড" },
    title: {
      en: "Fundraising for Bangladesh flood victims",
      bn: "বাংলাদেশ বন্যা ক্ষতিগ্রস্তদের তহবিল",
    },
    description: {
      en: "Community fundraising drive supporting Bangladeshi flood and natural disaster victims — solidarity from Ireland.",
      bn: "বাংলাদেশি বন্যা ও দুর্যোগ ক্ষতিগ্রস্তদের সহায়তায় তহবিল — আয়ারল্যান্ড থেকে সংহতি।",
    },
  },
  {
    id: "eid-2007",
    year: 2007,
    category: "religious",
    photoCount: 14,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: { en: "Eid get-together 2007", bn: "ঈদ মিলনমেলা ২০০৭" },
    description: {
      en: "Eid community gathering after Ramadan — shared meals, prayers, and celebration with families.",
      bn: "রমজানের পর ঈদ কমিউনিটি সমাবেশ — ভাগাভাগি খাবার, প্রার্থনা ও পারিবারিক উদযাপন।",
    },
  },
  {
    id: "picnic-2007",
    year: 2007,
    category: "community",
    photoCount: 15,
    location: { en: "Dublin", bn: "ডাবলিন" },
    title: { en: "Community picnic 2007", bn: "কমিউনিটি পিকনিক ২০০৭" },
    description: {
      en: "Founding-era community picnic as ABAI established its presence among Bangladeshi families in Ireland.",
      bn: "ABAI আয়ারল্যান্ডে বাংলাদেশি পরিবারের মধ্যে প্রতিষ্ঠার প্রাথমিক যুগের কমিউনিটি পিকনিক।",
    },
  },
];

export const portfolioYears = [...new Set(portfolioAlbums.map((a) => a.year))].sort((a, b) => b - a);

export const categoryAccent = {
  cultural: { bg: "bg-[#0757ff]", ring: "ring-[#0757ff]/30", text: "text-[#0757ff]" },
  community: { bg: "bg-[#009b5a]", ring: "ring-[#009b5a]/30", text: "text-[#009b5a]" },
  sports: { bg: "bg-[#e85d04]", ring: "ring-[#e85d04]/30", text: "text-[#e85d04]" },
  committee: { bg: "bg-[#6c151c]", ring: "ring-[#6c151c]/30", text: "text-[#6c151c]" },
  religious: { bg: "bg-[#7c3aed]", ring: "ring-[#7c3aed]/30", text: "text-[#7c3aed]" },
  diplomatic: { bg: "bg-[#0891b2]", ring: "ring-[#0891b2]/30", text: "text-[#0891b2]" },
};

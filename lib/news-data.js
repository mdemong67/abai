const newsMeta = {
  en: {
    title: "Latest News & Updates",
    intro: "Stay informed about our latest announcements, press releases, and community updates.",
    stats: [
      { value: "100+", label: "News Articles" },
      { value: "50k+", label: "Readers" },
      { value: "24/7", label: "Coverage" },
      { value: "5", label: "Years Published" },
    ],
    categoriesHeading: "Categories",
    yearsHeading: "Archive",
    filterAll: "All",
    searchPlaceholder: "Search news articles...",
    empty: "No news found. Please try a different search or filter.",
    photoGallery: "articles",
    photosLabel: "min read",
    viewAlbum: "Read Article",
    videoGallery: "Watch",
    videoTitle: "Latest Highlights",
    videoText: "Watch our latest community highlights and updates.",
    videoCta: "Coming Soon",
    archiveNote: "Looking for older news? Check our complete archive.",
    viewEvent: "Read Article",
  },
  bn: {
    title: "সর্বশেষ খবর ও আপডেট",
    intro: "আমাদের সর্বশেষ ঘোষণা, প্রেস রিলিজ এবং কমিউনিটি আপডেট সম্পর্কে অবহিত থাকুন।",
    stats: [
      { value: "১০০+", label: "খবরের প্রবন্ধ" },
      { value: "৫০k+", label: "পাঠক" },
      { value: "২৪/৭", label: "কভারেজ" },
      { value: "৫", label: "বছর প্রকাশিত" },
    ],
    categoriesHeading: "বিভাগ",
    yearsHeading: "আর্কাইভ",
    filterAll: "সব",
    searchPlaceholder: "খবরের প্রবন্ধ অনুসন্ধান করুন...",
    empty: "কোন খবর পাওয়া যায়নি। অনুগ্রহ করে ভিন্ন অনুসন্ধান বা ফিল্টার চেষ্টা করুন।",
    photoGallery: "প্রবন্ধ",
    photosLabel: "মিনিট পড়া",
    viewAlbum: "প্রবন্ধ পড়ুন",
    videoGallery: "দেখুন",
    videoTitle: "সর্বশেষ হাইলাইটস",
    videoText: "আমাদের সর্বশেষ কমিউনিটি হাইলাইটস এবং আপডেট দেখুন।",
    videoCta: "শীঘ্রই আসছে",
    archiveNote: "পুরনো খবর খুঁজছেন? আমাদের সম্পূর্ণ আর্কাইভ দেখুন।",
    viewEvent: "প্রবন্ধ পড়ুন",
  },
};

const newsCategories = {
  en: {
    all: "All",
    announcement: "Announcement",
    press: "Press",
    update: "Update",
    event: "Event",
  },
  bn: {
    all: "সব",
    announcement: "ঘোষণা",
    press: "প্রেস",
    update: "আপডেট",
    event: "ইভেন্ট",
  },
};

const newsCategoryKeys = ["all", "announcement", "press", "update", "event"];

const newsCategoryAccent = {
  announcement: { bg: "bg-[#4b0102]", color: "#4b0102" },
  press: { bg: "bg-[#009b5a]", color: "#009b5a" },
  update: { bg: "bg-[#1e40af]", color: "#1e40af" },
  event: { bg: "bg-[#c2410c]", color: "#c2410c" },
};

const newsYears = [2026, 2025, 2024];

const newsItems = [
  {
    id: 1,
    title: { en: "ABAI Community Celebrates 10th Anniversary", bn: "ABAI কমিউনিটি ১০তম বার্ষিকী উদযাপন করছে" },
    description: { en: "Join us in celebrating a decade of empowering the Bangladeshi diaspora in Ireland.", bn: "আয়ারল্যান্ডে বাংলাদেশি ডায়াস্পোরাকে ক্ষমতায়িত করার এক দশক উদযাপনে আমাদের সাথে যোগ দিন।" },
    date: { en: "May 20, 2026", bn: "২০ মে, ২০২৬" },
    year: 2026,
    category: "announcement",
    image: "/images/banner-2.jpg",
    content: {
      en: `## A Decade of Community
We are thrilled to celebrate our 10th anniversary this year! Over the past decade, we have seen our community grow from a small group of passionate individuals to a thriving network of thousands across Ireland.

### Highlights of Our Journey
- Hosted over 50 cultural events
- Supported 200+ new arrivals
- Established educational programs for youth
- Built strong partnerships with local authorities

Thank you to everyone who has been part of this amazing journey!`,
      bn: `## কমিউনিটির এক দশক
এই বছর আমাদের ১০তম বার্ষিকী উদযাপন করতে আমরা উন্মুখ! গত এক দশক ধরে, আমরা আমাদের কমিউনিটিকে কয়েকজন উন্মুখ ব্যক্তির ছোট দল থেকে আয়ারল্যান্ড জুড়ে হাজারো মানুষের সমৃদ্ধ নেটওয়ার্কে বিকশিত হতে দেখেছি।

### আমাদের যাত্রার উজ্জ্বল বিন্দু
- ৫০টিরও বেশি সাংস্কৃতিক অনুষ্ঠান আয়োজন করেছে
- ২০০+ নতুন আগন্তুককে সমর্থন করেছে
- যুবকদের জন্য শিক্ষামূলক প্রোগ্রাম প্রতিষ্ঠিত করেছে
- স্থানীয় কর্তৃপক্ষের সাথে শক্তিশালী অংশীদারিত্ব গড়ে তুলেছি

এই আশ্চর্যজনক যাত্রার অংশ ছিল এমন সবাইকে ধন্যবাদ!`
    },
    author: "Admin Team",
    authorRole: "admin",
    location: { en: "Dublin, Ireland", bn: "ডাবলিন, আয়ারল্যান্ড" },
    tags: ["anniversary", "celebration", "community"],
    readTime: "5",
    featured: true,
  },
  {
    id: 2,
    title: { en: "New Partnership with Dublin City Council", bn: "ডাবলিন সিটি কাউন্সিলের সাথে নতুন অংশীদারিত্ব" },
    description: { en: "We are excited to announce our new partnership with Dublin City Council.", bn: "ডাবলিন সিটি কাউন্সিলের সাথে আমাদের নতুন অংশীদারিত্ব ঘোষণা করতে আমরা উন্মুখ।" },
    date: { en: "May 15, 2026", bn: "১৫ মে, ২০২৬" },
    year: 2026,
    category: "press",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## New Partnership Announcement
We are proud to announce our official partnership with Dublin City Council! This collaboration will allow us to expand our community services and reach even more people in need.

### What This Means
- More funding for cultural events
- Additional support for integration programs
- Access to new community spaces

This is a significant milestone for our organization and we are excited for what the future holds!`,
      bn: `## নতুন অংশীদারিত্বের ঘোষণা
ডাবলিন সিটি কাউন্সিলের সাথে আমাদের অফিসিয়াল অংশীদারিত্ব ঘোষণা করতে আমরা গর্বিত! এই সহযোগিতা আমাদেরকে আমাদের কমিউনিটি পরিষেবাগুলোকে প্রসারিত করতে এবং আরও বেশি প্রয়োজনীয় মানুষের কাছে পৌঁছাতে সাহায্য করবে।

### এর অর্থ কী
- সাংস্কৃতিক অনুষ্ঠানের জন্য আরও তহবিল
- ইন্টিগ্রেশন প্রোগ্রামের জন্য অতিরিক্ত সহায়তা
- নতুন কমিউনিটি স্পেসে অ্যাক্সেস

এটি আমাদের সংস্থার জন্য একটি গুরুত্বপূর্ণ মাইলফলক এবং ভবিষ্যতের জন্য আমরা উন্মুখ!`
    },
    author: "Moderator User",
    authorRole: "moderator",
    location: { en: "Dublin, Ireland", bn: "ডাবলিন, আয়ারল্যান্ড" },
    tags: ["partnership", "dublin", "council"],
    readTime: "3",
    featured: false,
  },
  {
    id: 3,
    title: { en: "Summer Festival 2026: Save the Date!", bn: "সামার ফেস্টিভ্যাল ২০২৬: তারিখটি সংরক্ষণ করুন!" },
    description: { en: "Mark your calendars for our biggest event of the year.", bn: "বছরের আমাদের সবচেয়ে বড় অনুষ্ঠানের জন্য আপনার ক্যালেন্ডার চিহ্নিত করুন।" },
    date: { en: "May 10, 2026", bn: "১০ মে, ২০২৬" },
    year: 2026,
    category: "event",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Summer Festival 2026
Get ready for the biggest event of the year! Our annual Summer Festival is happening on July 20th at Phoenix Park.

### Event Details
- **Date**: July 20th, 2026
- **Time**: 12:00 PM - 8:00 PM
- **Location**: Phoenix Park, Dublin
- **Entry**: Free for all!

### Activities
- Traditional music and dance
- Authentic Bangladeshi cuisine
- Children's activities
- Community stalls

We can't wait to see you there!`,
      bn: `## সামার ফেস্টিভ্যাল ২০২৬
বছরের সবচেয়ে বড় অনুষ্ঠানের জন্য প্রস্তুত হোন! আমাদের বার্ষিক সামার ফেস্টিভ্যাল ২০ জুলাই ফিনিক্স পার্কে হচ্ছে।

### অনুষ্ঠানের বিস্তারিত
- **তারিখ**: ২০ জুলাই, ২০২৬
- **সময়**: বিকেল ১২টা - রাত ৮টা
- **স্থান**: ফিনিক্স পার্ক, ডাবলিন
- **প্রবেশ**: সবার জন্য বিনামূল্যে!

### কার্যক্রম
- প্রথাগত সঙ্গীত ও নৃত্য
- খাঁটি বাংলাদেশি রন্ধনপ্রণালী
- শিশুদের কার্যক্রম
- কমিউনিটি স্টল

সেখানে আপনাদের দেখার জন্য আমরা অপেক্ষা করছি না!`
    },
    author: "Regular Member",
    authorRole: "member",
    location: { en: "Dublin, Ireland", bn: "ডাবলিন, আয়ারল্যান্ড" },
    tags: ["festival", "summer", "phoenix park"],
    readTime: "2",
    featured: true,
  },
  {
    id: 4,
    title: { en: "Website Update: New Features Added", bn: "ওয়েবসাইট আপডেট: নতুন ফিচার যোগ করা হয়েছে" },
    description: { en: "We have launched several new features on our website.", bn: "আমাদের ওয়েবসাইটে বেশ কয়েকটি নতুন ফিচার লঞ্চ করেছি।" },
    date: { en: "May 05, 2026", bn: "০৫ মে, ২০২৬" },
    year: 2026,
    category: "update",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Website Update
We are excited to announce a major update to our website! Here's what's new:

### New Features
- Improved event registration system
- Enhanced gallery functionality
- Mobile-responsive design
- New community forum section

We hope you enjoy the new experience! Let us know if you have any feedback.`,
      bn: `## ওয়েবসাইট আপডেট
আমাদের ওয়েবসাইটের একটি বড় আপডেট ঘোষণা করতে আমরা উন্মুখ! নতুন কী আছে এখানে:

### নতুন ফিচার
- উন্নত ইভেন্ট রেজিস্ট্রেশন সিস্টেম
- বর্ধিত গ্যালারি কার্যকারিতা
- মোবাইল-রেসপনসিভ ডিজাইন
- নতুন কমিউনিটি ফোরাম সেকশন

আমরা আশা করি আপনি নতুন অভিজ্ঞতাটি উপভোগ করবেন! আপনার কোন ফিডব্যাক থাকলে আমাদেরকে জানান।`
    },
    author: "Admin Team",
    authorRole: "admin",
    location: { en: "Dublin, Ireland", bn: "ডাবলিন, আয়ারল্যান্ড" },
    tags: ["website", "update", "technology"],
    readTime: "2",
    featured: false,
  },
  {
    id: 5,
    title: { en: "Family of Belfast knife attack victim appeal for calm; protests in Dublin at Leinster House", bn: "বেলফাস্টে ছুরিকাঘাতের শিকার পরিবারের শান্তির আবেদন; ডাবলিনের লেয়ার্সটার হাউসে বিক্ষোভ" },
    description: { en: "Family members of the victim urge peaceful resolution after Monday's knife attack, as street protests escalate outside Leinster House in Dublin.", bn: "ডাবলিনের লেয়ার্সটার হাউসের বাইরে বিক্ষোভ ছড়িয়ে পড়ায় সোমবারের ছুরিকাঘাতের ঘটনায় আক্রান্তের পরিবারের শান্ত থাকার আহ্বান।" },
    date: { en: "June 9, 2026", bn: "৯ জুন, ২০২৬" },
    year: 2026,
    category: "press",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Call for Calm and Peace
The family of a man critically injured in a knife attack in Belfast has appealed for calm following a night of violence and street protests outside Leinster House in Dublin.

### Key Highlights
- Family urges peaceful resolution and dialogue
- Police units deployed across Dublin city centre to maintain order
- Leaders call on communities to remain united during investigation

Police and community workers have asked residents to cooperate fully with the authorities.`,
      bn: `## শান্তি ও ঐক্যের আহ্বান
ডাবলিনের লেয়ার্সটার হাউসের বাইরে বিক্ষোভ ও সহিংসতার রাতে বেলফাস্টে ছুরিকাঘাতে মারাত্মকভাবে আহত এক ব্যক্তির পরিবার শান্তির আবেদন জানিয়েছে।

### মূল বিষয়বস্তু
- পরিবার থেকে শান্তিপূর্ণ সমাধান এবং আলোচনার আহ্বান
- আইনশৃঙ্খলা বজায় রাখতে ডাবলিন শহরের কেন্দ্রস্থলে পুলিশ মোয়েন
- তদন্ত চলাকালে নেতাদের ঐক্যবদ্ধ থাকার আহ্বান

পুলিশ ও সমাজকর্মীরা বাসিন্দাদের আইন শৃঙ্খলা রক্ষাকারী বাহিনীর সঙ্গে সহযোগিতা করার অনুরোধ জানিয়েছেন।`
    },
    author: "RTE News",
    authorRole: "moderator",
    location: { en: "Belfast & Dublin", bn: "বেলফাস্ট ও ডাবলিন" },
    tags: ["ireland", "protests", "belfast"],
    readTime: "4",
    featured: true,
  },
  {
    id: 6,
    title: { en: "Girl injured in Parnell Square stabbing now non-verbal and in a wheelchair, mother tells court", bn: "পার্নেল স্কোয়ারে ছুরিকাঘাতে আহত মেয়েটি এখন বাকশক্তিহীন ও হুইলচেয়ারে, আদালতে মা" },
    description: { en: "The mother of the young girl injured in the Parnell Square stabbing incident last year tells court she is now non-verbal.", bn: "গত বছর পার্নেল স্কোয়ারে ছুরিকাঘাতের ঘটনায় আহত তরুণীর মা আদালতে জানিয়েছেন যে তার মেয়ে এখন বাকশক্তিহীন।" },
    date: { en: "June 8, 2026", bn: "৮ জুন, ২০২৬" },
    year: 2026,
    category: "update",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Court Update on Parnell Square Recovery
In an emotional court hearing, the mother of the young girl stabbed in Parnell Square shared details of her recovery, stating that the child is now non-verbal and requires a wheelchair for mobility.

### Medical & Rehabilitation Progress
- Ongoing physical therapy sessions in Dublin
- Support from community rehabilitation teams
- Family expresses gratitude for public solidarity and donations

The court was updated on the long-term support required for her continuing rehabilitation.`,
      bn: `## পার্নেল স্কোয়ার সুস্থতার বিষয়ে আদালত আপডেট
একটি আবেগঘন আদালতের শুনানিতে, পার্নেল স্কোয়ারে ছুরিকাহত তরুণীর মা তার সুস্থতার বিবরণ শেয়ার করেছেন, এবং জানিয়েছেন যে শিশুটি এখন বাকশক্তিহীন এবং চলাচলের জন্য হুইলচেয়ার প্রয়োজন।

### চিকিৎসাগত ও পুনর্বাসন অগ্রগতি
- ডাবলিনে চলমান থেরাপি সেশন
- কমিউনিটি পুনর্বাসন দলের সমর্থন
- জনগণের সহানুভূতি ও অনুদানের জন্য পরিবারের কৃতজ্ঞতা প্রকাশ

তার দীর্ঘমেয়াদী পুনর্বাসনের জন্য প্রয়োজনীয় সহায়তার বিষয়ে আদালতকে অবহিত করা হয়েছে।`
    },
    author: "Irish Times",
    authorRole: "moderator",
    location: { en: "Dublin Court", bn: "ডাবলিন আদালত" },
    tags: ["court", "parnell square", "update"],
    readTime: "6",
    featured: false,
  },
  {
    id: 7,
    title: { en: "Leaving Cert: History paper was 'very challenging'; mixed reactions to French exam", bn: "লিভিং সার্টিফিকেট: ইতিহাসের প্রশ্নপত্র 'খুবই চ্যালেঞ্জিং' ছিল; ফরাসি পরীক্ষায় মিশ্র প্রতিক্রিয়া" },
    description: { en: "Students voice concerns over difficult questions in this year's Leaving Cert History exam, while French exam receives mixed reviews.", bn: "শিক্ষার্থীরা এ বছরের লিভিং সার্টিফিকেট ইতিহাস পরীক্ষায় কঠিন প্রশ্ন নিয়ে উদ্বেগ প্রকাশ করেছে, অন্যদিকে ফরাসি পরীক্ষা মিশ্র প্রতিক্রিয়া পেয়েছে।" },
    date: { en: "June 8, 2026", bn: "৮ জুন, ২০২৬" },
    year: 2026,
    category: "update",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Exam Season Challenges
Leaving Certificate students faced a 'challenging' history paper on Tuesday, according to teachers and subject experts. The examination featured complex topics that tested students' analytical skills.

### Exam Details and Student Feedback
- History paper required intensive essay preparation and critical analysis
- French paper received warmer reactions, described as fair and balanced
- Teachers offer tips on maintaining focus for upcoming chemistry and physics papers

Exam review sessions will continue throughout the week across schools in Ireland.`,
      bn: `## পরীক্ষার মৌসুমের চ্যালেঞ্জ
শিক্ষক ও বিষয় বিশেষজ্ঞদের মতে, লিভিং সার্টিফিকেট শিক্ষার্থীরা মঙ্গলবার একটি 'চ্যান্ডেলিং' ইতিহাস পরীক্ষার মুখোমুখি হয়েছে। পরীক্ষাটিতে জটিল বিষয়বস্তু ছিল যা শিক্ষার্থীদের বিশ্লেষণমূলক দক্ষতা যাচাই করেছে।

### পরীক্ষা এবং শিক্ষার্থীদের প্রতিক্রিয়া
- ইতিহাস পরীক্ষায় গভীর প্রবন্ধ প্রস্তুতি ও সমালোচনামূলক বিশ্লেষণের প্রয়োজন ছিল
- ফরাসি পরীক্ষা ভালো সাড়া পেয়েছে, প্রশ্ন তুলনামূলক সহজ ও ভারসাম্যপূর্ণ ছিল
- আসন্ন রসায়ন ও পদার্থবিদ্যা পরীক্ষার জন্য শিক্ষকেরা মনোযোগী থাকার পরামর্শ দিয়েছেন

আয়ারল্যান্ড জুড়ে স্কুলগুলোতে সপ্তাহব্যাপী পরীক্ষার মূল্যায়ন সেশন চলতে থাকবে।`
    },
    author: "Independent.ie",
    authorRole: "moderator",
    location: { en: "Ireland", bn: "আয়ারল্যান্ড" },
    tags: ["education", "leaving cert", "exams"],
    readTime: "3",
    featured: false,
  },
  {
    id: 8,
    title: { en: "Man's home 'destroyed, top to bottom' by fire in Belfast violence", bn: "বেলফাস্টে সহিংসতায় আগুনে এক ব্যক্তির বাড়ি 'উপর থেকে নিচ পর্যন্ত ধ্বংস'" },
    description: { en: "A Belfast resident describes the devastating loss of his home after it was targeted during recent street violence.", bn: "সাম্প্রতিক রাস্তার সহিংসতার সময় লক্ষবস্তু হওয়া এক বেলফাস্টের বাসিন্দা তার বাড়ির ধ্বংসলীলার বিবরণ দিয়েছেন।" },
    date: { en: "June 9, 2026", bn: "৯ জুন, ২০২৬" },
    year: 2026,
    category: "update",
    image: "https://images.unsplash.com/photo-1518458084722-68397768a826?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Destruction in Belfast
A Belfast homeowner has spoken of his devastation after his home was completely destroyed in an arson attack during a night of unrest in the city.

### Damage Report
- Fire crews fought for hours to contain the blaze
- Total loss of personal belongings and property structure
- Community steps in to provide temporary shelter and resources

An investigation into the cause of the arson has been opened by local authorities.`,
      bn: `## বেলফাস্টে ক্ষয়ক্ষতি
শহরে সহিংসতার এক রাতে অগ্নিসংযোগের হামলায় তার বাড়ি পুরোপুরি ধ্বংস হয়ে যাওয়ার পর এক বেলফাস্টের গৃহমালিক দুঃখ প্রকাশ করেছেন।

### ক্ষয়ক্ষতির প্রতিবেদন
- আগুন নিয়ন্ত্রণে দমকল বাহিনী ঘণ্টার পর ঘণ্টা লড়াই করেছে
- ব্যক্তিগত জিনিসপত্র এবং বাড়ির কাঠামো সম্পূর্ণরূপে ধ্বংস
- অস্থায়ী আশ্রয় ও সহায়তা নিয়ে এগিয়ে এসেছে স্থানীয় প্রতিবেশী সম্প্রদায়

অগ্নিসংযোগের ঘটনার রহস্য উদ্ঘাটনে স্থানীয় প্রশাসন তদন্ত শুরু করেছে।`
    },
    author: "Irish Examiner",
    authorRole: "moderator",
    location: { en: "Belfast", bn: "বেলফাস্ট" },
    tags: ["belfast", "violence", "arson"],
    readTime: "4",
    featured: false,
  },
  {
    id: 9,
    title: { en: "Inflation in Ireland falls to lowest level in three years, Central Bank reports", bn: "আয়ারল্যান্ডে মুদ্রাস্ফীতি তিন বছরের মধ্যে সর্বনিম্ন স্তরে নেমে এসেছে, সেন্ট্রাল ব্যাংকের রিপোর্ট" },
    description: { en: "Consumer price index drops as energy and transport costs decrease across Ireland, providing relief to households.", bn: "আয়ারল্যান্ড জুড়ে জ্বালানি ও পরিবহন খরচ কমে যাওয়ায় ভোক্তা মূল্য সূচক হ্রাস পেয়েছে, যা পরিবারগুলোকে স্বস্তি দিচ্ছে।" },
    date: { en: "June 7, 2026", bn: "৭ জুন, ২০২৬" },
    year: 2026,
    category: "press",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Inflation Drops to 1.8%
Inflation in Ireland has fallen to its lowest level in three years, driven by a sharp drop in energy and transport costs, the Central Bank reported.

### Key Details
- Consumer Price Index (CPI) falls below target threshold
- Fuel prices see a significant decrease at pumps
- Interest rate adjustments remain under careful review by ECB

Finance analysts expect the easing of inflation to continue through the summer months.`,
      bn: `## মুদ্রাস্ফীতি কমে ১.৮% এ দাঁড়িয়েছে
আয়ারল্যান্ডে মুদ্রাস্ফীতি তিন বছরের মধ্যে সর্বনিম্ন স্তরে নেমে এসেছে, মূলত জ্বালানি ও পরিবহন খরচের তীব্র হ্রাসের কারণে, সেন্ট্রাল ব্যাংক রিপোর্ট করেছে।

### মূল তথ্য
- ভোক্তা মূল্য সূচক (সিপিআই) নির্ধারিত সীমার নিচে নেমে গেছে
- জ্বালানির দাম উল্লেখযোগ্য পরিমাণে কমেছে
- সুদের হার সমন্বয় নিয়ে ইসিবি দ্বারা সতর্ক পর্যালোচনা চলছে

অর্থনীতি বিশ্লেষকরা আশা করছেন যে গ্রীষ্মের মাসগুলোতেও মুদ্রাস্ফীতি হ্রাসের এই ধারা অব্যাহত থাকবে।`
    },
    author: "RTE News",
    authorRole: "moderator",
    location: { en: "Dublin", bn: "ডাবলিন" },
    tags: ["economy", "inflation", "ireland"],
    readTime: "3",
    featured: false,
  },
  {
    id: 10,
    title: { en: "RTE's new summer schedule features major drama and nature documentary series", bn: "আরটিই-র নতুন গ্রীষ্মকালীন সময়সূচীতে বড় নাটক ও প্রকৃতি বিষয়ক প্রামাণ্যচিত্র সিরিজ" },
    description: { en: "The Irish national broadcaster unveils its summer programming line-up, highlighting local stories and environmental features.", bn: "আইরিশ জাতীয় সম্প্রচারকারী প্রতিষ্ঠান তার গ্রীষ্মকালীন অনুষ্ঠানমালার তালিকা উন্মোচন করেছে, যেখানে স্থানীয় গল্প ও পরিবেশের বিষয়গুলো প্রাধান্য পেয়েছে।" },
    date: { en: "June 6, 2026", bn: "৬ জুন, ২০২৬" },
    year: 2026,
    category: "announcement",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Summer Broadcasting Unveiled
RTÉ has officially announced its new summer programming schedule, promising viewers an array of high-quality dramas and stunning nature documentaries.

### Program Highlights
- New five-part drama series set in rural Galway
- Award-winning filmmakers document Atlantic marine life
- Expanded coverage of summer sporting events across Ireland

Broadcasting starts this weekend across all RTÉ channels and player services.`,
      bn: `## গ্রীষ্মকালীন সম্প্রচার সূচী উন্মোচিত
আরটিই আনুষ্ঠানিকভাবে তার নতুন গ্রীষ্মকালীন অনুষ্ঠানসূচী ঘোষণা করেছে, যা দর্শকদের উচ্চমানের নাটক এবং আকর্ষণীয় প্রাকৃতিক প্রামাণ্যচিত্র উপহার দেওয়ার প্রতিশ্রুতি দেয়।

### অনুষ্ঠানের আকর্ষণসমূহ
- গলওয়ের গ্রামাঞ্চলের পটভূমিতে পাঁচ পর্বের নতুন নাটক সিরিজ
- আটলান্টিকের সামুদ্রিক জীববৈচিত্র্য নিয়ে পুরস্কারপ্রাপ্ত নির্মাতাদের প্রামাণ্যচিত্র
- আয়ারল্যান্ড জুড়ে গ্রীষ্মকালীন ক্রীড়া প্রতিযোগিতার বর্ধিত কভারেজ

আরটিই-র সব চ্যানেল এবং প্লেয়ার সার্ভিসে এই সপ্তাহান্ত থেকেই সম্প্রচার শুরু হবে।`
    },
    author: "RTE Entertainment",
    authorRole: "moderator",
    location: { en: "Dublin", bn: "ডাবলিন" },
    tags: ["rte", "media", "entertainment"],
    readTime: "3",
    featured: false,
  },
  {
    id: 11,
    title: { en: "WRC finds McDonald's customer started altercation with security guard", bn: "ডব্লিউআরসি দেখেছে ম্যাকডোনাল্ডসের গ্রাহকই নিরাপত্তা রক্ষীর সাথে ঝগড়া শুরু করেছিলেন" },
    description: { en: "The Workplace Relations Commission rules in favor of security staff after review of security footage in Dublin restaurant case.", bn: "ডাবলিনের রেস্তোরাঁর ঘটনায় নিরাপত্তা ক্যামেরার ফুটেজ পর্যালোচনার পর কর্মক্ষেত্র সম্পর্ক কমিশন নিরাপত্তা কর্মীদের পক্ষে রায় দিয়েছে।" },
    date: { en: "June 8, 2026", bn: "৮ জুন, ২০২৬" },
    year: 2026,
    category: "update",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## WRC Ruling Issued
The Workplace Relations Commission (WRC) has ruled in favor of a security firm, finding that a customer had initiated a physical altercation with a security guard at a McDonald's branch in Dublin.

### Findings of the Investigation
- Video evidence showed the customer initiating the physical push
- Security staff followed correct protocols for de-escalating the situation
- The company's safety measures were found to be compliant

The commission dismissed the customer's claim for compensation.`,
      bn: `## ডব্লিউআরসি-র রায় জারি
ওয়ার্কপ্লেস রিলেশন্স কমিশন (ডব্লিউআরসি) একটি নিরাপত্তা সংস্থার পক্ষে রায় দিয়েছে, এবং দেখেছে যে গ্রাহকই ডাবলিনের ম্যাকডোনাল্ডস শাখায় নিরাপত্তা রক্ষীর সাথে হাতাহাতি শুরু করেছিলেন।

### তদন্তের প্রাপ্ত ফলাফল
- ভিডিও প্রমাণে দেখা গেছে যে গ্রাহকই প্রথমে ধাক্কা দেন
- পরিস্থিতি নিয়ন্ত্রণে নিরাপত্তা কর্মীরা সঠিক নিয়মাবলি অনুসরণ করেছিলেন
- প্রতিষ্ঠানের নিরাপত্তা ব্যবস্থা আইনানুগ ও সঠিক ছিল

কমিশন ক্ষতিপূরণের জন্য গ্রাহকের করা দাবি খারিজ করে দিয়েছে।`
    },
    author: "Irish Times Legal",
    authorRole: "moderator",
    location: { en: "Dublin", bn: "ডাবলিন" },
    tags: ["legal", "wrc", "dublin"],
    readTime: "5",
    featured: false,
  },
  {
    id: 12,
    title: { en: "Irish tourism sector expects record-breaking visitor numbers this summer", bn: "আইরিশ পর্যটন খাত এই গ্রীষ্মে রেকর্ড সংখ্যক দর্শনার্থীর আশা করছে" },
    description: { en: "Fáilte Ireland reports high hotel booking rates along the Wild Atlantic Way and in Dublin city ahead of peak season.", bn: "ফেইল্ট আয়ারল্যান্ড পিক সিজনের আগে ওয়াইল্ড আটলান্টিক ওয়ে এবং ডাবলিন শহরে উচ্চ হোটেল বুকিং রেট রিপোর্ট করেছে।" },
    date: { en: "June 5, 2026", bn: "৫ জুন, ২০২৬" },
    year: 2026,
    category: "press",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Tourism Surge Expected
Ireland is heading towards a bumper tourism season, with early booking numbers pointing to potential record visitor arrivals from North America and Europe.

### Highlights
- Hotels report 92% occupancy rate along the Wild Atlantic Way
- Cultural landmarks and heritage sites plan for longer opening hours
- Local businesses welcome the economic boost to hospitality sector

Tourism agencies urge visitors to book transport and accommodation in advance.`,
      bn: `## পর্যটক বৃদ্ধির সম্ভাবনা
আয়ারল্যান্ড একটি সফল পর্যটন মৌসুমের দিকে এগিয়ে যাচ্ছে, যেখানে প্রাথমিক বুকিংয়ের সংখ্যা উত্তর আমেরিকা ও ইউরোপ থেকে রেকর্ড সংখ্যক দর্শনার্থীর আগমনের ইঙ্গিত দিচ্ছে।

### আকর্ষণসমূহ
- ওয়াইল্ড আটলান্টিক ওয়েতে হোটেলগুলোতে ৯২% বুকিং রেট রিপোর্ট করা হয়েছে
- সাংস্কৃতিক ও ঐতিহ্যবাহী স্থানগুলো দীর্ঘ সময় খোলা রাখার পরিকল্পনা করছে
- আতিথেয়তা খাতে এই অর্থনৈতিক প্রবৃদ্ধিকে স্বাগত জানিয়েছেন স্থানীয় ব্যবসায়ীরা

পর্যটন সংস্থাগুলো দর্শনার্থীদের আগে থেকেই পরিবহন ও আবাসন বুক করার পরামর্শ দিচ্ছে।`
    },
    author: "Fáilte Ireland",
    authorRole: "moderator",
    location: { en: "Ireland", bn: "আয়ারল্যান্ড" },
    tags: ["tourism", "travel", "economy"],
    readTime: "4",
    featured: false,
  },
  {
    id: 13,
    title: { en: "Dublin Tech Summit 2026 hosts global industry leaders to discuss AI future", bn: "ডাবলিন টেক সামিট ২০২৬-এ কৃত্রিম বুদ্ধিমত্তার ভবিষ্যৎ নিয়ে বিশ্ব নেতৃবৃন্দের আলোচনা" },
    description: { en: "Over 5,000 delegates gather at the RDS to explore new developments in AI, cloud computing, and cybersecurity.", bn: "আরডিএস-এ এআই, ক্লাউড কম্পিউটিং এবং সাইবার নিরাপত্তার নতুন বিকাশ নিয়ে আলোচনার জন্য ৫,০০০-এর বেশি প্রতিনিধি একত্রিত হয়েছেন।" },
    date: { en: "June 4, 2026", bn: "৪ জুন, ২০২৬" },
    year: 2026,
    category: "event",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Technology Summit Kicks Off
The Dublin Tech Summit has officially opened, drawing thousands of technology professionals, developers, and entrepreneurs to discuss the next wave of technological innovations.

### Key Discussions
- Ethical guidelines for generative AI models
- Sustainable data storage solutions across European regions
- Bridging the skills gap in advanced computing fields

Several keynote speeches from global tech pioneers will highlight the two-day convention.`,
      bn: `## প্রযুক্তি সম্মেলন শুরু হয়েছে
ডাবলিন টেক সামিট আনুষ্ঠানিকভাবে শুরু হয়েছে, যা প্রযুক্তিবিদ, ডেভেলপার এবং উদ্যোক্তাদের প্রযুক্তিগত উদ্ভাবনের পরবর্তী জোয়ার নিয়ে আলোচনার জন্য একত্রিত করেছে।

### মূল আলোচনার বিষয়
- জেনারেটিভ এআই মডেলের জন্য নৈতিক নির্দেশিকা
- ইউরোপীয় অঞ্চল জুড়ে টেকসই ডেটা স্টোরেজ সমাধান
- উন্নত কম্পিউটিং ক্ষেত্রে দক্ষতার শূন্যতা দূর করা

বিশ্ব প্রযুক্তি পথিকৃৎদের বেশ কয়েকটি মূল বক্তব্য এই দুই দিনের সম্মেলনে প্রাধান্য পাবে।`
    },
    author: "Tech Reporter",
    authorRole: "moderator",
    location: { en: "Dublin, Ireland", bn: "ডাবলিন, আয়ারল্যান্ড" },
    tags: ["tech", "dublin", "ai"],
    readTime: "3",
    featured: false,
  },
  {
    id: 14,
    title: { en: "Bloomsday celebrations return with vibrant literary events across Dublin city", bn: "ডাবলিন শহরজুড়ে প্রাণবন্ত সাহিত্য অনুষ্ঠানের মাধ্যমে ব্লুমসডে উদযাপনের প্রত্যাবর্তন" },
    description: { en: "Literary enthusiasts dress in Edwardian style to retrace Leopold Bloom's steps on June 16th.", bn: "১৬ জুন এডওয়ার্ডিয়ান পোশাক পরে সাহিত্যপ্রেমীরা লিওপোল্ড ব্লুমের পদচিহ্ন অনুসরণ করে পথ চলছেন।" },
    date: { en: "June 3, 2026", bn: "৩ জুন, ২০২৬" },
    year: 2026,
    category: "event",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Celebrating James Joyce
Literary fans from around the world are preparing to descend upon Dublin for the annual Bloomsday festival, celebrating James Joyce's masterpiece Ulysses.

### Festival Details
- Street readings and theatrical performances at Joycean landmarks
- Traditional breakfast gatherings featuring local food
- Guided walks covering historic pathways of the novel

Organizers expect strong international participation this year.`,
      bn: `## জেমস জয়েস উদযাপন
বিশ্বের বিভিন্ন প্রান্ত থেকে সাহিত্যপ্রেমীরা জেমস জয়েসের মাস্টারপিস ইউলিসিস উদযাপনের জন্য বার্ষিক ব্লুমসডে উৎসবে ডাবলিনে আসার প্রস্তুতি নিচ্ছেন।

### উৎসবের বিস্তারিত
- জয়সিয়ান স্মৃতিবিজড়িত স্থানে রাস্তায় পাঠ এবং নাট্য পরিবেশনা
- স্থানীয় খাবার নিয়ে প্রথাগত প্রাতঃরাশ সমাবেশ
- উপন্যাসের ঐতিহাসিক পথগুলো নিয়ে নির্দেশিত পদযাত্রা

আয়োজকেরা এই বছর শক্তিশালী আন্তর্জাতিক অংশগ্রহণের প্রত্যাশা করছেন।`
    },
    author: "Culture Writer",
    authorRole: "moderator",
    location: { en: "Dublin", bn: "ডাবলিন" },
    tags: ["culture", "literature", "festival"],
    readTime: "4",
    featured: false,
  },
  {
    id: 15,
    title: { en: "New cycle corridor plans approved for Cork and Galway to boost green transport", bn: "সবুজ যাতায়াত বাড়াতে কর্ক ও গলওয়ের জন্য নতুন সাইকেল করিডোর পরিকল্পনা অনুমোদিত" },
    description: { en: "Department of Transport announces €15m investment to develop safe and segregated bicycle networks.", bn: "পরিবহন দপ্তর নিরাপদ এবং পৃথক সাইকেল নেটওয়ার্ক গড়ে তোলার জন্য ১৫ মিলিয়ন ইউরো বিনিয়োগের ঘোষণা দিয়েছে।" },
    date: { en: "June 2, 2026", bn: "২ জুন, ২০২৬" },
    year: 2026,
    category: "update",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Green Infrastructure Expansion
Cork and Galway city councils have secured national funding to expand their urban active travel networks, aiming to reduce carbon emissions and vehicle traffic.

### Project Highlights
- Over 25km of new protected cycling lanes
- Smart bicycle traffic signal trials at key intersections
- Improved linkages to public transit terminals and train stations

Construction works are scheduled to begin late next autumn.`,
      bn: `## সবুজ অবকাঠামো সম্প্রসারণ
কার্বন নির্গমন এবং যানবাহন চলাচল হ্রাস করার লক্ষ্যে কর্ক এবং গলওয়ে সিটি কাউন্সিল তাদের নগর সক্রিয় যাতায়াত নেটওয়ার্ক সম্প্রসারণের জন্য জাতীয় তহবিল অর্জন করেছে।

### প্রকল্পের আকর্ষণসমূহ
- ২৫ কিলোমিটারের বেশি নতুন সুরক্ষিত সাইকেল লেন
- গুরুত্বপূর্ণ মোড়ে স্মার্ট সাইকেল ট্রাফিক সিগন্যাল ট্রায়াল
- পাবলিক ট্রানজিট টার্মিনাল এবং ট্রেন স্টেশনের সাথে উন্নত সংযোগ

আগামী শরতের শেষের দিকে নির্মাণ কাজ শুরু হওয়ার কথা রয়েছে।`
    },
    author: "Urban Mobility",
    authorRole: "admin",
    location: { en: "Cork & Galway", bn: "কর্ক ও গলওয়ে" },
    tags: ["infrastructure", "transport", "green"],
    readTime: "3",
    featured: false,
  },
  {
    id: 16,
    title: { en: "Ireland national rugby squad names line-up for summer test matches", bn: "গ্রীষ্মকালীন টেস্ট ম্যাচের জন্য আয়ারল্যান্ড জাতীয় রাগবি স্কোয়াডের দল ঘোষণা" },
    description: { en: "Head coach makes key changes to the team, introducing promising young players for upcoming fixtures.", bn: "প্রধান কোচ স্কোয়াডে গুরুত্বপূর্ণ পরিবর্তন এনেছেন এবং আগামী ম্যাচগুলোর জন্য প্রতিভাবান তরুণ খেলোয়াড়দের সুযোগ করে দিয়েছেন।" },
    date: { en: "June 1, 2026", bn: "১ জুন, ২০২৬" },
    year: 2026,
    category: "announcement",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60",
    content: {
      en: `## Summer Rugby Squad Named
The IRFU has released the list of selected players who will travel to represent Ireland in the upcoming summer tour matches.

### Squad Overview
- Two uncapped players from Leinster academy selected
- Senior players rested to manage long-term fatigue and rehabilitation
- Training camp begins in Dublin next week before departure

Fans expect highly competitive matches against southern hemisphere giants.`,
      bn: `## গ্রীষ্মকালীন রাগবি দল ঘোষণা
আইআরএফইউ নির্বাচিত খেলোয়াড়দের তালিকা প্রকাশ করেছে যা আসন্ন গ্রীষ্মকালীন সফর ম্যাচগুলোতে আয়ারল্যান্ডের প্রতিনিধিত্ব করতে ভ্রমণ করবে।

### স্কোয়াড ওভারভিউ
- লিয়েনস্টার একাডেমি থেকে দুইজন নতুন খেলোয়াড় নির্বাচিত
- দীর্ঘমেয়াদী ক্লান্তি ও পুনর্বাসন ব্যবস্থাপনার জন্য সিনিয়র খেলোয়াড়দের বিশ্রাম দেওয়া হয়েছে
- প্রস্থানের আগে আগামী সপ্তাহে ডাবলিনে প্রশিক্ষণ ক্যাম্প শুরু হবে

দক্ষিণ গোলার্ধের শক্তিশালী দলগুলোর বিপক্ষে দর্শকেরা তীব্র প্রতিদ্বন্দ্বিতাপূর্ণ ম্যাচের প্রত্যাশা করছেন।`
    },
    author: "Sports News",
    authorRole: "moderator",
    location: { en: "Dublin", bn: "ডাবলিন" },
    tags: ["rugby", "sports", "ireland"],
    readTime: "4",
    featured: false,
  },
];

export {
  newsCategories, newsCategoryAccent, newsCategoryKeys, newsItems, newsMeta, newsYears
};


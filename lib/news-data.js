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
    image: "https://images.unsplash.com/photo-1508186300540-389e4e244e18?w=800&auto=format&fit=crop&q=60",
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
];

export {
  newsCategories, newsCategoryAccent, newsCategoryKeys, newsItems, newsMeta, newsYears
};


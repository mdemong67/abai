export const blogMeta = {
    en: {
        title: "Our Blog",
        intro: "Read about our latest news, events, and community updates from the All Bangladeshi Association of Ireland.",
        photoGallery: "Blog Posts",
        videoGallery: "Video Highlights",
        filterAll: "All Posts",
        searchPlaceholder: "Search blog posts...",
        photosLabel: "min read",
        viewAlbum: "Read More",
        close: "Close",
        prev: "Previous",
        next: "Next",
        yearsHeading: "Browse by year",
        categoriesHeading: "Categories",
        stats: [
            { value: "24+", label: "Blog Posts" },
            { value: "2007", label: "Community since" },
            { value: "1", label: "Video Gallery" },
            { value: "Ireland", label: "Nationwide" }
        ],
        videoTitle: "Blog Highlights",
        videoText: "Watch our video highlights from community events and activities.",
        videoCta: "Video highlights coming soon",
        archiveNote: "Our blog captures the journey of the All Bangladeshi Association of Ireland, preserving our community's memories for generations to come.",
        empty: "No blog posts found. Try another year or category."
    },
    bn: {
        title: "আমাদের ব্লগ",
        intro: "অল বাংলাদেশি অ্যাসোসিয়েশন অব আয়ারল্যান্ডের সাম্প্রতিক খবর, ইভেন্ট এবং কমিউনিটি আপডেটসমূহ পড়ুন।",
        photoGallery: "ব্লগ পোস্টসমূহ",
        videoGallery: "ভিডিও হাইলাইটস",
        filterAll: "সব পোস্ট",
        searchPlaceholder: "ব্লগ পোস্টসমূহ খুঁজুন...",
        photosLabel: "মিনিট পড়ুন",
        viewAlbum: "আরও পড়ুন",
        close: "বন্ধ",
        prev: "আগের",
        next: "পরের",
        yearsHeading: "বছর অনুযায়ী",
        categoriesHeading: "বিভাগ",
        stats: [
            { value: "২৪+", label: "ব্লগ পোস্টস" },
            { value: "২০০৭", label: "কমিউনিটি থেকে" },
            { value: "১", label: "ভিডিও গ্যালারি" },
            { value: "আয়ারল্যান্ড", label: "দেশব্যাপী" }
        ],
        videoTitle: "ব্লগ হাইলাইটস",
        videoText: "কমিউনিটি ইভেন্ট এবং কার্যক্রমের আমাদের ভিডিও হাইলাইটস দেখুন।",
        videoCta: "ভিডিও হাইলাইটস শীঘ্রই আসছে",
        archiveNote: "আমাদের ব্লগ অল বাংলাদেশি অ্যাসোসিয়েশন অব আয়ারল্যান্ডের যাত্রা ধরে রাখে, আমাদের কমিউনিটির স্মৃতিসমূহ ভবিষ্যৎ প্রজন্মের জন্য সংরক্ষণ করে।",
        empty: "কোনো ব্লগ পোস্ট পাওয়া যায়নি। অন্য বছর বা বিভাগ চেষ্টা করুন।"
    }
};

export const blogCategoryKeys = ["all", "news", "events", "community", "culture"];

export const blogCategories = {
    en: {
        all: "All",
        news: "News",
        events: "Events",
        community: "Community",
        culture: "Culture"
    },
    bn: {
        all: "সব",
        news: "খবর",
        events: "ইভেন্টস",
        community: "কমিউনিটি",
        culture: "সংস্কৃতি"
    }
};

export const blogPosts = [
    {
        id: "community-picnic-2025",
        year: 2025,
        category: "community",
        featured: true,
        readTime: 5,
        date: { en: "June 15, 2025", bn: "১৫ জুন, ২০২৫" },
        location: { en: "Dublin", bn: "ডাবলিন" },
        title: {
            en: "Annual Community Picnic 2025",
            bn: "বার্ষিক কমিউনিটি পিকনিক ২০২৫"
        },
        description: {
            en: "Join us for our annual community picnic at St. Anne's Park! Bring your family and friends for a day of fun, food, and games.",
            bn: "সেন্ট অ্যান্স পার্কে আমাদের বার্ষিক কমিউনিটি পিকনিকে আমাদের সাথে যোগ দিন! আপনার পরিবার এবং বন্ধুদের নিয়ে আসুন মজা, খাবার এবং খেলার দিনটি পালন করতে।"
        },
        content: {
            en: `We're thrilled to announce our Annual Community Picnic for 2025!

This year's picnic will be held at St. Anne's Park in Dublin, on June 15th. We've planned a fantastic day of activities for all ages.

What to expect:
- Traditional Bangladeshi food stalls
- Children's games and activities
- Live music and cultural performances
- Sports tournaments (football, cricket, badminton)

Bring your blankets, lawn chairs, and your best spirit! The event is free and open to all members of the community.

We can't wait to see you there!`,
            bn: `আমরা ২০২৫ সালের বার্ষিক কমিউনিটি পিকনিক ঘোষণা করতে পেরে উচ্ছ্বসিত!

এই বছরের পিকনিকটি ডাবলিনের সেন্ট অ্যান্স পার্কে ১৫ জুন অনুষ্ঠিত হবে। আমরা সব বয়সের জন্য চমৎকার কার্যক্রমের দিন পরিকল্পনা করেছি।

আসা যাক কী পাবেন:
- ঐতিহ্যবাহী বাংলাদেশি খাবারের স্টল
- শিশুদের খেলা এবং কার্যক্রম
- লাইভ মিউজিক এবং সাংস্কৃতিক অনুষ্ঠান
- ক্রীড়া টুর্নামেন্ট (ফুটবল, ক্রিকেট, ব্যাডমিন্টন)

আপনার কম্বল, লন চেয়ার এবং আপনার সেরা স্পিরিট নিয়ে আসুন! ইভেন্টটি বিনামূল্যে এবং কমিউনিটির সব সদস্যদের জন্য উন্মুক্ত।

আপনাকে সেখানে দেখার জন্য অপেক্ষা করছি!`
        },
        image: "/images/banner-2.jpg"
    },
    {
        id: "independence-day-2025",
        year: 2025,
        category: "culture",
        featured: true,
        readTime: 4,
        date: { en: "March 26, 2025", bn: "২৬ মার্চ, ২০২৫" },
        location: { en: "Dublin", bn: "ডাবলিন" },
        title: {
            en: "Independence Day Celebration 2025",
            bn: "স্বাধীনতা দিবস উদযাপন ২০২৫"
        },
        description: {
            en: "Celebrate Bangladesh's Independence Day with cultural programs and community gathering.",
            bn: "সাংস্কৃতিক অনুষ্ঠান এবং কমিউনিটি সমাবেশের মাধ্যমে বাংলাদেশের স্বাধীনতা দিবস উদযাপন করুন।"
        },
        content: {
            en: `Join us in celebrating the 54th Independence Day of Bangladesh!

The celebration will feature:
- National anthem performance
- Cultural performances (dance, music, poetry)
- Speech by community leaders
- Traditional Bangladeshi dinner

All are welcome to join this special occasion as we remember the sacrifices of our freedom fighters and celebrate our nation's journey.`,
            bn: `বাংলাদেশের ৫৪তম স্বাধীনতা দিবস উদযাপনে আমাদের সাথে যোগ দিন!

উদযাপনে থাকবে:
- জাতীয় সংগীত পারফরম্যান্স
- সাংস্কৃতিক অনুষ্ঠান (নাচ, সংগীত, কবিতা)
- কমিউনিটি নেতাদের বক্তৃতা
- ঐতিহ্যবাহী বাংলাদেশি রাত্রিভোজ

আমাদের মুক্তিযোদ্ধাদের ত্যাগ স্মরণ করে এবং আমাদের জাতির যাত্রা উদযাপন করে এই বিশেষ অনুষ্ঠানে সবাইকে স্বাগত জানানো হয়।`
        },
        image: "/images/banner-3.jpeg"
    },
    {
        id: "executive-committee-2024",
        year: 2024,
        category: "news",
        featured: true,
        readTime: 3,
        date: { en: "January 10, 2024", bn: "১০ জানুয়ারি, ২০২৪" },
        location: { en: "Dublin", bn: "ডাবলিন" },
        title: {
            en: "New Executive Committee Elected for 2024-2026",
            bn: "২০২৪-২০২৬ এর জন্য নতুন কার্যনির্বাহী কমিটি নির্বাচিত"
        },
        description: {
            en: "Congratulations to our newly elected executive committee members for the term 2024-2026.",
            bn: "২০২৪-২০২৬ মেয়াদের জন্য আমাদের নতুন নির্বাচিত কার্যনির্বাহী কমিটি সদস্যদের অভিনন্দন।"
        },
        content: {
            en: `We're pleased to announce the new Executive Committee for the term 2024-2026!

The election was held on January 10th, 2024, with a great turnout from the community. We thank all the candidates who participated and everyone who voted.

The new committee members are already hard at work planning exciting programs for the community. Stay tuned for updates!`,
            bn: `আমরা ২০২৪-২০২৬ মেয়াদের জন্য নতুন কার্যনির্বাহী কমিটি ঘোষণা করতে পেরে আনন্দিত!

২০২৪ সালের ১০ জানুয়ারি কমিউনিটির দারুণ উপস্থিতিতে নির্বাচন অনুষ্ঠিত হয়েছিল। অংশগ্রহণকারী সমস্ত প্রার্থী এবং ভোট দানকারী সবাইকে আমরা ধন্যবাদ জানাই।

নতুন কমিটি সদস্যরা ইতিমধ্যেই কমিউনিটির জন্য উত্তেজনাপূর্ণ প্রোগ্রাম পরিকল্পনা করে কঠোর পরিশ্রম করছেন। আপডেটের জন্য চোখ রাখুন!`
        },
        image: "/images/banner-4.jpeg"
    }
];

export const blogYears = [...new Set(blogPosts.map(a => a.year))].sort((a, b) => b - a);

export const blogCategoryAccent = {
    news: { bg: "bg-blue-600", ring: "ring-blue-600/30", text: "text-blue-600" },
    events: { bg: "bg-green-600", ring: "ring-green-600/30", text: "text-green-600" },
    community: { bg: "bg-orange-600", ring: "ring-orange-600/30", text: "text-orange-600" },
    culture: { bg: "bg-purple-600", ring: "ring-purple-600/30", text: "text-purple-600" }
};

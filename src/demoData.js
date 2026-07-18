// ─────────────────────────────────────────
// SOCIETIES
// ─────────────────────────────────────────
export const societies = [
  {
    id: 1,
    name: "IEEE NED",
    category: "Technical",
    isVerified: true,
    followers: 12500,
    postsCount: 86,
    eventsCount: 21,
    email: "ieee@ned.edu.pk",
    contact: "+92 300 1234567",
    description:
      "The world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. IEEE NED chapter has been at the forefront of technical education since 1991.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/1200px-IEEE_logo.svg.png",
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    upcomingEvent: "AI Bootcamp 2026 – Aug 15",
    team: [
      { id: 1, name: "Ali Hassan", role: "President", avatar: "https://i.pravatar.cc/150?img=11" },
      { id: 2, name: "Sara Malik", role: "Vice President", avatar: "https://i.pravatar.cc/150?img=47" },
      { id: 3, name: "Usman Raza", role: "General Secretary", avatar: "https://i.pravatar.cc/150?img=33" },
      { id: 4, name: "Zainab Qureshi", role: "Treasurer", avatar: "https://i.pravatar.cc/150?img=44" },
    ],
  },
  {
    id: 2,
    name: "Robotics Club",
    category: "Technical",
    isVerified: true,
    followers: 8400,
    postsCount: 45,
    eventsCount: 12,
    email: "robotics@ned.edu.pk",
    contact: "+92 321 9876543",
    description:
      "Building the future, one robot at a time. Join us to learn about electronics, mechanics, and programming. We compete at national and international robotics competitions.",
    logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200&h=200",
    cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    upcomingEvent: "Line Following Robot Competition – Aug 20",
    team: [
      { id: 1, name: "Bilal Ahmed", role: "President", avatar: "https://i.pravatar.cc/150?img=12" },
      { id: 2, name: "Hira Khan", role: "Vice President", avatar: "https://i.pravatar.cc/150?img=49" },
      { id: 3, name: "Farrukh Ali", role: "Tech Lead", avatar: "https://i.pravatar.cc/150?img=15" },
    ],
  },
  {
    id: 3,
    name: "Photography Society",
    category: "Arts",
    isVerified: true,
    followers: 15200,
    postsCount: 210,
    eventsCount: 34,
    email: "photo@ned.edu.pk",
    contact: "+92 333 1122334",
    description:
      "Capturing moments that matter. We organize photowalks, exhibitions, and workshops to nurture the photographer in every student.",
    logo: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200",
    cover: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1200",
    upcomingEvent: "Campus Photography Contest – Sep 5",
    team: [
      { id: 1, name: "Nida Farooq", role: "President", avatar: "https://i.pravatar.cc/150?img=48" },
      { id: 2, name: "Kamran Siddiqui", role: "Photography Lead", avatar: "https://i.pravatar.cc/150?img=17" },
    ],
  },
  {
    id: 4,
    name: "Sports Society",
    category: "Sports",
    isVerified: false,
    followers: 9800,
    postsCount: 120,
    eventsCount: 45,
    email: "sports@ned.edu.pk",
    contact: "+92 312 5544332",
    description:
      "Fostering sportsmanship and physical fitness across the campus. From football to cricket, we keep the campus active.",
    logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=200&h=200",
    cover: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=1200",
    upcomingEvent: "Inter-Department Football – Jul 30",
    team: [
      { id: 1, name: "Hamza Sheikh", role: "President", avatar: "https://i.pravatar.cc/150?img=14" },
      { id: 2, name: "Amna Riaz", role: "Secretary", avatar: "https://i.pravatar.cc/150?img=46" },
    ],
  },
  {
    id: 5,
    name: "GDG on Campus",
    category: "Technical",
    isVerified: true,
    followers: 11000,
    postsCount: 65,
    eventsCount: 18,
    email: "gdg@ned.edu.pk",
    contact: "+92 322 9988776",
    description:
      "Google Developer Groups on campus — learn, connect, and grow with Google technologies including Flutter, Firebase, Cloud and AI.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    upcomingEvent: "Flutter Workshop – Aug 1",
    team: [
      { id: 1, name: "Omer Farhan", role: "Lead Organizer", avatar: "https://i.pravatar.cc/150?img=20" },
      { id: 2, name: "Tooba Naz", role: "Co-Lead", avatar: "https://i.pravatar.cc/150?img=43" },
    ],
  },
  {
    id: 6,
    name: "AI Society",
    category: "Technical",
    isVerified: true,
    followers: 14300,
    postsCount: 92,
    eventsCount: 25,
    email: "ai@ned.edu.pk",
    contact: "+92 315 7766554",
    description:
      "Exploring the frontiers of Artificial Intelligence and Machine Learning. We conduct workshops, research reading groups, and ML bootcamps.",
    logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=200&h=200",
    cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    upcomingEvent: "ML Bootcamp – Sep 10",
    team: [
      { id: 1, name: "Sheza Arif", role: "President", avatar: "https://i.pravatar.cc/150?img=45" },
      { id: 2, name: "Arsalan Khan", role: "Research Lead", avatar: "https://i.pravatar.cc/150?img=22" },
      { id: 3, name: "Mahnoor Ijaz", role: "Events Head", avatar: "https://i.pravatar.cc/150?img=50" },
    ],
  },
];

// ─────────────────────────────────────────
// EVENTS
// ─────────────────────────────────────────
export const events = [
  {
    id: 101,
    societyId: 1,
    societyName: "IEEE NED",
    societyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/1200px-IEEE_logo.svg.png",
    isVerified: true,
    title: "AI Bootcamp 2026",
    description:
      "Join us for an intensive 3-day bootcamp covering the fundamentals of Artificial Intelligence, neural networks, and hands-on projects with PyTorch. Sessions will be led by industry professionals and researchers.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80",
    likes: 235,
    comments: 38,
    saved: false,
    type: "Workshop",
    date: "Aug 15, 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "Main Auditorium, NED University",
    registrationDeadline: "Aug 10, 2026",
    isTrending: true,
    isToday: false,
    commentsList: [
      { id: 1, user: "Amna K.", avatar: "https://i.pravatar.cc/40?img=46", text: "Can't wait for this! 🔥", time: "2h ago" },
      { id: 2, user: "Bilal R.", avatar: "https://i.pravatar.cc/40?img=12", text: "Will there be a certificate?", time: "5h ago" },
      { id: 3, user: "Sara M.", avatar: "https://i.pravatar.cc/40?img=47", text: "IEEE never disappoints!", time: "1d ago" },
    ],
  },
  {
    id: 102,
    societyId: 3,
    societyName: "Photography Society",
    societyLogo: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200",
    isVerified: true,
    title: "Campus Photography Contest",
    description:
      "Show off your skills! The theme for this year's contest is 'Campus Life'. Submit your best shots and win exciting prizes. Best 20 entries will be featured in the annual gallery exhibition.",
    image: "https://images.unsplash.com/photo-1554046920-90dc20695352?auto=format&fit=crop&q=80",
    likes: 148,
    comments: 22,
    saved: true,
    type: "Competition",
    date: "Sep 05, 2026",
    time: "All Day",
    venue: "Online Submission + Gallery Hall",
    registrationDeadline: "Sep 01, 2026",
    isTrending: false,
    isToday: false,
    commentsList: [
      { id: 1, user: "Nida F.", avatar: "https://i.pravatar.cc/40?img=48", text: "Excited to see the entries!", time: "3h ago" },
      { id: 2, user: "Kamran S.", avatar: "https://i.pravatar.cc/40?img=17", text: "Theme is so creative this year.", time: "8h ago" },
    ],
  },
  {
    id: 103,
    societyId: 1,
    societyName: "IEEE NED",
    societyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/IEEE_logo.svg/1200px-IEEE_logo.svg.png",
    isVerified: true,
    title: "Embedded Systems Workshop",
    description:
      "Learn how to program microcontrollers and build your own IoT devices from scratch. Participants will get hands-on experience with Arduino and ESP32.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    likes: 89,
    comments: 12,
    saved: false,
    type: "Workshop",
    date: "Jul 22, 2026",
    time: "2:00 PM – 5:00 PM",
    venue: "Lab 4, EE Department",
    registrationDeadline: "Jul 20, 2026",
    isTrending: false,
    isToday: true,
    commentsList: [
      { id: 1, user: "Usman R.", avatar: "https://i.pravatar.cc/40?img=33", text: "This is happening today! Who's joining?", time: "30m ago" },
    ],
  },
  {
    id: 104,
    societyId: 2,
    societyName: "Robotics Club",
    societyLogo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200&h=200",
    isVerified: true,
    title: "Line Following Robot Competition",
    description:
      "Build the fastest line-following robot. Teams of 3 allowed. Cash prizes for the top 3 teams! Component kits will be available from the Robotics Lab.",
    image: "https://images.unsplash.com/photo-1563207153-f40879972846?auto=format&fit=crop&q=80",
    likes: 176,
    comments: 45,
    saved: false,
    type: "Competition",
    date: "Aug 20, 2026",
    time: "9:00 AM",
    venue: "Sports Complex Arena",
    registrationDeadline: "Aug 15, 2026",
    isTrending: false,
    isToday: false,
    commentsList: [
      { id: 1, user: "Bilal A.", avatar: "https://i.pravatar.cc/40?img=12", text: "Our team is ready! 🤖", time: "1h ago" },
      { id: 2, user: "Hira K.", avatar: "https://i.pravatar.cc/40?img=49", text: "Can freshmen participate?", time: "4h ago" },
      { id: 3, user: "Farrukh A.", avatar: "https://i.pravatar.cc/40?img=15", text: "Yes! All years welcome.", time: "4h ago" },
    ],
  },
  {
    id: 105,
    societyId: 5,
    societyName: "GDG on Campus",
    societyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png",
    isVerified: true,
    title: "Flutter Workshop: Build Your First App",
    description:
      "A hands-on workshop taking you from zero to a working Flutter mobile app in a single session. Laptops required. Flutter SDK should be pre-installed.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80",
    likes: 204,
    comments: 29,
    saved: false,
    type: "Workshop",
    date: "Aug 1, 2026",
    time: "11:00 AM – 3:00 PM",
    venue: "CS Seminar Hall, Block B",
    registrationDeadline: "Jul 28, 2026",
    isTrending: false,
    isToday: false,
    commentsList: [
      { id: 1, user: "Omer F.", avatar: "https://i.pravatar.cc/40?img=20", text: "GDG workshops are always 🔥", time: "2h ago" },
    ],
  },
  {
    id: 106,
    societyId: 6,
    societyName: "AI Society",
    societyLogo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=200&h=200",
    isVerified: true,
    title: "Machine Learning Bootcamp",
    description:
      "A comprehensive 2-week bootcamp covering ML fundamentals, supervised and unsupervised learning, and final project presentations. Beginners welcome!",
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80",
    likes: 318,
    comments: 64,
    saved: true,
    type: "Workshop",
    date: "Sep 10, 2026",
    time: "10:00 AM – 1:00 PM (Daily)",
    venue: "IT Lab 2, Main Block",
    registrationDeadline: "Sep 05, 2026",
    isTrending: true,
    isToday: false,
    commentsList: [
      { id: 1, user: "Sheza A.", avatar: "https://i.pravatar.cc/40?img=45", text: "This will be legendary 🚀", time: "1h ago" },
      { id: 2, user: "Arsalan K.", avatar: "https://i.pravatar.cc/40?img=22", text: "Registration link is in bio!", time: "3h ago" },
    ],
  },
  {
    id: 107,
    societyId: 4,
    societyName: "Sports Society",
    societyLogo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=200&h=200",
    isVerified: false,
    title: "Inter-Department Football Tournament",
    description:
      "The most awaited sports event of the semester! 16 teams will battle it out on the football field. Register your department team before spots fill up.",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80",
    likes: 290,
    comments: 53,
    saved: false,
    type: "Competition",
    date: "Jul 30, 2026",
    time: "8:00 AM onwards",
    venue: "NED Sports Ground",
    registrationDeadline: "Jul 25, 2026",
    isTrending: false,
    isToday: false,
    commentsList: [
      { id: 1, user: "Hamza S.", avatar: "https://i.pravatar.cc/40?img=14", text: "CS department is winning this one! 💪", time: "5h ago" },
    ],
  },
];

// ─────────────────────────────────────────
// POSTS (per society — for Society Profile page)
// ─────────────────────────────────────────
export const posts = {
  1: [ // IEEE NED
    { id: 201, title: "We won the National Hackathon! 🏆", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80", likes: 512, comments: 67, time: "3 days ago" },
    { id: 202, title: "Behind the scenes: AI Bootcamp prep 🎯", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80", likes: 189, comments: 23, time: "1 week ago" },
    { id: 203, title: "New executive committee 2026 announced!", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80", likes: 301, comments: 45, time: "2 weeks ago" },
  ],
  2: [ // Robotics Club
    { id: 211, title: "Our robot at the national expo 🤖", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80", likes: 244, comments: 31, time: "5 days ago" },
    { id: 212, title: "Drone workshop highlights!", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80", likes: 188, comments: 19, time: "2 weeks ago" },
  ],
  3: [ // Photography Society
    { id: 221, title: "Photowalk through old Karachi 📸", image: "https://images.unsplash.com/photo-1554046920-90dc20695352?auto=format&fit=crop&q=80", likes: 623, comments: 88, time: "2 days ago" },
    { id: 222, title: "Portrait session with volunteers", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80", likes: 410, comments: 55, time: "1 week ago" },
    { id: 223, title: "Editing Masterclass recap ✨", image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80", likes: 299, comments: 33, time: "3 weeks ago" },
  ],
  4: [ // Sports Society
    { id: 231, title: "Cricket trials were a blast! 🏏", image: "https://images.unsplash.com/photo-1540747913346-19212a4b069b?auto=format&fit=crop&q=80", likes: 377, comments: 42, time: "4 days ago" },
    { id: 232, title: "Football warm-up practice day 🏈", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80", likes: 211, comments: 28, time: "10 days ago" },
  ],
  5: [ // GDG
    { id: 241, title: "Google Cloud Study Jam recap ☁️", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80", likes: 356, comments: 47, time: "6 days ago" },
    { id: 242, title: "We welcomed 50 new members this semester!", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80", likes: 490, comments: 60, time: "2 weeks ago" },
  ],
  6: [ // AI Society
    { id: 251, title: "Prompt Engineering Workshop was a hit! 🤖", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80", likes: 544, comments: 71, time: "1 day ago" },
    { id: 252, title: "Research paper reading group – session 5", image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80", likes: 212, comments: 29, time: "1 week ago" },
    { id: 253, title: "ML Bootcamp announcement 🎉", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80", likes: 680, comments: 95, time: "3 weeks ago" },
  ],
};

// ─────────────────────────────────────────
// GALLERY (per society)
// ─────────────────────────────────────────
export const galleries = {
  1: [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1525373698358-041e3a460346?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
  ],
  3: [
    "https://images.unsplash.com/photo-1554046920-90dc20695352?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400",
  ],
};

// ─────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────
export const notifications = [
  { id: 1, text: "IEEE NED uploaded a new workshop: Embedded Systems.", time: "2 hours ago", read: false, icon: "🛠" },
  { id: 2, text: "Registration for AI Bootcamp 2026 closes in 2 days!", time: "5 hours ago", read: false, icon: "⚠️" },
  { id: 3, text: "Photography Society posted a new competition.", time: "1 day ago", read: true, icon: "📸" },
  { id: 4, text: "Your registered event 'Embedded Systems Workshop' starts today at 2 PM.", time: "1 day ago", read: true, icon: "⏰" },
  { id: 5, text: "AI Society started following you.", time: "2 days ago", read: true, icon: "🤖" },
  { id: 6, text: "GDG on Campus announced: Flutter Workshop – Aug 1!", time: "3 days ago", read: true, icon: "📢" },
];

// ─────────────────────────────────────────
// STUDENT PROFILE (fake logged-in user)
// ─────────────────────────────────────────
export const studentProfile = {
  name: "Maham Fatima",
  department: "Software Engineering",
  rollNumber: "SE-2022-001",
  email: "maham.fatima@students.ned.edu.pk",
  avatar: "https://i.pravatar.cc/150?img=47",
  following: [1, 3, 5, 6],
  savedPosts: [102, 106],
  registeredEvents: [101, 103],
};

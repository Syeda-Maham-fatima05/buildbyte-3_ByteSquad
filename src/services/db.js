import { societies as initialSocieties, events as initialEvents, posts as initialPosts, galleries as initialGalleries } from '../demoData';

// Enhance initial societies with a specific 'aboutUs' section
const defaultAboutUs = {
  1: "Founded with the mission to foster technological innovation and excellence for the benefit of humanity, IEEE NED is the premier student branch of the Institute of Electrical and Electronics Engineers at NED University. We aim to bridge the gap between academic theory and professional implementation through hands-on technical training, research development, and networking opportunities. Over the past three decades, we have mentored thousands of students, turning ideas into real-world solutions.",
  2: "The Robotics Club of NED University is a student-led innovation hub dedicated to building intelligent machines and raising engineering excellence. We engage in designing and developing line-following, semi-autonomous, and fully automated robotic systems. By hosting national bootcamps, workshops, and representing our university globally in RoboCup and national contests, we inspire and prepare students for careers in automation.",
  3: "The Photography Society is the creative visual storyteller of the campus. Established to capture, preserve, and showcase the dynamic life of NED University, we teach camera operations, digital editing, and visual composition. Through regular photowalks, national exhibitions, and creative styling workshops, we help students discover and cultivate their artistic expression.",
  4: "The Sports Society is dedicated to promoting physical fitness, athletic development, and teamwork across the campus. We host competitive inter-departmental leagues in football, cricket, basketball, and indoor sports. Our goal is to encourage a balanced lifestyle, build leadership skills through sports management, and discover representing talent for inter-university competitions.",
  5: "Google Developer Groups on Campus (GDG) is a collaborative community for students interested in Google developer technologies and software engineering. We offer a developer ecosystem where students learn Flutter, Android, Cloud Platform, Firebase, and Web technologies. We organize study jams, hackathons, and invite industry speakers to guide students in building real-world apps.",
  6: "The AI Society is at the forefront of machine intelligence education at NED. We focus on building deep conceptual and practical skills in Machine Learning, Deep Learning, Computer Vision, and Generative AI. Through hands-on bootcamps, research paper reading groups, and ML hackathons, we prepare students to lead in the AI-driven future."
};

const updatedSocieties = initialSocieties.map(s => ({
  ...s,
  aboutUs: defaultAboutUs[s.id] || `Welcome to ${s.name}. We are dedicated to providing excellent opportunities and fostering community growth for all students at our university. Join us to build skills, collaborate on exciting projects, and connect with peers.`
}));

const initialPending = [
  {
    id: 1001,
    name: "Cybersecurity Club",
    category: "Technical",
    email: "cybersec@ned.edu.pk",
    contact: "+92 345 1122334",
    description: "Promoting ethical hacking, secure coding practices, and cybersecurity awareness among students. We plan to host Capture the Flag (CTF) challenges.",
    aboutUs: "The Cybersecurity Club is established to train students in defense and offense security paradigms. We run workshops on penetration testing, malware analysis, and network security to prepare the next generation of cybersecurity professionals.",
    logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200&h=200",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    presidentName: "Hamza Farooq",
    presidentEmail: "hamza.farooq@students.ned.edu.pk",
    presidentRoll: "CS-2022-045",
    department: "Computer Science",
    contactNumber: "+92 345 1122334",
    status: "Pending"
  },
  {
    id: 1002,
    name: "Literary & Debating Society",
    category: "Arts",
    email: "debating@ned.edu.pk",
    contact: "+92 301 5566778",
    description: "Developing public speaking, critical thinking, and literary appreciation through debates, writing workshops, and poetry slams.",
    aboutUs: "The Literary & Debating Society provides a stage for voices to be heard, ideas to be challenged, and stories to be written. We represent our university at national model UN and debate tournaments, helping students build public eloquence.",
    logo: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=200&h=200",
    cover: "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80&w=1200",
    presidentName: "Ayesha Khan",
    presidentEmail: "ayesha.khan@students.ned.edu.pk",
    presidentRoll: "SE-2022-018",
    department: "Software Engineering",
    contactNumber: "+92 301 5566778",
    status: "Pending"
  }
];

// Initialize LocalStorage if not present
const getStored = (key, defaultVal) => {
  try {
    const val = localStorage.getItem(key);
    if (!val || val === 'undefined') {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(val);
  } catch (error) {
    console.error('Error reading localStorage for key', key, error);
    return defaultVal;
  }
};

const setStored = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const db = {
  // Societies CRUD
  getSocieties: () => {
    return getStored('uc_societies', updatedSocieties);
  },
  
  addSociety: (society) => {
    const list = db.getSocieties();
    const newSoc = {
      ...society,
      id: society.id || Date.now(),
      followers: society.followers || 0,
      postsCount: society.postsCount || 0,
      eventsCount: society.eventsCount || 0,
      isVerified: society.isVerified !== undefined ? society.isVerified : false,
      logo: society.logo || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200",
      cover: society.cover || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
      team: society.team || [
        { id: 1, name: society.presidentName || "President", role: "President", avatar: "https://i.pravatar.cc/150?img=12" }
      ]
    };
    list.push(newSoc);
    setStored('uc_societies', list);
    return newSoc;
  },

  updateSociety: (id, updatedData) => {
    const list = db.getSocieties();
    const index = list.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedData };
      setStored('uc_societies', list);
      return list[index];
    }
    return null;
  },

  deleteSociety: (id) => {
    const list = db.getSocieties();
    const filtered = list.filter(s => s.id !== parseInt(id));
    setStored('uc_societies', filtered);
    return true;
  },

  // Pending Registrations
  getPendingRegistrations: () => {
    return getStored('uc_pending_regs', initialPending);
  },

  submitRegistration: (data) => {
    const pending = db.getPendingRegistrations();
    const newReg = {
      ...data,
      id: Date.now(),
      status: "Pending",
      logo: data.logo || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200",
      cover: data.cover || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
      aboutUs: data.aboutUs || `About ${data.societyName}: A student-led organization aimed at providing excellent opportunities and fostering community growth.`
    };
    pending.push(newReg);
    setStored('uc_pending_regs', pending);
    return newReg;
  },

  approveRegistration: (id) => {
    const pending = db.getPendingRegistrations();
    const reg = pending.find(r => r.id === parseInt(id));
    if (reg) {
      // Add to societies
      db.addSociety({
        name: reg.societyName,
        category: reg.societyCategory,
        email: reg.officialEmail || reg.email,
        contact: reg.contactNumber || reg.contact,
        description: reg.description,
        aboutUs: reg.aboutUs,
        logo: reg.logo,
        cover: reg.cover,
        presidentName: reg.presidentName,
        presidentEmail: reg.presidentEmail,
        presidentRoll: reg.presidentRoll,
        department: reg.department,
        isVerified: true
      });
      // Remove from pending
      const filtered = pending.filter(r => r.id !== parseInt(id));
      setStored('uc_pending_regs', filtered);
      return true;
    }
    return false;
  },

  rejectRegistration: (id) => {
    const pending = db.getPendingRegistrations();
    const filtered = pending.filter(r => r.id !== parseInt(id));
    setStored('uc_pending_regs', filtered);
    return true;
  },

  // Events & Posts (cached for stability)
  getEvents: () => {
    return getStored('uc_events', initialEvents);
  },
  
  getPosts: () => {
    return getStored('uc_posts', initialPosts);
  },

  getGalleries: () => {
    return getStored('uc_galleries', initialGalleries);
  }
};

import urllib.request
import json
import sys

SUPABASE_URL = "https://bstfctifxvkmklghgwvz.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdGZjdGlmeHZrbWtsZ2hnd3Z6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDM2NDAzOSwiZXhwIjoyMDk5OTQwMDM5fQ.DWqQfiROBB9xkVkISj_V_nq4pmVy5EX0X7XUBW7Yx2s"

HEADERS = {
    "apikey": SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

def api_request(url, data=None, method='POST'):
    encoded = json.dumps(data).encode('utf-8') if data else None
    req = urllib.request.Request(url, data=encoded, headers=HEADERS, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode('utf-8')), None
    except urllib.error.HTTPError as e:
        err_body = e.read().decode()
        return None, f"HTTP {e.code}: {err_body}"

def create_auth_user(email, password="Campus@2025!"):
    url = f"{SUPABASE_URL}/auth/v1/admin/users"
    data = {"email": email, "password": password, "email_confirm": True}
    res, err = api_request(url, data, 'POST')
    if err:
        print(f"  [AUTH ERROR] {email}: {err}")
        return None
    return res.get('id')

def insert_society(user_id, payload):
    url = f"{SUPABASE_URL}/rest/v1/societies"
    data = {"id": user_id, **payload}
    res, err = api_request(url, data, 'POST')
    if err:
        print(f"  [SOCIETY ERROR] {payload.get('name')}: {err}")
        return False
    print(f"  OK Society inserted: {payload.get('name')}")
    return True

def insert_post(society_id, payload):
    url = f"{SUPABASE_URL}/rest/v1/posts"
    data = {"society_id": society_id, **payload}
    res, err = api_request(url, data, 'POST')
    if err:
        print(f"  [POST ERROR] {payload.get('title')}: {err}")
        return False
    print(f"    OK Post/Event: {payload.get('title')}")
    return True

SOCIETIES = [
    {
        "email": "robotics.club@university.edu.pk",
        "society": {
            "name": "Robotics Club",
            "official_email": "robotics.club@university.edu.pk",
            "about": "The Robotics Club is a student-driven organization dedicated to fostering innovation in robotics, automation, and embedded systems. We design and build competitive robots, participate in national robotics competitions, and provide hands-on learning experiences. Our members gain practical skills in microcontroller programming, sensor integration, mechanical design, and team collaboration.",
            "logo_url": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200&h=200",
            "president_name": "Ahmed Raza",
            "president_email": "ahmed.raza@university.edu.pk",
            "president_picture_url": "https://i.pravatar.cc/150?img=3",
            "social_instagram": "https://instagram.com/roboticsclub_uni",
            "social_linkedin": "https://linkedin.com/company/robotics-club-uni",
            "social_facebook": "https://facebook.com/roboticsclubuni",
            "social_other": "+92 321 4567890",
            "status": "approved"
        },
        "posts": [
            {
                "title": "Line Follower Robot Workshop",
                "caption": "We had an incredible turnout at our Line Follower Robot Workshop! 40+ students built their own robots from scratch using Arduino and IR sensors. Every participant went home with a working bot!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1561144257-e32e8506e3cc?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1535378917042-10a22c5a3be2?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Workshop", "Robotics", "Arduino"]
            },
            {
                "title": "National Robotics Competition 2025 - Gold!",
                "caption": "Team Voltage won GOLD at the National Robotics Challenge 2025 held in Islamabad! Months of hard work paid off. Proud of every member!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Achievement", "Competition"]
            },
            {
                "title": "PCB Design Bootcamp Recap",
                "caption": "Our 3-day PCB Design Bootcamp using KiCAD was a massive success. Students learned schematic design, layout routing, and sent their boards to fabrication. Real hardware, real skills.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1591348122449-02525d70379b?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Bootcamp", "PCB", "Electronics"]
            },
            {
                "title": "STEM Outreach at City School",
                "caption": "Our volunteers visited City School to introduce robotics and STEM to O-level students. We demonstrated our autonomous robot and ran interactive coding activities. Inspiring the next generation!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Outreach", "STEM", "Community"]
            }
        ],
        "events": [
            {
                "title": "RoboWars 2025 - Inter-University Battle",
                "caption": "The most electrifying robotics battle of the year! 16 universities, 1 arena. Register your 3-member team and compete in sumo, maze-solving, and speed challenges. Prizes worth PKR 150,000!",
                "image_urls": ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-09-14T10:00:00Z",
                "event_location": "University Sports Complex, Block D",
                "tags": ["Competition"]
            },
            {
                "title": "Intro to Raspberry Pi - Hands-On Workshop",
                "caption": "New to single-board computing? Join us for a beginner-friendly workshop on Raspberry Pi. Learn GPIO programming, build a weather station, and take home a project kit. Limited seats!",
                "image_urls": ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-08-23T14:00:00Z",
                "event_location": "CS Lab 3, Academic Block B",
                "tags": ["Workshop"]
            }
        ]
    },
    {
        "email": "ai.society@university.edu.pk",
        "society": {
            "name": "AI Society",
            "official_email": "ai.society@university.edu.pk",
            "about": "The AI Society is your gateway to Artificial Intelligence, Machine Learning, and Data Science. We host technical workshops, research paper reading groups, hackathons, and industry speaker sessions. Our members collaborate on real-world AI projects ranging from natural language processing to computer vision. We believe AI literacy is critical for tomorrow's leaders.",
            "logo_url": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=200&h=200",
            "president_name": "Sara Malik",
            "president_email": "sara.malik@university.edu.pk",
            "president_picture_url": "https://i.pravatar.cc/150?img=47",
            "social_instagram": "https://instagram.com/aisociety_uni",
            "social_linkedin": "https://linkedin.com/company/ai-society-uni",
            "social_facebook": "https://facebook.com/aisocietyuni",
            "social_other": "+92 311 2345678",
            "status": "approved"
        },
        "posts": [
            {
                "title": "Machine Learning Crash Course - Week 1 Complete!",
                "caption": "Week 1 of our 6-week ML Crash Course is done! We covered linear regression, feature engineering, and model evaluation using scikit-learn. 80 students joined live and the replay is now on our YouTube.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Workshop", "MachineLearning"]
            },
            {
                "title": "AI Hackathon 2025 - Winners Announced!",
                "caption": "After 36 hours of non-stop building, Team NeuralNomads took home first place with their AI-powered medical diagnosis tool! 25 teams competed, 300+ participants. The future is being built right here on campus.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Hackathon", "Achievement"]
            },
            {
                "title": "Research Talk: Large Language Models Demystified",
                "caption": "We hosted Dr. Usman Ahmed from LUMS for an exclusive research talk on how LLMs work under the hood - attention mechanisms, transformers, RLHF, and the future of conversational AI.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Research", "Talk"]
            },
            {
                "title": "Project Spotlight: DeepCrop",
                "caption": "Congratulations to our members who built DeepCrop - an AI model detecting crop diseases from smartphone photos with 92% accuracy. Submitted to Google AI for Good Challenge. Amazing work!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Project", "AI"]
            },
            {
                "title": "New Study Group: Kaggle Competitors Circle",
                "caption": "Starting this Saturday - our new weekly Kaggle study group meets every Saturday at 4 PM in Room CS-201. Whether beginner or competitive, all are welcome to learn and grow together!",
                "image_urls": [],
                "tags": ["Announcement", "DataScience"]
            }
        ],
        "events": [
            {
                "title": "DataFest 2025 - Annual Data Science Competition",
                "caption": "AI Society presents DataFest 2025! Solve a real-world dataset challenge in 24 hours, present your findings, and compete for prizes. Open to all university students. Industry mentors throughout.",
                "image_urls": ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-10-04T09:00:00Z",
                "event_location": "IT Building Auditorium",
                "tags": ["Competition"]
            },
            {
                "title": "AI Ethics Panel Discussion",
                "caption": "A thought-provoking panel on the ethical implications of AI - bias, privacy, autonomous systems, and job displacement. Featuring speakers from academia, policy, and tech startups.",
                "image_urls": ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-08-30T15:00:00Z",
                "event_location": "Seminar Hall, Block A",
                "tags": ["Seminar"]
            }
        ]
    },
    {
        "email": "photography.club@university.edu.pk",
        "society": {
            "name": "Photography Club",
            "official_email": "photography.club@university.edu.pk",
            "about": "The Photography Club is a creative community for students passionate about visual storytelling. From portrait and street photography to landscape and astrophotography, we explore every genre. We organize monthly photo walks, editing workshops, and showcase our members' best work in annual exhibitions. Whether you shoot with a DSLR or smartphone - if you see the world differently, you belong here.",
            "logo_url": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200",
            "president_name": "Zainab Fatima",
            "president_email": "zainab.fatima@university.edu.pk",
            "president_picture_url": "https://i.pravatar.cc/150?img=25",
            "social_instagram": "https://instagram.com/photoclubuni",
            "social_linkedin": "https://linkedin.com/company/photo-club-uni",
            "social_facebook": "https://facebook.com/photoclubuni",
            "social_other": "+92 333 5678901",
            "status": "approved"
        },
        "posts": [
            {
                "title": "Golden Hour Photo Walk - Old City",
                "caption": "Last weekend's photo walk through the old city at golden hour was magical. Our members captured stunning light, historic architecture, and candid street life.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1542038374802-9f45f05e2f62?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["PhotoWalk", "Street"]
            },
            {
                "title": "Adobe Lightroom Masterclass Recap",
                "caption": "Our Lightroom Masterclass saw 60 participants learn color grading, masking, and preset creation. Before/after edits from the session were mind-blowing. Thank you to everyone who joined!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Workshop", "Editing"]
            },
            {
                "title": "Annual Exhibition 2025 - Perspectives",
                "caption": "Our 4th Annual Exhibition 'Perspectives' is open! 200+ prints from 45 members are on display in the Main Gallery. Free admission for all university students and faculty.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Exhibition", "Gallery"]
            }
        ],
        "events": [
            {
                "title": "Astrophotography Night - Milky Way Edition",
                "caption": "Escape the city lights! Join us for a night astrophotography session. We'll cover star trails, Milky Way composition, and long exposure settings. Bring your tripod - we provide the dark sky!",
                "image_urls": ["https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-09-06T21:00:00Z",
                "event_location": "Margalla Hills Trail 3 Parking Area",
                "tags": ["PhotoWalk"]
            },
            {
                "title": "Photo Competition: Urban Perspectives",
                "caption": "Submit your best urban photography shots! Theme: Urban Perspectives. Top 3 winners get printed 24x36 canvases and feature in our quarterly magazine. Submit via Instagram DMs.",
                "image_urls": ["https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-08-18T00:00:00Z",
                "event_location": "Online Submission",
                "tags": ["Competition"]
            }
        ]
    },
    {
        "email": "gdg@university.edu.pk",
        "society": {
            "name": "GDG on Campus",
            "official_email": "gdg@university.edu.pk",
            "about": "Google Developer Group on Campus is part of Google's global community of student developers. We organize technical workshops, Google technology study jams, cloud certification prep sessions, and hackathons. Members get exclusive access to Google resources, mentorship from Googlers, and networking opportunities. We cover Android, Flutter, Firebase, Google Cloud, and Web technologies.",
            "logo_url": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=200&h=200",
            "president_name": "Hassan Ali",
            "president_email": "hassan.ali@university.edu.pk",
            "president_picture_url": "https://i.pravatar.cc/150?img=7",
            "social_instagram": "https://instagram.com/gdgoncampus_uni",
            "social_linkedin": "https://linkedin.com/company/gdg-campus-uni",
            "social_facebook": "https://facebook.com/gdgoncampusuni",
            "social_other": "+92 345 6789012",
            "status": "approved"
        },
        "posts": [
            {
                "title": "Flutter Study Jam - 4-Week Program Complete!",
                "caption": "All 4 weeks of our Flutter Study Jam are done! Participants built a fully functional e-commerce app with Firebase backend. 110 enrolled, 74 completed - massive shoutout to everyone who made it!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["StudyJam", "Flutter"]
            },
            {
                "title": "Google Cloud Certification Bootcamp Results",
                "caption": "21 of our members just passed the Google Cloud Associate Cloud Engineer exam! Our free prep bootcamp and mock exams clearly worked. Certificates incoming - congratulations everyone!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Achievement", "Cloud"]
            },
            {
                "title": "DevFest Campus 2025 - Save the Date!",
                "caption": "DevFest is back and bigger than ever! One full day of talks, workshops, and networking with developers from across the region. Speakers from Google, Careem, Arbisoft, and more. October 18, 2025!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Announcement", "DevFest"]
            },
            {
                "title": "Web Dev Workshop: Firebase + React",
                "caption": "Our workshop on building real-time apps with Firebase and React was packed! From Firestore to authentication to cloud functions - attendees left with a live chat app deployed to Firebase Hosting.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Workshop", "Web"]
            }
        ],
        "events": [
            {
                "title": "DevFest Campus 2025",
                "caption": "Pakistan's largest student developer festival! A full day of keynotes, technical sessions, workshops, and a mini hackathon. 500+ attendees expected. Free swag, certifications, and career opportunities await.",
                "image_urls": ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-10-18T08:30:00Z",
                "event_location": "University Main Auditorium",
                "tags": ["Conference"]
            },
            {
                "title": "Android App Development Bootcamp",
                "caption": "3-day intensive Android bootcamp using Jetpack Compose and Kotlin. No prior experience needed - just bring your laptop and enthusiasm. You'll ship a working app by day 3! Limited to 30 seats.",
                "image_urls": ["https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-09-01T09:00:00Z",
                "event_location": "CS Lab 1, Block B",
                "tags": ["Bootcamp"]
            }
        ]
    },
    {
        "email": "debating.society@university.edu.pk",
        "society": {
            "name": "Debating Society",
            "official_email": "debating.society@university.edu.pk",
            "about": "The Debating Society is the premier platform for students who want to develop critical thinking, public speaking, and argumentation skills. We compete in British Parliamentary, Asian Parliamentary, and Lincoln-Douglas formats at national and international tournaments. Weekly practice sessions and mentorship from senior debaters ensure rapid skill development.",
            "logo_url": "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=200&h=200",
            "president_name": "Fatima Noor",
            "president_email": "fatima.noor@university.edu.pk",
            "president_picture_url": "https://i.pravatar.cc/150?img=44",
            "social_instagram": "https://instagram.com/debatingsociety_uni",
            "social_linkedin": "https://linkedin.com/company/debating-society-uni",
            "social_facebook": "https://facebook.com/debatingsocietyuni",
            "social_other": "+92 322 7890123",
            "status": "approved"
        },
        "posts": [
            {
                "title": "We Won PNDS 2025 - National Champions!",
                "caption": "History made! Our team - Fatima, Bilal, and Omar - won the Pakistan National Debating Series 2025 Best Team Trophy in Lahore. After 7 rounds against 60+ university teams, they clinched gold!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Achievement", "Championship"]
            },
            {
                "title": "This Week's Motion: AI Should Replace Human Judges",
                "caption": "This week's practice motion was fiery - 'This House Believes AI Should Replace Human Judges in Criminal Courts.' Both sides brought exceptional arguments. Key points from the session below:",
                "image_urls": [],
                "tags": ["Practice", "Debate"]
            },
            {
                "title": "Workshop: The Art of Rebuttal",
                "caption": "Our Advanced Rebuttal Workshop was led by last year's Best Speaker, Omar Farooq. 35 students practiced turn-backs, straight refutations, and summary strategies. Skills sharpened, confidence built!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Workshop", "Skills"]
            }
        ],
        "events": [
            {
                "title": "CampusCup 2025 - Annual Inter-Department Debate",
                "caption": "Battle of the best minds on campus! All 12 departments compete in British Parliamentary format. Prizes for Best Team and Best Speaker. Spectators welcome - come witness the clash of ideas!",
                "image_urls": ["https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-10-10T10:00:00Z",
                "event_location": "Main Lecture Hall, Block A",
                "tags": ["Competition"]
            },
            {
                "title": "Open Mic Debate Night: Social Media and Society",
                "caption": "No teams, no judges - just open, passionate discourse. Topic: Is Social Media Doing More Harm Than Good? Anyone can take the floor for 3 minutes. Come to speak, listen, and challenge ideas.",
                "image_urls": ["https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-08-22T18:00:00Z",
                "event_location": "Faculty Lounge, 2nd Floor",
                "tags": ["OpenMic"]
            }
        ]
    },
    {
        "email": "sports.club@university.edu.pk",
        "society": {
            "name": "Sports Club",
            "official_email": "sports.club@university.edu.pk",
            "about": "The Sports Club is the heartbeat of athletic life on our campus. We manage and compete in cricket, football, basketball, badminton, table tennis, and athletics. We organize inter-department tournaments, represent our university in regional and national competitions, and run fitness programs open to all students. A healthy body fuels a healthy mind - we are committed to building champions on and off the field.",
            "logo_url": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=200&h=200",
            "president_name": "Usman Tariq",
            "president_email": "usman.tariq@university.edu.pk",
            "president_picture_url": "https://i.pravatar.cc/150?img=11",
            "social_instagram": "https://instagram.com/sportsclub_uni",
            "social_linkedin": "https://linkedin.com/company/sports-club-uni",
            "social_facebook": "https://facebook.com/sportsclubuni",
            "social_other": "+92 300 8901234",
            "status": "approved"
        },
        "posts": [
            {
                "title": "Cricket Champions - Inter-University Tri-Series!",
                "caption": "Our cricket team dominated the Inter-University Tri-Series, winning all 3 matches! Special mention to our captain Zeeshan for his unbeaten 87 in the final. The trophy is ours!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Cricket", "Achievement"]
            },
            {
                "title": "Futsal Tournament Registration Open!",
                "caption": "The 5th Annual Campus Futsal Tournament is here! Register your 5-member team before August 15. Group stage, knock-outs, and a thrilling final on August 30. Prizes for top 3 teams!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1571498664957-fde285d79857?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Football", "Tournament"]
            },
            {
                "title": "Morning Fitness Boot Camp - Every Day 6 AM",
                "caption": "Start your morning right! Our free outdoor boot camp runs every weekday at 6 AM near the main sports ground. HIIT, stretching, and strength circuits. No registration needed - just show up!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Fitness", "Wellness"]
            },
            {
                "title": "Table Tennis Inter-Department Results",
                "caption": "The Computer Science department won the Table Tennis Inter-Department Championship for the third year in a row! Results are updated on the notice board. Congratulations to all participants!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["TableTennis", "Tournament"]
            }
        ],
        "events": [
            {
                "title": "Sports Gala 2025 - Annual University Games",
                "caption": "The grandest sporting event of the year! Sports Gala 2025 runs for an entire week - cricket, football, basketball, badminton, swimming, and athletics. Open to all enrolled students.",
                "image_urls": ["https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-11-03T08:00:00Z",
                "event_location": "University Sports Complex",
                "tags": ["SportsGala"]
            },
            {
                "title": "3x3 Basketball Street Ball Tournament",
                "caption": "Half-court, full intensity! Our 3x3 Basketball Street Ball Tournament. Teams of 3, fast-paced games, bragging rights on the line. Register by September 5th.",
                "image_urls": ["https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-09-12T16:00:00Z",
                "event_location": "Outdoor Basketball Court, Block C",
                "tags": ["Basketball"]
            }
        ]
    },
    {
        "email": "media.society@university.edu.pk",
        "society": {
            "name": "Media Society",
            "official_email": "media.society@university.edu.pk",
            "about": "The Media Society is the creative hub for student journalists, videographers, broadcasters, and content creators. We run the campus newspaper 'The Nexus', produce a weekly video news segment, manage official university social media, and host a student podcast series. We provide training in journalism ethics, video production, Adobe Premiere, and on-camera performance.",
            "logo_url": "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=200&h=200",
            "president_name": "Nadia Khan",
            "president_email": "nadia.khan@university.edu.pk",
            "president_picture_url": "https://i.pravatar.cc/150?img=38",
            "social_instagram": "https://instagram.com/mediasociety_uni",
            "social_linkedin": "https://linkedin.com/company/media-society-uni",
            "social_facebook": "https://facebook.com/mediasocietyuni",
            "social_other": "+92 312 0123456",
            "status": "approved"
        },
        "posts": [
            {
                "title": "The Nexus - July 2025 Edition Live!",
                "caption": "Our July edition of The Nexus is out! This month we cover: the new student transport policy, an exclusive interview with the Vice Chancellor, startup spotlights, and sports gala preview.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Newspaper", "Journalism"]
            },
            {
                "title": "Video Production Workshop - Adobe Premiere",
                "caption": "35 students attended our 2-day Adobe Premiere Pro workshop. They learned multi-cam editing, color grading, audio mixing, and motion graphics. Final project: a 3-minute mini-documentary.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Workshop", "VideoProduction"]
            },
            {
                "title": "Campus Podcast Episode 12 - AI in Education",
                "caption": "The latest episode of 'Campus Unfiltered' is live! We spoke to 3 professors and 5 students about AI tools in classrooms. Should ChatGPT be banned or embraced? Listen on Spotify!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1478737270197-09b5c359f3a9?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Podcast", "Content"]
            }
        ],
        "events": [
            {
                "title": "Short Film Festival 2025",
                "caption": "Calling all filmmakers! Submit your original short film (under 10 minutes) on the theme 'Identity'. Top 8 films screened on the big screen, judged by industry professionals. Cash prizes for winners.",
                "image_urls": ["https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-10-25T17:00:00Z",
                "event_location": "Main Auditorium",
                "tags": ["FilmFestival"]
            },
            {
                "title": "Journalism 101 - Free Crash Course",
                "caption": "Interested in journalism? Our 3-session crash course covers news writing, source verification, interview techniques, and media ethics. Perfect for beginners. Certificates of participation issued.",
                "image_urls": ["https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-09-08T15:00:00Z",
                "event_location": "Room A-103, Block A",
                "tags": ["Workshop"]
            }
        ]
    },
    {
        "email": "literary.society@university.edu.pk",
        "society": {
            "name": "Literary Society",
            "official_email": "literary.society@university.edu.pk",
            "about": "The Literary Society is a sanctuary for readers, writers, poets, and storytellers. We host fortnightly book club sessions, creative writing workshops, open-mic poetry nights, and short story competitions. Our annual 'Inkwell' magazine publishes original fiction, poetry, and essays by student writers. Whether you love Urdu shayari or English contemporary fiction, there is a space for every voice.",
            "logo_url": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=200&h=200",
            "president_name": "Ayesha Siddiqui",
            "president_email": "ayesha.siddiqui@university.edu.pk",
            "president_picture_url": "https://i.pravatar.cc/150?img=49",
            "social_instagram": "https://instagram.com/literarysociety_uni",
            "social_linkedin": "https://linkedin.com/company/literary-society-uni",
            "social_facebook": "https://facebook.com/literarysocietyuni",
            "social_other": "+92 331 2345609",
            "status": "approved"
        },
        "posts": [
            {
                "title": "Book Club June - Pachinko by Min Jin Lee",
                "caption": "Our June Book Club discussion on Pachinko was deeply moving. 30 members explored themes of identity, sacrifice, and belonging across generations. Next month: The Kite Runner. Join the waiting list!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["BookClub", "Reading"]
            },
            {
                "title": "Inkwell 2025 - Call for Submissions!",
                "caption": "Our annual literary magazine Inkwell is accepting submissions! We want original poems, short stories (max 2,500 words), and personal essays. Theme this year: Roots and Routes. Submit by August 31.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Submission", "Creative"]
            },
            {
                "title": "Open Mic Night Highlights - Shab-e-Sher",
                "caption": "Last Friday's Shab-e-Sher was electric! 18 poets performed in Urdu, English, and Punjabi to an audience of 120. From heartbreak to resistance to comedy - every emotion was in the room.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Poetry", "OpenMic"]
            }
        ],
        "events": [
            {
                "title": "Shab-e-Sher - Autumn Edition Open Mic Night",
                "caption": "The most anticipated literary night of the semester! Perform your original poetry, prose, or spoken word in any language. 5-minute slots, welcoming audience, warm tea. Sign up at the door.",
                "image_urls": ["https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-09-12T18:30:00Z",
                "event_location": "Garden Courtyard, Block E",
                "tags": ["OpenMic"]
            },
            {
                "title": "Creative Writing Workshop: Flash Fiction",
                "caption": "Master the art of saying more with less. Our 2-hour flash fiction workshop teaches you to craft a complete, compelling story in under 500 words. Exercises, feedback, and publication opportunities!",
                "image_urls": ["https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-08-28T14:00:00Z",
                "event_location": "Room E-205, Block E",
                "tags": ["Workshop"]
            }
        ]
    },
    {
        "email": "eclub@university.edu.pk",
        "society": {
            "name": "Entrepreneurship Club",
            "official_email": "eclub@university.edu.pk",
            "about": "The Entrepreneurship Club is where ideas become ventures. We support student entrepreneurs through mentorship, startup resources, pitch training, and connections with investors and industry leaders. Our programs include startup incubation, business plan competitions, startup boot camps, and fireside chats with successful founders. Whether you have an idea on a napkin or a product ready to launch, E-Club provides the community and network you need.",
            "logo_url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=200&h=200",
            "president_name": "Bilal Ahmad",
            "president_email": "bilal.ahmad@university.edu.pk",
            "president_picture_url": "https://i.pravatar.cc/150?img=15",
            "social_instagram": "https://instagram.com/eclub_uni",
            "social_linkedin": "https://linkedin.com/company/eclub-uni",
            "social_facebook": "https://facebook.com/eclubuni",
            "social_other": "+92 301 3456780",
            "status": "approved"
        },
        "posts": [
            {
                "title": "Startup Weekend 2025 - Our Team Won!",
                "caption": "Team GreenGrid from our E-Club won 1st place at Startup Weekend Islamabad 2025! They pitched an IoT-based energy optimization system for homes. 54 hours, 3 mentors, one incredible idea. Funding talks next!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Achievement", "Startup"]
            },
            {
                "title": "Fireside Chat: Failing Forward with Asad Malik",
                "caption": "We hosted Asad Malik, founder of 3 startups (2 failed, 1 acquired!) for a brutally honest fireside chat on entrepreneurship. Key takeaway? Failure is curriculum. Watch the full session on YouTube!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Talk", "Founder"]
            },
            {
                "title": "Pitch Practice Session - Round 3 Recap",
                "caption": "Round 3 of our weekly pitch practice sessions wrapped up last Thursday. 8 student teams presented to a panel of alumni judges and got structured feedback. The improvement from round 1 is remarkable!",
                "image_urls": [
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Pitch", "Training"]
            },
            {
                "title": "Lean Canvas Workshop - Build Your Business Model",
                "caption": "Our Lean Canvas Workshop helps you visualize your business model on one page. Facilitated by two serial entrepreneurs, the 3-hour session covers problem, solution, revenue streams, and unfair advantages.",
                "image_urls": [
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
                ],
                "tags": ["Workshop", "Business"]
            }
        ],
        "events": [
            {
                "title": "E-Summit 2025 - Annual Entrepreneurship Summit",
                "caption": "The biggest entrepreneurship event in the region comes to our campus! E-Summit 2025 features keynote speakers, panel discussions, a startup expo, investor meetups, and the grand Business Plan Competition final.",
                "image_urls": ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-11-15T09:00:00Z",
                "event_location": "University Convention Center",
                "tags": ["Conference"]
            },
            {
                "title": "Business Plan Competition 2025 - Registrations Open",
                "caption": "Got a business idea? Submit a 5-page business plan by October 1. Top 10 teams pitch live at E-Summit to a panel of investors. Total prize pool: PKR 500,000. Registration is completely free.",
                "image_urls": ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"],
                "event_date": "2025-10-01T23:59:00Z",
                "event_location": "Online Submission",
                "tags": ["Competition"]
            }
        ]
    }
]

def seed():
    print("\n Starting database seeding...\n")
    total_societies = 0
    total_posts = 0
    total_events = 0

    for item in SOCIETIES:
        name = item["society"]["name"]
        email = item["email"]
        print(f"Processing: {name}")

        user_id = create_auth_user(email)
        if not user_id:
            print(f"  Skipping {name} - could not create auth user.\n")
            continue

        ok = insert_society(user_id, item["society"])
        if not ok:
            print(f"  Skipping posts/events for {name}.\n")
            continue
        total_societies += 1

        for post in item.get("posts", []):
            ok = insert_post(user_id, post)
            if ok:
                total_posts += 1

        for event in item.get("events", []):
            ok = insert_post(user_id, event)
            if ok:
                total_events += 1

        print()

    print("=" * 50)
    print("Seeding complete!")
    print(f"   Societies : {total_societies}")
    print(f"   Posts     : {total_posts}")
    print(f"   Events    : {total_events}")
    print("=" * 50)

if __name__ == "__main__":
    seed()

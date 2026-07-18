import urllib.request
import json
import uuid

SUPABASE_URL = "https://bstfctifxvkmklghgwvz.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdGZjdGlmeHZrbWtsZ2hnd3Z6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDM2NDAzOSwiZXhwIjoyMDk5OTQwMDM5fQ.DWqQfiROBB9xkVkISj_V_nq4pmVy5EX0X7XUBW7Yx2s"

headers = {
    "apikey": SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    "Content-Type": "application/json"
}

def create_user(email):
    url = f"{SUPABASE_URL}/auth/v1/admin/users"
    data = json.dumps({"email": email, "password": "securepassword123", "email_confirm": True}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode('utf-8'))
            return res['id']
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        print(f"Error creating user {email}: {err}")
        # If user exists, we'd have to find their ID. For simplicity, assume new setup.
        return None

def insert_society(user_id, name, email, about, logo_url, pres_name):
    url = f"{SUPABASE_URL}/rest/v1/societies"
    data = json.dumps({
        "id": user_id,
        "name": name,
        "official_email": email,
        "about": about,
        "logo_url": logo_url,
        "president_name": pres_name,
        "president_email": f"pres_{email}",
        "president_picture_url": f"https://ui-avatars.com/api/?name={pres_name.replace(' ', '+')}",
        "status": "approved"
    }).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    try:
        urllib.request.urlopen(req)
        print(f"Inserted society: {name}")
    except urllib.error.HTTPError as e:
        print(f"Error inserting society {name}: {e.read().decode()}")

def insert_post(society_id, title, caption, tags):
    url = f"{SUPABASE_URL}/rest/v1/posts"
    data = json.dumps({
        "society_id": society_id,
        "title": title,
        "caption": caption,
        "tags": tags
    }).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    try:
        urllib.request.urlopen(req)
        print(f"Inserted post: {title}")
    except urllib.error.HTTPError as e:
        print(f"Error inserting post {title}: {e.read().decode()}")

# 1. Create Alpha Society
id_alpha = create_user("alpha@example.com")
if id_alpha:
    insert_society(id_alpha, "Alpha Coding Club", "alpha@example.com", "We love Python and JavaScript.", "https://ui-avatars.com/api/?name=Alpha+Coding", "Alice Hacker")
    insert_post(id_alpha, "Intro to Python Workshop", "Join us this Friday for a beginner friendly workshop on Python!", ["Workshop", "Coding"])
    insert_post(id_alpha, "Hackathon Success!", "We won 1st place in the IEEE hackathon! Thanks to all members.", ["Achievement"])

# 2. Create Beta Society
id_beta = create_user("beta@example.com")
if id_beta:
    insert_society(id_beta, "Beta Design Society", "beta@example.com", "UI/UX, Graphic Design and more.", "https://ui-avatars.com/api/?name=Beta+Design", "Bob Designer")
    insert_post(id_beta, "Figma Masterclass", "Learn how to build stunning UIs with our Figma expert.", ["Seminar", "Design"])

print("Seeding complete!")

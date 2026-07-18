import { supabase, supabaseAdmin } from '../lib/supabaseClient';

// Category mapping helper
const getCategoryByName = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("code") || n.includes("robot") || n.includes("gdg") || n.includes("ai") || n.includes("tech") || n.includes("ieee")) return "Technical";
  if (n.includes("photo") || n.includes("design") || n.includes("art") || n.includes("music") || n.includes("drama") || n.includes("literary") || n.includes("debat")) return "Arts";
  if (n.includes("sport") || n.includes("cricket") || n.includes("football") || n.includes("athlet")) return "Sports";
  return "Social";
};

// Cover mapping helper
const getCoverByCategory = (cat) => {
  if (cat === "Technical") return "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200";
  if (cat === "Arts") return "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=1200";
  if (cat === "Sports") return "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=1200";
  return "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200";
};

export const db = {
  // Societies CRUD
  getSocieties: async () => {
    const { data: societies, error } = await supabase
      .from('societies')
      .select('*');
    if (error) {
      console.error("Error fetching societies:", error);
      return [];
    }
    
    // Fetch posts to compute counts
    const { data: posts } = await supabase
      .from('posts')
      .select('society_id, event_date');

    const countsMap = {};
    if (posts) {
      posts.forEach(p => {
        if (!countsMap[p.society_id]) {
          countsMap[p.society_id] = { posts: 0, events: 0 };
        }
        if (p.event_date) {
          countsMap[p.society_id].events++;
        } else {
          countsMap[p.society_id].posts++;
        }
      });
    }

    return societies.map(s => {
      const counts = countsMap[s.id] || { posts: 0, events: 0 };
      const cat = getCategoryByName(s.name);
      return {
        id: s.id, // UUID string
        name: s.name,
        category: cat,
        isVerified: s.status === 'approved',
        followers: 1200 + (s.name.length * 150),
        postsCount: counts.posts,
        eventsCount: counts.events,
        email: s.official_email,
        contact: s.social_other || "+92 300 1234567",
        description: s.about || "No description provided.",
        logo: s.logo_url || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200",
        cover: getCoverByCategory(cat),
        presidentName: s.president_name || "President",
        presidentEmail: s.president_email,
        presidentPictureUrl: s.president_picture_url,
        status: s.status,
        team: [
          { id: 1, name: s.president_name || "President", role: "President", avatar: s.president_picture_url || "https://i.pravatar.cc/150?img=12" }
        ],
        social_instagram: s.social_instagram,
        social_linkedin: s.social_linkedin,
        social_facebook: s.social_facebook,
        social_other: s.social_other
      };
    });
  },
  
  addSociety: async (society) => {
    try {
      const email = society.email || society.official_email;
      const password = society.password || 'tempPassword123';
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true
      });
      if (authError) throw authError;

      const user_id = authData.user.id;
      const { data, error } = await supabaseAdmin
        .from('societies')
        .insert({
          id: user_id,
          name: society.name,
          official_email: email,
          about: society.description || society.aboutUs,
          logo_url: society.logo,
          president_name: society.presidentName,
          president_email: society.presidentEmail || `pres_${email}`,
          president_picture_url: society.presidentPictureUrl || `https://ui-avatars.com/api/?name=${society.presidentName.replace(' ', '+')}`,
          status: 'approved'
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error adding society:", err);
      throw err;
    }
  },

  updateSociety: async (id, updatedData) => {
    const payload = {
      name: updatedData.name,
      about: updatedData.description || updatedData.about || updatedData.aboutUs,
      logo_url: updatedData.logo || updatedData.logo_url,
      president_name: updatedData.presidentName || updatedData.president_name,
      president_email: updatedData.presidentEmail || updatedData.president_email,
      president_picture_url: updatedData.presidentPictureUrl || updatedData.president_picture_url,
      social_instagram: updatedData.social_instagram,
      social_linkedin: updatedData.social_linkedin,
      social_facebook: updatedData.social_facebook,
      social_other: updatedData.social_other
    };
    
    // Remove undefined fields
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const { data, error } = await supabase
      .from('societies')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating society:", error);
      throw error;
    }
    return data;
  },

  deleteSociety: async (id) => {
    // Delete from societies table
    const { error: dbError } = await supabaseAdmin
      .from('societies')
      .delete()
      .eq('id', id);
    if (dbError) throw dbError;

    // Delete corresponding Auth user
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (authError) throw authError;

    return true;
  },

  // Pending Registrations
  getPendingRegistrations: async () => {
    const { data, error } = await supabase
      .from('registration_requests')
      .select('*')
      .eq('status', 'pending');
    if (error) {
      console.error("Error fetching registrations:", error);
      return [];
    }

    return data.map(r => {
      let parsed = {};
      try {
        parsed = JSON.parse(r.about);
      } catch (e) {
        parsed = { aboutUs: r.about, category: 'Technical' };
      }

      return {
        id: r.id,
        societyName: r.name,
        officialEmail: r.official_email,
        description: parsed.description || r.about,
        aboutUs: parsed.aboutUs || r.about,
        logo: r.logo_url || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200&h=200",
        cover: getCoverByCategory(parsed.category || 'Technical'),
        presidentName: r.president_name,
        presidentEmail: r.president_email,
        presidentRoll: parsed.roll || "SE-2022-001",
        department: parsed.dept || "Software Engineering",
        contactNumber: parsed.contact || "+92 300 1234567",
        status: r.status,
        password: parsed.password
      };
    });
  },

  submitRegistration: async (data) => {
    // Package category, contact, password, roll, dept into the about field as JSON
    const aboutJSON = JSON.stringify({
      aboutUs: data.aboutUs,
      description: data.description,
      password: data.password,
      category: data.societyCategory,
      contact: data.contactNumber,
      roll: data.presidentRoll,
      dept: data.department
    });

    const { data: requestData, error } = await supabase
      .from('registration_requests')
      .insert({
        name: data.societyName,
        about: aboutJSON,
        logo_url: data.logo,
        official_email: data.officialEmail,
        president_name: data.presidentName,
        president_email: data.presidentEmail,
        president_picture_url: data.logo,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error("Error submitting registration request:", error);
      throw error;
    }
    return requestData;
  },

  approveRegistration: async (id) => {
    try {
      // 1. Fetch registration request
      const { data: req, error: fetchErr } = await supabaseAdmin
        .from('registration_requests')
        .select('*')
        .eq('id', id)
        .single();
      if (fetchErr) throw fetchErr;

      let parsed = {};
      try {
        parsed = JSON.parse(req.about);
      } catch (e) {
        parsed = { aboutUs: req.about, password: 'tempPassword123' };
      }

      // 2. Create Auth User
      const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
        email: req.official_email,
        password: parsed.password || 'tempPassword123',
        email_confirm: true
      });
      if (authErr) throw authErr;

      const user_id = authData.user.id;

      // 3. Insert into societies
      const { error: insertErr } = await supabaseAdmin
        .from('societies')
        .insert({
          id: user_id,
          name: req.name,
          official_email: req.official_email,
          about: parsed.aboutUs || parsed.description || req.about,
          logo_url: req.logo_url,
          president_name: req.president_name,
          president_email: req.president_email,
          president_picture_url: req.president_picture_url,
          status: 'approved'
        });
      if (insertErr) throw insertErr;

      // 4. Update request status to approved
      const { error: updateErr } = await supabaseAdmin
        .from('registration_requests')
        .update({ status: 'approved' })
        .eq('id', id);
      if (updateErr) throw updateErr;

      return true;
    } catch (err) {
      console.error("Error approving registration:", err);
      throw err;
    }
  },

  rejectRegistration: async (id) => {
    const { error } = await supabaseAdmin
      .from('registration_requests')
      .update({ status: 'rejected' })
      .eq('id', id);
    if (error) {
      console.error("Error rejecting registration:", error);
      throw error;
    }
    return true;
  },

  // Events & Posts
  getEvents: async () => {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, societies(name, logo_url)')
      .not('event_date', 'is', null)
      .order('event_date', { ascending: true });
    if (error) {
      console.error("Error fetching events:", error);
      return [];
    }

    return posts.map(p => {
      const dateObj = new Date(p.event_date);
      const isToday = dateObj.toDateString() === new Date().toDateString();
      return {
        id: p.id,
        societyId: p.society_id,
        societyName: p.societies?.name || "Society",
        societyLogo: p.societies?.logo_url || "https://i.pravatar.cc/150",
        title: p.title,
        description: p.caption,
        image: p.image_urls && p.image_urls[0] || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
        likes: 12,
        comments: 2,
        saved: false,
        type: p.tags && p.tags[0] || "Workshop",
        date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        venue: p.event_location || "Virtual / Campus Aud",
        isToday
      };
    });
  },
  
  getPosts: async () => {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, societies(name, logo_url)')
      .is('event_date', null)
      .order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching posts:", error);
      return {};
    }

    const grouped = {};
    posts.forEach(p => {
      if (!grouped[p.society_id]) {
        grouped[p.society_id] = [];
      }
      grouped[p.society_id].push({
        id: p.id,
        title: p.title,
        caption: p.caption,
        image: p.image_urls && p.image_urls[0] || null,
        likes: 24,
        comments: 5,
        time: new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    });
    return grouped;
  },

  addPost: async (societyId, title, caption, imageUrl) => {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        society_id: societyId,
        title,
        caption,
        image_urls: imageUrl ? [imageUrl] : [],
        tags: ["Announcement"]
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  addEvent: async (societyId, event) => {
    const dateStr = event.date + ' ' + (event.time || '12:00:00');
    const { data, error } = await supabase
      .from('posts')
      .insert({
        society_id: societyId,
        title: event.title,
        caption: event.description,
        image_urls: event.image ? [event.image] : [],
        event_date: new Date(dateStr).toISOString(),
        event_location: event.venue,
        tags: [event.type || "Workshop"]
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  deletePost: async (postId) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);
    if (error) throw error;
    return true;
  },

  getGalleries: async () => {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('society_id, image_urls')
      .not('image_urls', 'is', null);
    if (error) {
      console.error("Error fetching galleries:", error);
      return {};
    }

    const galleries = {};
    posts.forEach(p => {
      if (p.image_urls && Array.isArray(p.image_urls) && p.image_urls.length > 0) {
        if (!galleries[p.society_id]) {
          galleries[p.society_id] = [];
        }
        p.image_urls.forEach(url => {
          if (url) galleries[p.society_id].push(url);
        });
      }
    });
    return galleries;
  },

  addGalleryImage: async (societyId, imageUrl) => {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        society_id: societyId,
        title: 'Gallery Image',
        caption: 'Uploaded via gallery',
        image_urls: [imageUrl],
        tags: ["Gallery"]
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  deleteGalleryImage: async (societyId, imageUrl) => {
    // Find the post that has this image_url and delete it
    const { data: posts, error } = await supabase
      .from('posts')
      .select('id')
      .eq('society_id', societyId)
      .contains('image_urls', [imageUrl]);
    
    if (error) throw error;
    if (posts && posts.length > 0) {
      const { error: delError } = await supabase
        .from('posts')
        .delete()
        .eq('id', posts[0].id);
      if (delError) throw delError;
    }
    return true;
  }
};

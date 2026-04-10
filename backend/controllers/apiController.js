const Project = require('../models/Project');
const Service = require('../models/Service');
const Contact = require('../models/Contact');
const Review = require('../models/Review');
const Setting = require('../models/Setting');
const Staff = require('../models/Staff');
const Subscriber = require('../models/Subscriber');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// API Controller Methods

// Basic health check responder
exports.getHealthStatus = (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.status(200).json({
    status: 'success',
    message: 'API is running normally',
    database: {
      connected: dbState === 1,
      state: dbState,
      stateLabel: ['disconnected', 'connected', 'connecting', 'disconnecting'][dbState] || 'unknown'
    },
    env: {
      mongoUriSet: !!process.env.MONGO_URI,
      jwtSecretSet: !!process.env.JWT_SECRET,
      emailPasswordSet: !!process.env.EMAIL_PASSWORD
    },
    timestamp: new Date().toISOString()
  });
};

/* --- PROJECTS --- */
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, category, technologies, demoLink } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image || '';
    
    // Convert comma-separated strings to arrays if necessary
    const techArray = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
    
    const newProject = new Project({
      title,
      category,
      technologies: techArray || [],
      demoLink: demoLink || '',
      image: imagePath,
    });
    
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, category, technologies, demoLink, image } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    if (title) project.title = title;
    if (category) project.category = category;
    if (demoLink !== undefined) project.demoLink = demoLink;
    
    if (technologies) {
      project.technologies = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
    }
    
    if (req.file) {
      project.image = `/uploads/${req.file.filename}`;
    } else if (image) {
      project.image = image;
    }

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

/* --- SERVICES --- */
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

exports.createService = async (req, res) => {
  try {
    const { title, description, icon, accent, pricing, features, process, technologies } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image || '';

    // Convert strings to arrays for JSON arrays sent via form-data
    const parseIfJSON = (val) => {
      try { return typeof val === 'string' ? JSON.parse(val) : val; } 
      catch { return val ? [val] : []; }
    };

    const newService = new Service({
      title,
      description,
      icon,
      accent,
      pricing,
      image: imagePath,
      features: parseIfJSON(features),
      process: parseIfJSON(process),
      technologies: parseIfJSON(technologies),
    });
    
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create service' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { title, description, icon, accent, pricing, features, process, technologies, image } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const parseIfJSON = (val) => {
      try { return typeof val === 'string' ? JSON.parse(val) : val; } 
      catch { return val ? [val] : []; }
    };

    if (title) service.title = title;
    if (description) service.description = description;
    if (icon) service.icon = icon;
    if (accent) service.accent = accent;
    if (pricing) service.pricing = pricing;
    if (features) service.features = parseIfJSON(features);
    if (process) service.process = parseIfJSON(process);
    if (technologies) service.technologies = parseIfJSON(technologies);

    if (req.file) {
      service.image = `/uploads/${req.file.filename}`;
    } else if (image) {
      service.image = image;
    }

    await service.save();
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update service' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
};

/* --- CONTACTS --- */
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

exports.markContactAsRead = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    contact.read = !contact.read;
    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

// Handle contact form submissions
exports.submitContactForm = async (req, res) => {
  const { name, email, phone, services, message } = req.body;
  let dbSaved = false;
  let emailSent = false;

  // 1. Attempt Database Save
  try {
    const newContact = new Contact({ name, email, phone, services, message });
    await newContact.save();
    dbSaved = true;
  } catch (err) {
    console.error('CRITICAL: Database save failed for contact form:', err.message);
    // Proceeding so email can still be sent
  }

  // 2. Attempt Email Notification via Nodemailer
  const EMAIL_USER = 'griteksolutions@gmail.com';
  const EMAIL_PASS = process.env.EMAIL_PASSWORD;

  if (EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: EMAIL_USER,
        to: EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone || 'N/A'}
          Interested Services: ${services ? (Array.isArray(services) ? services.join(', ') : services) : 'None'}
          Message: ${message}
          ---
          Note: This notification was sent directly. Database saved: ${dbSaved}
        `,
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log('Notification email sent successfully for:', name);
    } catch (mailError) {
      console.error('Error sending notification email:', mailError.message);
    }
  } else {
    console.warn('Skipping email send. No EMAIL_PASSWORD set in environment variables.');
  }

  // 3. Send Response
  if (dbSaved || emailSent) {
    res.status(200).json({
      status: 'success',
      message: 'Thank you for your message. We will be in touch shortly.',
      details: { dbSaved, emailSent }
    });
  } else {
    res.status(500).json({
      error: 'Form submission failed completely. Please try again later.',
      details: { dbSaved, emailSent }
    });
  }
};

/* --- REVIEWS --- */
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approved reviews' });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { name, role, company, comment, rating } = req.body;
    const newReview = new Review({ name, role, company, comment, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

exports.updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update review status' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

/* --- SETTINGS --- */
exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    // Convert array to object for easier frontend use
    const settingsObj = {};
    settings.forEach(s => settingsObj[s.key] = s.value);
    res.json(settingsObj);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body; // Expecting { key: value, ... }
    const promises = Object.entries(updates).map(([key, value]) => {
      return Setting.findOneAndUpdate(
        { key },
        { key, value },
        { upsert: true, new: true }
      );
    });
    await Promise.all(promises);
    res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
};

/* --- ADMIN PROFILE --- */
exports.updateAdminProfile = async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    const adminId = req.user.id; // From protect middleware

    const admin = await Staff.findById(adminId);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    if (username) admin.username = username;
    if (newPassword) {
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
/* --- STAFF MANAGEMENT --- */
exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().select('-password').sort({ createdAt: -1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
};

exports.createStaff = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Check if user exists
    const existing = await Staff.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({
      username,
      password: hashedPassword,
      role: role || 'admin'
    });

    await newStaff.save();
    res.status(201).json({ message: 'Staff member created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create staff member' });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Don't allow deleting self? (Optional check, already in frontend)
    if (id === req.user.id) {
        return res.status(400).json({ error: 'You cannot delete your own account' });
    }

    await Staff.findByIdAndDelete(id);
    res.json({ message: 'Staff member removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete staff member' });
  }
};

/* --- DASHBOARD STATS --- */
exports.getDashboardStats = async (req, res) => {
  try {
    const [projects, services, contacts, reviews, staff] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      Contact.countDocuments(),
      Review.countDocuments(),
      Staff.countDocuments(),
    ]);

    const recentMessages = await Contact.find().sort({ createdAt: -1 }).limit(5);
    const pendingReviews = await Review.countDocuments({ status: 'pending' });

    res.json({
      projects,
      services,
      contacts,
      reviews,
      staff,
      pendingReviews,
      recentMessages,
      subscribers: await Subscriber.countDocuments({ active: true }),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

/* --- NEWSLETTER SUBSCRIBERS --- */
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const existing = await Subscriber.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      if (!existing.active) {
        existing.active = true;
        existing.subscribedAt = new Date();
        await existing.save();
        return res.json({ message: 'Welcome back! You have been re-subscribed.' });
      }
      return res.status(400).json({ error: 'This email is already subscribed.' });
    }

    await Subscriber.create({ email });
    res.status(201).json({ message: 'Successfully subscribed!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscriber removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete subscriber' });
  }
};

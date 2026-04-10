require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Staff = require('./models/Staff');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI is not set in .env');
  process.exit(1);
}

async function initialize() {
  try {
    console.log('--- Database Initialization ---');
    console.log('Connecting to Atlas...');
    
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    
    console.log('Successfully connected to Atlas.');

    const adminEmail = 'gritek@admin.com';
    const adminPassword = 'gritek@2028';
    
    let admin = await Staff.findOne({ username: adminEmail });
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    if (!admin) {
      console.log(`Creating initial admin account: ${adminEmail}...`);
      admin = new Staff({
        username: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin user created successfully!');
    } else {
      console.log(`Admin account already exists: ${adminEmail}. Resetting password...`);
      admin.password = hashedPassword;
      await admin.save();
      console.log('✅ Admin password reset successfully!');
    }

    console.log('\n--- Setup Complete ---');
    console.log('Login URL: https://www.griteksolutions.com/login');
    console.log(`Username: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('\nIMPORTANT: Change your password as soon as you log in.');

    process.exit(0);
  } catch (err) {
    console.error('CRITICAL: Initialization failed!');
    console.error(err);
    process.exit(1);
  }
}

initialize();

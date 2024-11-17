// src/lib/db/models/user.model.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    }
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'analyst', 'user'],
    default: 'user' 
  },
  organization: { type: String },
  preferences: {
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true },
    dashboardLayout: { type: Object }
  },
  lastLogin: Date,
  isActive: { type: Boolean, default: true }
}, { 
  timestamps: true,
  methods: {
    comparePassword(candidatePassword: string) {
      return bcrypt.compare(candidatePassword, this.password);
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
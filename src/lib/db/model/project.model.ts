// src/lib/db/models/project.model.ts
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { 
      type: String, 
      enum: ['owner', 'editor', 'viewer'],
      default: 'viewer'
    },
    joinedAt: { type: Date, default: Date.now }
  }],
  settings: {
    forecastingMethod: { 
      type: String,
      enum: ['ARIMA', 'SARIMA', 'Prophet', 'HoltWinters'],
      default: 'ARIMA'
    },
    confidenceInterval: { type: Number, default: 95 },
    seasonality: { type: String, enum: ['none', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly'] }
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'deleted'],
    default: 'active'
  }
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
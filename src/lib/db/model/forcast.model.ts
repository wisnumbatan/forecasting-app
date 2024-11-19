import mongoose from 'mongoose';

const forecastSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  name: { type: String, required: true },
  description: String,
  data: [{
    timestamp: { type: Date, required: true },
    value: { type: Number, required: true },
    confidenceLower: Number,
    confidenceUpper: Number
  }],
  metadata: {
    method: {
      type: String,
      enum: ['ARIMA', 'SARIMA', 'Prophet', 'HoltWinters'],
      required: true
    },
    parameters: {
      p: Number,
      d: Number,
      q: Number,
      seasonal: Boolean,
      period: Number
    },
    accuracy: {
      mape: Number,
      rmse: Number,
      mae: Number
    }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  lastUpdated: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  timestamps: true,
  index: { project: 1, createdAt: -1 }
});

export const Forecast = mongoose.models.Forecast || mongoose.model('Forecast', forecastSchema);
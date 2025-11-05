const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Activity requires a name'],
  },
  duration: {
    type: String,
    required: [true, 'Activity must have a duration'],
  },
  maxGroupSize: Number,
  description: {
    type: String,
    required: [true, 'Activity must have a description'],
  },
  included: {
    type: Boolean,
    default: true,
  },
});

const locationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Location must have a description'],
  },
  type: {
    type: String,
    default: 'Point',
    enum: ['Point'],
  },
  coordinates: {
    type: [Number],
    required: [true, 'Location must have coordinates'],
  },
  address: String,
});

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A destination must have a name'],
    unique: true,
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A destination must have a summary'],
  },
  description: {
    type: String,
    required: [true, 'A destination must have a description'],
  },
  imageCover: {
    type: String,
    required: [true, 'A destination must have a cover image'],
  },
  images: [String],
  location: {
    type: locationSchema,
    required: true,
  },
  activities: [activitySchema],
  duration: {
    type: Number,
    required: [true, 'A destination must have a duration'],
  },
  price: {
    type: Number,
    required: [true, 'A destination must have a price'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be at or above 1.0'],
    max: [5, 'Rating must be at or below 5.0'],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

destinationSchema.index({ 'location.coordinates': '2dsphere' });

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;

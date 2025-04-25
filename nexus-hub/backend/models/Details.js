const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DetailsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  passOutYear: { type: Number, required: true },
  jobPosition: String,
  companyName: String,
  location: String,
  successStory: String,
  linkedInURL: String,
  hallOfFame: String,
  specialAchievements: String,
});

DetailsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Details', DetailsSchema, 'alumnis');

const mongoose = require('mongoose');
const { marked } = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
});

articleSchema.pre('validate', function(next) {
  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
  }
  console.log('Sanitized HTML:', this.sanitizedHtml);
  next();
});

module.exports = mongoose.model('Article', articleSchema);
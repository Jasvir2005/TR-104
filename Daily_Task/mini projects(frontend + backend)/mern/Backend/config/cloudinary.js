const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
  cloud_name: 'de53neadc', 
  api_key: '336698969668321', 
  api_secret: 'KMPHY0HDNnF0TZkk38ErnNvWeOc'
});

module.exports = cloudinary;
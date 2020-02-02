  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  //Define collection and schema for Users
  let Users = new Schema({
      first_name: {
          type: String
      },
      last_name: {
          type: String
      },
      email: {
          type: String
      }
  },{
    collection: 'user'
  });


  module.exports = mongoose.model('Users', Users);
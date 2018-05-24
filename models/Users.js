const mongoose = require('mongoose');
//Assigning mongoose schema property to the Schema variable
const {Schema} = mongoose;  //This line of code is same as 'const Schema = mongoose.Schema;'
//Define collection
const userSchema = new Schema ({
  googleID: String
});
//Create a collection users
//mongoose do not overwrite existing collection
mongoose.model('users',userSchema);

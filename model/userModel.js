const { Schema, model } = require("mongoose");


const Address = new Schema({
    city: { type: String ,default:""},
    state: { type: String,default:""},
    country: { type: String,default:""}
});

const UserDetails = new Schema({
    userId: { type: String, require:true, unique:true},  // Use uuidv4 as the default value
    name: { type: String, required: true },
    age: { type: String, required: true },
    phoneno: { type: String, required: true },
    imageUrl: { type: String, default:''},
    address: { type: Address }
});

const Users = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userDetails: { type: UserDetails }
});

module.exports = model("Users", Users);

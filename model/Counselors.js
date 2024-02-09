const { model , Schema}= require('mongoose');

const Counselors = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
});

module.exports = model("VITCounselors",Counselors);

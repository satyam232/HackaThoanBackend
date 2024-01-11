const { Schema, model } = require("mongoose");


const AllSessions= new Schema({
    userId:{type:String,require:true},
    doctorname:{type:String,require:true},
    date:{type:String,require:true},
    time: {type:String,require:true}
});

module.exports = model("AllSessions", AllSessions);
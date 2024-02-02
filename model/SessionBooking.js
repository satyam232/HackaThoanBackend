const { Schema, model } = require("mongoose");

const BookSession=new Schema({
    doctorId:{type:String,required:true},
    userId:{type:String,required:true},
    doctorName:{type:String,required:true},
    time:{type:String,require:true},
    date:{type:String,required:true}
});


module.exports=model('BookedSession',BookSession)
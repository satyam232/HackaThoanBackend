const { model , Schema}= require('mongoose');


const Address = new Schema({
    city: { type: String ,default:""},
    state: { type: String,default:""},
    country: { type: String,default:""}
});




const DoctorDetails = new Schema({
    UserId: { type: String, require:true, unique:true},
    name: { type: String, required: true },
    age: { type: String, required: true },
    designamtion:{type:String,require:true},
    phoneno: { type: String, required: true },
    imageUrl: { type: String, default:''},
    address: { type: Address }
});



const DoctorModel=new Schema({
    doctor:{type:Boolean,default:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    doctorDetails: { type: DoctorDetails }
})

module.exports=model("doctors",DoctorModel)
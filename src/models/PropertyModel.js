const mongoose = require("mongoose")
const Schema = mongoose.Schema

const propertySchema = new Schema({

    title : {
        type :String,
    },
    address:{
        type:String,
    },
    stateId:{
        type:Schema.Types.ObjectId,
        ref:"State",
    },
    cityId:{
        type:Schema.Types.ObjectId,
        ref:"City",
    },
    pincode:{
        type:String,
    },
    areaId :{
        type:Schema.Types.ObjectId,
        ref:"Area"
    },
    propertyType:{
        type:String,
        enum:["apartment","villa","house","hotel"]
    },
    propertyURL:{
        type:String,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }

},
{
    timestamps:true
})

module.exports = mongoose.model("Property",propertySchema)
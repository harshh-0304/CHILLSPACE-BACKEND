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

    availableRooms: {
        type: Number, // ✅ Add this field
        default: 0, // Optional: Default value if not provided
      },

    price: {
        type: Number, // ✅ Add this field
        // Optional: Ensure price is always provided
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
const propertyModel = require("../models/PropertyModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");


const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

const addPropertyWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      console.log(cloundinaryResponse);
      console.log(req.body);
      

      //store data in database
      req.body.propertyURL = cloundinaryResponse.secure_url;
      const savedProperty = await propertyModel.create(req.body);

      res.status(200).json({
        message: "Property added successfully",
        data: savedProperty
      });
    }
  });
};

// const addProperty = async (req, res) => {
//   try {
//     const savedProperty = await propertyModel.create(req.body);
//     res.status(201).json({
//       message: "Property added successfully",
//       data: savedProperty,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// };

const getAllPropertiesByUserId = async (req, res) => {
  
  try {
    const properties = await propertyModel
      .find({userId:req.params.userId})
      .populate("stateId cityId areaId userId");
    if (properties.length === 0) {
      res.status(404).json({ message: "No properties found" });
    } else {
      res.status(200).json({
        message: "Property found successfully",
        data: properties,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






const getProperties = async (req, res) => {
  try {
    const properties = await propertyModel
      .find()
      .populate("cityId stateId areaId");
    res.status(200).json({
      message: "All Properties Fetched Successfully.",
      data: properties,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getPropertyByStateId = async (req, res) => {
  try {
    const properties = await propertyModel.find({stateId:req.params.stateId}).populate("cityId stateId areaId");
    res.status(200).json({
      message: "Property found",
      data: properties,
    });
  } catch (err) {
    res.status(500).json({
      message: "Property doesn't found",
    });
  }
};




module.exports = { addPropertyWithFile,  getProperties, getPropertyByStateId,  getAllPropertiesByUserId };

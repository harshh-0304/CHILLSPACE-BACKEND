const routes = require('express').Router();
const propertyController = require('../controllers/PropertyController');

// routes.post('/addproperty', propertyController.addProperty);
routes.get('/getallproperties', propertyController.getProperties);
routes.get("/getpropertybystate/:stateId", propertyController.getPropertyByStateId);
routes.post('/addWithFile', propertyController.addPropertyWithFile);
routes.get('/getpropertiesbyuserid/:userId', propertyController.getAllPropertiesByUserId);
module.exports = routes;
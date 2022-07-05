const Router = require("express").Router();
const RestaurantSchema = require('../schemas/restaurant');
const { default: mongoose } = require("mongoose");

Router.get('/read/:_id', (req, res) => {
  let { _id } = req.params;

  if(!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({ error: 'INVALID' });
  }
  return (async function(){
    const data = await RestaurantSchema.findById(_id);

    if(data){
      return res.status(200).send(data);
    } else return res.status(400).send({ error: "NOT_FOUND" });
  })()
})
Router.get('/read', (req, res) => {
  (async function(){
    const data = await RestaurantSchema.find({});

    if(data){
      return res.send(data);
    } else return res.send({ error: "NOT_FOUND" });
  })()
});
module.exports = Router;
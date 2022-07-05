const RestaurantSchema = require('../schemas/restaurant');
const Router = require("express").Router();

Router.put('/logo_url', async(req, res) => {
  const { name, logo_url } = req.body;

  let restaurantExist = await RestaurantSchema.findOne({ name });

  if(restaurantExist){
    return res.send(await updateLogo_url(name, logo_url));
  } else {
    return res.send({ error: "restaurant does not exist:(" })
  }
})

module.exports = Router;

function updateLogo_url(name, logo_url=false){
  if(logo_url && logo_url.length > 15 && logo_url.length < 250){
    return RestaurantSchema.findOneAndUpdate(
      { name },
      {
        logo_url: `active:${logo_url}`,
        updatedAt: new Date().getTime()
      },
      { new: true }
    )
  } else return { error: "Invalid data" }
}
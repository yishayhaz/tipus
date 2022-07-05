const Router = require("express").Router();
const RestaurantSchema = require("../schemas/restaurant");

Router.delete('/logo_url', async(req, res) => {
  const { name, token } = req.body;

  let restaurantExist = RestaurantSchema.findOne({ name });

  if (restaurantExist) {
    if(token === 12345){
      return res.send(await deleteLogo(name, restaurantExist))
    } else {
      return res.send(await holdLogo(name, restaurantExist));
    }
  } else {
    return res.send({ error: "restaurant does not exist:(" });
  }
})

module.exports = Router;

function deleteLogo(name, restaurantData){
  return restaurantData.then(() => (
    RestaurantSchema.findOneAndUpdate(
      { name },
      { logo_url: "#" },
      { new: true }
    )
    .then(data => data)
    .catch(err => { error: "Server Error" })
  ));
}
function holdLogo(name, restaurantData){
  return restaurantData.then(data => (
    RestaurantSchema.findOneAndUpdate(
      { name },
      { 
        logo_url: data.logo_url.replace("active:", "hold:"),
        updatedAt: new Date().getTime()
      },
      { new: true }
    )
    .then(data => data)
    .catch(err => { error: "Server Error" })
  ))
}
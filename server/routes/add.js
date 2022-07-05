const RestaurantSchema = require('../schemas/restaurant');
const Router = require("express").Router();
const { default: mongoose } = require("mongoose");

// dummy variables
const roles = [
  "waiter",
  "host",
  "chef",
  "cook",
  "barmen",
  "checker",
  "shift_manager",
  "manager",
  "מלצר/ית",
  "מארח/ת",
  "שף/ית",
  "טבח/ית",
  "ברמן/ית",
  "צ'קר/ית",
  "מנהל/ת משמרת",
  "מנהל/ת",
  'אחמ"ש/ית'
];

Router.post('/restaurant', (req, res) => {
  const { name, city, branch } = req.body;

  let filter = { name, city };

  if(branch) filter.branch = branch;

  (async function(){
    let restaurantExist = await RestaurantSchema.findOne(filter);
  
    if(restaurantExist){
      return res.json({ error: branch ? "EXIST" : "EXIST_SET_BRANCH" });
    } else {
      return res.json(await createRestaurant(req, res));
    }
  })()
})

Router.post('/review/:_id', async(req, res) => {
  let { _id } = req.params;

  if(!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({ error: 'INVALID' });
  }
  let restaurantExist = await RestaurantSchema.findById(_id);

  if(restaurantExist){
    return res.json(await createReview(req, _id));
  } else {
    return res.status(404).json({ error: "NOT_FOUND" });
  }
})

module.exports = Router;

function createReview(req, _id){
  const { name, role, comment, score, payment_method, contact } = req.body;

  let doc = {};
  if(typeof name === "string" && name.length > 1 && name.length < 25) doc.name = name;
  if(roles.includes(role)) doc.role = role;
  if(typeof comment === "string" && comment.length > 20 && comment.length < 500) doc.comment = comment;
  if(+score && score >= 0.5 && score <= 5) doc.score = score;
  if(+payment_method && payment_method >= 0 && payment_method < 4) doc.payment_method = payment_method;
  if(contact) doc.contact = contact;

  if(!(doc.name && doc.comment && doc.role && doc.score && doc.payment_method && doc.contact)){
    return { error: "INVALID" };
  }
  
  return RestaurantSchema.findOneAndUpdate(
    { _id },
    { $push: { reviews: doc } },
    { new: true })
    .then(data => (
      RestaurantSchema.findOneAndUpdate(
        { _id },
        { 
          score: data.score ? ((data.score + score)/2) : score,
          updatedAt: new Date().getTime()
        },
        { new: true })
        .then(data => data)
        .catch(() => ({ error: "SERVER" }))
    ))
    .catch(() => ({ error: "SERVER"}));
}
function createRestaurant(req, res){
  const { name, city, branch, shortDescription, logo_url } = req.body;

  let doc = { createdAt: new Date().getTime() }

  if(Validate(name, 3, 25)) doc.name = name;
  if(Validate(city, 3, 20)) doc.city = city;
  if(Validate(branch, 1, 10)) doc.branch = branch;
  if(Validate(shortDescription, 10, 50)) doc.shortDescription = shortDescription;
  if(Validate(logo_url, 10, 250)) doc.logo_url = logo_url;

  if(doc.name && doc.city && doc.shortDescription && doc.logo_url){ 
    return new RestaurantSchema(doc)
              .save().then(data => data)
              .catch(() => ({ error: "SERVER" }));
  } else {
    return { error: "MISSING" };
  }
}
const Validate = (val, min, max) => typeof val === 'string' && val.length >= min && val.length <= max;
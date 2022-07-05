const API = 'http://localhost:5000';

function getRestaurants(){
  return fetch(`${API}/read`);
}

function getRestaurant(id){
  return fetch(`${API}/read/${id}`);
}

function addRestaurant(body){
  return fetch(`${API}/restaurant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}
function addReview(body, id){
  return fetch(`${API}/review/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export {
  getRestaurants, getRestaurant, addRestaurant, addReview
}
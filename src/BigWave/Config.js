

const host_url = 'http://10.0.2.2:8000/';
const square_url = host_url + 'square/';
const static_url = host_url + 'static/';
const portrait_url = static_url + 'user/portrait/';
const post_image_url = static_url + 'square/post_image/';
const submit_post_url = square_url + 'submit_post/';

export default URL = {
  square: square_url,
  portrait: portrait_url,  
  post_image: post_image_url,
  submit_post: submit_post_url
};



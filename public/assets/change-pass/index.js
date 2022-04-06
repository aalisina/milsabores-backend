let url_string = window.location.href;
const params = url_string.split('/forgot/')[1];
const userId = params.split('/')[0];
const key = params.split('/')[1];
const baseUrlBack = url_string.split('/api/')[0]
// console.log('userId is :', userId);
// console.log('Key is :', key);
// console.log('Base url is :', baseUrlBack);
const form = document.getElementById('form')
form.action = url_string;

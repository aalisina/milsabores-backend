const url_string = window.location.href;
const url = new URL(url_string)
const params = url_string.split('/forgot/')[1];
const userId = params.split('/')[0];
const key = params.split('/')[1];
const baseUrlBack = url_string.split('/api/')[0];
// console.log('userId is :', userId);
// console.log('Key is :', key);
// console.log('Base url is :', baseUrlBack);
const sendNewPassword = function(password) {
  const objSend = {
    password
  };
  const objSendString = JSON.stringify(objSend)
  fetch(url, {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: objSendString, 
  }).then((response) => {
    if (response.status === 200) {
      const urlFront = 'https://google.com';

      Swal.fire({
        title: 'Contraseña actualizada exitosamente',
        text: 'Ahora puede iniciar sesión y hacer un pedido',
        icon: 'success',
      }).then((response) => {
           window.location = urlFront
      }).catch((err) => console.log(err));
    }
  })
    .catch((err) => console.log(err));
};
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;
  if (password === passwordConfirm) {
    console.log(password);
    sendNewPassword(password);
  } else {
    Swal.fire({
      title: 'Contraseñas no coinciden',
      text: 'Intentelo de nuevo',
      icon: 'error',

    });
  }
});

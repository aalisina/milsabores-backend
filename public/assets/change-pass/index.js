const url_string = window.location.href;
const params = url_string.split('/forgot/')[1];
const userId = params.split('/')[0];
const key = params.split('/')[1];
const baseUrlBack = url_string.split('/api/')[0];
// console.log('userId is :', userId);
// console.log('Key is :', key);
// console.log('Base url is :', baseUrlBack);
const sendNewPassword = async (password) => {
  fetch(url_string, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      password,
    }), // body data type must match "Content-Type" header
  }).then((response) => {
    if (response.status === 200) {
      const urlFront = 'https://google.com';

      Swal.fire({
        title: 'Contraseña actualizada exitosamente',
        text: 'Ahora puede iniciar sesión y hacer un pedido',
        icon: 'success',
      }).then((response) => {
        //    window.location = urlFront
        console.log(response);
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

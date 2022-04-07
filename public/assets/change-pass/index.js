const url_string = window.location.href;
const url = new URL(url_string)
const params = url_string.split('/forgot/')[1];
const userId = params.split('/')[0];
const key = params.split('/')[1];
const baseUrlBack = url_string.split('/api/')[0];

const sendNewPassword = function(password) {
  const urlFront = 'https://google.com';
  const objSend = {
    password
  };
  const objSendString = JSON.stringify(objSend)
  fetch(url, {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: objSendString, 
  }).then((response) => {
    console.log(response);
    if (response.status === 200) {
      

      Swal.fire({
        title: 'Contraseña actualizada exitosamente',
        text: 'Ahora puede iniciar sesión y hacer un pedido',
        icon: 'success',
      }).then((response) => {
        console.log(response);
           window.location = urlFront
      }).catch((err) => console.log(err));
    } else if(response.status === 400) {
      Swal.fire({
        title: 'La clave para cambiar su contraseña ha expirado',
        text: 'Solicite nuevamente un correo para cambiar su contraseña',
        icon: 'error',
      }).then((response) => {
           window.location = urlFront
      }).catch((err) => console.log(err));
    }
  })
   
};
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;
  if (password === passwordConfirm) {
  
    sendNewPassword(password);
  } else {
    Swal.fire({
      title: 'Contraseñas no coinciden',
      text: 'Intentelo de nuevo',
      icon: 'error',

    });
  }
});

// eslint-disable-next-line no-console
Swal.fire({
    title: 'La clave para cambiar su contraseña ha expirado o es incorrecta',
    text: 'Solicite nuevamente un correo para cambiar su contraseña',
    icon: 'error',
}).then(()=> {
   window.location = 'https://google.com'
}).catch((err) => console.log(err));
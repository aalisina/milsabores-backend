// eslint-disable-next-line no-console
Swal.fire({
    title: 'Correo electrónico verificado exitosamente',
    text: 'Ahora puede iniciar sesión y hacer un pedido',
    icon: "success",
    // type: 'success'
}).then(()=> {
   window.location = 'https://google.com'
}).catch((err) => console.log(err));
//function validarFormulario() {
//  let x = document.forms["formRegister"]["email"].value;
//  if (x == "") {
//    alert("Debe completar un email válido");
//    return false;
//  } else{
//    alert("Su mensaje ha sido enviado con éxito.");
//  }
//}

function validarFormulario() {
    const firstname =document.querySelector('#firstname');
    const lastname = document.querySelector('#lastname');
    const email = document.querySelector('#email');
    
    let validation = true;

    if(firstname.value===''){
        validation=false;
        alert('El nombre no puede ser vacio.')
    }
    if(lastname.value===''){
        validation=false;
        alert('El apellido no puede ser vacio.');
    }
    if(email.value===''){
        validation=false;
        alert('El email no puede ser vacio.');
    }
    if(validation){
        formRegister.submit();
        alert("Su mensaje ha sido enviado con éxito.");
    }else{
        return false;
    }
}

//No me anda con el event
//
//
//const validarFormulario = (event) => {
//    event.preventDefault();
//    
//    const firstname =document.querySelector('#firstname');
//    const lastname = document.querySelector('#lastname');
//    let validation = true;
//
//    if(firstname.value===''){
//        validation=false;
//        alert('El nombre no puede ser vacio.')
//    }
//    if(lastname.value===''){
//        validation=false;
//        alert('El apellido no puede ser vacio.');
//    }
//    if(validation){
//        formRegister.submit();
//    }else{
//        return false;
//    }
//}
//
//formRegister.addEventListener('submit', validarFormulario);


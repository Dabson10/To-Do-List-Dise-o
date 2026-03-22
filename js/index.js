// import { loginUsuarios } from './api';

document.addEventListener('DOMContentLoaded', ()=>{

    //Variables para cambiar el tipo de la contraseña en el Login
    const btnVerCont = document.getElementById('btnContraLog');
    const svgNoVerCont = document.getElementById('ojotapado');
    const svgVerCont = document.getElementById('ojoAbierto');
    const inContraLog = document.getElementById('inContraLog');
    //Variable para cambiar el tipo de la contraseña en el SignIn
    const btnVerContSign = document.getElementById('btnContraSign');
    const svgNoVerContSign = document.getElementById('OjoTapado');
    const svgVerContSign = document.getElementById('OjoAbierto');
    const inContraLogSign = document.getElementById('InContraSign');

    //Llama a la función para mostrar y ocultar la contraseña en el login.
    estadoContraseña(btnVerCont, svgNoVerCont,svgVerCont, inContraLog);
    //Llama a la función para mostrar y ocultar la contraseña en el SigIn.
    estadoContraseña(btnVerContSign, svgNoVerContSign,svgVerContSign, inContraLogSign);

    //Variables para cambiar de login.
    //Variables del login
    //Formulario del login
    const formLog = document.getElementById('formLog');
    const btnCambioLog = document.getElementById('cambioLog');
    
    //Variables de SigIn o crear cuenta.
    //Formulario de SignIn
    const formSigIn = document.getElementById('formSign')
    const btnCambioSign = document.getElementById('cambioSign');

    //Este es para cambiar del formulario de LogIn a SignIn
    cambioFormulario(btnCambioLog, formLog, formSigIn)
    //Este es para cambiar del formulario de SignIn a LogIn
    cambioFormulario(btnCambioSign, formLog, formSigIn)


    //Cambiar de modo
    const btnCambio = document.getElementById('btnDarkMode')
    const iconSol = document.getElementById('solIc')
    const iconLuna = document.getElementById('lunaIc')

    cambioModo(btnCambio,iconSol, iconLuna);

    //Proceso para realizar el Login y SigIn
    // formLog.addEventListener('submit', async (e) =>{
    //     e.preventDefault();
    //     //
    //     const datosForm = new FormData(form);

    //     const credenciales = Object.fromEntries(datosForm.entries());
    //     try{
    //         const respuesta = await loginUsuarios(credenciales);
    //         console.log("Mandado", respuesta);
    //     }catch(error){
    //         console.log("fallo", error)
    //     }

        
    // });

})


function cambioModo(btnCambio, sol, luna){
    btnCambio.addEventListener('click', () =>{
        
        if(document.body.classList.contains('dark-mode')){
            document.body.classList.toggle('dark-mode')
            sol.classList.add('ocultar')
            luna.classList.remove('ocultar')
        }else{
            document.body.classList.toggle('dark-mode')
            sol.classList.remove('ocultar')
            luna.classList.add('ocultar')
        }
    });
}


/**
 * Esta función es para realizar un cambio de formulario entre LogIn y SignIn
 * @param {*} btnCambio : Elemento HTML del tipo Button 
 * @param {*} formLog : Elemento HTML del tipo form
 * @param {*} formSigIn : Elemento HTML del tipo form
 */
function cambioFormulario(btnCambio, formLog, formSigIn){
    btnCambio.addEventListener('click', () =>{
        if(formLog.classList.contains('ocultar')){
            formLog.classList.remove('ocultar')
            formSigIn.classList.add('ocultar')
        }else{
            formLog.classList.add('ocultar')
            formSigIn.classList.remove('ocultar')
        }
    })
}


/**
 * Funcion para cambiar el estado del input de contraseña
 * @param {*} btnVerCont  : Elemento HTML del tipo Button
 * @param {*} svgNoVerCont  : Elemento HTML del tipo SVG
 * @param {*} svgVerCont : Elemento HTML del tipo SVG
 * @param {*} inContraLog : Elemento HTML del tipo input
 */

function estadoContraseña(btnVerCont, svgNoVerCont, svgVerCont, inContraLog){
    btnVerCont.addEventListener('click', () =>{
        if(inContraLog.type === "password"){
            //Si contiene password entonces se lo cambiamos a text.
            inContraLog.type = "text";
            inContraLog.placeholder = "Contraseña";
            svgVerCont.classList.toggle("ocultar");
            svgNoVerCont.classList.toggle('ocultar');
        }else{
            inContraLog.type = "password";
            inContraLog.placeholder ="********";
            svgNoVerCont.classList.toggle("ocultar");
            svgVerCont.classList.toggle('ocultar');
        }
    })
}



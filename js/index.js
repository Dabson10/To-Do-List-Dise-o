import { loginUsuarios, crearUsuarios } from './api.js';

document.addEventListener('DOMContentLoaded', () => {

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
    estadoContraseña(btnVerCont, svgNoVerCont, svgVerCont, inContraLog);
    //Llama a la función para mostrar y ocultar la contraseña en el SigIn.
    estadoContraseña(btnVerContSign, svgNoVerContSign, svgVerContSign, inContraLogSign);

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

    cambioModo(btnCambio, iconSol, iconLuna);

    // Proceso para realizar el Login y SigIn
    const mensajeError = document.getElementById('logError');
    credencialesLog(formLog, mensajeError);
    //Proceso para crear un usuario nuevo.
    const mensajeError2 = document.getElementById('mensajeError2');
    crearUsu(formSigIn, mensajeError2);

    //Variables para el dropdown
    const btnMenu = document.getElementById('btnMenu')
    const contOpciones = document.getElementById('opciones')
    verOpcionesMenu(btnMenu, contOpciones)


    //Abrir los 3 paneles principales.
    const opciones = document.querySelectorAll('.etiquetaF');
    const panel = document.querySelectorAll('.panel');
    const panelPadre = document.getElementById('panelPadre');
    mostrarPanel(opciones, panel, panelPadre)


    const inFechaInp = document.getElementById('fechaLimieCreate');
    // const fechaHoy = fechaActual(inFechaInp);
    inFechaInp.setAttribute('min', fechaActual())
    inFechaInp.setAttribute('value', fechaActual())

    //Evento para mostrar detalles extra delF
    const btnMasInfo = document.getElementById('btnFlecha');
    const contInfo = document.getElementById('contMasInfo');

    masInfo(btnMasInfo, contInfo);




});//Fin evento DOM
/**
 * Función para cambiar entre secciones, ya sea entre Datos del Usuario, Crear tareas y ver tareas
 * @param {*} opciones 
 * @param {*} panel 
 * @param {*} panelPadre 
 */
function mostrarPanel(opciones, panel, panelPadre){
    // Recorremos las opciones las cuales son las opción del DropDown Menu.
    opciones.forEach((op, indice) => {
        //Evento cuando presionamos una opción.
        op.addEventListener('click', () => {
            panel.forEach((panel) => {
                    panel.classList.add('cerrar');
                    panelPadre.classList.add('cerrar')
            });
            let dataPanel = panel[indice].dataset.panel;
            
            console.log(`dataset: ${dataPanel}, longitud: ${dataPanel.length}`)
            let longitud = dataPanel.length;
            // Aqui hago la comparacion de data-state y lo abro sea el caso que cumpla con este.
            if(dataPanel.slice(0, (longitud -1)) === 'tarea'){
                panelPadre.classList.remove('cerrar')
            }else{
                panelPadre.classList.add('cerrar')
            }
            panel[indice].classList.remove('cerrar');
        });
    });
}


function masInfo(btnMasInfo, contInfo) {
    btnMasInfo.addEventListener('click', () => {
        if (contInfo.classList.contains('cerrar')) {
            contInfo.classList.remove('cerrar');
        } else {
            contInfo.classList.add('cerrar');
        }
    });
}

function fechaActual() {
    const hoy = new Date().toISOString().split('T')[0];
    return hoy;
}


function verOpcionesMenu(btnMenu, contOpciones) {
    btnMenu.addEventListener('click', () => {

        if (contOpciones.classList.contains('cerrar')) {
            contOpciones.classList.remove('cerrar');
        } else {
            contOpciones.classList.add('cerrar')
        }
    });
}
// Esta función puede ser cambiada
function activarPaneles(btnUsuario, contUsuario) {
    btnUsuario.addEventListener('click', () => {
        if (contUsuario.classList.contains('cerrar')) {
            //Seccion para cerrar una seccion
            contUsuario.classList.remove('cerrar')
            //Ahora que se cerro la seccion toca ocultar el dropdown
            contOpciones.classList.add('cerrar')
        } else {
            contOpciones.classList.add('cerrar')
            contUsuario.classList.remove('cerrar')
        }
    });
}


/**
 * Función para crear nuevos usuarios, en donde no se repiten correos
 * electronicos.
 * @param {*} formSigIn :Elemento HTML del tipo <form>
 * @param {*} mensajeError  :Elemento HTML del tipo <p>
 */
function crearUsu(formSigIn, mensajeError) {
    formSigIn.addEventListener('submit', async (e) => {
        e.preventDefault();
        //Obtengo todos los datos del formulario.
        const datoFormulario = new FormData(formSigIn);
        const usuario = Object.fromEntries(datoFormulario.entries());
        //Elimina espacios iniciales y finales de cadenas en los inputs
        for (let llave in usuario) {
            usuario[llave] = usuario[llave].trim();
        }
        //Si regresa un valor no vacio entonces no mandamos el formulario y mostramos que
        //inputs faltan por llenar.
        const valores = validarInputs(usuario);
        if (valores) {
            mensajeError.textContent = `Ingrese datos en: ${valores}`;
            return;
        }
        const validado = validarCorreo(usuario);
        if (!validado) {
            mensajeError.textContent = "El correo no cumple con el formato.";
        }

        try {
            mensajeError.textContent = "";
            const respuesta = await crearUsuarios(usuario);
            console.log("Usuario creado", respuesta)
        } catch (error) {
            mensajeError.textContent = "Correo existente intente con otro";
            console.log("error de ", error)
        }

    })
}

/**
 *  Metodo para hacer Log en cuentas existentes.
 * @param {*} formLog : Elemento HTML que es un formulario o form
 * @param {*} mensajeError : Elemento HTML que es un P <p>
 */
function credencialesLog(formLog, mensajeError) {
    formLog.addEventListener('submit', async (e) => {
        e.preventDefault();
        //
        const datosForm = new FormData(formLog);
        //Limpia el formulario para que no existan espacios vacios
        const credenciales = Object.fromEntries(datosForm.entries());
        for (let llave in credenciales) {
            credenciales[llave] = credenciales[llave].trim();
        }
        const valores = validarInputs(credenciales);
        //Si regresa un valor no vacio entonces no mandamos el formulario y mostramos que
        //inputs faltan por llenar.
        if (valores) {
            mensajeError.textContent = `Ingrese datos en: ${valores}`;
            return;
        }
        const validado = validarCorreo(credenciales)
        if (!validado) {
            mensajeError.textContent = "El correo no cumple con el formato."
            return;
        }
        mensajeError.textContent = "";
        try {
            const respuesta = await loginUsuarios(credenciales);
            console.log("Mandado: ", respuesta);
        } catch (error) {
            mensajeError.textContent = "Datos incorrectos o correo no existente.";
            // console.log("fallo: ", error)
        }
    });
}

//Funcion que valida que el usuario relleno los inputs del formulario.
function validarInputs(datosForm) {
    let valores = "";
    for (let llave in datosForm) {
        if (datosForm[llave].trim() === "") {
            valores += `${llave} `
        }
    }
    return valores;
}
//Función que valida que el corre electronico se escribio correctamente.
function validarCorreo(datos) {
    //Valida que los inputs se ingresen datos correctos y el correo sea correcto.
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;
    const correo = datos.correo;
    return regex.test(correo);
}

/**
 * Función para cambiar de tema de la app.
 * @param {*} btnCambio : Boton que hace el cambio.
 * @param {*} sol : Icono del sol.
 * @param {*} luna : Icono de la luna.
 */
function cambioModo(btnCambio, sol, luna) {
    btnCambio.addEventListener('click', () => {

        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.toggle('dark-mode')
            sol.classList.add('ocultar')
            luna.classList.remove('ocultar')
        } else {
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
function cambioFormulario(btnCambio, formLog, formSigIn) {
    btnCambio.addEventListener('click', () => {
        if (formLog.classList.contains('ocultar')) {
            formLog.classList.remove('ocultar')
            formSigIn.classList.add('ocultar')
        } else {
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

function estadoContraseña(btnVerCont, svgNoVerCont, svgVerCont, inContraLog) {
    btnVerCont.addEventListener('click', () => {
        if (inContraLog.type === "password") {
            //Si contiene password entonces se lo cambiamos a text.
            inContraLog.type = "text";
            inContraLog.placeholder = "Contraseña";
            svgVerCont.classList.toggle("ocultar");
            svgNoVerCont.classList.toggle('ocultar');
        } else {
            inContraLog.type = "password";
            inContraLog.placeholder = "********";
            svgNoVerCont.classList.toggle("ocultar");
            svgVerCont.classList.toggle('ocultar');
        }
    })
}



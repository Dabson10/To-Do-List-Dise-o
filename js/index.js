import { loginUsuarios, crearUsuarios, crearTareas, usuarioTareas } from './api.js';

//Objeto que contendra los datos del usuario.
const usuario = {
    id_usuario: 0,
    nombre: "",
    apellido: "",
    correo: "",
    validado: false,
    tareas: []
};
// const usuario = {
//     id_usuario: 60,
//     nombre: "Juan David",
//     apellido: "Almaraz Gonzalez",
//     correo: "almdavid26@gmail.com",
//     validado: true,
//     tareas: []
// };
const listaTareas = [];

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
    // const btnMasInfo = document.querySelectorAll('.flecha');
    // const contInfo = document.querySelectorAll('.contMasInfoTar');
    // if (btnMasInfo && contInfo) {
    //     masInfo(btnMasInfo, contInfo);
    // }
    const btnsIconos = document.querySelectorAll('.iconoMenu2')
    const contenedores = document.querySelectorAll('.cont');

    btnsIconos.forEach((icono, index) => {
        icono.addEventListener('click', () => {
            contenedores.forEach(cont => {
                cont.classList.add('cerrar');
            });
            // let dataI = btnsIconos[index].dataset.icono;'
            let dataI = icono.dataset.icono;
            let dataCont = contenedores[index].dataset.sec;

            let dataINum = icono.dataset.num;
            let dataContNum = contenedores[index].dataset.num;

            let longDataI = `${dataI.length}`;
            let longDataCont = `${dataCont.length}`;

            //Teniando los data de cada boton y contenedor, toca inverir paneles e iconos
            if (dataI === dataCont) {
                //Cierra el contenedor y el icono que estan visibles.
                icono.classList.add('cerrar')
                contenedores[index].classList.add('cerrar')
                btnsIconos[dataINum].classList.remove('cerrar')
                contenedores[dataContNum].classList.remove('cerrar')

            }
        });
    });

    //Variables para el formulario de crear nueva tarea
    const formCrearTarea = document.getElementById('crearTareaF')
    crearTarea(formCrearTarea);

    //Muestra las tareas en el contenedor de tareas
    const contTareas = document.getElementById('contTareas');

    const btnCerrar = document.querySelectorAll('.cerrarAlert');
    const contAlerta = document.querySelectorAll('.contAlerta');
    const descErr = document.querySelectorAll('.textAlert');
    cerrarAlerta(btnCerrar, contAlerta, descErr);
});//Fin evento DOM

async function crearTarea(formCrearTarea) {
    formCrearTarea.addEventListener('submit', async (e) => {
        e.preventDefault();
        //Ahora se obtienen los datos del formulario.
        const formulario = new FormData(formCrearTarea);
        const tarea = Object.fromEntries(formulario.entries());

        for (let llave in tarea) {
            tarea[llave] = tarea[llave].trim();
        }
        //Valida que los usuarios rellenen los inputs.
        const validar = validarInputs(tarea);
        if (validar) {
            alert('Rellene correctamente los inputs');
            return;
        }
        try {
            const datosTarea = guardarTareaJSON(tarea);
            console.log(datosTarea);
            const tareaCreate = await crearTareas(datosTarea);
            console.log(tareaCreate);
            listaTareas.push(tareaCreate);
            maquetarTareas();

            formCrearTarea.reset();
        } catch (error) {
            panelError(error);
        }
    });
}

async function tarea() {
    try {
        //contTarea
        let usuarioID = usuario.id_usuario;
        console.log(usuarioID);
        const tareas = await usuarioTareas(usuarioID);
        console.log(tareas)
        //Ahora creamos el contenedor de las diferentes tareas.
        for (let index in tareas) {
            listaTareas.push(tareas[index])
        }
        maquetarTareas();

    } catch (error) {
        panelError(error);
    }
}

function maquetarTareas() {
    const contenedor = document.getElementById('contDesplazable');
    contenedor.innerHTML = '';
    if (listaTareas.length != 0) {
        let cadena = "";
        listaTareas.forEach((tarea, index) => {
            cadena += `
        <div class="contTarea">
                            <div class="cabTarea">
                                <div class="contIzq">
                                    <p>Tarea: <span><b>${tarea.nombre}</b></span></p>
                                    <p>Prioridad: <span class ="${tarea.prioridad.toLowerCase()}">${tarea.prioridad}</span></p>
                                </div>
                                <svg id="btnFlecha" class="flecha" data-tareaID="${tarea.id_tarea}" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960">
                                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                                </svg>
                            </div>
                            <div class="contMasInfoTar cerrar" data-contTarea="${tarea.id_tarea}" id="contMasInfo">
                                <div class="fechas">
                                    <p>Creada: <span>${tarea.fecha_creacion}</span></p>
                                    <p>Limite: <span>${tarea.fecha_limite}</span></p>
                                </div>
                                <p>Descripción: <span>${tarea.descripcion}</span></p>
                                <p class="estado">Estado: <span class="${tarea.estado}">${tarea.estado}</span></p>
                                <button class="btnCambiarEstado">Cambiar estado</button>
                            </div>
                        </div>
        `
        });
        contenedor.innerHTML = cadena;
        //Evento para mostrar detalles extra delF
        const btnMasInfo = document.querySelectorAll('.flecha');
        const contInfo = document.querySelectorAll('.contMasInfoTar');
        if (btnMasInfo && contInfo) {
            masInfo(btnMasInfo, contInfo);
        }
    } else {
        contenedor.innerHTML += `
        <p>Aun no has ingresado tareas.</p>
        `;
    }
}


/**
 * Función para cambiar entre secciones, ya sea entre Datos del Usuario, Crear tareas y ver tareas
 * @param {*} opciones 
 * @param {*} panel 
 * @param {*} panelPadre 
 */
function mostrarPanel(opciones, panel, panelPadre) {
    // Recorremos las opciones las cuales son las opción del DropDown Menu.
    opciones.forEach((op, indice) => {
        //Evento cuando presionamos una opción.
        op.addEventListener('click', () => {
            panel.forEach((panel) => {
                panel.classList.add('cerrar');
                panelPadre.classList.add('cerrar')
            });
            let dataPanel = panel[indice].dataset.panel;
            // Aqui hago la comparacion de data-state y lo abro sea el caso que cumpla con este.
            if (dataPanel.slice(0, (dataPanel.length - 1)) === 'tarea') {
                panelPadre.classList.remove('cerrar')
            } else {
                panelPadre.classList.add('cerrar')
            }
            panel[indice].classList.remove('cerrar');
        });
    });
}


function masInfo(btnMasInfo, contInfo) {
    btnMasInfo.forEach((boton, index) => {
        //Evento para que al presionar un boton se abra su sección.
        boton.addEventListener('click', () => {
            const estaAbierto = !contInfo[index].classList.contains('cerrar');
            //Cerramos todos los contenedores
            contInfo.forEach((cont, i) => {
                cont.classList.add('cerrar')
                btnMasInfo[i].style.transform = `rotate(0deg)`
            });
            if (!estaAbierto) {
                // Abrimos el contenedor deseado.
                let dataCont = contInfo[index].dataset.contTarea;
                let dataBoton = boton.dataset.tareaID;
                if (dataBoton === dataCont) {
                    //Si son iguales entonces quitamos el cerrar
                    contInfo[index].classList.remove('cerrar')
                    boton.style.transform = `rotate(180deg)`;
                    boton.style.transition = 'all .5s ease';
                }
            }
        });
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

/**
 * Función para crear nuevos usuarios, en donde no se repiten correos
 * electronicos.
 * @param {*} formSigIn :Elemento HTML del tipo <form>
 * @param {*} mensajeError  :Elemento HTML del tipo <p>
 */
function crearUsu(formSigIn, mensajeError) {
    formSigIn.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btnCrear = document.getElementById('btn-crear');
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
            btnCrear.disabled = true;
            // console.log("Usuario creado", respuesta)
            guardarJSON(respuesta);
            // Ahora se hace la vista de la tarea nueva.
            tarea();
            bienvenida();
        } catch (error) {
            // mensajeError.textContent = "Correo existente intente con otro";
            btnCrear.disabled = false;
            panelError(error);
        }
    })
}

function bienvenida() {
    const contAlerta = document.getElementById('contNuevo');
    const descErr = document.getElementById('usuarioBienvenida');

    if (contAlerta.classList.contains('cerrar')) {
        contAlerta.classList.remove('cerrar');
        descErr.textContent = `${usuario.nombre}. Ahora podras registrar tus tareas pendientes.`;
    }
}

/**
 *  Metodo para hacer Log en cuentas existentes.
 * @param {*} formLog : Elemento HTML que es un formulario o form
 * @param {*} mensajeError : Elemento HTML que es un P <p>
 */
function credencialesLog(formLog, mensajeError) {
    formLog.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btnLog = document.getElementById('btn-log');
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
        // Aqui empieza la conexion a la base de datos mediante Spring
        try {
            const respuesta = await loginUsuarios(credenciales);
            btnLog.disabled = true;
            // console.log("Mandado: ", respuesta);
            guardarJSON(respuesta)
            //Funcion para quitar el login y mostrar el panel principal.
            tarea();
        } catch (error) {
            btnLog.disabled = false;
            panelError(error);
        }
    });
}

//Se formatea el objeto usuario con los datos recibidos.
function guardarJSON(datosUsuario) {
    usuario.id_usuario = datosUsuario.id || datosUsuario.id_usuario;
    usuario.nombre = datosUsuario.nombre;
    usuario.apellido = datosUsuario.apellido;
    usuario.correo = datosUsuario.correo;
    usuario.validado = true;
    usuario.tareas = datosUsuario.tareas || [];
    localStorage.setItem("Sesion activa", JSON.stringify(usuario));
    cambiarVista()
}
function guardarTareaJSON(tarea) {
    const tareaNueva = {
        usuario: {
            id: Number(tarea.id_usuario)
        },
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        estado: "Pendiente",
        prioridad: tarea.prioridad,
        fecha_creacion: `${fechaActual()}`,
        fecha_limite: tarea.fecha_limite
    };
    return tareaNueva;
}
/**
 * Funcion para cerrar ya se el de error o el de bienvenida.
 * @param {*} status 
 */
function panelError(status) {
    const contAlerta = document.getElementById('contAlert');
    const descErr = document.getElementById('errorCausa');

    if (contAlerta.classList.contains('cerrar')) {
        contAlerta.classList.remove('cerrar');
        descErr.textContent = status;
    }
}

function cerrarAlerta(btnCerrar, contAlerta, descErr) {
    btnCerrar.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            let dataText = descErr[index].dataset.textoAlert;
            let dataCont = contAlerta[index].dataset.contError;
            if (dataText === dataCont) {
                contAlerta[index].classList.add('cerrar');
                descErr[index].textContent = '';
            }
        });
    });
}
/**
 * Función para mostrar los datos del usuario.
 */
function inDatosUsuario() {
    const inNombre = document.getElementById('nombreEdit');
    const inApellido = document.getElementById('apeEdit');
    const inIdUsu = document.getElementById('idUsuEdit');

    const tareaUsuId = document.getElementById('tareaIdUsu');
    // Inputs para ver usuarios.
    inNombre.placeholder = `${usuario.nombre}`;
    inApellido.placeholder = `${usuario.apellido}`;
    inIdUsu.placeholder = `${usuario.id_usuario}`;
    //Input de crear tareas
    tareaUsuId.placeholder = `${usuario.id_usuario}`;
    tareaUsuId.value = `${usuario.id_usuario}`;
}

/**
 * Funcion para cambiar vista de Login a panel tareas.
 */
function cambiarVista() {
    const panelLogin = document.getElementById('panelLogIn');
    const panelPrincipal = document.getElementById('contPanelesP');
    if (usuario.validado) {
        //Si esta validado entonces cambiamos a la vista de tareas.
        panelLogin.classList.add('cerrar')
        panelPrincipal.classList.remove('cerrar')
        inDatosUsuario();
    }
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

        if (document.body.classList.contains('light-mode')) {
            document.body.classList.toggle('light-mode')
            sol.classList.remove('ocultar')
            luna.classList.add('ocultar')
        } else {
            document.body.classList.toggle('light-mode')
            sol.classList.add('ocultar')
            luna.classList.remove('ocultar')
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



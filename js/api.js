//URL para llamar a la api de tareas
const tareaURL = 'http://localhost:8081/tarea';
// const tareaURL = 'https://to-do-list-98xe.onrender.com/tarea';
//URL para llamar a la api de usuarios
const usuarioURL = 'http://localhost:8081/usuario';
// const usuarioURL = 'https://to-do-list-98xe.onrender.com/usuario';



export async function crearUsuarios(usuario) {
    const respuesta = await fetch(`${usuarioURL}/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    });
    const status = respuesta.status;
    if (!respuesta.ok) statusError(status, 'Usuario no creado, Intente con otro correo.', 'Usuario');
    return await respuesta.json();
}


export async function loginUsuarios(credenciales) {
    const respuesta = await fetch(`${usuarioURL}/traer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
    })
    console.log(respuesta)
    if (!respuesta.ok) statusError(respuesta.status, 'Credenciales invalidas. Revisa tu correo o contraseña', 'Usuario')
    return await respuesta.json();
}

// Funcion para crear nuevas tareas
export async function crearTareas(tarea) {
    const respuesta = await fetch(`${tareaURL}/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarea)
    });
    const status = respuesta.status;
    if (!respuesta.ok) statusError(status, 'Tarea no creada', 'Tarea');
    return await respuesta.json();

}
/**
 * Recuerda tienes que arreglar lo del login.
 * @param {*} id_usuario 
 * @returns 
 */

//Traer tarea 
export async function usuarioTareas(id_usuario) {
    const respuesta = await fetch(`${tareaURL}/usuario/${id_usuario}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application-json' },
    });
    const status = respuesta.status;
    if (!respuesta.ok) statusError(status, 'Usuario y tareas no encontrados.', 'Usuario y Tareas.')
    return await respuesta.json();
}
/**
 * Metodo que se encarga de manejar los errores de estado, recibe 3 parametros
 * status, causa y entidad 
 * @param {*} status : Status donde proviene el error.
 * @param {*} causa : Causa del error ya se credenciales no encontradas, tarea no encontrada, etc.
 * @param {*} entidad : Se refiere a que tipo de entidad es ya sea una tarea o un usuario
 */
function statusError(status, causa, entidad) {
    if (status === 400) {
        throw new Error(causa)
    } else if (status === 404) {
        throw new Error(`${entidad} no encontrada`)
    } else if (status === 500) {
        throw new Error('Error del servidor')
    } else {
        throw new Error('Error desconocido')
    }
}
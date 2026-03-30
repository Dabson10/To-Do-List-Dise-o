//URL para llamar a la api de tareas
const tareaURL = 'http://localhost:8081/tarea';
//URL para llamar a la api de usuarios
const usuarioURL = 'http://localhost:8081/usuario';



export async function crearUsuarios(usuario){
    const respuesta = await fetch(`${usuarioURL}/crear`,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(usuario)
    });

    if(!respuesta.ok) throw new Error("Correo existente")
        return await respuesta.json();
}


export async function loginUsuarios(credenciales) {
    const respuesta = await fetch(`${usuarioURL}/traer`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credenciales)
    })

    if(!respuesta.ok) throw new Error("Valores incorrectos.")
        return await respuesta.json();
}

// Funcion para crear nuevas tareas
export async function crearTareas(tarea){
    const respuesta = await fetch(`${tareaURL}/crear`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:  JSON.stringify(tarea)
    });
    if(!respuesta.ok)throw new Error('Valores incorrectos.')
        return await respuesta.json();
    
}


//Traer tarea 
export async function usuarioTareas(id_usuario){
    const respuesta = await fetch(`${tareaURL}/usuario/${id_usuario}`, {
        method: 'GET',
        headers:{'Content-Type': 'application-json'},
    });
    if(!respuesta.ok) throw new Error('No se encontro el usuario')
    return await respuesta.json();
}


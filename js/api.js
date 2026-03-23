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


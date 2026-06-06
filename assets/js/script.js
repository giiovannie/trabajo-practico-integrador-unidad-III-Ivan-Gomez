const URL_API = "https://thesimpsonsapi.com/api/characters";
let fragment = document.createDocumentFragment();

let capturadorPersonajes = [];

const traerPersonajes = async  () =>{
    try {
        const response = await fetch(URL_API);
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.log("tuvimos problemas, error: ", error)
    }
}


const traerUnPersonaje = async (id)=>{
    try {
        const response = await fetch(`${URL_API}/${id}`)
        const data = await response.json()

        console.log(data)
    } catch (error) {
        console.log(error)
    }
}


const trabajarPersonaje = async () =>{
    const ObjetoPersonajes = await traerPersonajes()
    let personajes = ObjetoPersonajes.results
    capturadorPersonajes = personajes
    console.log(capturadorPersonajes);
}


const mostrarPersonaje = async () =>{
    
}

trabajarPersonaje()

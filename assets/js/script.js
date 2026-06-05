const URL_API = "https://thesimpsonsapi.com/api/characters";
let fragment = document.createDocumentFragment();

let persona = [];

const traerPersonajes = async  () =>{
    try {
        const response = await fetch(URL_API);
        const data = await response.json();
        console.log(data)
        console.log(data.results);
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

traerPersonajes()
traerUnPersonaje(20)
const URL_API = "https://thesimpsonsapi.com/api/characters";
// let fragment = document.createDocumentFragment();
const contenedorCards = document.getElementById("card-container")
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

    contenedorCards.textContent = "";

    contenedorCards += capturadorPersonajes.forEach(card => {
        contenedorCards.innerHTML += `
            <div class="col-3">
                <div class="card m-4 " style="width: 18rem">
                    <img src="${card.img}" class="card-img-top" alt="${card.name}" />
                    <div class="card-body">
                        <h5 class="card-title">${card.name}</h5>
                        <p class="card-text">Ocupacion: ${card.occupation}</p>
                        <a href="#" class="btn btn-primary">ver detalle</a>
                    </div>
                </div>
            </div>
        `
    });
}


// const mostrarPersonaje = async () =>{
//     contenedorCards = ""

//     contenedorCards += fo
// }
trabajarPersonaje()

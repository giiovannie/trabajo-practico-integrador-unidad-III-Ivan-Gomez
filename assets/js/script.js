const URL_API = "https://thesimpsonsapi.com/api/characters";
// let fragment = document.createDocumentFragment();
let contenedorCards = document.getElementById("card-container")
let capturadorPersonajes = [];
const btnBuscar = document.getElementById("btn-primary");
const buscador = document.getElementById("buscador");
const formSubmit = document.getElementById("form-buscar") //etiqueta form
let datoBuscador = null;
let inputLimpio = null;
const myModal = document.getElementById('miModal')
const modalIntance = new bootstrap.Modal(myModal)


formSubmit.addEventListener("submit", (e)=>{
    e.preventDefault()

    datoBuscador = buscador.value.replace(/\s/g, "").toLowerCase();

    inputLimpio = datoBuscador

    filtrarPersonajes(inputLimpio)
})

const traerPersonajes = async  () =>{
    try {
        const response = await fetch(URL_API);
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.log("tuvimos problemas, error: ", error)
        document.write(`lo sentimos algo salio mal error 505`)
    }
}


const traerUnPersonaje = async (id)=>{
    try {
        const response = await fetch(`${URL_API}/${id}`);
        const data = await response.json();

        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}


const trabajarPersonajes = async (seleccion) =>{
    const ObjetoPersonajes = await traerPersonajes()

    seleccion = ObjetoPersonajes.results
    capturadorPersonajes = seleccion
    
    console.log(capturadorPersonajes);

    return capturadorPersonajes

}


const mostrarPersonajes = (seleccion) =>{
    
    contenedorCards.textContent = "";

    seleccion.forEach(card => {
        contenedorCards.innerHTML += `
            <div class="col-4">
                <div class="card m-4 w-100 d-flex justify-content-center" data-id=${card.id}>
                    <img src="https://cdn.thesimpsonsapi.com/500/character/${card.id}.webp" class="card-img-top" alt="${card.name}" />
                    <div class="card-body">
                        <h5 class="card-title">${card.name}</h5>
                        <h6 class="${card.status === "Alive" ? "bg-success" : "bg-danger"} text-white rounded fw-bold text-center" style="width: auto">${card.status}</h6>
                        <p class="card-text">Ocupacion: ${card.occupation}</p>
                        <a href="#" class="btn btn-primary">ver detalle</a>
                    </div>
                </div>
            </div>
        `
    });
}

const filtrarPersonajes = (filtro) => {
    const resultado = capturadorPersonajes.filter(skin =>
        skin.name.toLowerCase().replace(/\s/g, "").includes(filtro)
    )
    mostrarPersonajes(resultado)
}


const loader = async () => {
    const listaCargada = await trabajarPersonajes()
    mostrarPersonajes(listaCargada)
}
loader()

//seccion del modal



contenedorCards.addEventListener("click", (e)=>{
        const tarjeta = e.target.closest(".card")

        if(!tarjeta) return;

        const cardId = tarjeta.dataset.id
        console.log(cardId)
        const personajeCapturado = capturadorPersonajes.find(persona =>{
            return persona.id === Number(cardId);
        })

        console.log(`coincidencia: ${personajeCapturado.id}`)

        let selectorFrases = Math.floor(Math.random() * personajeCapturado.phrases.length);

        
        document.getElementById('modalNombre').textContent = personajeCapturado.name
        document.getElementById('modalImg').src = `https://cdn.thesimpsonsapi.com/500/character/${personajeCapturado.id}.webp`
        document.getElementById('modalEdad').textContent = personajeCapturado.age
        document.getElementById('modalFecha').textContent = personajeCapturado.dateOfBirth
        document.getElementById('modalGenero').textContent = personajeCapturado.gender
        document.getElementById('modalOcupacion').textContent = personajeCapturado.occupation
        document.getElementById('modalEstado').textContent = personajeCapturado.status
        document.getElementById('modalFrase').textContent = personajeCapturado.phrases[selectorFrases]

        modalIntance.show()
})
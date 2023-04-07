class Pokemon {
    constructor(nombre, tipo) {
        this.id = nombre + pokemons.length + 1
        this.nombre = nombre;
        this.tipo = tipo;

    }
}

const pokemons = []
let pokemonsFiltrados = []
let pokemonsFavoritos = [] 

let inputNombre = document.getElementById("nombre")
let inputTipo = document.getElementById("tipo")
let botonAgregar = document.getElementById("botonagregar")
let botonBuscar = document.getElementById("botonbuscar")
let inputBuscar = document.getElementById("busqueda")
let botonFiltrar = document.getElementById("botonfiltrar")
let inputFiltrar = document.getElementById("filtrar")
let botonLimpiar = document.getElementById("limpiar")
let botonLimpiar1 = document.getElementById("limpiar1")
let botonLimpiar3= document.getElementById("limpiar3")
let flechaDerecha = document.getElementById("flecha-derecha")
let flechaIzquierda = document.getElementById("flecha-izquierda")
let botonFav = document.getElementById("botonFav")
let divPadre = document.getElementById("contenedor")
let botonFavoritos = document.getElementById("botonFavoritos")
let iteradorActual = 0
let filtrando = false

 let favoritos = JSON.parse(localStorage.getItem("clave"))
if (favoritos) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
    .then(response => response.json())
    .then(data => {
        for (let pokemon of data.results) {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(data => {
                    data.esfavorito = favoritos.find(pokemon => pokemon.id === data.id) ? true : false
                    pokemons.push(data)
                    mostrar([pokemons[iteradorActual]])
                })
        }
    })  
}
else {
    fetchPokemons()
} 

async function fetchPokemons() {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
    .then(response => response.json())
    .then(data => {
        for (let pokemon of data.results) {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(data => {
                    data.esfavorito = false
                    pokemons.push(data)
                    mostrar([pokemons[iteradorActual]])
                })
        }
    })  
}

function mostrar(array) {
    divPadre.innerHTML = ''
    array.forEach(pokemon => {
        const { name, types , esfavorito} = pokemon
        if(esfavorito){
            botonFav.setAttribute("src","silueta-de-estrella-negra.png")
        }else{
            botonFav.setAttribute("src","estrella.png")
        }
        let estructura = document.createElement("div")
        estructura.style = "display: flex; flex-direction: column; align-items: center;"
        estructura.innerHTML = `
        <h1 style="color:black">${name}</h1>
        <h1 style="color:black">type: ${types[0].type.name}</h1>
        <img src=${pokemon.sprites.front_default} width="100" height="100" />
    `
        divPadre.append(estructura)

    })
}


 ///Funcion para favoritos///
 
 botonFav.addEventListener("click",()=> {
if(filtrando)return
 if(botonFav.getAttribute("src")==="estrella.png"){
    Toastify({

        text: "Agregado a favoritos",
        
        duration: 3000
        
        }).showToast();
    botonFav.setAttribute("src","silueta-de-estrella-negra.png")
    pokemons[iteradorActual].esfavorito = true
    guardar()
 }else {
    Toastify({

        text: "Eliminado de favoritos",
        
        duration: 3000
        
        }).showToast();
    botonFav.setAttribute("src","estrella.png")
    pokemons[iteradorActual].esfavorito = false
    guardar()
 }})

botonFavoritos.addEventListener("click", () =>{
                filtrando=  true
                pokemonsFiltrados = pokemons.filter(pokemon => pokemon.esfavorito===true)
                iteradorActual = 0
                mostrar([pokemonsFiltrados[iteradorActual]])
                
            })
    

function guardar (){
    const favoritos = pokemons.filter(pokemon => pokemon.esfavorito === true)
    localStorage.setItem("clave", JSON.stringify(favoritos));
}
///FUNCION REUTILIZAR PARA favoritos AGREGAR////

/* botonAgregar.addEventListener("click", () => {
    if(inputNombre.value !="" && isNaN(parseInt(inputNombre.value))){
    let pokemon = new Pokemon(inputNombre.value, inputTipo.value)
    pokemons.push(pokemon)
    mostrar(pokemons)
    console.log(pokemons)
    inputNombre.value = "" 
    inputTipo.value = ""
    localStorage.setItem("clave", JSON.stringify(pokemons));}
    else{
        alert("Error de pokemon.")
    }
}) */

///MODIFICAR FUNCION PARA FILTRAR //

botonFiltrar.addEventListener("click", () => {
    iteradorActual = 0

    fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(data => {
                        pokemons.push(data)
                    })
            })
            filtrando = true
            pokemonsFiltrados = pokemons.filter(pokemon => pokemon.types[0].type.name === inputFiltrar.value)
            mostrar([pokemonsFiltrados[iteradorActual]])

        })


}
)
///MODIFICAR FUNCION PARA BUSCAR //

botonBuscar.addEventListener("click", () => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + inputBuscar.value)
        .then((response) => response.json())
        .then((pokemon) => mostrar([pokemon])
        )

})


botonLimpiar.addEventListener("click", () => {
    filtrando = false
    iteradorActual = 0
    inputFiltrar.value = ""
    inputBuscar.value = ""
    mostrar([pokemons[iteradorActual]])

})

botonLimpiar1.addEventListener("click", () => {
    filtrando = false
    iteradorActual = 0
    inputFiltrar.value = ""
    inputBuscar.value = ""
    mostrar([pokemons[iteradorActual]])
})

botonLimpiar3.addEventListener("click", ()=> {
filtrando= false
iteradorActual= 0
mostrar([pokemons[iteradorActual]])
})



flechaDerecha.addEventListener("click", () => {
    if (!filtrando && iteradorActual === 149) {
        iteradorActual = 0
    } else if (filtrando && iteradorActual === pokemonsFiltrados.length - 1) {
        iteradorActual = 0
    } else {
        iteradorActual++
    }
            
    if (filtrando) {
        mostrar([pokemonsFiltrados[iteradorActual]])
        console.log(iteradorActual)
    } else {
        mostrar([pokemons[iteradorActual]])
        console.log(iteradorActual)
    }
}
)
flechaIzquierda.addEventListener("click", () => {
    if (!filtrando && iteradorActual === 0) {
        iteradorActual = 149

    } else if (filtrando && iteradorActual === 0) {
        iteradorActual = pokemonsFiltrados.length - 1
    } else {
        iteradorActual--
    }

    if (filtrando) {
        mostrar([pokemonsFiltrados[iteradorActual]])
        console.log(iteradorActual)

    } else {
        mostrar([pokemons[iteradorActual]])
        console.log(iteradorActual)

    }
}
)
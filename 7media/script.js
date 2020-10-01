//Obtengo del html los 3 elementos a añadir eventos
const traseraJugador = document.getElementById("jug")
const reiniciar = document.getElementById("reiniciar")
const plantar = document.getElementById("plantar")

//Array de los palos, otro de las cartas ya sacada y los puntos
const palos = ['Bastos', 'Copas', 'Espadas', 'Oros']
const cartasUsado = new Array()
let pointPlayer = 0
let pointBank = 0

//Al clikear la trasera del jugador...
traseraJugador.addEventListener('click', () => {
    let repetido = false;

    do {
        //genera un palo(0-3) y un valor(1-10)
        let palo = getPalos()
        let valor = getValores()

        //Comprueba si existe dicha carta el el array obtenido sino se le añade y se muestra en la colleccion de cartas del jugador
        if (cartasUsado.includes(`${valor}${palos[palo]}.jpg`) == true) {
            repetido = true
        } else {
            cartasUsado.push(`${valor}${palos[palo]}.jpg`)
            document.getElementById("playerObtenido").innerHTML += `<img class="cart" src="imagenes/${valor}${palos[palo]}.jpg">`

            pointPlayer += sumaPuntos(valor)

            document.getElementById("jugadorPunto").innerHTML = `Jugador: ${pointPlayer}`
        }
    } while (repetido == true);

    //Si el punto del jugador se pasa del 7.5 se actualiza la pagina en 0.5s y se deshabilita el boton plantar
    if (pointPlayer > 7.5) {
        document.getElementById("boton").innerHTML += `Has perdido`
        plantar.disabled = true
        setTimeout(actualizar, 750)
    }
})

plantar.addEventListener('click', () => {
    //Esto se repite hasta que los puntos de la banca supere el 7
    do {
        //esto se repite si encuantra una carta repetida
        let repetido = false;
        do {
            //genera un palo(0-3) y un valor(1-10)
            let palo = getPalos()
            let valor = getValores()

            //Comprueba si existe dicha carta el el array obtenido sino se le añade y se muestra en la colleccion de cartas de la banca
            if (cartasUsado.includes(`${valor}${palos[palo]}.jpg`) == true) {
                repetido = true
            } else {
                cartasUsado.push(`${valor}${palos[palo]}.jpg`)
                document.getElementById("bancaObtenido").innerHTML += `<img class="cart" src="imagenes/${valor}${palos[palo]}.jpg">`

                pointBank += sumaPuntos(valor)

                document.getElementById("bancaPunto").innerHTML = `Banca: ${pointBank}`
            }
        } while (repetido == true);
    } while (pointBank < 7)

    //Si el punto del jugador en mayor gana el jugador
    if (pointPlayer > pointBank || pointBank > 7.5) {
        document.getElementById("boton").innerHTML += `Has ganado`
    } else {
        document.getElementById("boton").innerHTML += `Gana banca`
    }

    //Actualiza dentro de 0.5s
    plantar.disabled = true
    setTimeout(actualizar, 750)
})

//Al clikear el boton de reiniciar llama a la funcion actualizar
reiniciar.addEventListener('click', actualizar)

//Funcion para obtener un numero aleatorio del 0-3 (Hay 4 tipos de palos)
function getPalos() {
    return Math.floor(Math.random() * ((3 + 1) - 0) + 0)
}

//Funcion para obtener un numero aleatorio del 1-10 ( hay 10 cartas por palos)
function getValores() {
    return Math.floor(Math.random() * ((10 + 1) - 1) + 1)
}

//Funcion para asignar los puntos: los mayores de 7 son 0.5 puntos y los otros su valor
function sumaPuntos(valor) {
    let point = 0

    if (valor <= 7) {
        point += valor
    } else {
        point += 0.5
    }

    return point
}

//Funcion actualizar: recarga la pagina
function actualizar() {
    location.reload()
}

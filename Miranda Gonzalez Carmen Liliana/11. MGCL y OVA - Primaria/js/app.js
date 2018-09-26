// Array que tiene todas las cartas
let card = document.getElementsByClassName("card");
let cards = [...card];

// Baraja de todas las cartas en el juego
const deck = document.getElementById("card-deck");

// Declaración de la variable para movimiento
let moves = 0;
let counter = document.querySelector(".moves");

// Declaración de la variable para iconos de estrella
const stars = document.querySelectorAll(".fa-star");

// Declaración de la variable matchedCard
let matchedCard = document.getElementsByClassName("match");

 // Lista de estrellas
 let starsList = document.querySelectorAll(".stars li");

 // close icon en modal
 let closeicon = document.querySelector(".close");

 // Declara el modal
 let modal = document.getElementById("popup1");

 // array para cartas abiertas
var openedCards = [];


// @description Mezcla las cartas
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// @description Mezcla las cartas cada que la página carga o se refresque.
document.body.onload = startGame();


// @description Función para empezar un nuevo juego 
function startGame(){
    // Mezcla la baraja de cartas
    cards = shuffle(cards);
    //Remueve todas las clases existentes de cada carta
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    //Resetea los movimientos
    moves = 0;
    counter.innerHTML = moves;
    //Resetea el array de cartas que están abiertas
    openedCards = []; 
    //Resetea el rating o puntuación
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //Resetea el timer(reloj)
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 segs";
    clearInterval(interval);
}


// @description cambia las clases entre abierta y mostrada para desplegar las cartas.
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description añade catas abiertas a la lista (array) llamado OpenedCards y revisa si las cartas coinciden o no.
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// @description Cuando las cartas coinciden
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// description Cuando las cartas no coinciden
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}


// @description Deshabilita las cartas temporalmente.
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @description Habilita las cartas y deshabilita los pares de cartas que ya coincidieron.
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description Cuenta los movimientos del jugador
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //Comienza el cronómetro al primer click.
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    // Configuración de calificación en base al número de movimientos setting rates based on moves
    if (moves > 10 && moves < 13){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 15){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// @description Cronómetro del Juego
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"segs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// @description Felicitación cuando todas las cartas se emparejan, muestra el modal y movimientos, tiempo y calificación
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // Muestra el modal de felicitaciones
        modal.classList.add("show");

        // Declara la variable starRating
        var starRating = document.querySelector(".stars").innerHTML;

        //Muestra movimientos, calificación y tiempo en el modal.
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon en el modal
        closeModal();
    };
}


// @description close icon en el modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// @desciption Para reiniciar el juego.
function playAgain(){
    modal.classList.remove("show");
    startGame();
}


// Ciclo para añadir varios event listeners a cada carta
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};

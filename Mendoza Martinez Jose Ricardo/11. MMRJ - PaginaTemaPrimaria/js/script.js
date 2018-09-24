'use strict';

var cardsArray = [{
  'name': 'shell',
  'img': 'img/juego/per1.jpg'
}, {
  'name': 'star',
  'img': 'img/juego/per2.jpg'
}, {
  'name': 'bobomb',
  'img': 'img/juego/per3.jpg'
}, {
  'name': 'mario',
  'img': 'img/juego/per4.jpg'
}, {
  'name': 'luigi',
  'img': 'img/juego/per5.jpg'
}, {
  'name': 'peach',
  'img': 'img/juego/per6.jpg'
}, {
  'name': '1up',
  'img': 'img/juego/per7.jpg'
}, {
  'name': 'mushroom',
  'img': 'img/juego/per8.jpg'
}, {
  'name': 'thwomp',
  'img': 'img/juego/per9.jpg'
}, {
  'name': 'bulletbill',
  'img': 'img/juego/per10.jpg'
}, {
  'name': 'coin',
  'img': 'img/juego/per11.jpg'
}, {
  'name': 'goomba',
  'img': 'img/juego/per12.jpg'
}];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
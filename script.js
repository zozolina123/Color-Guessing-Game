var square;
var color = document.querySelector(".color");
var header = document.querySelector("header");
var newGame = document.querySelector(".settings h4");
var easi = document.querySelector("li");
var hardy = document.querySelector(".hard");
newGame.addEventListener("click",function (){
	gameOver();
});
var chosen;
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <0.1){
        	op = 0;
        	element.style.opacity = 0;
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);  
}

function unfade(element) {
    var op = 0.1;  
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}

function getColors() {
	square = document.querySelectorAll(".square");
	for(var i=0; i < square.length; i++) {
		console.log("color chosen");
		var r = getRandomInt(255);
		var g = getRandomInt(255);
		var b = getRandomInt(255);
		square[i].style.background = "rgb("+r+", "+g+", "+b+" )";
		square[i].addEventListener("click", function() {
			var picked = this.style.background;
			if(picked == chosen.style.background){
				gameOver();
			}
			else {
				fade(this);
			}
		});

	}
	chosen = square[getRandomInt(square.length-1)];
	color.textContent = chosen.style.background;
}

function gameOver() {
	header.style.background = chosen.style.background;
	for(var i=0; i < square.length; i++){
			square[i].style.background = chosen.style.background;
		}
	setTimeout(function(){
		header.style.background = "#333";
		for(var i=0; i < square.length; i++){
			unfade(square[i]);
		}
		getColors();
	},2000);
}

function easy() {
	if(square.length>3)
		for(var i=0;i<=2;i++)
			square[i].remove();
	gameOver();
}

function hard() {
		if(square.length<6) {
				for(var i=0;i<=2;i++){
				var iDiv = document.createElement('div');
				iDiv.className = 'square';
				document.getElementById('container').appendChild(iDiv);
			}
		}
		gameOver();
}

easi.addEventListener("click",easy);
hardy.addEventListener("click",hard);
getColors();

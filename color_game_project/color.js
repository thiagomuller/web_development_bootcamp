var squares = document.querySelectorAll(".sqrt");
window.gameMode = [false,true];


//This function defines a random RGB color to be used in setSquareAndH1 function
function randomColors(){
	r = Math.floor(Math.random()*255);
	g = Math.floor(Math.random()*255);
	b = Math.floor(Math.random()*255);

	return "rgb("+r+", "+g+", "+b+")";
}


function setSquares(){
	for(var i = 0; i < squares.length; i++){
		rgb = randomColors();
		squares[i].style.background = rgb;
	}
}

function pickWinColor(gameMode){
	currentColors = [];
	for(var i = 0; i < squares.length; i++){
		currentColors.push(squares[i].style.backgroundColor);
	}
	if(gameMode[0] === true && gameMode[1] === false){
		winNum = Math.floor(Math.random()*(currentColors.length - 3));
	}
	else if(gameMode[0] === false && gameMode[1] === true){
		winNum = Math.floor(Math.random()*currentColors.length);
	}

	winColor = currentColors[winNum];
	return winColor;
}


function setDifficulty(gameMode){
	if(gameMode[0] === true){
		for(i = 0; i < squares.length; i++){
			if(i >= 3){
				squares[i].classList.remove("card" , "square");
			}
		}
	}
	if(gameMode[1] === true){
		for(i = 0; i < squares.length; i++){
			if(i >= 3){
				squares[i].classList.add("card" , "square");
			}
		}
	}
}

function setJumbo(color){
		document.querySelector(".jumbotron").style.background = color;
}

function setH1(winColor){
	document.querySelector("#colorDisplay").innerHTML = winColor;
}


setSquares();
winColor = pickWinColor(window.gameMode);
setH1(winColor);
console.log("The win Color I've got right at the beginning is " + winColor);


for(i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			var pickedColor = this.style.backgroundColor;
			console.log("I'm the square listener, and the pickedColor you chose was " + pickedColor);
			if(pickedColor != winColor){
				this.style.background = "#232323";
			}
			else{
				for(i = 0; i < squares.length; i++){
					squares[i].style.background = pickedColor;
				}
				document.querySelector(".jumbotron").style.background = pickedColor;
				document.querySelector("#newColorsBtn").innerHTML = "Play Again?"
			}
		})
}

document.getElementById("newColorsBtn").addEventListener("click", function(){
	if(document.querySelector("#newColorsBtn").innerHTML === "Play Again?"){
		document.querySelector("#newColorsBtn").innerHTML = "New Colors"
	}
	setSquares();
	winColor = pickWinColor(window.gameMode);
	setH1(winColor);
	setJumbo("steelblue");
});

document.getElementById("easyBtn").addEventListener("click", function(){
	if(document.querySelector("#newColorsBtn").innerHTML === "Play Again?"){
		document.querySelector("#newColorsBtn").innerHTML = "New Colors"
	}
	window.gameMode = [true,false];
	setDifficulty(window.gameMode);
	setSquares();
	winColor = pickWinColor(window.gameMode);
	setH1(winColor);
	setJumbo("steelblue");
});

document.getElementById("hardBtn").addEventListener("click", function(){
	if(document.querySelector("#newColorsBtn").innerHTML === "Play Again?"){
		document.querySelector("#newColorsBtn").innerHTML = "New Colors"
	}
	window.gameMode = [false,true];
	setDifficulty(window.gameMode);
	setSquares();
	winColor = pickWinColor(window.gameMode);
	setH1(winColor);
	setJumbo("steelblue");
});











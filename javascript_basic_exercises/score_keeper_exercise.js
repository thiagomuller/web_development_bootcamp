

var p1Display = document.getElementById("p1sc");
var p2Display = document.getElementById("p2sc");
var p1btn = document.getElementById("playerOne");
var p2btn = document.getElementById("playerTwo");
var resbtn = document.getElementById("reset");
var roundsInput = document.querySelector("input");
var roundsDisplay = document.querySelector('#roundqty');

var rounds = 5;
var p1Score = 0;
var p2Score = 0;

var gameOver = false;

function p1scoreup(){
	p1Score ++;
	if(!gameOver){
		if(p1Score <= rounds){
			p1Display.innerHTML = p1Score;
		}
		else{
			gameOver = true;
		}
	}

}

function p2scoreup(){
	if(!gameOver){
		if(p2Score <= rounds){
			p2Display.innerHTML = p2Score;
		}
		else{
			gameOver = true;
		}
	}
	
}

function reset(){
	p1Score = 0;
	p2Score = 0;
	p1Display.innerHTML = p1Score;
	p2Display.innerHTML = p2Score;

}



roundsInput.addEventListener("change",function(){
	roundsDisplay.innerHTML = roundsInput.value;
	rounds = Number(roundsInput.value);

})

p1btn.addEventListener("click", p1scoreup);
p2btn.addEventListener("click", p2scoreup);
resbtn.addEventListener("click", reset);






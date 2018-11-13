age = prompt("Please tell me your age")


if(age < 0){
	alert("You age is an invalid number")
}

else if(age === 21){
	alert("Happy 21st birthday")
}

else if(age % Math.sqrt(age) === 0){
	alert("Perfect square!")
}

else{
	alert("Your age is odd!")
}
function factorial(x){
	y = x
	for(var i=0; i<= x; i++){
		if (y > 1){
			x = x * (y-1);
			y = y -1;
			}
	}
	return x;
}
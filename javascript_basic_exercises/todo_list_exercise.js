var answer = ''
var add_item = ''
var todo_list = []



while(answer != 'quit'){
	answer = prompt('What would you like to do?');

	if(answer == 'new'){
		add_item = prompt('What is the task that you would like to add?');
		todo_list.push(add_item);
	}

	else if(answer == 'list'){
		alert(todo_list);
	}
}
	

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
		todo_list.forEach(function(todo, index){
			console.log(index + ": " + todo)
		});
	}

	else if(answer === 'delete'){
		index = prompt('What is the index of the item you want to delete?')
		todo_list.splice(index,1);
	}
}
	

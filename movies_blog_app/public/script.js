$('.newItemDivs').each(function(index, element){
   $(element).children().click(function(){
       $.post('/posts' , {
           movieID : $(element).attr('value')
       }, function(){
           console.log('Just sent a post request to /post route');
           location.reload(true);
       });
   });
});


$('#signUpButton').click(function(){

    $.ajax({
        type: 'POST',
        url: '/register',
        data: {
            username : $('#signUpUsername').val(),
            password : $('#signUpPassword').val()
        },
        dataType: 'json',
        success: function(response) {
            console.log('Just sent a post request to register route');
        }
    });
});

$('#logInButton').click(function(){
    
    $.post('/login', {
        username : $('#logInUsername').val(),
        password : $('#logInPassword').val() 
    }, function(response){
        
    });
 
});

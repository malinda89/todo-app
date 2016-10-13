$(function() {

  $.get('/tasks', (res) => {
    let list = $('#todo_list');

    res.forEach(function(item) {
      list.append('<li>'+ item.name +'</li>');
    })    
  });

  $('#create_task').on('click', function() {
    const parameters = {
      name: $('#task_name').val()
    };

    $.post('/tasks', parameters, (res) => {
      debugger;
    }, 'json');
  });
});
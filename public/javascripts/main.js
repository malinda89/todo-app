$(function() {

  $.get('/tasks', (res) => {
    let list = $('#todo_list');

    res.forEach((item) => {
      list.append('<li>'+ item.name +'</li>');
    })    
  });

  $('#create_task').on('click', () => {
    const parameters = {
      name: $('#task_name').val()
    };

    $.post('/tasks', parameters, (res) => {
      debugger;
    }, 'json');
  });
});
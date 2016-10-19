$(function() {

  var taskList = [];

  var addTaskToList = function(task) {
    var list = $('#todo_list');
    list.append('<div><a class="delete-todo"><i class="glyphicon glyphicon-remove"></i></a>' +
      '<input todoId="'+ task._id +'" class="check-todo" type="checkbox">'+ task.name +'</div>');
  };

  //Populate task list
  $.get('/tasks', function(res) {
    //Copy list, for later manipulations 
    taskList = res;

    res.forEach(function(item) {
      addTaskToList(item);
    });
  });

  //Create new task
  $('#create_task').on('click', function() {
    var input = $('#task_name');

    var data = {
      name: input.val()
    };

    $.post('/tasks', data, function(res) {
      var task = res.savedItem;
      taskList.push(task);
      addTaskToList(task);
      input.val('');
    });
  });

  //Complete todos
  $(document).on('change', '.check-todo', function() {
    var data = JSON.parse($(this).attr('obj'));
    
    $.post('/tasks', data, function(res) {
      debugger;
    });
  });

  //Delete todos
  $(document).on('click', '.delete-todo', function() {
    var todoId = $(this).next().attr('todoid');
    
    $.ajax({
      url: '/tasks' + '?' + $.param({'id': todoId}),
      type: 'DELETE',
      success: function(res) {
        if (res.success) {
          $($.find('input:checkbox[todoid='+ res.id +']')).closest('div').remove();
          alert('Todo deleted successfully');
        }
      }
    });
  });

});
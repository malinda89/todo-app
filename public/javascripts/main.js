$(function() {

  //Populate task list
  var addTaskToList = function(task) {
    var list = $('#todo_list');

    var elem = $('<div><a class="delete-todo"><i class="glyphicon glyphicon-remove"></i></a></div>')
    .append(
      $(document.createElement('input')).attr({
        type: 'checkbox',
        todoId: task._id,
        class: 'check-todo',
        checked: task.isCompleted
      })
    )
    .append('<label>'+ task.name +'</label>');

    list.append(elem);
  };

  //Get all tasks
  $.get('/tasks', function(res) {
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
      addTaskToList(task);
      input.val('');
    });
  });

  //Complete todos
  $(document).on('change', '.check-todo', function() {
    var todoId = $(this).attr('todoid');
    
    $.ajax({
      url: '/tasks' + '?' + $.param({'id': todoId}),
      type: 'PUT',
      success: function(res) {
        if (res.success) {
          alert('Todo updated successfully');
        }
      }
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
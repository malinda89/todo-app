$(function() {

  var taskList = [];

  var addTaskToList = function(task) {
    var list = $('#todo_list');
    list.append('<input type="checkbox">' + task.name + '<br>');    
  };

  var deleteTasksFromList = function() {
    //TODO
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

  //Complete selected tasks
  $('#complete_tasks').on('click', function() {
    //TODO
  });

  //Delete selected tasks
  $('#delete_tasks').on('click', function() {
    //TODO
  });

});
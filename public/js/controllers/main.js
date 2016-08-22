angular.module('todoController', [])

  // Inject Todo service factory into the controller
  .controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};

    // When landing on the page, get all todos and show them
    Todos.get('/api/todos')
      .success(function(data) {
        // JSON received from hitting the API is bound to $scope.todos
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    // When submitting the add form, send the text to the node API
    $scope.createTodo = function() {

      if (!$.isEmptyObject($scope.formData)) {
        Todos.create($scope.formData)
        .success(function(data) {
          $scope.formData = {};
          $scope.todos = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      }

    };

    // Delete a todo after checking it
    $scope.deleteTodo = function(id) {
      Todos.delete(id)
        .success(function(data) {
          $scope.todos = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  });

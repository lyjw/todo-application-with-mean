angular.module('todoService', [])

  // Declare a service
  // Each function returns a promise object that can be used in the controller
  .factory('Todos', function($http) {
    return {
      get : function() {
        return $http.get('/api/todos');
      },
      create : function(todoData) {
        return $http.post('/api/todos', todoData);
      },
      delete : function(id) {
        return $http.delete('/api/todos/' + id);
      }
    }
  });

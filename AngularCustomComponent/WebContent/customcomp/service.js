var app = angular.module('itemsService', []);

app.provider('ItemsService', function() {
    var items = [{
      id: 1,
      name: 'view',
      active: true
    }, {
      id: 2,
      name: 'model',
      active: true
    }, {
      id: 3,
      name: 'scope',
      active: false
    }, {
      id: 4,
      name: 'filter',
      active: true
    }, {
      id: 5,
      name: 'directives',
      active: false
    }];

    function update(searchItem) {
      var found = _.first(items, function(item) {
        return searchItem.id == item.id
      });

      // do nothing
      if (!found) return;
    }

    return {
      $get: function() {
        return {
          
          fetchAll: function() {
            return items;
          },

          update: function(item) {
            var found = find(item);
            if (found) {
              var index = _.indexOf(items, _.find(items, item));
              items.splice(index, 1, item);
            }
            
            return items;
          }
        }
      }
    }
  });
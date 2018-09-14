var app = angular.module('app', ['itemsService']);

app.controller('ItemsContainerController', ['ItemsService',
  function(ItemsService) {

    var items = ItemsService.fetchAll(),
      self = this;

    // init
    updateItems();

    function updateItems(filteredItems) {
      var collection = filteredItems || items;
      self.activeItems = _.filter(collection, function(item) {
        return item.active;
      });
      
      self.inactiveItems = _.filter(collection, function(item) {
        return !item.active;
      });
    }

    this.switchStatus = function(item) {
      item.active = !item.active;
      items = ItemsService.update(item);
      updateItems();
    };

    this.updateFilter = function(val, activeOnly) {
      if (!val) {
        updateItems();
        return;
      }

      var filteredItems = items.filter(function(item) {
        return (activeOnly && !item.active) || item.name.indexOf(val) === 0;
      });

      updateItems(filteredItems);
    };

  }
]);


app.directive('itemsContainer', function() {
  return {
    controller: 'ItemsContainerController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'items-container.html'
  };
});


app.directive('searchBox', function() {
  return {
    scope: {
      onChange: '&'
    },
    controllerAs: 'ctrl',
    controller: function() {},
    bindToController: true,
    templateUrl: 'search-box.html'
  };
});

app.directive('item', function() {
  return {
    scope: {
      item: '=set',
      onClick: '&'
    },
    controller: function() {},
    controllerAs: 'ctrl',
    bindToController: true,
    restrict: 'EA',
    template: '<input type="checkbox" ng-click="ctrl.onClick({item: ctrl.item})" ng-checked="ctrl.item.active" /> {{ ctrl.item.name }}'
  }
});

app.directive('itemsList', function() {
  return {
    scope: {
      title: '@',
      items: '=',
      onClick: '&'
    },
    restrict: 'EA',
    controller: function() {},
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'items-list.html'
  }
});

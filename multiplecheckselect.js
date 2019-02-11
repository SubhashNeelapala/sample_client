<input type="checkbox" name="selectedFruits[]" value="{{each.id}}" ng-checked="selection.indexOf(each.id) > -1" ng-click="toggleSelection({{each.id}})"> {{each.id}}



 $scope.selection = [];

  // Toggle selection for a given fruit by name
  $scope.toggleSelection = function(id) {
    var idx = $scope.selection.indexOf(id);

    // Is currently selected
    if (idx > -1) {
      $scope.selection.splice(idx, 1);
    }

    // Is newly selected
    else {
      $scope.selection.push(id);
    }
    console.log($scope.selection,"*********")
  };

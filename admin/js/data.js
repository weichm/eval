//Create data through a service
//see o'reilly, angularjs, green & seshadri, p.33ff.

var evalData = angular.module('EvalData', ['ngResource']);

evalData.factory('Items', function($resource) {
  return $resource(
    '/admin/json/:array',
    {array: "@array"}
  )
});

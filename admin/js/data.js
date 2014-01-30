//Create data through a service
//see o'reilly, angularjs, green & seshadri, p.33ff.

var evalData = angular.module('EvalData', ['ngResource']);

evalData.factory('Items', function($resource) {
  //Create new resource object which maps to the RESTful API url /admin/json/ with an optional parameter "array"
  //resource object can make these requests:
  //  GET /admin/json/klassen --> gets array klassen
  //  GET /admin/json/klassen/5A --> gets Klasse 5A
  //  POST /admin/json/klassen --> creates new klasse
  //  PUT /admin/json/klassen/5A --> update klasse 5A
  //  DELETE /admin/json/klassen/5A --> delete klasse 5A 
  return $resource(
    '/admin/json/:resarray/:resid',
    {resarray: "@array", resid: "@id"}   //@..: pull dynamic parameter out of the data object
  )
});

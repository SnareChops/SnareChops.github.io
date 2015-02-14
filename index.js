/*globals Parse:false, angular:false*/
angular.module('blog', [])
.config(['$interpolateProvider', function($interpolateProvider){
  $interpolateProvider.startSymbol('[!').endSymbol('!]');
  }])
  .controller('PostController', ['$http', function($http){
    var self = this;

    self.pageInit = function(pageid){
      self.pageid = encodeURIComponent(pageid);

      $http.put('http://video.quarrantine.com:8080/hit/'+self.pageid).then(function(data){
        self.hits = data.data;
      });

      //$http.get('http://videos.quarrantine.com:8080/likes?id='+encodeURIComponent(self.pageid)).then(function(data){
      //  self.incs = data.data.likes;
      //  self.decs = data.data.dislikes;
      //});
    };

    //self.like = function(inc){
    //  $http.get('http://videos.quarrantine.com:8080/likes?id='+encodeURIComponent(self.pageid)+'&inc='+inc.toString()).then(function(data){
    //    self.incs = data.data.likes;
    //    self.decs = data.data.dislikes;
    //  });
    //};
  }]);
/*globals Parse:false, angular:false*/
angular.module('blog', [])
.config(['$interpolateProvider', function($interpolateProvider){
  $interpolateProvider.startSymbol('[!').endSymbol('!]');
  }])
  .controller('PostController', ['$http', function($http){
    var self = this;
    self.views = {};
    self.subscribeButtonText = 'Subscribe';

    self.indexInit = function(){
      $http.get('http://quarrantine-165851.use1-2.nitrousbox.com/hits.json').then(function(data){
        data.data.forEach(function(x){
          self.views[x.postid] = x.count;
        });
      });
    };

    self.pageInit = function(pageid){
      self.pageid = encodeURIComponent(pageid);

      $http.put('http://quarrantine-165851.use1-2.nitrousbox.com/hit/'+self.pageid).then(function(data){
        self.hits = data.data;
      });

      //$http.get('http://videos.quarrantine.com:8080/likes?id='+encodeURIComponent(self.pageid)).then(function(data){
      //  self.incs = data.data.likes;
      //  self.decs = data.data.dislikes;
      //});
    };

    self.subscribe = function(email){
      $http.post('http://quarrantine-165851.use1-2.nitrousbox.com/subscribe', {email: email}).then(function(data){
        self.subscribeButtonText = 'Thank you!';
        self.email = '';
      });
    };

    //self.like = function(inc){
    //  $http.get('http://videos.quarrantine.com:8080/likes?id='+encodeURIComponent(self.pageid)+'&inc='+inc.toString()).then(function(data){
    //    self.incs = data.data.likes;
    //    self.decs = data.data.dislikes;
    //  });
    //};
  }]);
var new_key = function() {
  function _p8(s) {
    p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

/*globals Parse:false, angular:false*/
angular.module('blog', [])
.run(function(){OAuth.initialize('7m3XJ8bHoZV6MN2Hvfr5W5-_5rw')})
.config(['$interpolateProvider', '$sceDelegateProvider', function($interpolateProvider, $sceDelegateProvider){
  $interpolateProvider.startSymbol('[!').endSymbol('!]');
  $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://videos.quarrantine.com:8080/**', 'http://pink-puffy-poodle-197724.use1-2.nitrousbox.com/**']);
}])
.controller('PostController', ['$http', function($http){
  var self = this;
    self.views = {};
    self.pageid = null;
    self.subscribeButtonText = 'Subscribe';
    self.user = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null;
    self.token = localStorage.getItem('token');
    self.comment = null;
    self.comments = [];

    self.indexInit = function(){
      $http.get('http://videos.quarrantine.com:8080/hits.json').then(function(data){
        data.data.forEach(function(x){
          self.views[x.postid] = x.count;
        });
      });
    };

    self.pageInit = function(pageid){
      self.pageid = encodeURIComponent(pageid);
      $http.get('http://pink-puffy-poodle-197724.use1-2.nitrousbox.com/comments/'+pageid+'.json').then(function(data){
        self.comments = data.data;
      });
      //$http.put('http://videos.quarrantine.com:8080/hit/'+self.pageid).then(function(data){
      //  self.hits = data.data;
      //});

      //$http.get('http://videos.quarrantine.com:8080/likes?id='+encodeURIComponent(self.pageid)).then(function(data){
      //  self.incs = data.data.likes;
      //  self.decs = data.data.dislikes;
      //});
    };

    self.subscribe = function(email){
      $http.post('http://videos.quarrantine.com:8080/subscribe', {email: email}).then(function(data){
        self.subscribeButtonText = 'Thank you!';
        self.email = '';
      });
    };

    self.login = function() {
      $http.get('http://pink-puffy-poodle-197724.use1-2.nitrousbox.com/token.json', {withCredentials: true}).then(function (data) {
        OAuth.popup('github', {state: data.data}).done(function (result) {
          $http.post('http://pink-puffy-poodle-197724.use1-2.nitrousbox.com/authorize.json', {code: result.code}, {withCredentials: true}).then(function (data) {
            localStorage.setItem('user', JSON.stringify({
              email: data.data.email,
              image: data.data.image,
              name: data.data.name,
              username: data.data.username
            }));
            localStorage.setItem('token', data.data.token);
            self.user = data.data;
          });
        });
      });
    };

      self.makeComment = function(comment){
        $http.post('http://pink-puffy-poodle-197724.use1-2.nitrousbox.com/comments.json', {postid: self.pageid, comment: comment}, {withCredentials:true}).then(function(data){
          self.comment = null;
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
};

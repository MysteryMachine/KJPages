app = angular.module("artyKJ", ['ngRoute']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.when('/', {
    templateUrl: 'comics.html',
    controller: 'comicsCtrl'
  }).when('/comics/:name/:pg_num', {
    templateUrl: 'comics.html',
    controller: 'comicsCtrl'
  }).when('/prints/:name', {
    templateUrl: 'prints.html',
    controller: 'printsCtrl'
  }).when('/links', {
    templateUrl: 'links.html',
    controller: 'linksCtrl'
  }).when('/about', {
    templateUrl: 'about.html',
    controller: 'aboutCrl'
  }).otherwise({
    redirectTo: '/'
  });;

  $locationProvider.html5Mode(true);
}]);

app.controller('topbarCtrl', ['$scope', function($scope){
  $scope.topbaritems = 
  [{ name: "kj martinet", url: "/home" },
  { name: "comics", url: "/comics" },
  { name: "prints", url: "/prints" },
  { name: "about", url: "/about" },
  { name: "links", url: "/links" },
  { name: "tumblr", url: "http://kjmartinet.tumblr.com/" },
  { name: "store", url: "http://kjmartinet.bigcartel.com/" }];
}]);

app.controller('comicsCtrl', ['$routeParams', '$scope', function($routeParams, $scope){
  $scope.title = $routeParams.name || "Comics";
  $scope.data = [ {name: "islands", title: "Islands", pages: 37},                 
    { name: "fourhorsemenAndAPomegranate", title:"Fourhorsemen and a Pomegranate", pages: 6}, 
    { name: "aeolianProcess", title: "Æolian Process", pages: 17},
    { name: "idealForm", title: "Ideal Form", pages: 6 },
    { name: "forRightNow", title: "For Right Now", pages: 6 },
    { name: "aristophanesAndPenthesilea", title: "Aristophanes and Penthesilea", pages: 14}];
}]);

app.controller('$routeParams', 'printsCtrl', ['$scope', function($routeParams, $scope){
  $scope.title = $routeParams.name || "Prints";
  $scope.data = [{ name: "rainbowconnection", title: "Rainbow Connection"}, 
    { name: "strepthroat", title: "You Can Touch But You Can't Feel"},
    { name: "monstersong", title: "Monster Song"}, 
    { name: "laydown", title: "Lay Down Your Burden"}, 
    { name: "kussebisse", title: "Küsse, Bisse, das Reimt Sich"},
    { name: "theplay", title: "The Play's the Thing"},
    { name: "iamnot", title: "I Am Not What I Am"},
    { name: "wordswordswords", title: "Words, Words, Words"}];
  $scope.getCurrent = function(){
    for(var i = 0; i < $scope.data.length; i++)
    {
      if($scope.data[i].name == $routeParams.name)
        return $scope.data[i];
    }
    return $scope.data[0];
  };

  $scope.current = $scope.getCurrent();
  $scope.pgNum = $routeParams.page_num || 1;
  $scope.image = $scope.loadImage();
  $scope.back = function(){
    if($scope.current == {} || $scope.pgNum == 1)
      return;
    else{
      $scope.pgNum--;
      $scope.image = $scope.loadImage();
    }
  };
  $scope.forward = function(){
    if($scope.current == {} || $scope.pgNum == $scope.current.page_num)
      return;
    else{
      $scope.pgNum++;
      $scope.image = $scope.loadImage();
    }
  };
  $scope.loadImage = function(){
    var name = "/comics/" + $scope.current.name + "/";
    if($scope.pgNum < 10)
      return name + "00" + $scope.pgNum;
    else if($scope.pgNum < 100)
      return name + "0" + $scope.pgNum;
    else
      return name + $scope.pgNum;
  };
}]);

app.controller('aboutCtrl', ['$scope', function($scope){
  $scope.title = "About Me";
}]);

app.controller('linksCtrl', ['$scope', function($scope){
  $scope.title = "Links"
  $scope.friends = 
    [{ name: "Tim Beckhardt", url: "" }, 
    { name: "Heather Benjamin", url: "" },
    { name: "Lincoln Bostian", url: "" },
    { name: "Erina Davidson", url: "" },
    { name: "Alison Dubois", url: "" },
    { name: "Sophia Foster-Dimino", url: "" },
    { name: "Ali Gens", url: "" },
    { name: "Soomi Lee", url: "" },
    { name: "Robyn Ng", url: "" },
    { name: "Victo Ngai", url: "" },
    { name: "Laura Perez-Harris", url: "" },
    { name: "A.T. Pratt", url: "" },
    { name: "Ze San San", url: "" },
    { name: "Clay Schiff", url: "" },
    { name: "Jose Suris IV", url: "" },
    { name: "Tom Toye", url: "" },
    { name: "Hiromi Ueyoshi", url: "" },
    { name: "Leah Wishnea", url: "" }];

  $scope.associates = 
    [{ name: "Collective Stench", url: "" },
    { name: "Dimensions Comics", url: "" },
    { name: "Gowanus Print Lab", url: "" },
    { name: "Happiness Comix", url: "" },
    { name: "kus! komiksi", url: "" },
    { name: "Throat ArtCollective Stench", url: "" },
    { name: "Dimensions Comics", url: "" },
    { name: "Gowanus Print Lab", url: "" },
    { name: "Happiness Comix", url: "" },
    { name: "kus! komiksi", url: "" },
    { name: "Throat Art", url: "" }];
}]);  
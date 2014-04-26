app = angular.module("artyKJ", ['ngRoute']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.when('/', {
    templateUrl: 'illustration.html',
    controller: 'illusCtrl'
  }).when('/illustration/:name', {
    templateUrl: 'illustration.html',
    controller: 'illusCtrl'
  }).when('/illustration', {
    templateUrl: 'illustration.html',
    controller: 'illusCtrl'
  }).when('/comics/:comic', {
    templateUrl: 'comics.html',
    controller: 'comicsCtrl'
  }).when('/comics', {
    templateUrl: 'comics.html',
    controller: 'comicsCtrl'
  }).when('/comics/:comic/:pg', {
    templateUrl: 'comics.html',
    controller: 'comicsCtrl'
  }).when('/prints/:name', {
    templateUrl: 'prints.html',
    controller: 'printsCtrl'
  }).when('/prints', {
    templateUrl: 'prints.html',
    controller: 'printsCtrl'
  }).when('/links', {
    templateUrl: 'links.html',
    controller: 'linksCtrl'
  }).when('/about', {
    templateUrl: 'about.html',
    controller: 'aboutCtrl'
  });
}]);

var topbarItems = 
  [{ name: "kj martinet", url:"/#/" },
  { name: "illustration", url: "/#/illustration" },
  { name: "comics", url: "/#/comics" },
  { name: "prints", url: "/#/prints" },
  { name: "about", url: "/#/about" },
  { name: "links", url: "/#/links" },
  { name: "tumblr", url: "http://kjmartinet.tumblr.com/" },
  { name: "store", url: "http://kjmartinet.bigcartel.com/" }];
  
app.controller('illusCtrl', ['$routeParams', '$location', '$scope', '$rootScope', function($routeParams, $location, $scope, $rootScope){
  $scope.topbaritems = topbarItems;
  $scope.data = [
  { name: "sauce", title: "Sauce", medium: "Ink and Digital", date: "2013"},
  { name: "kushanakurotowa", title: "Ghibli Jam: Kushana and Kurotowa", medium: "Ink, China Marker, and Digital", date: "2014"},
  { name: "opheliaWeb", title: "Ophelia", medium: "Ink and Digital", date: "2014"},
  { name: "laviniaWebFinal", title: "Lavinia", medium: "Ink and Digital", date: "2013"},
  { name: "cordeliaWeb", title: "Cordelia", medium: "Ink and Digital", date: "2014"},
  { name: "ladymacWeb", title: "Lady Macbeth", medium: "Ink and Digital", date: "2014"},
  ];
  $scope.getIllus = function(){
    $location.path("/illustration/" + $scope.illustration.name)
  }
  $scope.parseUrlForIllusName = function(){
    if($routeParams.name){
      return $routeParams.name;
    }
    else{
      return $scope.data[0].name;
    }
  };
  $scope.setIllusImage = function(){
    $scope.image = "http://kjmartinet.com/illustration/" + $scope.illustration.name + ".jpg"
  };

  $scope.getPgFromIllusName = function(arg){
    for(var i = 0; i < $scope.data.length; i++){
      if($scope.data[i].name === arg){
        return i;
      }
    }
  }
  $scope.pg = $scope.getPgFromIllusName($scope.parseUrlForIllusName());
  $scope.illustration = $scope.data[$scope.pg];
  if($routeParams.name){
    $rootScope.title =  $scope.illustration.title;
  }
  else if($location.path() === "/"){
    $rootScope.title = 'KJ Martinet'
  }
  else{
    $rootScope.title = 'Illustration'
  }

  var ngbackUrl = "";
  if($scope.pg > 0){
    var ngbackUrl = "/illustration/" + $scope.data[$scope.pg - 1].name;
  }
  if($scope.pg + 1 < $scope.data.length)
    var ngforwardUrl = "/illustration/" + $scope.data[$scope.pg + 1].name;
  $scope.forwardUrl = "#" + ngforwardUrl;
  $scope.backUrl = "#" + ngbackUrl;
  $scope.forward = function(){ $location.path(ngforwardUrl)};
  $scope.back = function(){ $location.path(ngbackUrl)};

  $scope.setIllusImage();
}]);

app.controller('comicsCtrl', ['$routeParams', '$location', '$scope', '$rootScope', function($routeParams, $location, $scope, $rootScope){
  $scope.data = [ 
    { id: 0, name: "islands", pages: 37 ,  title: "Islands"},                 
    { id: 1, name: "fourhorsemenAndAPomegranate", pages: 6, title:"Fourhorsemen and a Pomegranate"}, 
    { id: 2, name: "aeolianProcess", pages: 17,  title: "Aeolian Process"},
    { id: 3, name: "idealForm", pages: 6, title: "Ideal Form"},
    { id: 4, name: "forRightNow", pages: 6,  title: "For Right Now" },
    { id: 5, name: "aristophanesAndPenthesilea", pages: 14,  title: "Aristophanes and Penthesilea"}];
  $scope.topbaritems = topbarItems;
  $scope.parseUrlForComicName = function(){
    if($routeParams.comic){
      return $routeParams.comic;
    }
    else{
      return $scope.data[0].name;
    }
  };
  $scope.parseUrlForPage = function(){
    if($routeParams.pg){
      return $routeParams.pg;
    }
    else{
      return 1;
    }
  };
  $scope.getPgStr = function(num){
    if(num < 10){
      return "00" + num;
    }
    else if(num < 100){
      return "0" + num;
    }
    else{
      return num;
    }
  };
  $scope.setComicImage = function(){
    $scope.image = "http://kjmartinet.com/comics/" + $scope.comic.name + "/" + $scope.getPgStr($scope.page) + ".jpg"
  };
  $scope.getComic = function(){
    $location.path("/comics/" + $scope.comic.name + "/" + "001")
  };

  $scope.getIdFromComicName = function(arg){
    for(var i = 0; i < $scope.data.length; i++){
      if($scope.data[i].name === arg){
        return i;
      }
    }
  }
  
  $scope.comic = $scope.data[$scope.getIdFromComicName($scope.parseUrlForComicName())];
  if($routeParams.comic){
    $rootScope.title =  $scope.comic.title;
  }
  else{
    $rootScope.title = 'Comics'
  }
  $scope.page = parseInt($scope.parseUrlForPage());

  var ngforwardUrl = "/comics/" + $scope.comic.name + "/" + $scope.getPgStr($scope.page + 1);
  var ngbackUrl = "/comics/" + $scope.comic.name + "/" + $scope.getPgStr($scope.page - 1);
  $scope.forwardUrl = "#" + ngforwardUrl;
  $scope.backUrl = "#" + ngbackUrl;
  $scope.forward = function(){ $location.path(ngforwardUrl)};
  $scope.back = function(){ $location.path(ngbackUrl)};

  $scope.setComicImage();
}]);

app.controller('printsCtrl', ['$routeParams', '$location', '$scope', '$rootScope', function($routeParams, $location, $scope, $rootScope){
  $scope.topbaritems = topbarItems;
  $scope.data = [
    { name: "selfportraitwithcorgs", title: "Self Portrait with Corgs", medium: "Silkscreen", date: "2013"},
    { name: "longpork", title: "Long Pork", medium: "Silkscreen", date: "2013"},
    { name: "rainbowconnection", title: "Rainbow Connection", medium: "Silkscreen", date: "2012"}, 
    { name: "monstersong", title: "Monster Song", medium: "Silkscreen", date: "2010"}, 
    { name: "laydown", title: "Lay Down Your Burden", medium: "Silkscreen", date: "2010"}, 
    { name: "kussebisse", title: "Kusse, Bisse, das Reimt Sich", medium: "Silkscreen", date: "2010"},
    { name: "theplay", title: "The Play's the Thing", medium: "Silkscreen", date: "2009"},
    { name: "iamnot", title: "I Am Not What I Am", medium: "Silkscreen", date: "2009"},
    { name: "wordswordswords", title: "Words, Words, Words", medium: "Silkscreen", date: "2009"}];
  $scope.getPrint = function(){
    $location.path("/prints/" + $scope.print.name)
  }
  $scope.parseUrlForPrintName = function(){
    if($routeParams.name){
      return $routeParams.name;
    }
    else{
      return $scope.data[0].name;
    }
  };
  $scope.setPrintImage = function(){
    $scope.image = "http://kjmartinet.com/prints/" + $scope.print.name + ".jpg"
  };

  $scope.getPgFromPrintName = function(arg){
    for(var i = 0; i < $scope.data.length; i++){
      if($scope.data[i].name === arg){
        return i;
      }
    }
  }
  $scope.pg = $scope.getPgFromPrintName($scope.parseUrlForPrintName());
  $scope.print = $scope.data[$scope.pg];
  if($routeParams.name){
    $rootScope.title =  $scope.print.title;
  }
  else{
    $rootScope.title = 'Prints'
  }
  
  var ngbackUrl = "";
  if($scope.pg > 0){
    var ngbackUrl = "/prints/" + $scope.data[$scope.pg - 1].name;
  }
  if($scope.pg + 1 < $scope.data.length)
    var ngforwardUrl = "/prints/" + $scope.data[$scope.pg + 1].name;
  $scope.forwardUrl = "#" + ngforwardUrl;
  $scope.backUrl = "#" + ngbackUrl;
  $scope.forward = function(){ $location.path(ngforwardUrl)};
  $scope.back = function(){ $location.path(ngbackUrl)};
  
  $scope.setPrintImage();
}]);

app.controller('aboutCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
  $scope.topbaritems = topbarItems;
  $rootScope.title = "About Me";
}]);

app.controller('linksCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
  $scope.topbaritems = topbarItems;
  $rootScope.title = "Links"
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
    { name: "Throat Art", url: "" },
    { name: "Collective Stench", url: "" },
    { name: "Dimensions Comics", url: "" },
    { name: "Gowanus Print Lab", url: "" },
    { name: "Happiness Comix", url: "" },
    { name: "kus! komiksi", url: "" },
    { name: "Throat Art", url: "" }];
}]); 

app.directive('topbarItems', function(){
  return{
    restrict: 'E',
    scope: { 
      item: "=",
      pgName: "@"
    },
    link: function(scope){
      scope.getClass = function(){
        if(scope.item.name === "kj martinet"){
          return "kj"
        }
        else if(scope.pgName === scope.item.name){
          return "selected topbar-item"
        }
        else{
          return "topbar-item"
        }
      }
    },
    templateUrl: "topbar-item.html"
  }
});
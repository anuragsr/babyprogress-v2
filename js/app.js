var app = angular.module('app', ['ui.router', 'pascalprecht.translate'])

app.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
  .state('home', {
    url: "/home",
    templateUrl: "templates/home.html",
    controller: 'HomeCtrl'
  })
  .state('parents', {
    url: "/parents",
    templateUrl: "templates/parents.html",
    controller: 'ParCtrl'
  })
  .state('prof', {
    abstract: true,
    url: "/professionnels",
    templateUrl: "templates/professionnel.html",
    controller: 'ProCtrl'
  })
  .state('prof.default', {
    url: "",
    templateUrl: "templates/default.html"
  })
  .state('prof.gyn', {
    url: "/gynecologue",
    templateUrl: "templates/gynecologue.html"
  })
  .state('prof.rad', {
    url: "/radiologue",
    templateUrl: "templates/radiologue.html"
  })
  .state('prof.sage', {
    url: "/sage-femme",
    templateUrl: "templates/sage-femme.html"
  })
  .state('prof.gen', {
    url: "/generaliste",
    templateUrl: "templates/generaliste.html"
  })
  .state('prof.autre', {
    url: "/autre",
    templateUrl: "templates/autre.html"
  })
  var browserLang = navigator.languages?navigator.languages[0]:(navigator.language || navigator.userLanguage);
  browserLang = browserLang.toLowerCase();
  
  var availLangs = ["en", "es", "fr"];
  availLangs.forEach(function(x){
    if(browserLang.indexOf(x) > -1){
      $translateProvider.preferredLanguage(x);
      return;
    }
  })
  // alert(navigator.languages)

  // $translateProvider.preferredLanguage("fr");
  // $translateProvider.preferredLanguage("en");
  $translateProvider.fallbackLanguage("en");
  $translateProvider.useStaticFilesLoader({
      prefix: 'data/',
      suffix: '.json'
  });  

  $translateProvider.useSanitizeValueStrategy('sce');
})

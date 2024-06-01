function l() { return console.log.apply(console, arguments) }
app.controller('HomeCtrl', function($scope, $state, $http, $translate, $sce){    
    
  $scope.currDot = 1;

  $scope.langChange = function(val){
      $translate.use(val);
  }

  $scope.moveCards = function(val, idx){
    $scope.currDot = idx;
    $(".card-ctn").css("left", val + "px");
  }

  $scope.showMenu = function(){
    $(".mobile-menu").show();
    $(".mobile-menu").animate({
      left:0
    }, 500)
  }
  
  $scope.hideMenu = function(state){
    $(".mobile-menu").animate({
      left:"100%"
    }, 500, function(){
      if(state){
        $state.go(state);
      }
      $(".mobile-menu").hide();
    })
  }

  $scope.goTo = function(state){
    $state.go(state);
  }

})
.controller('ParCtrl', function($scope, $state, $http, $translate, $sce){    
    
  $scope.faqs = [];
  
  $scope.langChange = function(val){
    $translate.use(val).then(getFaqs);
  }

  $scope.scrollDown = function(){
    $(document).scrollTop(window.innerHeight - $(".navbar").height());
  }

  $scope.scrollUp = function(){
    $(document).scrollTop(0);
  }

  $scope.showMenu = function(){
    $(".mobile-menu").show();
    $(".mobile-menu").animate({
      left:0
    }, 500)
  }
  
  $scope.hideMenu = function(state){
    $(".mobile-menu").animate({
      left:"100%"
    }, 500, function(){
      if(state){
        $state.go(state);
      }
      $(".mobile-menu").hide();
    })
  }

  function getFaqs(){    
    var qLength = 12
    ,qArr = []
    ,i = 0
    ,currIdx = 0
    ;

    $scope.faqs[0] = {};
    
    for(i = 1; i <= qLength; i++){
      qArr.push("parent.q" + i);
      qArr.push("parent.a" + i);
    }  
    
    i = 0;

    $translate(qArr).then(function (result) {

      Object.keys(result).forEach(function(key){

        var value = $sce.getTrustedHtml(result[key]);      

        if(key.indexOf("q") > -1){        
          $scope.faqs[i].q = value;
          currIdx++;
        }else{
          $scope.faqs[i].a = value;
          currIdx++;
        }
        
        if(currIdx > 1){
          if(i == 0)
            $scope.faqs[i].showAnswer = true;

          i++;
          currIdx = 0;
          
          if(i < qLength)
            $scope.faqs[i] = {};
        }

      })

    })
  }

  getFaqs();

})
.controller('ProCtrl', function($scope, $state, $http, $translate, $sce){    
    
  $scope.langChange = function(val){
      $translate.use(val).then(getSpecs);
  }

  function getSpecs(){
    var qArr = [
      "autre.spec1",
      "autre.spec2",
      "autre.spec3",
      "autre.spec4",
      "autre.spec5"
    ]

    $scope.autreForm.specOpts = [
      { value:"Radiologue" },
      { value:"Gynécologue-obstétricien(ne)" },
      { value:"Sage femme" },
      { value:"Médecin généraliste" },
      { value:"Autre" }
    ]

    $translate(qArr).then(function (result) {
      Object.keys(result).forEach(function(key, idx){
        $scope.autreForm.specOpts[idx].name = $sce.getTrustedHtml(result[key]);        
      })
    })
  }

  $scope.reset = function(){
    $scope.autreForm = {
      qual:"",
      qualOpts: [
        { name:"Dr.", value:"Docteur" },
        { name:"Prof.", value:"Professeur" },
        { name:"M.", value:"Monsieur" },
        { name:"Mme.", value:"Madame" }
      ],
      lnom: "",
      fnom: "",
      etab: "",
      spec: "",      
      pays: "",
      ville: "",
      email: "",
      tel: ""
    }

    getSpecs();
  }

  $scope.submitAutreForm = function(){
    // console.log($scope.autreForm)
    $http({
      url: "backend/insertAutreForm.php",
      method: "POST",
      data: $scope.autreForm,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data, status, headers, config) {
      console.log(data)
      if(data.inserted){
        alert("Data has been inserted successfully!")
        $scope.reset();
      }else{
        alert("Data could not be inserted. Please try again!")            
      }
    }).error(function(data, status, headers, config) {
    })
  }

  $scope.showMenu = function(){
    $(".mobile-menu").show();
    $(".mobile-menu").animate({
      left:0
    }, 500)
  }
  
  $scope.hideMenu = function(state){
    $(".mobile-menu").animate({
      left:"100%"
    }, 500, function(){
      if(state){
        $state.go(state);
      }
      $(".mobile-menu").hide();
    })
  }

  $scope.reset();

})
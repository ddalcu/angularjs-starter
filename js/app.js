var app = angular.module('main', ['ngRoute']);

/**
ROUTES
**/
app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'list.html',
        controller: 'UserListController',
    }).when('/user/edit/:id/', {
        templateUrl: 'edit.html',
        controller: 'UserEditController',
    }).otherwise({
        redirectTo: '/'
    });
});


/**
CONTROLLERS
**/

app.controller('UserEditController', function($scope, $routeParams, $location, appData) {
    $scope.currentUser = appData.currentUser;

    $scope.save = function(user) {
        if($scope.userEdit.$valid) {
            $scope.back();
        } else {
            alert('Please fix validation errors and try again');
        }
    };
    
    $scope.back = function () {
        $location.path('/list');
    };

    $scope.titles = function() {
        if($scope.currentUser && $scope.currentUser.gender == "Male") {
            return ['Mr','Sir'];
        } else {
            return ['Ms','Mrs'];
        }
    }
});

app.controller('UserListController', function($scope, $http, $filter, $route, $routeParams, $location, appData) {
    $scope.data = appData.users;
    $scope.currentUser = null;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.userSearch = {
        firstName: '',
        lastName: ''
    }
    
    $scope.numberOfPages=function(){
        return new Array(Math.ceil($scope.data.length/$scope.pageSize));
    };

    $scope.setPage = function(index) {
        $scope.currentPage = index;
    };

    $scope.edit = function(user) {
        appData.currentUser = user;
    };

    $scope.showDeleteModal = function(user) {
        $scope.currentUser = user;
        $('#modal-delete-user').modal();
    };

    $scope.delete = function(user) {
        for(var i=0;i<$scope.data.length;i++) {
            if($scope.data[i].id == user.id) {
                $scope.data.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    $scope.previousPage = function() {
        if($scope.currentPage>0) {
            $scope.currentPage = $scope.currentPage-1;
        }
    };

    $scope.nextPage = function() {
        if($scope.currentPage < $scope.data.length/$scope.pageSize - 1) {
            $scope.currentPage= $scope.currentPage+1
        }
    };
});


/**
FACTORIES
**/

app.factory("appData",function(){
        return {
            users : [
                {id: 0, firstName: "David", middleName:"Tester", lastName:"Dalcu", nickName:"AA", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 1, firstName: "Sammy", middleName:"Tester", lastName:"Bay", nickName:"BB", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Divorced"}, 
                {id: 2, firstName: "Coco", middleName:"Tester", lastName:"Jay", nickName:"CC", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:""}, 
                {id: 3, firstName: "Moco", middleName:"Tester", lastName:"Fay", nickName:"DD", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Single"}, 
                {id: 4, firstName: "Lexi", middleName:"Tester", lastName:"Uso", nickName:"EE", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 5, firstName: "Trixie", middleName:"Tester", lastName:"Nuso", nickName:"FF", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 6, firstName: "Bonnie", middleName:"Tester", lastName:"Echo", nickName:"GG", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 7, firstName: "Fannie", middleName:"Tester", lastName:"Murphy", nickName:"HH", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 8, firstName: "Carmen", middleName:"Tester", lastName:"Vader", nickName:"II", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 9, firstName: "Foxxy", middleName:"Tester", lastName:"Vander", nickName:"JJ", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 10, firstName: "Ella", middleName:"Tester", lastName:"Steen", nickName:"KK", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 11, firstName: "Alex", middleName:"Tester", lastName:"Smith", nickName:"LL", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 12, firstName: "Lori", middleName:"Tester", lastName:"Joez", nickName:"MM", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"},
                {id: 13, firstName: "Ian", middleName:"Tester", lastName:"Perez", nickName:"NN", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 14, firstName: "Sammy", middleName:"Tester", lastName:"Amigo", nickName:"OO", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 15, firstName: "Coco", middleName:"Tester", lastName:"Heun", nickName:"PP", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 16, firstName: "Moco", middleName:"Tester", lastName:"Bullo", nickName:"QQ", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 17, firstName: "Lexi", middleName:"Tester", lastName:"Verro", nickName:"RR", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 18, firstName: "Trixie", middleName:"Tester", lastName:"Xiang", nickName:"SS", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"}, 
                {id: 19, firstName: "Bonnie", middleName:"Tester", lastName:"Vang", nickName:"TT", gender:"Male",title:"Mr", ssn:"800808000", maritalStatus:"Married"},
                ],
            currentUser: null
        };
});


/**
FILTERS
**/

app.filter('startFrom', function() {
    return function(input, start) {
        start = parseInt(start);
        return input.slice(start);
    }
});


/**
DIRECTIVES
**/
app.directive('ssn', function() {
    return {
        restrict: 'C',
        link: function(scope, element) {
            element.keyup(function() {
              var val = this.value.replace(/\D/g, '');
              var newVal = '';
              if(val.length > 4) {
                 this.value = val;
              }
              if((val.length > 3) && (val.length < 6)) {
                 newVal += val.substr(0, 3) + '-';
                 val = val.substr(3);
              }
              if (val.length > 5) {
                 newVal += val.substr(0, 3) + '-';
                 newVal += val.substr(3, 2) + '-';
                 val = val.substr(5);
               }
               newVal += val;
               this.value = newVal;
            });
        }
    }
});

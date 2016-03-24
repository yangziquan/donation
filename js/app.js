﻿﻿﻿var myApp = angular.module('myApp', ['ngAnimate','ui.router','ngResource','ui.bootstrap']);

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */

myApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/index');
	$stateProvider
//		.state('login', {
//          url: '/login',
//          views: {
//              "home": {
//                  templateUrl: 'web/login.html',
//                  controller: 'LoginController'
//              },
//          }
//     })
.state('index',{
			url: '/index',
			views: {
				"home": {
					templateUrl: 'web/home.html',
					controller: 'IndexController'
				},
			}
       })
}).run(['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
 
myApp.factory("myInterceptor", function($location,$q,$window) {
     var myInterceptor = {
                response : function(response){
                    console.log($window.sessionStorage.isLogged)
                    if(!$window.sessionStorage.isLogged || ((response.data.code) && response.data.code=="407")){
                        $location.path('/login');
                    }else if(response.data.code){
                        alert(response.data.message);
                    }
                    return response;
                }
            };
            return myInterceptor;
});
myApp.config(function($httpProvider) {
  $httpProvider.interceptors.push('myInterceptor');
})







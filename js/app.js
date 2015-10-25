var app = angular.module('nbaRoutes', ['ngRoute']);

app.config(function($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'js/home/homeTmpl.html',
            controller: 'homeCtrl',
            resolve: {
                teamDataJazz: function(homeService) {
                    return homeService.getTeamData('utahjazz');
                },
                teamDataLakers: function(homeService) {
                    return homeService.getTeamData('losangeleslakers');
                },
                teamDataHeat: function(homeService) {
                    return homeService.getTeamData('miamiheat');
                }
            }
        })
        .when('/teams/:team', {
            templateUrl: 'js/teams/teamTmpl.html',
            controller: 'teamCtrl',
            resolve: {
                teamData: function(teamService, $route) {
                    return teamService.getTeamData($route.current.params.team);
                }
            }
        })
        .otherwise('/');
});
//router here
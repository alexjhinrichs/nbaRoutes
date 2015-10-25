var app = angular.module('nbaRoutes');

app.service('homeService', function($http, $q, teamService) {


    this.getTeamData = function(team) {

        var dfr = $q.defer();
        var url = 'https://api.parse.com/1/classes/' + team;

        $http({
            method: 'GET',
            url: url
        }).then(function(data) {
            var results = data.data.results;
            var wins = 0;
            var losses = 0;

            for (var i = 0; i < results.length; i++) {
                if (results[i].won) {
                    wins += 1;
                } else if (!results[i].won) {
                    losses += 1;
                }
            }
            results.wins = wins;
            results.losses = losses;
            dfr.resolve(results);
        });

        return dfr.promise;
    };
});
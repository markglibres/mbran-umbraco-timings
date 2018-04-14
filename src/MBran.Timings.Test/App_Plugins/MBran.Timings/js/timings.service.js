angular.module('umbraco')
    .service('daysService', function ($http) {

        var timingsEndPoint = '/Umbraco/backoffice/MBranTimings/DaysApi/';

        this.getDays = function () {
            return $http.get(timingsEndPoint + 'GetDayNames');
        };

        this.getAbbreviatedDays = function () {
            return $http.get(timingsEndPoint + 'GetAbbreviatedDayNames');
        };

    });
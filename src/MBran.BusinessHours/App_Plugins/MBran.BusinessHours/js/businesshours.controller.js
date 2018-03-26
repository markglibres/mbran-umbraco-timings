angular.module('umbraco')
    .controller('MBran.BusinessHours.BusinessHoursController', function ($scope) {

        function init() {
            initOptions();
            initModel();
        }

        init();


        function initOptions() {
            $scope.model.hideLabel = true;

        }

        function initModel() {
            
        }

        console.log('test');
    });
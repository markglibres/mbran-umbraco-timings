angular.module('umbraco')
    .controller('MBran.Timings.TimingsController', function ($scope) {

        function init() {
            initOptions();
            initDefaults();
            initModel();
        }

        init();


        function initOptions() {
            $scope.model.hideLabel = true;

        }

        function initModel() {
            $scope.model.timings = [];
            

            $scope.model.timings.push({
                day: {
                    from: 1, to: 6
                },
                time: {
                    from: {
                        hour: 9,
                        minute: 0,
                        meridian: 'AM'
                    }
                }
            });

            $scope.model.timings.push({
                day: {
                    from: 1, to: 6
                },
                time: {
                    from: {
                        hour: 5,
                        minute: 0,
                        meridian: 'PM'
                    }
                }
            });
        }

        function initDefaults() {
            $scope.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }

        console.log('test');
    });
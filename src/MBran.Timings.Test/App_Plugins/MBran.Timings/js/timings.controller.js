angular.module('umbraco')
    .controller('MBran.Timings.TimingsController', function ($scope) {
        console.log($scope.model.value);
        function init() {
            initOptions();
            initDefaults();
            initModel();
        }

        init();


        function initOptions() {
            //$scope.model.hideLabel = true;

        }

        function initModel() {
            
            if (!$scope.model.value || !$scope.model.value.timings) {
                $scope.model.value = { timings: [] };
            }
            
            $scope.timings = [];
            angular.copy($scope.model.value.timings, $scope.timings);
        }

        $scope.applyTimingChanges = function (timing, index) {
            if (!$scope.model.value.timings[index]) {
                var newTimings = {};
                angular.copy(timing, newTimings);
                $scope.model.value.timings.push(newTimings);
            } else {
                $scope.model.value.timings[index] = timing;
            }
            
            return false;
        };

        $scope.addNewTimings = function () {
            $scope.timings.push({
                'day': {
                    'from': 1,
                    'to': 5
                },
                'from': {
                    'hour': '9',
                    'minutes': '00',
                    'meridian': 'AM'
                },
                'to': {
                    'hour': '6',
                    'minutes': '00',
                    'meridian': 'PM'
                }
            });
        };

        function initDefaults() {
            $scope.options = {};
            $scope.options.days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

            var minutesInterval = 15;
            var hoursInterval = 1;
            $scope.options.times = {
                hours: [],
                minutes: [],
                meridians: ['AM','PM']
            };

            for (var hour = 1; hour <= 12; hour+=hoursInterval) {
                $scope.options.times.hours.push(hour+'');
            }

            for (var minute = 0; minute < 60; minute += minutesInterval) {
                $scope.options.times.minutes.push((minute < 10 ? '0' : '') + minute);
            }
        }

        console.log($scope.model);
    });
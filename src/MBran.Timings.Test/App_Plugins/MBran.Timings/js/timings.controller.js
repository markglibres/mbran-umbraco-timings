angular.module('umbraco')
    .controller('MBran.Timings.TimingsController', function ($scope) {

        console.log($scope.model);
        var editMode = [];
        $scope.model.timings = [];

        function init() {
            initOptions();
            initDefaults();
            initModel();
        }

        $scope.setEditMode = function(index) {
            var editIndex = getEditModeIndex(index);

            var originalItem = {
                key: index,
                timing: copyTiming($scope.model.timings[index])
            };

            if (editIndex === -1) {
                editMode.push(originalItem);
            } else {
                editMode[editIndex] = originalItem;
            }
        };

        $scope.isEditMode = function(index) {
            return getEditModeIndex(index) >= 0;
        };

        $scope.removeEditMode = function (index) {
            var editIndex = getEditModeIndex(index);
            editMode.splice(editIndex, 1);
        };

        $scope.applyChanges = function (timing, index) {
            var newTimings = copyTiming(timing);

            if (!$scope.model.value.timings[index]) {
                $scope.model.value.timings.push(newTimings);
            } else {
                $scope.model.value.timings[index] = newTimings;
            }

            $scope.removeEditMode(index);
            return false;
        };

        $scope.cancelChanges = function (timing, index) {
            
            var editIndex = getEditModeIndex(index);
            var originalTiming = copyTiming(editMode[editIndex].timing);

            $scope.model.timings[index] = originalTiming;
            $scope.removeEditMode(index);
        };

        $scope.removeTiming = function(index) {
            $scope.model.timings.splice(index, 1);
        };

        $scope.addNewTimings = function () {
            $scope.model.timings.push({
                day: {
                    from: '1',
                    to: '5'
                },
                from: {
                    hour: '9',
                    minutes: '00',
                    meridian: 'AM'
                },
                to: {
                    hour: '6',
                    minutes: '00',
                    meridian: 'PM'
                }
            });

            $scope.setEditMode($scope.model.timings.length - 1);
        };

        /**
         * PRIVATE METHODS
         */
        function getEditModeIndex(index) {
            for (var i = 0; i < editMode.length; i++) {
                if (editMode[i].key === index) {
                    return i;
                }
            }
            return -1;
        }

        function copyTiming(timing) {
            return {
                day: {
                    from: timing.day.from,
                    to: timing.day.to
                },
                from: {
                    hour: timing.from.hour,
                    minutes: timing.from.minutes,
                    meridian: timing.from.meridian
                },
                to: {
                    hour: timing.to.hour,
                    minutes: timing.to.minutes,
                    meridian: timing.to.meridian
                }
            };
        }

        function initOptions() {

        }

        function initModel() {
            
            if (!$scope.model.value || !$scope.model.value.timings) {
                $scope.model.value = { timings: [] };
            }

            for (var i = 0; i < $scope.model.value.timings.length; i++)
            {
                $scope.model.timings.push(copyTiming($scope.model.value.timings[i]));
            }
        }

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

        init();

    });
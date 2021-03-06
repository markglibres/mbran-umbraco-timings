﻿angular.module('umbraco')
    .controller('MBran.Timings.TimingsController', function ($scope, daysService) {

        var editMode = [];
        $scope.timings = [];
        $scope.sameDay = [];

        function init() {
            initOptions();
            initDefaults();
            initModel();
        }

        $scope.setEditMode = function(index) {
            var editIndex = getEditModeIndex(index);

            var originalItem = {
                key: index,
                timing: angular.copy($scope.timings[index])
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
            
            var newTimings = angular.copy(timing);
            if ($scope.sameDay[index]) {
                newTimings.day.to = newTimings.day.from;
                timing.day.to = timing.day.from;
            }

            if (!$scope.model.value[index]) {
                $scope.model.value.push(newTimings);
            } else {
                $scope.model.value[index] = newTimings;
            }
            $scope.removeEditMode(index);

            return false;
        };

        $scope.cancelChanges = function (timing, index) {
            
            var editIndex = getEditModeIndex(index);
            var originalTiming = angular.copy(editMode[editIndex].timing);

            if (!$scope.model.value[index]) {
                $scope.removeTiming(index);
            } else {
                $scope.timings[index] = originalTiming;    
            }
            
            $scope.removeEditMode(index);
        };

        $scope.removeTiming = function(index) {

            if ($scope.timings[index]) {
                $scope.timings.splice(index, 1);
            }

            if ($scope.model.value[index]) {
                $scope.model.value.splice(index, 1);
            }
        };

        $scope.addNewTimings = function (isSingleDay) {

            $scope.timings.push({
                day: { from: '1', to: '5' },
                from: { hour: '9', minutes: '0', meridian: 'AM' },
                to: { hour: '6', minutes: '0', meridian: 'PM' }
            });

            $scope.sameDay[$scope.timings.length - 1] = isSingleDay;    
            $scope.setEditMode($scope.timings.length - 1);
        };

        $scope.padLeadingZeroes = function (number) {
            
            return number.length === 1 ? '0' + number : '' + number;
        };

        $scope.getMeridianValue = function (meridianKey) {
            if (!$scope.options.times.meridians) {
                return meridianKey;
            }

            for (var i = 0; i < $scope.options.times.meridians.length; i++) {
                if ($scope.options.times.meridians[i].Key.toLowerCase() === meridianKey.toLowerCase()) {
                    return $scope.options.times.meridians[i].Value;
                }
            }

            return meridianKey;
        };

        function getEditModeIndex(index) {
            for (var i = 0; i < editMode.length; i++) {
                if (editMode[i].key === index) {
                    return i;
                }
            }
            return -1;
        }

        
        function initOptions() {
            
            $scope.config = {
                minutesInterval: $scope.model.config.minutesInterval && $scope.model.config.minutesInterval !== '' ? parseInt($scope.model.config.minutesInterval) : 15
            };

        }

        function initModel() {

            if (!$scope.model.value || $scope.model.value === '') {
                $scope.model.value = [];
            }

            for (var i = 0; i < $scope.model.value.length; i++)
            {
                var timing = $scope.model.value[i];
                $scope.timings.push(angular.copy(timing));
                $scope.sameDay.push(timing.day.from === timing.day.to);
            }
        }

        function initDefaults() {
            $scope.options = {};
            $scope.options.days = {
                code: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
                name: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            };

            daysService.getDays()
                .then(function (response) {
                    $scope.options.days.name = response.data;
                }, function (response) {
                    $scope.options.days.name = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                });

            daysService.getAbbreviatedDays()
                .then(function (response) {
                    $scope.options.days.code = response.data;
                }, function (response) {
                    $scope.options.days.code = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
                });
            
            var hoursInterval = 1;
            $scope.options.times = {
                hours: [],
                minutes: []
            };

            for (var hour = 1; hour <= 12; hour+=hoursInterval) {
                $scope.options.times.hours.push(''+hour);
            }

            for (var minute = 0; minute < 60; minute += $scope.config.minutesInterval) {
                $scope.options.times.minutes.push('' +minute);
            }

            daysService.getMeridian()
                .then(function (response) {
                    $scope.options.times.meridians = response.data;
                }, function (response) {
                    $scope.options.times.meridians = [{ Key: 'AM', Value: 'AM' }, { Key: 'PM', Value: 'PM' }];
                });
        }

        init();

    });

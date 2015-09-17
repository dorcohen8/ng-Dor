var app = angular.module('mainModule');

app.controller('mainCtrl', ['$scope', 'configService',
    function ($scope, configService) {
        $scope.itemId = '';
        $scope.items = [];
        $scope.queryString = '';
        $scope.queryDays = [1, 3, 7, 999];
        $scope.queryDay = $scope.queryDays[0];
        $scope.sortingField = '';
        var sortingDirection = 'ascending';
        var statusFieldHeader = 'Status';
        var dateFieldHeader = 'Date';
        $scope.UidFieldHeader = 'Uid';
        $scope.selectedStatusList = [];
        $scope.itemsHeaders = [];

        // Checking if $scope.$apply is needed before performing it
        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        var getConfiguration = function () {
            $scope.safeApply(function () {
                $scope.queryDays = [1, 3, 7, 999];
                $scope.queryDay = $scope.queryDays[0];
                $scope.sortingField = '';
                sortingDirection = 'ascending';
                statusFieldHeader = "Status";
                $scope.UidFieldHeader = 'Uid';
                $scope.menuItem = 'List';

                //configService.getConfiguration().then(function (config) {
                //    for (var i = 0; i < config.length; i++) {
                //        switch (config[i].key) {
                //            case 'Web_Archive_Default_Filter':
                //                $scope.queryDay = config[i].value;
                //                break;
                //            case 'Web_Archive_Time_Filters':
                //                $scope.queryDays = config[i].value.split(';');
                //                break;
                //            case 'Web_Archive_Default_Sorting':
                //                $scope.sortingField = config[i].value;
                //                break;
                //            case 'Web_Archive_List_Refresh_Time':
                //                intervalValue = parseInt(config[i].value) * 1000;
                //                if (intervalValue == 'NaN') { intervalValue = 120000; }
                //                break;
                //            default:
                //                break;
                //        }
                //    }
                //});
            });
        };

        $scope.getItems = function (day) {
            $scope.safeApply(function () {
                $scope.queryDay = day;
                $scope.items = sampleObjectArray.Items;
                $scope.itemsHeader = Object.keys($scope.items[0]);
                if ($scope.sortingField === "") {
                    $scope.sort($scope.items, dateFieldHeader);
                }
            });
        };

        $scope.filterByStatus = function (item) {
            if ($scope.selectedStatusList.length === 0) {
                return true;
            }
            for (var i = 0; i < $scope.selectedStatusList.length; i++) {
                if (item[statusFieldHeader] == $scope.selectedStatusList[i].name) {
                    return true;
                }
            }
            return false;
        };

        $scope.statusList = [
        { icon: "<img src=[..]/1.png.. />", name: "Unread", maker: "", ticked: false },
        { icon: "<img src=[..]/1.png.. />", name: "Done", maker: "", ticked: false },
        { icon: "<img src=[..]/1.png.. />", name: "Failed", maker: "", ticked: false },
        { icon: "<img src=[..]/1.png.. />", name: "Validated", maker: "", ticked: false }
        ];

        $scope.getSortDirectionClass = function (field) {
            var className = $scope.sortingField == field ? sortingDirection : '';
            return className;
        };

        // TODO: Move to utils service
        function sorting(item1, item2) {
            if (item1[$scope.sortingField] < item2[$scope.sortingField])
                return -1;
            if (item1[$scope.sortingField] > item2[$scope.sortingField])
                return 1;
            return 0;
        }

        $scope.sort = function (array, field) {
            if ($scope.sortingField === field) {
                sortingDirection = sortingDirection == 'ascending' ? 'decending' : 'ascending';
                array = array.reverse();
            }
            else {
                sortingDirection = 'ascending';
                $scope.sortingField = field;
                array = array.sort(sorting);
            }
        };

        $scope.filterFunction = function (element) {
            console.log("filterFunction");
            return element.name.match(/^Ma/) ? true : false;
        };

        getConfiguration();
        $scope.getItems();

        $scope.selectItem = function (selectedItem) {
            $scope.itemId = selectedItem[$scope.UidFieldHeader];
        };
    }]);
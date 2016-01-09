/**
 * Created by NICK on 16/1/6.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

angular.module('app', ['sidemenu', 'ngMdIcons'])
    .controller('test', ['$scope', '$http', 'mdSideMenuFactory', 'mdSideMenuSections', function ($scope, $http, mdSideMenuFactory, mdSideMenuSections) {
        $http({
            method: 'GET',
            url: 'data.json'
        }).success(function (data) {
            $scope.modules = mdSideMenuSections.sections = data;
            mdSideMenuFactory.onStateChangeStart(null, null, null);
        });
        mdSideMenuSections.options = {
            children: "nodes",
            key: 'menuId',
            showSearchBar: true,
            dirSelectable: false,
            orderBy: 'menuId',
            filterField: 'menuTitle'
        };
    }])
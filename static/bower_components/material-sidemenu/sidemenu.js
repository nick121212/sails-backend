
angular.module('sidemenu', ['ngMaterial'])
    .directive('sideMenu', ['$rootScope', '$compile', 'mdSideMenuSections', function ($rootScope, $compile, mdSideMenuSections) {
        var directive = {
            restrict: 'EA',
            replace: false,
            require: 'sideMenu',
            transclude: true,
            scope: {
                modules: '=',
                selectedNodes: '=',
                orderBy: "@",
                reverseOrder: "@"
            },
            controller: ['$scope', '$interpolate','$templateCache', function ($scope, $interpolate,$templateCache) {
                var opts = mdSideMenuSections.options;

                $scope.options = opts;
                !$scope.selectedNodes && ($scope.selectedNodes = {});
                $scope.showChildren = (node)=> {
                    if ($scope.selectedNodes.hasOwnProperty(node[opts.key])) {
                        delete $scope.selectedNodes[node[opts.key]];
                    } else {
                        if (node[opts.children] && node[opts.children].length) {
                            $scope.selectedNodes[node[opts.key]] = node;
                        }
                    }
                };
                $scope.isShowChildren = function (node) {
                    return $scope.selectedNodes[node[opts.key]];
                };
                $scope.isLeaf = function (node) {
                    return node.rgt - node.lft == 1 || node[opts.children].length == 0;
                };
                $scope.isSelected = function (node) {
                    return !!mdSideMenuSections.selectedNode && mdSideMenuSections.selectedNode[opts.key] == node[opts.key];
                };
                this.template = $compile($interpolate($templateCache.get('sidemenu.html'))({
                    opts: opts
                }));
            }],
            compile: ($ele, $attrs, childTranscludeFn)=> {
                return ($scope, $element, attrs, $ctrl)=> {
                    $scope.$watch("modules", function updateNodeOnRootScope(newValue) {
                        var opts = mdSideMenuSections.options;
                        if (angular.isArray(newValue)) {
                            if (angular.isDefined($scope.node) && angular.equals($scope.node[opts.children], newValue))
                                return;
                            $scope.node = {};
                            $scope.node[opts.children] = newValue;
                        }
                        else {
                            if (angular.equals($scope.node, newValue))
                                return;
                            $scope.node = newValue;
                        }
                    });
                    $ctrl.template($scope, function (clone) {
                        $element.html('').append(clone);
                    });
                    $scope.$sideMenuTransclude = childTranscludeFn;
                }
            }
        };

        return directive;
    }]);

angular.module('sidemenu')
    .directive('sideMenuChild', [function () {
        var directive = {
            restrict: 'EA',
            require: '^sideMenu',
            link: ($scope, $element, $attrs, $ctrl)=> {
                $scope['showSearchBar'] = false;
                $ctrl['template']($scope, function (clone) {
                    $element.html('').append(clone);
                });
            }
        };

        return directive;
    }]);
angular.module("sidemenu").run(["$templateCache", function($templateCache) {$templateCache.put("sidemenu.html","\n\n\n\n<ul ng-if=\"node.{{opts.children}}.length\">\n    <li ng-if=\"node.menuShow\"\n        ng-repeat=\"node in node.{{opts.children}} | filter:options.filterExpression:options.filterComparator {{options.orderBy}}\">\n        <div side-menu-content-transclude ng-click=\"showChildren(node)\"></div>\n        <md-divider ng-if=\"node.depth==1\"></md-divider>\n        <side-menu-child ng-if=\"isShowChildren(node)\" class=\"sidemenu-child am-fade-and-scale\"></side-menu-child>\n    </li>\n</ul>\n<md-divider ng-if=\"!$last && node.depth>1\"></md-divider>");
$templateCache.put("sidemenu_search.html","<md-input-container md-no-float\n                    flex\n                    class=\"md-float-icon md-no-errors\">\n    <ng-md-icon icon=\"search\"></ng-md-icon>\n    <input placeholder=\"搜索菜单\" ng-model=\"options.filterExpression\">\n</md-input-container>");}]);

angular.module('sidemenu')
    .factory('mdSideMenuFactory', ['$rootScope', 'mdSideMenuSections', function ($rootScope,mdSideMenuSections) {
        var onStateChangeStart = function (event, toState, toParams) {
            function digest(sections, currentSection) {
                sections.forEach(function (section) {
                    if (section[mdSideMenuSections.options.children] && section[mdSideMenuSections.options.children]) {
                        return digest(section[mdSideMenuSections.options.children], section);
                    }

                    if (section.menuLink == location.hash) {
                        mdSideMenuSections.selectedNode = section;
                    }
                });

                return false;
            }

            digest(mdSideMenuSections.sections, null);
        };

        $rootScope.$on('$locationChangeSuccess', onStateChangeStart);

        return {
            onStateChangeStart: onStateChangeStart
        };
    }]);
angular.module('sidemenu')
    .provider('mdSideMenuSections', [function () {
        var _sections = [],
            _theme,
            _palettes;

        this.initWithSections = function (value) {
            _sections = value ? value : [];
        };

        this.initWithTheme = function (value) {
            _theme = value.theme();
            _palettes = value._PALETTES;
        };

        this.$get = [function () {
            var MdSideMenuSections = function () {
                this.sections = _sections;
                this.selectedNode = null;
                this.options = {};
                this.theme = _theme;
                this.palettes = _palettes;
                this.searchStr = "";
            };

            return new MdSideMenuSections();
        }];
    }]);

angular.module('sidemenu')
    .directive('sideMenuContentTransclude', [function () {
        var directive = {
            link: ($scope, $element, $attrs, $ctrl)=> {
                $scope['$sideMenuTransclude']($scope, function (clone) {
                    $element.empty();
                    $element.append(clone);
                });
            }
        };

        return directive;
    }]);
angular.module('sidemenu')
    .directive('sideMenuSearch', ['mdSideMenuSections', '$templateCache', function (mdSideMenuSections, $templateCache) {
        var directive = {
            restrict: 'EA',
            template: $templateCache.get('sidemenu_search.html'),
            controller: ($scope)=> {
                $scope.options = mdSideMenuSections.options;
            }
        };

        return directive;
    }]);
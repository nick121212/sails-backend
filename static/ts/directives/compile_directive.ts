import ref = require("ref");

export class Directive {
    /**
     * 指令的名称
     */
    public static _name: string = "compileDir";
    /**
     * 初始化函数
     */
    public static init(module: angular.IModule) {
        module.directive(Directive._name, Directive.directive);
    }
    /**
     * 定义指令
     */
    public static directive: Array<string | Function> = [
        "$rootScope",
        "$compile",
        ($rootScope, $compile) => {
            let directive: angular.IDirective = {
                replace: true,
                restrict: "EA",
                scope: {
                    item: "="
                },
                link: ($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes){
                    let dummyScope = {
                        $destroy: angular.noop
                    },
                        childScope: angular.IScope,
                        content: string,
                        destoryChildScope = () => {
                            (childScope || dummyScope).$destroy();
                        };
                    $attrs.$observe("html", (html: string) => {
                        if (html) {
                            destoryChildScope();
                            childScope = $scope.$new(false);
                            childScope["item"] = $scope["item"];
                            if (html.search("<") === 0) {
                                content = $compile(html)(childScope);
                                $element.replaceWith(content);
                            } else {
                                content = childScope.$eval(html);
                                $element.text(content);
                            }
                        }
                    });
                }
            };
        }
    ];
}
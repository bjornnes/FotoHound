System.register(["angular2/core", "./search.component", "../services/search.service", "angular2/http", "../directives/OverlayDirective"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, search_component_1, search_service_1, http_1, OverlayDirective_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (search_component_1_1) {
                search_component_1 = search_component_1_1;
            },
            function (search_service_1_1) {
                search_service_1 = search_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (OverlayDirective_1_1) {
                OverlayDirective_1 = OverlayDirective_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent() {
                }
                return AppComponent;
            }());
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'my-app',
                    templateUrl: 'app/html/header.html',
                    template: '<search></search>',
                    directives: [search_component_1.SearchComponent, OverlayDirective_1.OverlayDirective],
                    providers: [search_service_1.SearchService, http_1.HTTP_PROVIDERS]
                })
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});
//# sourceMappingURL=app.component.js.map
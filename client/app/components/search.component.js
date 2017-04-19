System.register(["angular2/core", "../services/search.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, search_service_1, SearchComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (search_service_1_1) {
                search_service_1 = search_service_1_1;
            }
        ],
        execute: function () {
            SearchComponent = (function () {
                function SearchComponent(searchService) {
                    this.searchService = searchService;
                    this.searchField = "";
                    this.machineLearning = true;
                }
                SearchComponent.prototype.search = function (search, machineLearning) {
                    var _this = this;
                    console.log(search, machineLearning);
                    this.searchService.search(search, machineLearning).subscribe(function (searchRes) { return _this.result = searchRes; });
                };
                return SearchComponent;
            }());
            SearchComponent = __decorate([
                core_1.Component({
                    selector: 'search',
                    templateUrl: 'app/html/search.html'
                }),
                __metadata("design:paramtypes", [search_service_1.SearchService])
            ], SearchComponent);
            exports_1("SearchComponent", SearchComponent);
        }
    };
});
//# sourceMappingURL=search.component.js.map
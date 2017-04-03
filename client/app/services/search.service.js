System.register(["rxjs/add/operator/map"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SearchService;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            SearchService = (function () {
                function SearchService(http) {
                    this.http = http;
                }
                SearchService.prototype.search = function (search, machineLearning) {
                    return this.http.get('https://localhost:3000/search/').map(function (res) { return res.json(); });
                };
                return SearchService;
            }());
            exports_1("SearchService", SearchService);
        }
    };
});
//# sourceMappingURL=search.service.js.map

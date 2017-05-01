System.register(["angular2/core", "../services/search.service", "../../node_modules/d3-cloud/build/d3.layout.cloud.js", "../../node_modules/d3/build/d3.js"], function (exports_1, context_1) {
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
    var core_1, search_service_1, D3, D33, SearchComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (search_service_1_1) {
                search_service_1 = search_service_1_1;
            },
            function (D3_1) {
                D3 = D3_1;
            },
            function (D33_1) {
                D33 = D33_1;
            }
        ],
        execute: function () {
            SearchComponent = (function () {
                function SearchComponent(searchService, _element) {
                    this.searchService = searchService;
                    this._element = _element;
                    this.usedWords = '';
                    this.remainingWords = '';
                    this.searchField = "";
                    this.machineLearning = true;
                }
                SearchComponent.prototype.ngAfterViewInit = function () {
                    //this._htmlElement = this._element.nativeElement;
                    //this._host = D33.select(this.div.nativeElement);
                    console.log('initiated view');
                    this.svgSize = {
                        width: 500,
                        height: 500
                    };
                    D33.select('#wCSVG')
                        .attr("width", this.svgSize.width)
                        .attr("height", this.svgSize.height)
                        .append("g")
                        .attr("transform", "translate(" + this.svgSize.width / 2 + "," + this.svgSize.height / 2 + ")");
                };
                SearchComponent.prototype.search = function (search, machineLearning, language) {
                    var _this = this;
                    console.log(search, machineLearning);
                    this.searchService.words(search, machineLearning, language).subscribe(function (wordRes) { return _this.words = wordRes; }, function (error) { return console.log('error', error); }, function () {
                        console.log('calling initCloud');
                        console.log('comp', _this.words);
                        _this.initCloud();
                        _this.usedWords = _this.words.slice(0, 9);
                        _this.remainingWords = _this.words.slice(10);
                        _this.searchService.search(JSON.stringify(_this.words)).subscribe(function (searchRes) { return _this.result = searchRes; });
                    });
                };
                SearchComponent.prototype.initCloud = function () {
                    var _this = this;
                    var words = this.words //.slice(0,9)
                        .map(function (d) {
                        var size = (Math.log(Math.pow((d.prob) * 7, 70))) - 80;
                        (size > 100) ? size = 100 : size = size;
                        (size < 13) ? size = 13 : size = size;
                        return { text: d.word, size: size };
                    });
                    //console.log(this.canvas);
                    var layout = D3.cloud().size([500, 500])
                        .canvas(function () { return _this.canvasH.nativeElement; })
                        .words(words)
                        .padding(5)
                        .rotate(function () { return ~~(Math.random() * 2) * 90; })
                        .font("Impact")
                        .fontSize(function (d) { return d.size; })
                        .on("end", this.drawNew)
                        .start();
                };
                SearchComponent.prototype.drawNew = function (words) {
                    var svgSize = {
                        width: 500,
                        height: 500
                    };
                    var fill = D33.scaleOrdinal(D33.schemeCategory20);
                    console.log('words', JSON.stringify(words));
                    var wC = D33.select('#wCSVG');
                    wC.select('g').remove();
                    wC = wC.append("g")
                        .attr("transform", "translate(" + svgSize.width / 2 + "," + svgSize.height / 2 + ")");
                    wC.selectAll('text')
                        .data(words)
                        .enter().append('text')
                        .style('font-size', function (d) { return d.size + 'px'; })
                        .style("font-family", "Impact")
                        .style('fill', function (d, i) { return fill(i); })
                        .attr('text-anchor', 'middle')
                        .attr('transform', function (d) { return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'; })
                        .text(function (d) {
                        return d.text;
                    });
                };
                return SearchComponent;
            }());
            __decorate([
                core_1.ViewChild('wCloud.wordCloud'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "div", void 0);
            __decorate([
                core_1.ViewChild('wClouddd'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "canvasH", void 0);
            SearchComponent = __decorate([
                core_1.Component({
                    selector: 'search',
                    templateUrl: 'app/html/search.html'
                }),
                __metadata("design:paramtypes", [search_service_1.SearchService, core_1.ElementRef])
            ], SearchComponent);
            exports_1("SearchComponent", SearchComponent);
        }
    };
});
//# sourceMappingURL=search.component.js.map
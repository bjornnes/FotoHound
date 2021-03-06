System.register(["angular2/core", "../services/search.service", "angular2/http", "../../node_modules/d3-cloud/build/d3.layout.cloud.js", "../../node_modules/d3/build/d3.js", "../../bower_components/bootstrap/dist/js/bootstrap.js"], function (exports_1, context_1) {
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
    var core_1, search_service_1, http_1, D3, D33, SearchComponent, SearchComponent_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (search_service_1_1) {
                search_service_1 = search_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (D3_1) {
                D3 = D3_1;
            },
            function (D33_1) {
                D33 = D33_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            SearchComponent = SearchComponent_1 = (function () {
                function SearchComponent(searchService, _element) {
                    this.searchService = searchService;
                    this._element = _element;
                    this.usedWords = '';
                    this.remainingWords = '';
                }
                SearchComponent.prototype.track = function (event) {
                    var _this = this;
                    if (!this.loading && $(window).scrollTop() >= $(document).height() - $(window).height() - 200) {
                        this.loading = true;
                        this.result = this.result.concat(this.allResults.slice(this.result.length, this.result.length + 80));
                        setTimeout(function () { return _this.loading = false; }, 1000);
                    }
                };
                ;
                SearchComponent.prototype.ngAfterViewInit = function () {
                    //this.overlaySvgObject.nativeElement.style.height = "0%";
                    this.overlaySvgObject.nativeElement.style.width = "0%";
                    this.overlaySvgObject.nativeElement.style.float = "right";
                    $('.selectpicker').selectpicker();
                    $('#mlToggle').bootstrapToggle();
                    this.svgSize = {
                        width: 500,
                        height: 500
                    };
                    D33.select('#wCSVG')
                        .attr("width", this.svgSize.width)
                        .attr("height", this.svgSize.height)
                        .append("g")
                        .attr("transform", "translate(" + this.svgSize.width / 2 + "," + this.svgSize.height / 2 + ")");
                    this.loading = false;
                    // var loadingContent = false;
                    // $(window).scroll(()=>{
                    //   console.log('Scrolling!');
                    //   if(!loadingContent && ($(window).scrollTop() > $(document).height-$(window).height() - 100)){
                    //       this.result = this.allResults.splice(0,160);
                    //       console.log(this.result.length);
                    //   }
                    // });
                    $(window).on("load", function () {
                        console.log('loaded');
                    });
                };
                SearchComponent.prototype.search = function (search, machineLearning, language) {
                    var _this = this;
                    this.closeAlert();
                    this.searchService.words(search, machineLearning, language).subscribe(function (wordRes) { return _this.words = wordRes; }, function (error) {
                        _this.errorbanner.nativeElement.style.height = "inherit";
                        _this.errorbanner.nativeElement.style.padding = "12px";
                        console.log(_this.errorbanner.nativeElement.children);
                        console.log(error);
                        _this.errormessage = error._body;
                    }, function () {
                        _this.initCloud();
                        // this.usedWords = this.words.slice(0,9);
                        // this.remainingWords = this.words.slice(10);
                        _this.searchService.search(JSON.stringify(_this.words)).subscribe(function (searchRes) { return _this.allResults = searchRes; }, function (error) { return console.log(error); }, function () { return _this.result = _this.allResults.slice(0, 80); });
                        if (_this.words.length == 1 && machineLearning) {
                            _this.alertbanner.nativeElement.style.height = "inherit";
                            _this.alertbanner.nativeElement.style.padding = "12px";
                        }
                    });
                };
                SearchComponent.prototype.initCloud = function () {
                    var _this = this;
                    var words = this.words
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
                    // console.log('words',JSON.stringify(words));
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
                SearchComponent.prototype.openOverlay = function (image) {
                    this.imageOverlay.nativeElement.style.height = "100%";
                    this.overlayImgObject.nativeElement.src = image.medium;
                    this.overlayImgObject.nativeElement.alt = image.desc;
                    this.overlayShowOrig.nativeElement.href = image.big;
                    this.overlaySaveOrig.nativeElement.href = image.big;
                };
                SearchComponent.prototype.closeOverlay = function () {
                    this.imageOverlay.nativeElement.style.height = "0%";
                };
                SearchComponent.prototype.openCloudOverlay = function () {
                    this.cloudOverlay.nativeElement.style.height = "100%";
                    this.overlaySvgObject.nativeElement.style.width = "40%";
                    //this.overlaySvgObject.nativeElement.style.height="60%";
                    this.overlaySvgObject.nativeElement.style.float = "";
                    this.overlaySvgObject.nativeElement.children[0].innerHTML = this.svgen.nativeElement.children[0].innerHTML;
                };
                SearchComponent.prototype.closeCloudOverlay = function () {
                    this.cloudOverlay.nativeElement.style.height = "0%";
                    //this.overlaySvgObject.nativeElement.style.height="0%";
                    this.overlaySvgObject.nativeElement.style.width = "0%";
                    this.overlaySvgObject.nativeElement.style.float = "right";
                };
                SearchComponent.prototype.closeAlert = function () {
                    this.alertbanner.nativeElement.style.height = "0%";
                    this.alertbanner.nativeElement.style.padding = "0px";
                    this.errorbanner.nativeElement.style.height = "0%";
                    this.errorbanner.nativeElement.style.padding = "0px";
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
            __decorate([
                core_1.ViewChild('imgOverlay'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "imageOverlay", void 0);
            __decorate([
                core_1.ViewChild('overlayImgObject'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "overlayImgObject", void 0);
            __decorate([
                core_1.ViewChild('overlayShowOrig'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "overlayShowOrig", void 0);
            __decorate([
                core_1.ViewChild('overlaySaveOrig'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "overlaySaveOrig", void 0);
            __decorate([
                core_1.ViewChild('language'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "langSelector", void 0);
            __decorate([
                core_1.ViewChild('overlaySvgObject'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "overlaySvgObject", void 0);
            __decorate([
                core_1.ViewChild('cloudOverlay'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "cloudOverlay", void 0);
            __decorate([
                core_1.ViewChild('svgen'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "svgen", void 0);
            __decorate([
                core_1.ViewChild('alertbanner'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "alertbanner", void 0);
            __decorate([
                core_1.ViewChild('errorbanner'),
                __metadata("design:type", Object)
            ], SearchComponent.prototype, "errorbanner", void 0);
            __decorate([
                core_1.HostListener('window:scroll', ['$event']),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], SearchComponent.prototype, "track", null);
            SearchComponent = SearchComponent_1 = __decorate([
                core_1.Component({
                    selector: 'search',
                    templateUrl: 'app/html/search.html',
                    directives: [SearchComponent_1],
                    providers: [search_service_1.SearchService, http_1.HTTP_PROVIDERS]
                }),
                __metadata("design:paramtypes", [search_service_1.SearchService, core_1.ElementRef])
            ], SearchComponent);
            exports_1("SearchComponent", SearchComponent);
        }
    };
});
//# sourceMappingURL=search.component.js.map
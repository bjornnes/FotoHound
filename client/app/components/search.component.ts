
import {Component, ElementRef, ViewChild} from 'angular2/core';
import {SearchService} from '../services/search.service';
import {Observable} from 'rxjs/Observable';
import * as D3 from '../../node_modules/d3-cloud/build/d3.layout.cloud.js';
import * as D33 from '../../node_modules/d3/build/d3.js';
//import Canvas from '../../node_modules/canvas/lib/canvas.js'


declare let d3:any;


@Component({
  selector: 'search',
  templateUrl: 'app/html/search.html'
})
export class SearchComponent{
  @ViewChild('wCloud.wordCloud') private div;
  @ViewChild('wClouddd') private canvasH;
  private searchField;
  private machineLearning;
  public result: Result[];
  public words;

  private _host;
  private _svg;
  private _htmlElement: HTMLElement;


  constructor(private searchService: SearchService, private _element: ElementRef){
    this.searchField = "";
    this.machineLearning = true;
  }

  ngAfterViewInit(){
    //this._htmlElement = this._element.nativeElement;
    //this._host = D33.select(this.div.nativeElement);
    console.log('initiated view');
  }

  search(search: string, machineLearning: boolean, language: boolean){
    console.log(search, machineLearning);
    this.searchService.words(search, machineLearning, language).subscribe(
      wordRes => this.words = wordRes,
      error => console.log('error', error),
      () => {
        console.log('calling initCloud');
        console.log('comp',this.words);
        this.initCloud();
        //this.searchService.search(JSON.stringify(this.words)).subscribe(searchRes => this.result = searchRes);
        //this._populate();

      }
  );
  }

  private initCloud(){
    console.log(this.canvasH);

    var words = this.words
        .map(d => {
          return {text: d.word, size: 10 + Math.random() * 90};
        });
        //console.log(this.canvas);
        var layout = D3.cloud().size([300, 300])
            .canvas(()=> this.canvasH.nativeElement)
            .words(words)
            .padding(5)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", this.draw)
            .start();
  }

  private draw(words){
    var fill = D33.scaleOrdinal(D33.schemeCategory20);
    console.log('words',JSON.stringify(words));
    console.log(this.div);
    d3.select('#wCloud').append("svg")
          .attr("width", 300)
          .attr("height", 300)
        .append("g")
          .attr("transform", "translate(" + 300 / 2 + "," + 300 / 2 + ")")
        .selectAll('text')
          .data(words)
        .enter().append('text')
        .style('font-size', d => d.size + 'px')
        .style("font-family", "Impact")
        .style('fill', (d, i) => { return fill(i)})
        .attr('text-anchor', 'middle')
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
        .text(d => {
          return d.text;
        });
  }

  /*private _drawWordCloud(words) {
    var wordss = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
        .map(function(d) {
          return {text: d, size: 10 + Math.random() * 90};
        });
        var layout = D3.cloud().size([500, 500])
            .canvas(function() { return new Canvas(1, 1); })
            .words(words)
            .padding(5)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

    d3.select("#wCloud").append("svg")
        .selectAll('text')
        .data(wordss)
        .enter()
        .append('text')
        .style('font-size', d => d.size + 'px')
        .style('fill', (d, i) => {
          return this._fillScale(i);
        })
        .attr('text-anchor', 'middle')
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
        .attr('class', 'word-cloud')
        .text(d => {
          return d.text;
        });
  }
  /*private _margin: {          // Space between the svg borders and the actual chart graphic
  top: number,
  right: number,
  bottom: number,
  left: number
};
private _width: number;      // Component width
private _height: number;     // Component height
private _minCount: number;   // Minimum word count
private _maxCount: number;   // Maximum word count
private _fontScale;          // D3 scale for font size
private _fillScale;          // D3 scale for text color
private _objDiffer;



drawTheCloud() {
  this._setup();
  this._buildSVG();
  this._populate();
}

private _setup() {
  this._margin = {
    top   : 10,
    right : 10,
    bottom: 10,
    left  : 10
  };
  this._width = 300;
  this._height = 300;

  // this._minCount = D3.min(this.config.dataset, d => d.count);
  // this._maxCount = D3.max(this.config.dataset, d => d.count);

  let minFontSize: number = 18;
  let maxFontSize: number = 96;
  this._fontScale = D33.scaleLinear()
                      .domain([this._minCount, this._maxCount])
                      .range([minFontSize, maxFontSize]);
  this._fillScale = D33.scaleOrdinal(D33.schemeCategory20);
}

private _buildSVG() {
  //this._host.html('#wCloud');
  this._svg = this._host
                  .append('svg')
                  .attr('width', this._width + this._margin.left + this._margin.right)
                  .attr('height', this._height + this._margin.top + this._margin.bottom)
                  .append('g')
                  .attr('transform', 'translate(' + ~~(this._width / 2) + ',' + ~~(this._height / 2) + ')');
}

private _populate() {
  let fontFace: string = 'Roboto';
  let fontWeight: string = 'normal';
  let spiralType: string = 'rectangular';
  let words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
      .map(function(d) {
        return {text: d, size: 10 + Math.random() * 90};
      });

  D3.cloud()
    .size([this._width, this._height])
    .words(words)
    .rotate(() => 0)
    .font(fontFace)
    .fontWeight(fontWeight)
    .fontSize(d => this._fontScale(d.count))
    .spiral(spiralType)
    .on('end', () => {
      this._drawWordCloud(words);
    })
    .start();
}


  private _drawWordCloud(words) {
    this._svg
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => d.size + 'px')
        .style('fill', (d, i) => {
          return this._fillScale(i);
        })
        .attr('text-anchor', 'middle')
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
        //.attr('class', 'word-cloud')
        .text(d => {
          return d.word;
        });
  }*/

}

interface Result{
  src: string,
  alt: string
}

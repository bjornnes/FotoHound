
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
  private words;
  private usedWords = '';
  private remainingWords = '';

  private svgSize:{
    width:number,
    height:number
  };

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

    this.svgSize = {
      width: 500,
      height: 500
    }

    D33.select('#wCSVG')
          .attr("width", this.svgSize.width)
          .attr("height", this.svgSize.height)
        .append("g")
          .attr("transform", "translate(" + this.svgSize.width / 2 + "," + this.svgSize.height / 2 + ")");
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
        this.usedWords = this.words.slice(0,9);
        this.remainingWords = this.words.slice(10);
        this.searchService.search(JSON.stringify(this.words)).subscribe(searchRes => this.result = searchRes);
      }
  );
  }

  private initCloud(){
    var words = this.words//.slice(0,9)
        .map(d => {
          var size = (Math.log(Math.pow((d.prob)*7,70)))-80;
          (size > 100)? size = 100: size=size;
          (size < 13 )? size = 13 : size=size;
          return {text: d.word, size: size};
        });
        //console.log(this.canvas);
        var layout = D3.cloud().size([500, 500])
            .canvas(()=> this.canvasH.nativeElement)
            .words(words)
            .padding(5)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", this.drawNew)
            .start();
  }

  private drawNew(words){

    var svgSize = {
      width: 500,
      height: 500
    }

    var fill = D33.scaleOrdinal(D33.schemeCategory20);
    console.log('words',JSON.stringify(words));

    var wC = D33.select('#wCSVG');
    wC.select('g').remove();

    wC = wC.append("g")
      .attr("transform", "translate(" + svgSize.width / 2 + "," + svgSize.height / 2 + ")");

    wC.selectAll('text')
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
}

interface Result{
  src: string,
  alt: string
}

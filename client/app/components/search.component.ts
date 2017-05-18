
import {Component, ElementRef, HostListener, ViewChild} from 'angular2/core';
import {SearchService} from '../services/search.service';
import {Observable} from 'rxjs/Observable';
import * as D3 from '../../node_modules/d3-cloud/build/d3.layout.cloud.js';
import * as D33 from '../../node_modules/d3/build/d3.js';
//import Canvas from '../../node_modules/canvas/lib/canvas.js'
import * as jQueryy from "../../bower_components/jquery/dist/jquery.js";
import "../../bower_components/bootstrap/dist/js/bootstrap.js";

declare let $ : any;


@Component({
  selector: 'search',
  templateUrl: 'app/html/search.html'
})
export class SearchComponent{
  @ViewChild('wCloud.wordCloud') private div;
  @ViewChild('wClouddd') private canvasH;
  @ViewChild('imgOverlay') private imageOverlay;
  @ViewChild('overlayImgObject') private overlayImgObject;
  @ViewChild('overlayShowOrig') private overlayShowOrig;
  @ViewChild('overlaySaveOrig') private overlaySaveOrig;
  @ViewChild('language') private langSelector;
  @ViewChild('overlaySvgObject') private overlaySvgObject;
  @ViewChild('cloudOverlay') private cloudOverlay;
  @ViewChild('svgen') private svgen;
  @ViewChild('alertbanner') private alertbanner;
  @HostListener('window:scroll', ['$event'])
    track(event) {
        if (!this.loading && $(window).scrollTop() >= $(document).height()-$(window).height()-200){
            this.loading = true;
            this.result = this.result.concat(this.allResults.slice(this.result.length,this.result.length+80));
            setTimeout(() => this.loading = false, 1000);
        }
    };

  private loading:boolean;
  public result:any[];
  private allResults:any[];
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
  }

  ngAfterViewInit(){
    //this.overlaySvgObject.nativeElement.style.height = "0%";
    this.overlaySvgObject.nativeElement.style.width = "0%";
    this.overlaySvgObject.nativeElement.style.float="right";
    $('.selectpicker').selectpicker();
    $('#mlToggle').bootstrapToggle();
    this.svgSize = {
      width: 500,
      height: 500
    }

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
    $(window).on("load",()=>{
        console.log('loaded');
    });
  }

  search(search: string, machineLearning: boolean, language: string){
    this.closeAlert();
    this.searchService.words(search, machineLearning, language).subscribe(
      wordRes => this.words = wordRes,
      error => console.log('error', error),
      () => {
        this.initCloud();
        // this.usedWords = this.words.slice(0,9);
        // this.remainingWords = this.words.slice(10);
        this.searchService.search(JSON.stringify(this.words)).subscribe(searchRes => this.allResults = searchRes,
          error => console.log('error',error),
          () => this.result = this.allResults.slice(0,80)
        );
        if(this.words.length == 1 && machineLearning){
            this.alertbanner.nativeElement.style.height = "inherit";
            this.alertbanner.nativeElement.style.padding = "20px";
        }
      }
  );
  }

  private initCloud(){
    var words = this.words
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
    // console.log('words',JSON.stringify(words));

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

  public openOverlay(image){
    this.imageOverlay.nativeElement.style.height = "100%";
    this.overlayImgObject.nativeElement.src = image.medium;
    this.overlayImgObject.nativeElement.alt = image.desc;
    this.overlayShowOrig.nativeElement.href = image.big;
    this.overlaySaveOrig.nativeElement.href = image.big;
  }

  public closeOverlay(){
    this.imageOverlay.nativeElement.style.height = "0%";
  }

  public openCloudOverlay(){
    this.cloudOverlay.nativeElement.style.height = "100%";
    this.overlaySvgObject.nativeElement.style.width="40%";
    //this.overlaySvgObject.nativeElement.style.height="60%";
    this.overlaySvgObject.nativeElement.style.float="";
    this.overlaySvgObject.nativeElement.children[0].innerHTML= this.svgen.nativeElement.children[0].innerHTML;
  }

  public closeCloudOverlay(){
    this.cloudOverlay.nativeElement.style.height = "0%";
    //this.overlaySvgObject.nativeElement.style.height="0%";
    this.overlaySvgObject.nativeElement.style.width="0%";
    this.overlaySvgObject.nativeElement.style.float="right";
  }

  public closeAlert(){
    this.alertbanner.nativeElement.style.height = "0%";
    this.alertbanner.nativeElement.style.padding = "0px";
  }

}

interface Result{
  src: string,
  alt: string
}

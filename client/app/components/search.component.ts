
import {Component} from 'angular2/core';
import {SearchService} from '../services/search.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'search',
  templateUrl: 'app/html/search.html'
  //providers: [SearchService]
})
export class SearchComponent{
  private searchField;
  private machineLearning;
  public result;


  constructor(private searchService: SearchService){
    this.searchField = "";
    this.machineLearning = false;
  }

  ngOnInit(){
    //this.searchService.search('',false).subscribe(searchRes => this.result = searchRes);
  }

  search(search: string, machineLearning: boolean){
    console.log(search, machineLearning);
    this.searchService.search(search, machineLearning).subscribe(searchRes => this.result = searchRes);
  }
}

interface Result{
  src: string,
  alt: string
}

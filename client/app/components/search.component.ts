
import {Component} from 'angular2/core';
import {SearchService} from '../services/search.service';


@Component({
  selector: 'search',
  templateUrl: 'app/html/search.html'
  //providers: [SearchService]
})
export class SearchComponent{
  searchField;
  machineLearning;
  result: Result[];

  constructor(private searchService: SearchService){
    this.searchField = "";
    this.machineLearning = false;
    this.result = [];
    this.searchService.search('',false).subscribe(results => console.log());
  }

  search(search: string, machineLearning: boolean){
    console.log(search, machineLearning);
    this.searchService.search(search, machineLearning).subscribe(results => {
      console.log(results);
      this.result = results;
    }, error => {
      console.log(error);
    });
    console.log(this.searchService.search(search, machineLearning));
  }
}

interface Result{
  src: string,
  alt: string
}

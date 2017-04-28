
import {Component} from 'angular2/core';
import {SearchService} from '../services/search.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'search',
  templateUrl: 'app/html/search.html'
})
export class SearchComponent{
  private searchField;
  private machineLearning;
  public result;


  constructor(private searchService: SearchService){
    this.searchField = "";
    this.machineLearning = true;
  }

  search(search: string, machineLearning: boolean){
    
    this.searchService.search(search, machineLearning).subscribe(searchRes => this.result = searchRes);
  }
}

interface Result{
  src: string,
  alt: string
}

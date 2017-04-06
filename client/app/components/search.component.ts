
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
  private obResult: Observable<Result>;
  public result: Result[];


  constructor(private searchService: SearchService){
    this.searchField = "";
    this.machineLearning = false;
    this.obResult = new Observable(observer => {
      setTimeout(() => {
        observer.next(42);
      }, 1000);

      setTimeout(() => {
        observer.next(43);
      }, 2000);

      setTimeout(() => {
        observer.complete();
      });
    });

    let subsciption = this.obResult.subscribe(
      value => this.result.push(value),
      error => console.log(error)
    );
  }

  search(search: string, machineLearning: boolean){
    console.log(search, machineLearning);
    this.searchService.search(search, machineLearning).subscribe(obResults => {
      this.obResult = obResults;
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

import{Injectable} from 'angular2/core';
import{Http, Headers, URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SearchService{

  private params;
  private result: Result[];

  constructor(private http: Http){
    this.params = new URLSearchParams();
  }

  search(search: string, machineLearning: boolean){
    this.params.set('searchQuery', search);
    this.params.set('machineLearning', machineLearning);
    return this.http.get('search/', {
      search: this.params
    }).map(res => res.json());
  }

}

interface Result{
  src: string,
  alt: string
}

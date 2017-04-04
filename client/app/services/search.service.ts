import{Injectable} from 'angular2/core';
import{Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchService{

  constructor(private http: Http){

  }

  search(search: string, machineLearning: boolean){
    return this.http.get('https://localhost:3000/search/').map(res => { res.json() });
  }
}

import {Component} from 'angular2/core';
import {SearchComponent} from './search.component';
import {SearchService} from '../services/search.service';
import {HTTP_PROVIDERS} from 'angular2/http';

@Component({
    selector: 'my-app',
    template: `<h1>SLSE</h1>
    <search></search>`,
    directives: [SearchComponent],
    providers:[SearchService, HTTP_PROVIDERS]
})
export class AppComponent {

}

import {Component} from 'angular2/core';
import {SearchComponent} from './search.component';
import {SearchService} from '../services/search.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {OverlayDirective} from '../directives/OverlayDirective';

@Component({
    selector: 'my-app',
    templateUrl: 'app/html/header.html',
    template: '<search></search>',
    directives: [SearchComponent, OverlayDirective],
    providers:[SearchService, HTTP_PROVIDERS]
})
export class AppComponent {

}

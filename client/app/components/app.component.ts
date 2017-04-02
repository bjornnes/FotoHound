import {Component} from 'angular2/core';
import {SearchComponent} from './search.component';

@Component({
    selector: 'my-app',
    template: `<h1>SLSE</h1>
    <search></search>`,
    directives: [SearchComponent]
})
export class AppComponent {}

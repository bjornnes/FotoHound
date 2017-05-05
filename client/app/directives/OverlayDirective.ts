import{Directive, Input} from 'angular2/core';



@Directive({
  selector: '[ovImg]',
  exportAs: 'ovImg'
})
export class OverlayDirective{
  @Input() ovImg:any;
}

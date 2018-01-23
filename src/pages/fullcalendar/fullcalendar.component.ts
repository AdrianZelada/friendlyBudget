import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import * as calendar from "fullcalendar";
import * as $ from 'jquery';

// window["$"] = $;
// window["jQuery"] = $;


@Component({
  selector: 'ng-fullcalendar',
  template: `<div #containerFullCalendar></div>`
})
export class NgFullCalendarComponent implements AfterViewInit {

  @ViewChild("containerFullCalendar") element: ElementRef;
  @Input() options: any;
  @Output() initialized: EventEmitter<boolean> = new EventEmitter<boolean>();

  private htmlElement: HTMLElement;

  ngAfterViewInit(): void {
    this.htmlElement = this.element.nativeElement;
    console.log(calendar)
    setTimeout(()=>{
        console.dir($(this.htmlElement));
      $(this.htmlElement).fullCalendar(this.options);
      this.initialized.emit(true);
    }, 100)
  }

  fullCalendar(...args: any[]) {
    if (!args) {
      return;
    }
    switch (args.length) {
      case 0:
        return;
      case 1:
        return $(this.htmlElement).fullCalendar(args[0]);
      case 2:
        return $(this.htmlElement).fullCalendar(args[0], args[1]);
      case 3:
        return $(this.htmlElement).fullCalendar(args[0], args[1], args[2]);
    }
  }
}
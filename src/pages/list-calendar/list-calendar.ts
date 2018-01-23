import { NgFullCalendarComponent } from '../fullcalendar/fullcalendar.component';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

@Component({
  selector: 'page-list-calendar',
  templateUrl: 'list-calendar.html'
})
export class ListCalendarPage {

  @ViewChild(NgFullCalendarComponent) myCalendar: NgFullCalendarComponent;
  @ViewChild(Content) content: Content;

  public calendarOptions: Object = {};
  public colors: string[] = ["#AAC440", "#628B93", "#E76C71", "#805459", "#28D0C3", "#3483D9", "#D1A8D5", "#628B93", "#EE5BB0", "#B5A303", "#1C93CB", "#9EA7FF", "#790549", "#23AE96", "#268292"];

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    const self = this;
    this.calendarOptions = {
      fixedWeekCount: false,
      height: () => self.content.contentHeight - 200,
      firstDay: 1,
      handleWindowResize: true,
      allDaySlot: false,
      slotLabelFormat: 'H',
      eventOverlap: false,
      displayEventTime: true,
      events: [],
      header:{
        left:'title',
        center:'',
        right:'today prev,next'
      },
      buttonText:{
        today:'Hoy'
      },
      monthNames:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      dayNamesShort:['Lun','Mar','Mier','Jue','Vie','Sab','Dom']      
    };
  }

  onCalendarInit(event) {

  }

  addRandomEvents() {
    this.myCalendar.fullCalendar('removeEvents');

    var now = new Date();
        now.setDate(1);

    const data = new Array(45).fill(0).map( (val, index) => {
        return {
          start: now.setDate(now.getDate() + index),
          end: now.setDate(now.getDate() + index + 1),
          id: index,
          color: this.colors[Math.floor(Math.random() * this.colors.length)]
        }
    })

    this.myCalendar.fullCalendar('addEventSource', data);
  }
}
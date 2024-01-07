import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() parentData: any;
  @Output() childEvent = new EventEmitter<string>();

  sendDataToParent() {
    const dataToSend = 'Data from child';
    this.childEvent.emit(dataToSend);
  }
}

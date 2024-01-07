import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.scss'],
})
export class ParentComponentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  dataFromParent = 'Data from parent';

  receiveDataFromChild(data: string) {
    console.log('Received data from child:', data);
  }
}

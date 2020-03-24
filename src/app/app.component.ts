import { Component } from '@angular/core';
import { AngularFireList,AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private firebase: AngularFireDatabase) { }
  NameList: AngularFireList<any>;

  title = 'Firebase Demo';
}

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
  showDeletedMessage: boolean;
  NameArray: any;
  submitted: boolean;
  showSuccessMessage: boolean;

  form = new FormGroup({
    $key: new FormControl(null),
    AddName: new FormControl('',Validators.required)
  });

  ngOnInit() {
    this.getName().subscribe(
      list => {
        this.NameArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onSubmit()
  {
    this.submitted = true;

    if(this.form.valid)
    {
      if(this.form.get('$key').value == null)
      {
        this.insertName(this.form.value);
      }

      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.form.reset();

      this.form.setValue({
        $key: null,
        AddName: ''
      });
    }
  }

  onDelete($key) 
  {
    if (confirm('KarmaYoga : Are you sure to remove this Name ?')) 
    {
      this.deleteName($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  // To get the names from firebase.
  getName() {
    this.NameList = this.firebase.list('namelist');
    return this.NameList.snapshotChanges();
  }

  // To delete name from firebase.
  deleteName($key: any) {
    this.NameList.remove($key);
  }

  // To insert name into firebase.
  insertName(Name)
  {
    this.NameList.push({
      AddName: Name.AddName
    });
  }

  title = 'Firebase Demo';
}

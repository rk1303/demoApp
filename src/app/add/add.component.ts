import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { Router } from '@angular/router';
import { Students } from '../students';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
     private _studentService: StudentsService,
     private router: Router
     ) {

   }
addForm: FormGroup;
  ngOnInit() {

    this.addForm = this.formbuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.maxLength(30)]]
    });
 }
onSubmit() {
  //console.log(this.addForm.value);
  this._studentService.createStudent(this.addForm.value)
  .subscribe(data => {
    console.log(data)
    this.router.navigate(['view']);
  })  
}
}

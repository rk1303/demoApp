import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Students } from '../students';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private _studentService: StudentsService,
    private router: Router,
    private routes: ActivatedRoute
    ) {
  }
  addForm: FormGroup;
  
  ngOnInit() {
    const routeParams = this.routes.snapshot.params;

    //console.log(routeParams.id)

    this._studentService.getById(routeParams.id)
    .subscribe((data: any) => {
      //console.log(data)
      this.addForm.patchValue(data);
    });

    this.addForm = this.formbuilder.group({
      _id: [''],
      first_name: ['', Validators.required],
      last_name: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.maxLength(30)]]
    });
 }
 update(){
   //console.log(this.addForm.value);
   this._studentService.updateStudent(this.addForm.value).subscribe(() => {
     this.router.navigate(['view']);
   },
    error => {
      alert(error);
    });
 }
}

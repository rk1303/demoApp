import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from './students';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get<Students[]>('http://localhost:4000/user');
  }
  deleteStudents(ids: any){
     
    return this.http.get<Students[]>('http://localhost:4000/user/delete/' +ids);
  }

 createStudent(users: Students){
   return this.http.post('http://localhost:4000/user/add', users);
 } 

 getById(id: any){
  return this.http.get<Students[]>('http://localhost:4000/user/edit/' +id);

 }
 updateStudent(student: Students){

   return this.http.post('http://localhost:4000/user/update/' + student._id , student);
 }
}

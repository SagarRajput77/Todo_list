import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../serviceFolder/subject.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {

  // reactive form name
  todoForm:any = FormGroup;

  constructor(private fb:FormBuilder,private router:Router, private http:HttpClient, private ser:SubjectService){

    // Reactive form varaible declaration.
    this.todoForm = this.fb.group({
      taskName:[''],
      status:['select']
    });
    this.petchV();
  }

  Id_edit:any;
  showflag:boolean = false;
  todoStatus:any = ['Completed','Pending','not-completed'];

  petchV(){
  
    this.ser.get().subscribe((res:any)=>{
      
      if(res.length == undefined){
        this.showflag = true;
      }
      this.Id_edit = res.id;      
      this.todoForm.patchValue({
        taskName:res.taskName,
        status:res.status
        
       })
       
    })    
    
  }

  onSave(data:any){
    console.log(this.todoForm.value);

    this.http.post("http://localhost:3000/data",data).subscribe(res=>console.log(res));

    this.router.navigateByUrl('todoList');

  }



  onUpdate(data:any){
    this.http.put("http://localhost:3000/data/"+this.Id_edit,data).subscribe(res=>console.log(res));
    
    this.todoForm.reset();
    this.showflag = false
  }




}

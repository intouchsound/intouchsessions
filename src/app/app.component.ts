import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

type Tab = 'SESSION' | 'COOPERATION' | 'PRESS';

@Component({
  selector:'app-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent{
  @ViewChild('modal') modalRef!:ElementRef<HTMLDialogElement>;

  tab:Tab='SESSION';
  busy=false;
  ok=false;

  constructor(private fb:FormBuilder,private http:HttpClient){}

  form=this.fb.group({
    formType:['SESSION'],
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    phone:[''],
    message:[''],
    artistName:[''],
    socialLinks:[''],
    previousSets:['']
  });

  switch(t:Tab){this.tab=t;this.form.patchValue({formType:t})}

  openModal(){
    const dlg=this.modalRef.nativeElement;
    dlg.classList.remove('hide');
    dlg.showModal();
  }
  closeModal(){
    const dlg=this.modalRef.nativeElement;
    dlg.close();
    dlg.classList.add('hide');
  }

  submit(){
    if(this.form.invalid)return;
    this.busy=true;
    this.http.post('/api/submit-form',this.form.value).subscribe({
      next:()=>{this.ok=true;this.form.reset();this.busy=false;this.closeModal();},
      error:err=>{alert(err.error?.error||'Submit failed');this.busy=false;}
    });
  }
}

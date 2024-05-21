import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent {

validateForm:FormGroup;

isSpinning: boolean;
  constructor(private service: AuthService, 
    private fb: FormBuilder,         private snackBar: MatSnackBar

   ){}
   confirmationValidator =(control:FormControl):{
    [s:string]:boolean } =>{
      if(!control.value){
        return{required:true};
      } else if (control.value!== this.validateForm.controls['password'].value){
        return{confirm:true,error:true}
      }
  return {};
   }
   ngOnInit(){
    this.validateForm=this.fb.group({
      email:["",Validators.required, Validators.email],
      password:["",Validators.required],
      checkPassword:["",[Validators.required,this.confirmationValidator]],
  
      name:["",Validators.required],
  
      
    })
  }

  register() {
    this.service.signup(this.validateForm.value).subscribe({
      next: (res) => {
          if (res.id != null) {
              this.snackBar.open("Success: You're registered successfully", "Close", {
                  duration: 5000,
                  panelClass: ['snackbar-success']
              });
          } else {
              this.snackBar.open("Error: Something went wrong", "Close", {
                  duration: 5000,
                  panelClass: ['snackbar-error']
              });
          }
      },
      error: (error) => {
          this.snackBar.open("Error: Something went wrong", "Close", {
              duration: 5000,
              panelClass: ['snackbar-error']
          });
      },
      complete: () => {
          console.log("Observable completed");
      }
  });
}}
import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Patienten-Kontaktdaten';
  addButton: boolean;
  updateButton: boolean;
  emailValidator: boolean;
  userObj = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    insurance: "",
    email: "",
    phoneNumber: "",
    address: "",
    id : null
  }

  constructor(private commonService: CommonService) { 
    this.addButton = true;
    this.updateButton = false;
    this.emailValidator = true;
  }
 
  addUser(patientForm: { value: any; }) {
    console.log(patientForm.value)

    let obj = patientForm.value;

    this.commonService.createUser(obj).subscribe
      (response => {
        console.log("User added sucessfully");
        this.userObj.email="";
        this.commonService.informChild()
      });
  }

  receiveUser(user: any) {
    console.log(user);
    this.updateButton = true;
    this.addButton = false;
    this.userObj = Object.assign({}, user);

  }

  updateUser(patientForm: { value: any; }) {
    this.commonService.updateUser(this.userObj).subscribe(() => {
      console.log("USer updated");
      this.commonService.informChild();

    });
    console.log(patientForm.value);

  }
  
  checkEmail(){
      this.commonService.checkEmail(this.userObj.email).subscribe((response)=>{
        if(response.message == "EMAIL_EXIST"){
          this.emailValidator = false;
        }
        else{
          this.emailValidator = true;
        }
      });
  }

  reset(){
    this.addButton = true;
    this.updateButton = false;
    this.userObj = {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      insurance: "",
      email: "",
      phoneNumber: "",
      address: "",
      id : null
    }
  }
}


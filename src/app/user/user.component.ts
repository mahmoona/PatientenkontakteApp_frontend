import { Component, OnInit, Output } from '@angular/core';
import { CommonService } from '../common.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  allUsers: any;
  userObj = {
    search: "",
  }
  p: number = 1;
  @Output() sendToParent = new EventEmitter();

  constructor(private commonService: CommonService) {
  
  }


  ngOnInit(): void {
    this.commonService.userAdded.subscribe(response => {
      console.log("User added sucessfully from P2C")
      this.getLastestUsers();
    })
    this.getLastestUsers();
  }

  getLastestUsers() {
    this.commonService.getLatestUsers().subscribe(response => {
      console.log(response)
      this.allUsers = response;
    });
  }
  editUser(user: any) {
    this.sendToParent.emit(user)
    console.log(user);

  }

  deleteUser(user: any) {
    this.commonService.deleteUser(user).subscribe(response => {
      if(response.message == "PATIENT_REMOVED_SUCCESSFULLY"){
        console.log(response);
        this.getLastestUsers();
      }
    })

  }

  getUsersByName(){
    if(this.userObj.search != ""){
    this.commonService.findPatient(this.userObj.search).subscribe(response => {
      console.log(response)
      this.allUsers = response;
    });
  }
  else{
    this.getLastestUsers();
  }
  }
}

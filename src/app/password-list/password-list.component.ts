import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../_services/password-manager.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {

  formState: string = "Add New";

  siteId !: string;
  siteName !: string;
  siteUrl !: string;
  siteImageUrl !: string;

  passwordList !: Observable<Array<any>>;
  
  pwdEmail !: string;
  pwdUsername !: string;
  pwdPassword !: string;
  pwdId !: string;

  constructor(private route: ActivatedRoute, 
    private passwordManagerService: PasswordManagerService,
    private toastr: ToastrService) 
    {
      this.route.queryParams.subscribe((val: any) => {
        this.siteId = val.id;
        this.siteName = val.siteName;
        this.siteUrl = val.siteUrl;
        this.siteImageUrl = val.siteImageUrl;
      });

      this.loadPasswords();
  }

  resetForm() {
    this.pwdEmail = '';
    this.pwdUsername = '';
    this.pwdPassword = '';
    this.formState = 'Add New';
    this.pwdId = '';
  }

  onSubmit(values: object) {
    // Save new document to Firestore DB
    if(this.formState == "Add New") {
    this.passwordManagerService.addPassword(values, this.siteId)
      .then(() => {
        this.toastr.success('Password Saved Successfully!', 'SUCCESS', {
          timeOut: 5000,
          positionClass: 'toast-top-right'
        } );
        this.resetForm();
      })
      .catch(err => {
        this.toastr.error(err.error, 'ERROR!', {
          timeOut: 5000,
          positionClass: 'toast-top-right'
        } );
      });
    }
    else if(this.formState == "Edit") {
      // Update existing document in Firestore DB
      this.passwordManagerService.updatePassword(this.siteId, this.pwdId, values)
      .then(() => {
        this.toastr.success('Data Updated', 'SUCCESS', {
          timeOut: 5000,
          positionClass: 'toast-top-right'
        } );
        this.resetForm();
      })
      .catch(err => {
        this.toastr.error(err.error, 'ERROR!', {
          timeOut: 5000,
          positionClass: 'toast-top-right'
        } );
      });
    }   
  }

  loadPasswords() {
    this.passwordList = this.passwordManagerService.loadPasswords(this.siteId);
  }

  editPassword(email: string, username: string, password: string, id: string) {
    this.pwdEmail = email;
    this.pwdUsername = username;
    this.pwdPassword = password;
    this.pwdId = id;

    this.formState = "Edit";
  }

  deletePassword(id: string) {
    this.passwordManagerService.deletePassword(this.siteId, id)
    .then(() => {
      this.toastr.success('Data Deleted', 'SUCCESS', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      } );
    })
    .catch(err => {
      this.toastr.error(err.error, 'ERROR!', {
        timeOut: 5000,
        positionClass: 'toast-top-right'
      } );
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../_services/password-manager.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {

  allSites !: Observable<Array<any>>;

  siteName !: string;
  siteUrl !: string;
  siteImageUrl !: string;
  id !: string;

  formState: string = "Add New";

  constructor(private passwordManagerService: PasswordManagerService, private toastr: ToastrService) {
    this.loadSites();
  }

  resetForm() {
    this.siteName = '';
    this.siteUrl = '';
    this.siteImageUrl = '';
    this.formState = 'Add New';
    this.id = '';
  }

  onSubmit(values: object) {
    // console.log(values);

    // Save new document to Firestore DB
    if(this.formState == "Add New") {
      this.passwordManagerService.addSite(values)
      .then(() => {
        this.toastr.success('Data Saved Successfully!', 'SUCCESS', {
          timeOut: 5000,
          positionClass: 'toast-top-right'
        } );
        this.loadSites();
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
      this.passwordManagerService.updateSite(this.id, values)
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

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(siteName: string, siteUrl: string, siteImageUrl: string, id: string) {
    this.id = id;
    this.siteName = siteName;
    this.siteUrl = siteUrl;
    this.siteImageUrl = siteImageUrl;

    this.formState = "Edit";
  }

  deleteSite(id: string) {
    this.passwordManagerService.deleteSite(id)
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

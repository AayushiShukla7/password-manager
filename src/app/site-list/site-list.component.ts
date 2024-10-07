import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../_services/password-manager.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AsyncPipe
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

  constructor(private passwordManagerService: PasswordManagerService) {
    this.loadSites();
  }

  onSubmit(values: object) {
    // console.log(values);

    // Save new document to Firestore DB
    if(this.formState == "Add New") {
      this.passwordManagerService.addSite(values)
      .then(() => {
        console.log('Data Saved Successfully');
        this.loadSites();
      })
      .catch(err => {
        console.log(err);
      });
    }
    else if(this.formState == "Edit") {
      // Update existing document in Firestore DB
      this.passwordManagerService.updateSite(this.id, values)
      .then(() => {
        console.log('Data Updated');
      })
      .catch(err => {
        console.log(err);
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
}

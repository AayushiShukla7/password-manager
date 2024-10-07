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
  siteId !: string;

  constructor(private passwordManagerService: PasswordManagerService) {
    this.loadSites();
  }

  onSubmit(values: object) {
    this.passwordManagerService.addSite(values)
      .then(() => {
        console.log('Data Saved Successfully');
        this.loadSites();
      })
      .catch(err => {
        console.log(err);
      });
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(siteName: string, siteUrl: string, siteImageUrl: string, siteId: string) {
    this.siteId = siteId;
    this.siteName = siteName;
    this.siteUrl = siteUrl;
    this.siteImageUrl = siteImageUrl;
  }
}

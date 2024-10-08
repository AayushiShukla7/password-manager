import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    SiteListComponent,
    //BrowserAnimationsModule, // required animations module
    ToastrModule, // ToastrModule added
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'password-manager';
}

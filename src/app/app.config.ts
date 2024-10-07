import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({"projectId":"password-manager-ce0a5","appId":"1:923054135502:web:550ee0193dca3fce13189f","storageBucket":"password-manager-ce0a5.appspot.com","apiKey":"AIzaSyDqmWecEmDJHpbz9jo92hwC6_9mIBjXcKQ","authDomain":"password-manager-ce0a5.firebaseapp.com","messagingSenderId":"923054135502"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ]
};

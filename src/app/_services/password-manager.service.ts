import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore) { }

  addSite(data: object) {
    // Create Firestore DB Instance (collection)
    const dbInstance = collection(this.firestore, 'sites');

    // Add the new data to the collection => To Firestore DB
    return addDoc(dbInstance, data);
  }

  loadSites() {
    const dbInstance = collection(this.firestore, 'sites');

    return collectionData(dbInstance, { idField: 'id'});
  }

}
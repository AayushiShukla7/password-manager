import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore) { }

  /* SITE QUERIES */

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

  updateSite(id: string, data: object) {
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);
  }

  deleteSite(id: string) {
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }

  /* PASSWORD QUERIES */

  addPassword(data: object, id: string) {
    const dbInstance = collection(this.firestore, `sites/${id}/passwords`); // Sub-Collection Path
    return addDoc(dbInstance, data);
  }

  loadPasswords(id: string) {
    const dbInstance = collection(this.firestore, `sites/${id}/passwords`);
    return collectionData(dbInstance, { idField: 'id'});
  }

  updatePassword(siteId: string, passwordId: string, data: object) {
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passwordId);
    return updateDoc(docInstance, data);
  }

  deletePassword(siteId: string, passwordId: string) {
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, passwordId);
    return deleteDoc(docInstance);
  }

}

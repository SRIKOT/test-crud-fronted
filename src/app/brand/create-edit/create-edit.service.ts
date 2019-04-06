import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Person } from '../../shared/app.model';

import { FunctionSetting } from '../../shared/functionSetting';

@Injectable({
  providedIn: 'root'
})
export class CreateEditService {
  constructor(
    private http: HttpClient,
    private functionSetting: FunctionSetting
  ) { }

  CU(image: any, data: Person) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('data', JSON.stringify(data));
    return this.http.post(`${this.functionSetting.API}/person`, formData);
  }

  // createPerson(data: Person) {
  //   return this.firestore.collection('person').add(data);
  // }

  // updatePerson(data: Person) {
  //   delete data.id;
  //   this.firestore.doc('person/' + data.id).update(data);
  // }

  // deletePerson(id: string) {
  //   this.firestore.doc('person/' + id).delete();
  // }
}

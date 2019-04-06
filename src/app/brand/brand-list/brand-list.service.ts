import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Person, PersonPagination } from '../../shared/app.model';

import { Subscription, Observable } from 'rxjs';

import { FunctionSetting } from '../../shared/functionSetting';

@Injectable({
  providedIn: 'root'
})
export class BrandListService {
  constructor(
    private http: HttpClient,
    private functionSetting: FunctionSetting
  ) { }

  getPersons(): Observable<PersonPagination> {
    return this.http.get<PersonPagination>(`${this.functionSetting.API}person`);
  }

  delete(id: number) {
    return this.http.delete(`${this.functionSetting.API}person/${id}`);
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

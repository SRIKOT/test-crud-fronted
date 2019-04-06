import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Person } from '../../shared/app.model';

import { FunctionSetting } from '../../shared/functionSetting';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(
    private http: HttpClient,
    private functionSetting: FunctionSetting
  ) { }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.functionSetting.API}person/${id}`);
  }
}

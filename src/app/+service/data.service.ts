import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  eliteDomainEntities = ["Customer", "Salesrep", "CallLog","Contract","Contact","Group","Item","Jobsite","Operator","Store","Task"]

  constructor(
    private http: HttpClient
  ) { }

  getEliteData(): Observable<any[]> {
    let apiCalls: Observable<any>[] = []
    this.eliteDomainEntities.forEach(
      (entity: string) => apiCalls.push(this.http.get('assets/elite/' + entity + '.data.json'))
    )

    return forkJoin(apiCalls).pipe(
      map((entities) => entities.map(e => { return {key: e.ModelType, value: e}}))
    )
  }

  getEliteSummaryTemplate(model: string): Observable<any> {
    return this.http.get('assets/elite/' + model + '.SummaryTemplate.json')
  }

}
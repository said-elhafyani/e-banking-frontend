import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";

// services declare in providers in app.module.ts but her we use @Injectable to declare service and provide in root level

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  backendHost = 'http://localhost:8085';
  constructor(private http:HttpClient) { }

  public getCustomers(): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendHost+'/customers'); // return observable of customers
  }

  public searchCustomers(name : String): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendHost+'/customers/search?name='+name); // return observable of customers
  }

  public saveCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.backendHost+'/customers', customer); // return observable of customer
  }

  public deleteCustomer(id: number): Observable<any>{
    return this.http.delete(this.backendHost+'/customers/'+id); // return observable of customer
  }
}

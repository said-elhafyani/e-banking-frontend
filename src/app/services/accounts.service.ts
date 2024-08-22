import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  backendHost = 'http://localhost:8085';

  constructor(private http : HttpClient) { }

  public getAccount(accountId: string, page: number, size: number):Observable<AccountDetails> {
    return this.http.get<AccountDetails>(this.backendHost+`/accounts/${accountId}/pageOperations?page=${page}&size=${size}`);
  }
  public debitAccount(accountId: string, amount: number, description: string):Observable<AccountDetails> {
    // {accountId,amount,description} comme les attributes de object DebitDTO dans le backend
    let data = {accountId:accountId,amount:amount,description:description};
    return this.http.post<AccountDetails>(this.backendHost+`/accounts/debit`,data);
  }
  public creditAccount(accountId: string, amount: number, description: string):Observable<AccountDetails> {
    let data = {accountId,amount,description};
    return this.http.post<AccountDetails>(this.backendHost+`/accounts/credits`,data);
  }
  public transferAccount(accountId: string, accountDestination: string, amount: number, description: string):Observable<AccountDetails> {
    let data = {accountSource:accountId,accountDestination,amount,description};
    return this.http.post<AccountDetails>(this.backendHost+`/accounts/transfer`,data);
  }
}

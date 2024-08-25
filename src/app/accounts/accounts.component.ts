import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent  implements OnInit{

  accountFormGroup!: FormGroup;
  operationsFormGroup!: FormGroup;
  currentPage : number = 0;
  pageSize : number = 5;
  accountObservable$! : Observable<AccountDetails>; // $ is a convention to indicate that accountObservable is an Observable
  errorMessage! : string ;

  constructor(private formBuilder: FormBuilder,private accountService:AccountsService,public authService:AuthService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.formBuilder.group({
      accountId: this.formBuilder.control(''),
    });

    this.operationsFormGroup = this.formBuilder.group({
      amount: this.formBuilder.control(0),
      operationType: this.formBuilder.control(null),
      description: this.formBuilder.control(null),
      accountDestination: this.formBuilder.control(null)

    });

  }

  handleSearchAccount() {
    let accountId : string= this.accountFormGroup.value.accountId;
    this.accountObservable$ = this.accountService.getAccount(accountId,this.currentPage,this.pageSize).pipe(
      catchError((error) => {
        this.errorMessage = error.error.message;
        console.log('Error during account search',error);
        return throwError(error);
      }
    ));

  }

  handlePageChange(page: any | number) {
      this.currentPage = page;
      this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId : string= this.accountFormGroup.value.accountId;
    let amount : number = this.operationsFormGroup.value.amount;
    let operationType : string = this.operationsFormGroup.value.operationType;
    let description : string = this.operationsFormGroup.value.description;

    if(operationType === 'DEBIT') {
       this.accountService.debitAccount(accountId,amount,description).subscribe({
        next: (data) => {
          alert('Debit operation done successfully');
          this.operationsFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (error) => {
          alert('Error during debit operation');
        }
      });
    }else if(operationType === 'CREDIT') {
       this.accountService.creditAccount(accountId,amount,description).subscribe({
        next: (data) => {
          alert('Credit operation done successfully');
          this.operationsFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (error) => {
          alert('Error during Credit operation');
        }
      });
    }else if(operationType === 'TRANSFER') {
      let accountDestination : string = this.operationsFormGroup.value.accountDestination;
      this.accountService.transferAccount(accountId,accountDestination,amount,description).subscribe({
        next: (data) => {
          alert('Transfer operation done successfully');
          this.operationsFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (error) => {
          alert('Error during Transfer operation');
        }
      });
    }



  }
}

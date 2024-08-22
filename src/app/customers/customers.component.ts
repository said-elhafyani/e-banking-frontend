import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  errorMessage! : String;
  customers : Array<Customer> = [];
  searchFormGroup! : FormGroup

  constructor(private customerService : CustomerService,private formBuilder: FormBuilder,private router : Router) {
  }

  ngOnInit(): void {

    this.customerService.getCustomers().subscribe({
      next: (data ) => {
        this.customers = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    })
    /* on peut faire la meme chose avec le code suivant
     on declare une variable customers! : Observable<any>
     et dans ngOnInit on fait
      this.customers = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      }
      et dans html on fait
        <div *ngFor="let customer of customers | async ">
     */


    this.searchFormGroup = this.formBuilder.group({
      name : this.formBuilder.control('')
    });

  }

  handleSearchCustomer() {
    let name = this.searchFormGroup.value.name;
    this.customerService.searchCustomers(name).subscribe({
      next: (data ) => {
        this.customers = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    })

  }

  handleDeleteCustomer(customer: Customer) {
    let confirmDelete = confirm('Are you sure you want to delete this customer?');
    if(!confirmDelete){
      return;
    }
    this.customerService.deleteCustomer(customer.id).subscribe({
      next: (data ) => {
        this.customers = this.customers.filter(c => c.id !== customer.id);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }

    });
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id, {state: {customer: customer}});
  }
}

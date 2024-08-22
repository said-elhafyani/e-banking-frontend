

ng server   
npm install bootstrap --save
npm install bootstrap-icons --save
ng g c navbar  
ng g c customers
ng g c accounts
configuring routing in app-routing.module.ts
add routerLink ="/accounts" ..... in navbar.component.html
add <router-outlet></router-outlet> in app.component.html for show the components in the router-outlet
import HttpClientModule in app.module.ts for communicate with backend 
create a service class (customers.service.ts) by command ng g s services/customer and inject it in the constructor of the component class (customers.component.ts) 
inject HttpClient in the constructor of the service class (customers.service.ts) and create a method getCustomers() to get the data from the backend
declare variable customers and fill it with the data from the backend and show it in the html file (customers.component.html)
create a model class (customer.ts) to map the data from the backend
authorize the backend to communicate with the frontend by adding @CrossOrigin(origins = "http://localhost:4200") in the controller class (Cross-Origin Resource Sharing (CORS))
Add search functionality in the customers.component.ts by steps below:
   import ReactiveFormsModule (for create the reactive form ) in app.module.ts
   create a variable searchFormGroup of type FormGroup in the customers.component.ts
   inject FormBuilder in the constructor of the component class (customers.component.ts)
   initialize the searchFormGroup in the ngOnInit() method and add the formControlName in the input field in the customers.component.html and do the binding with the searchFormGroup
   create a method searchCustomers() in the customers.component.ts
    



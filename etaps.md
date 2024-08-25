

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


Etaps Security :
ng g c login
ng g s services/auth
et dans le fichier login.component.html on va ajouter un formulaire avec un input pour le username et un input pour le password et un bouton pour envoyer le formulaire
et dans le fichier login.component.ts on va injecter le service AuthService et creer une methode login() qui va appeler la methode login() du service AuthService
et dans le service AuthService on va injecter HttpClient et creer une methode login() qui va envoyer une requete POST avec le username et le password dans le body et le serveur va retourner un token jwt
et dans le fichier app-routing.module.ts on va ajouter une route pour le composant LoginComponent
apres ca on va stocker les infos de utilisateur dans auth.service.ts a partire de jwt recu par la method login
et on va installer une librerer  angular-jwt pour decoder le token jwt et extraire les infos de l'utilisateur (npm install angular-jwt --save)
et on va generer un component pour admin  ng g c admin-template et en change les routes dans app-routing.module.ts pour que le composant AdminTemplateComponent soit accessible seulement pour les utilisateurs qui ont le role ADMIN
on va generer une interceptor pour ajouter le token jwt dans le header de chaque requete envoyé par le frontend ( ng g interceptor interceptors/app-http)
proteger les routes par les guards  (ng g g guards/authentication)  et (ng g g guards/authorization)
utiliser local storage pour stocker le token jwt (pour ne pas perdre le token jwt apres le refresh de la page ou le fermeture du navigateur) il est stocké dans le local storage du navigateur (application local storage dans le navigateur)





    



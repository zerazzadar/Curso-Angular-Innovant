// *********************************************************************
// ******************** ANGULAR GENERAL INNOVANT **************************
// *********************************************************************
========================================================================


--------------------------------------------
:NgModules en el modulo:
--------------------------------------------
@NgModule({
 declarations: [          // *1
   AppComponent
 ],
 imports: [                // *2
   BrowserModule
 ],
 providers: [],            // *3
 bootstrap: [AppComponent] // *4
})


*1 se declaran los componentes, directivas o pipes que son creados para usar aqui en el modulo.
  Estos componentes se ven entre ellos y son privados, no se ven desde otro modulo
*2 hace que las declaraciones exportadas de otros módulos estén disponibles en el módulo actual
*3 Declarar Servicios (en los share modules no se deben poner)
*4 esto no es el angular de css, solo hace referencia al componente root,
   mas nada, el primer componente que se va a ejecutar en nuestra aplicacion
   .Esta propiedad solo se pone en el modulo principal (generalmente AppModule) de todo el proyecto
*5 Tambien existen los exports, para para exportar modulos para usarlos en otros modulos que usen el presente

--------------------------------------------
:Metodos de componente:
--------------------------------------------
ngOninit : cuando inicia el componente
ngOnChanges: cuando se produce un cambio en el componente
ngOnDestroy: cuando se acaba el ciclo de vida del componente, por ejemplo unscribe un observer

para invocarlos es sencillo

ej, en el ts:
import { OnInit,OnDestroy } from '@angular/core'; //se importan

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  ngOnInit(){  } //aqui se implemente oninit
  ngOnDestroy(){  } //aqui se implemente ondestroy
  title = 'primero';
}

--------------------------------------------
:Routing:
--------------------------------------------
Este es el ejemplo de un fichero app-routing.module, Recordar que debe estar importado en el app.module.ts

import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DetailsProductComponent } from './details-product/details-product.component';
import { Error404Component } from './error404/error404.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes=[
  {path:'',component:HomePageComponent},//componente que se cargara en la ruta raiz http://localhost:4200
  {path:'products',component:ProductsComponent},//si la ruta es http://localhost:4200/products
  {path:'products/:id',component:DetailsProductComponent},//si la ruta http://localhost:4200/products/55 (u otro id)
  {path:'**',component:Error404Component} //si no se encuentra ninguna de las rutas anteriores, se manda a la pagina de error
  /* esta ultima linea debe ser siempre la ultima, pues hace match con TODO y se supone que se captura si no
   se encuentra ninguna de las rutas anteriores. Si la pones delante de otra, el codigo se va a ir por ésta linea
   sin considerar las que vengan despues */
];

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule],
})
export class AppRoutingModule { }

/*RECORDAR QUE SI QUIERES QUE ESTO FUNCIONE, EN EL COMPONENTE QUE QUIERES QUE FUNCIONE (GENERALMENTE app.component.html)
SE DEBE PONER SOLAMENTE LA ETIQUETA <router-outlet></router-outlet>*/

--------------------------------------------
:Pasando parametros por ruta mediante link o hipervinculo:
--------------------------------------------
mas o menos es algo asi [routerLink]="['ruta_del_componente_al _cual_quieres_ir',parametro_que_pasas]
products/ es una ruta definida en el app-routing.module.ts y que lleva a un componente llamado en mi caso DetailsProductComponent

ej:
<h2><a [routerLink]="['products/',product.id]">{{product.name}}</a></h2>

El componente que recibe es DetailsProductComponent haremos que se vea el id que se recibe

[TS]
...
import { ActivatedRoute } from '@angular/router';
...
export class DetailsProductComponent implements OnInit {
  public numberid: string|null = ""; //variable que recibe el id
  constructor( private route:ActivatedRoute) {
    const productid=this.route.snapshot.paramMap.get('id');
    this.numberid=productid; //pintando el id
   }
  ngOnInit(): void {}
}

[HTML]
<span >el id es {{numberid}} </span>

===================================================
// *********************************************************************
// ************************** ANGULAR 8 ********************************
// *********************************************************************
===================================================
:DESCARGAR ANGULAR (SE DEBE TENER NODE INSTALADO):
===================================================
npm install -g @angular/cli

:CREAR NUEVO PROYECTO:
===================================================
- ng new DattingApp-SPA
- cuando te pregunte de routing le dices que no porque tratamos las rutas aparte]
- Si usas boostrap selecciona CSS en el menu

  RECUERDA QUE:
  -------------
 -Las dependencias del proyecto se guardan en package.json

:CORRER PROYECTO:
===================================================
ng serve

:CREAR UN COMPONENTE
===================================================
Dentro de la carpeta "app" das click derecho (esto con vscode) y maraca "Generate Component"
Establece el nombre y da enter (yo le puse value)
Veras que se te crea una carpeta con 4 archivos

- value.component.css
- value.component.html
- value.component.ts
- value.component.spec.ts

Si el css es un scss cambiale la extencion a css y en el value.component.ts cambia la referencia de fichero scss al css

===================================================
:HACER QUE LA APLICACION ESCUCHE POR HTTP:
===================================================
 1 -IMPORTAR LAS DEPENDENCIAS EN EL APP.MODULE.TS
    --en la cabecera--
    ...
    import { HttpClientModule } from '@angular/common/http';
    ...

    --dentro del @NgModule--
    ...
    imports: [
        ...,
        HttpClientModule // este es el componente de escucha por http
    ],
    ...

//  2- EN EL VALUE.COMPONENT.TS (.TS DEL COMPONENTE QUE ESTAS DESARROLLANDO)) QUE VA A HACER LA ESCUCHA

    --en la cabecera--
    ...
    import { HttpClient } from '@angular/common/http';
    ...

    --debajo de la linea "export class ..." adaptaras el constructor de la siguiente forma--

      constructor(private http: HttpClient) { }
      values: any;        // variable que recoje lo que retorna la llamada http

      ngOnInit() {
        this.getvalues(); // llamamos al metodo que hace la escucha, (se implementa abajo)
      }

      --IMPLEMENTAMOS EL METODO QUE HACE LA ESCUCHA
      getvalues() {

        this.http.get('http://localhost:5000/api/values').subscribe(response => {  //observar que this.http esta declarado dentro del constructor, y aun asi se ve en todo el ambito
        this.values = response; //metemos en values el contenido de la llamada http
        }, error => {
          console.log(error);
        });
      }

      --SI HICIERAS UNA FUNCION QUE NO RETORNA NADA, SOLO INSERTA SE DECLARA ASI

          register(){
            this.authService.register(this.model).subscribe(() => { //FIJATE QUE SE ELIMINO EL response
              console.log('registrtation sucessfull')
            }), error => {
          console.log(error);
            }
          }


    }

3- Buscas el archivo app.component.html, que es el componente principal y una plantilla al mismo tiempo,
   borras todo su contenido generico y puedes aqui meter el componente tuyo

        <app-value></app-value>

PARA EVITAR EL PROBLEMA O ERROR "has been blocked by CORS policy: No 'Access-Control-Allow-Origin":
ver en 2-NetCore.txt

===================================================
:INSTALANDO BOOTSTRAP (Y FONTAWESOME):
===================================================
 npm install bootstrap font-awesome
-En styles.css pones:
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import '../node_modules/font-awesome/css/font-awesome.min.css'


:AGREGAR CSS Y JS AL PROYECTO DE ANGULAR:
===================================================
En angular.json:
"styles": [
              "src/styles.css",
              //<=PUEDES AGREGAR AQUI MAS CSS
            ],
            "scripts": []//<=PUEDES AGREGAR AQUI JS
===================================================
DIRECTIVAS ANGULAR
===================================================
*: los que tienen asterisco son los que hacen cambios en el DOM


  CICLO: values es un listado de tipo una clase que tiene id y nombre
  -------------------------------------------------------------------
    <p *ngFor="let value of values">
      {{value.id}},{{value.name}}
    </p>

  IF: Si se cumple la condicion entonces se muestra
    <div *ngIf="loggedIn()">div</div>

 (): los que estan encerrados en parentesis son eventos
 -------------------------------------------------------
  (click)="logout()"
  (ngSubmit)="login()"

 []: los que estan encerrados en corchetes son propiedades
 ----------------------------------------------------------
   [disabled]="!loginForm.valid"


===================================================
:FORMULARIO ANGULAR
===================================================
<form #loginForm="ngForm" class="form-inline">
      <input class="form-control mr-sm-2" type="text" placeholder="Username" >
      <input class="form-control mr-sm-2" type="password" placeholder="Password" >
      <button class="btn btn-info my-2 my-sm-0" type="submit">Login</button>
 </form>

 debes agregar en el app.module.ts:

 import { FormsModule } from '@angular/forms';
 ....

   imports: [
    ...
    FormsModule,
    ....
  ],

===================================================
:VALIDADORES
===================================================
  Tomando el formulario anterior
   ---------
   --- <form #loginForm="ngForm" class="form-inline" (ngSubmit)="login()">
   ---   <input class="form-control mr-sm-2" type="text" name="username" required placeholder="Username" [(ngModel)]="model.username" #username=ngModel>
   ---   <input class="form-control mr-sm-2" type="password" name="password" required placeholder="Password" [(ngModel)]="model.password"  #password=ngModel>
   ---   <button [disabled]="!loginForm.valid"  class="btn btn-info my-2 my-sm-0" type="submit">Login</button>
   --- </form>
   -------- (loginForm es el nombre que le pongo, no es una palabra reservada ni nada)

  Form Valid: {{loginForm.valid}}
  Form Touched:{{loginForm.touched}}
  Form Dirty: {{loginForm.dirty}}
  Form Values: {{loginForm.value |json}}

  Username Valid: {{username.valid}}
  Username Touched:{{username.touched}}
  Username Dirty: {{username.dirty}}

  notas:
  cuando vas a usar el tag "[(ngModel)]" tienes que poner obligatoriamente el "name"
  si quieres referenciar en la misma interfaz un objeto tienes que ponerle el "#", por ejemplo, declaras al form: #loginForm y
  de ahi en adelante lo puedes llamar {{loginForm}}

:SERVICIO
===================================================
Los servicios los crearas en una carpeta llamada _services dentro de src/app (VER ..\ARCHIVOS\ANGULAR\SERVICIOS\auth.service.ts)

-Recuerda poner en app.module.ts (mi servicio de ejemplo se llama "auth")

...
import { AuthService } from './_services/auth.service';
...
....
 providers: [
    AuthService
  ],
....

 Para consumir un servicio desde un componente:
 -----------------------------------------------
  Los servicios los crearas en una carpeta llamada _services dentro de src/app (VER ..\ARCHIVOS\ANGULAR\SERVICIOS\nav.component.ts)
=====================================
:COMUNICACION ENTRE COMPONENTES
=====================================


DE UN PADE A UN HIJO
-------------------------------
"register" es un componente que esta dentro de otro llamado "home".
El componente "home" tiene una variable llamada "values". De la
siguiente forma es como se la pasa a su hijo register:

 //--EN EL PADRE---
    ...
      <app-register [ValuesFromHome]="values"></app-register>
    ...
    //ValuesFromHome no es mas que el alias que va a tomar la variable para llegar al hijo (register)

 //--EN EL HIJO---
    //Por otra parte el hijo debe importar el valor. En su ts va esto:

    import { Component, Input, OnInit } from '@angular/core'; //se añadio en la primera linea Input para importar ValuesFromHome del componente padre
    ...
    export class RegisterComponent implements OnInit {
      @Input() ValuesFromHome:any  //ValuesFromHome es el valor del arreglo "values" que viene importado del padre de componente.
    ...
    //Ahora puedes crear tu html con un select por ejemplo con el listado que mando el padre

     ...
      <select  class="form-control" id="FavouriteValue">
        <option *ngFor="let valor of ValuesFromHome" [value]="valor.id">{{valor.name}}</option>  <!--los valores de este combo los trae del elemento padre (home) de este elemento -->
      </select>
     ...
     -------------------------------
DE UN HIJO A UN PADRE
-------------------------------
//--EN EL HIJO--- ts
  import { ...,Output,.... } from '@angular/core'; //se añadio en la primera linea Output para exportar la funcion-evento cancelRegister (se exportan eventos)
  ...
  export class RegisterComponent implements OnInit {
    @Output()  cancelRegister= new EventEmitter(); //cancelRegister la funcion-evento exportar al padre de este componente  (se exportan eventos)
  ...

  //asi se lanza el evento, en este caso lo llamo con la funcion mi_funcion_cancel,
    mi_funcion_cancel(){
      this.cancelRegister.emit(false); //cancelRegister retornara el valor 'false' en este caso, pero puede retornar cualquier cosa, el modelo, un objeto, etc.
      console.log('cancelado');
    }
//--EN EL PADRE---
  //en el html.
  //(cancelRegister) es la funcion que viene desde el hijo, cancelRegisterMode($event) es la funcion que se ejecutara en el padre  y captura el resultado del hijo
  <app-register [ValuesFromHome]="values" (cancelRegister)="cancelRegisterMode($event)"></app-register>
  //la funcion en el ts del padre se puede declarar asi
    cancelRegisterMode(pRegisterMode: boolean)
     {
       this.registerMode= pRegisterMode;
     }


// *********************************************************************
// ******************** ANGULAR 12 EEN 4 HORAS *************************
// *********************************************************************

--------------------------------------------
:Descargar ultima version nodejs:
--------------------------------------------
https://nodejs.org/es/

--------------------------------------------
:Instalar Angular CLI(tienes que tenener ):
--------------------------------------------
npm i -g @angular/cli

--------------------------------------------
:Saber version Angular CLI, node, npm:
--------------------------------------------
ng --version

--------------------------------------------
:CREAR UN NUEVO PROYECTO ANGULAR (ejemplo un proyecto de nombre store):
--------------------------------------------
ng new store

--------------------------------------------
:GENERAR NUEVO COMPONENTE:
:CREAR UN NUEVO COMPONENTE:
--------------------------------------------
ng generate component shared/component/header
ng g c nombre
--------------------------------------------
:DECLARAR Y CORRE UN SCRIPT:
--------------------------------------------
este ejemplo usa a json-server (instalado previamente con json-server npm i -g json-server) para crear una api falsa.
El comando para echar a andar esta dependencia es json-server --watch server/db.json --port 3000 pero la podemos resumir con un alias en package.json
ACLARACION: server/db.json es el json a partir del cual se va a alimentar la dependencia para publicar sus datos.

  "scripts": {
    ...
    "serverAPI": "json-server --watch server/db.json --port 3000"
    ...
  },

Ahora se puede invcar el script en la consola con:

 npm run serverAPI

--------------------------------------------
:INSTALANDO ANGULAR MATERIAL:
--------------------------------------------
ng add @angular/material

--------------------------------------------
:Generar un modulo:
--------------------------------------------
ng g m pages/products -m=app --route products

g => Generar
m => modulo
-m=app => inyectar detro del app.module.ts el modulo para ya tenerlo incluido
--route => ruta

--------------------------------------------
: CREAR UN SERVICIO :
--------------------------------------------
ng g service pages/products/services/products --skip-tests


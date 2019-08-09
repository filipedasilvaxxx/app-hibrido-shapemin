import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [

    {
      title: 'Cadastre sua Loja',
      url: '/cadastro-de-loja',
      icon: 'appstore'
    },
  
    {
      title: 'Cadastro de Produtos',
      url: '/cadastro-de-produto',
      icon: 'add-circle'
    },
  
    
  
    {
      title: 'IMC',
      url: '/imc',
      icon: 'stats'
    },
    
    {
      title: 'Sugestao',
      url: '/sujestao',
      icon: 'clipboard'
    },

    {
      title: 'Quem Somos',
      url: '/quem-somos',
      icon: 'people'
    },
    {
      title: '',
      url: '/modal-page-page',
      icon: ''
    },
    
  
  
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseauth : AngularFireAuth,
    private router : Router
    
  ) {
    this.initializeApp();
  }

  ngOnInit() {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.firebaseauth.authState
      .subscribe(
        user => {
          if (user) {
            this.router.navigate(['/home-cliente']);

            } else {
              this.router.navigate(['/home']);
            }
        },
        () => {
          this.router.navigate(['/home']);
        }
      );
  }  
    
}

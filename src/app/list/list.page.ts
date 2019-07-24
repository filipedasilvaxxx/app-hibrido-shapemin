import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NavController, MenuController, IonSlides } from '@ionic/angular';
import * as firebase from 'firebase';
import { Loja } from '../model/loja';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage {

  @ViewChild('email') email;
  @ViewChild('senha') senha;

  @ViewChild(IonSlides) slides: IonSlides;

  loja: Loja = new Loja();
  nome : string;
 
  passwordType : string = 'password';
  passwordShown : boolean = false;


  constructor(public router : Router,
              public navctrl : NavController,
              public fire : AngularFireAuth,
              public MenuC : MenuController,
              public toastController: ToastController){
  }

  ngOnInit(){
    this.MenuC.enable(false);
  }

  slideOpts = {
    initialSlide: 0,
    speed: 500
  };

  proximo(){
    this.slides.slideNext();
  }

  anterior(){
    this.slides.slidePrev();
  }

  logar(){
    this.fire.auth.signInWithEmailAndPassword(this.email.value,this.senha.value)
      .then(()=>{
        
        console.log('Logado com sucesso');
        this.presentToast();
        
      }).catch((error) => {
        console.log("Error getting document:", error);
        console.log('Login Inválido');
        this.presentToastError();
      });

      
        
      }

      
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Bem-vindo!',
      duration: 2000
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Login Inválido!',
      duration: 2000
    });
    toast.present();
  }

  

  async presentToastErrorCad() {
    const toast = await this.toastController.create({
      message: 'Dados Inválidos!',
      duration: 2000
    });
    toast.present();
  }

 

  cadastrar(){



    this.fire.auth.createUserWithEmailAndPassword(this.email.value,this.senha.value)
    .then(()=> {
      console.log("Cadastrado com sucesso!");
    }).catch(()=>{
      this.presentToastErrorCad();
    })

  }

    togglePassword(){
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    }else{
      this.passwordShown = true;
      this.passwordType = 'password';
    }
}


}


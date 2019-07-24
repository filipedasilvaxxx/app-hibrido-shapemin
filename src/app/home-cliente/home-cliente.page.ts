import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Loja } from '../model/loja';
import * as firebase from 'firebase';

import { Produto } from '../model/produto';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})
export class HomeClientePage implements OnInit {
  
  @ViewChild("textoBusca") textoBusca;

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  
  loja: Loja = new Loja();
  email : string;
  nome : string;
  listaPerfil : Loja[] = []; 
  imagem: string;

  produto: Produto = new Produto();

  listaDeProduto : Produto[] = [];

  id : string;

    constructor(public router : Router,
                private menu: MenuController,
                private firebaseauth : AngularFireAuth,
                public MenuC : MenuController,
                public toastController: ToastController,

                 ){
  
                  this.firebaseauth.authState.subscribe(obj=>{
                    this.id = this.firebaseauth.auth.currentUser.uid;
                    this.obterCliente();
                    
              
                  });


      
      
    }
    slideOptsOne = {
      initialSlide: 0,
      slidesPerView: 1,
      autoplay:true,
      speed: 1000,
     };
  

    slidesDidLoad(slides: IonSlides) {
      slides.startAutoplay();
    }

    
    ngOnInit(){
      this.MenuC.enable(true);
    }

    busca() {
      console.log(this.textoBusca.value)
  
      this.listaDeProduto = [];
      var ref = firebase.firestore().collection("produto");
      //ref.orderBy('nome').startAfter(this.textoBusca.value).get().then(doc=> {    
  
      if (this.textoBusca.value != "") {
        ref.orderBy('nome').startAfter(this.textoBusca.value).endAt(this.textoBusca.value + '\uf8ff').get().then(doc => {
  
          if (doc.size > 0) {
  
            doc.forEach(doc => {
  
              this.produto = new Produto();
              this.produto.setDados(doc.data());
              this.produto.id = doc.id;
              console.log(this.produto)
              
              let ref = firebase.storage().ref()
                .child(`produtos/${this.produto.id}.jpg`);
  
              ref.getDownloadURL().then(url => {
                this.imagem = url;
                
              }).catch(() =>{
  
              });
            
              console.log(this.produto);
            this.listaDeProduto.push(this.produto);
  
          })
  
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
  }
  
  }
    irCadastroLoja(){
      this.router.navigate(['/cadastro-de-loja']);
    }

    obterCliente() {
      var ref = firebase.firestore().collection("loja").doc(this.id);
      ref.get().then(doc => {
      this.loja.setDados(doc.data());
      console.log(doc.data());
      
      }).catch((error) => {
        console.log("Error getting document:", error);
      
  
      });
    }

  cadastrarLoja(){
    this.router.navigate(['/cadastro-de-loja']);
    }
  
  perfil(obj : Loja){
      this.router.navigate(['/loja-perfil', {'loja' : this.id}]);
    }

  logoff(){
    this.router.navigate(['/logoff']);
    this.presentToast();
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Você saiu.',
        duration: 2000
      });
      toast.present();
    }

    
  
            

  openFirst(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
    }


    bcaa(){
      this.router.navigate(['/bcaa']);
      }
    whey(){
      this.router.navigate(['/whey-list']);
    }
    creatina(){
      this.router.navigate(['/creatina-list']);
    }
    tribulus(){
      this.router.navigate(['/tribulus-list']);
    }
  
   imc(){
      this.router.navigate(['/imc']);
    }
   cadLoja(){
      this.router.navigate(['/cadastro-de-loja']);
    }
   cadProdutos(){
      this.router.navigate(['/cadastro-de-produto']);
    }
  

  Pesquisa(event) {

    var ref = firebase.firestore().collection("produto");
    ref.get().then(query => {
        query.forEach(doc => {
            let c = new Produto();
            c.setDados(doc.data());
            c.id = doc.id;
            this.listaDeProduto.push(c);
        });
       
    });
    
    return "listaDeProduto"
  }
  
  slides = [
    {
      img:'../assets/2.png',
      titulo:'Whey Protein Gold Standard',
    },
    {
      img:'../assets/3.png',
      titulo:'Visivel',
    },
    {
      img:'../assets/001.png',
      titulo:'Hi-Whey Protein',
    },
    
  
]



  
}

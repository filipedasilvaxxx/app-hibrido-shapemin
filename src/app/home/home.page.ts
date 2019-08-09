import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { Loja } from '../model/loja';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Produto } from '../model/produto';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild("textoBusca") textoBusca;

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  produto: Produto = new Produto();
  produtoMenor: Produto = new Produto();


  r: Produto = new Produto();

  id: string;
  img: string;

  loja: Loja = new Loja();
  email: string;

  lP: Produto = new Produto();
  produtos: Produto[] = [];
  pL: Produto[] = [];


  constructor(public router: Router,
    private menu: MenuController,
    private firebaseauth: AngularFireAuth,
    public activatedRoute: ActivatedRoute,
    public modalController: ModalController) {


  }



  ngOnInit() {

  }


  busca() {
    let menor = 0;
    let m = 0;

    console.log(this.textoBusca.value)

    // this.lP = [];
    var ref = firebase.firestore().collection("produto");
    //ref.orderBy('nome').startAfter(this.textoBusca.value).get().then(doc=> {    

    if (this.textoBusca.value != "") {
      ref.orderBy('nome').startAt(this.textoBusca.value).endAt(this.textoBusca.value + '\uf8ff').get().then(doc => {

        if (doc.size > 0) {

          doc.forEach(doc => {
            
            let r = new Produto();
            r.setDados(doc.data());
            r.id = doc.id;
            
            let ref = firebase.storage().ref().child(`produtos/${doc.id}.jpg`).getDownloadURL().then(url => {
              r.img = url;
            }).catch(err => {
              console.log(r);
            })   
            
            if (r.nomePrincipal != "") {
              
                
                if (parseFloat(r.preco) <= menor || menor <= 0) {                                
                  menor = parseFloat(r.preco)              
                  let ref = firebase.storage().ref().child(`produtos/${r.id}.jpg`).getDownloadURL().then(url => {
                    r.img = url;
                  }).catch(err => {
                    console.log(r.id);
                  })                   
                  // console.log(r.preco)                  
                  this.produtoMenor = r;
                  // console.log(this.produtoMenor)
                  
                                                                                                                               
                }
                if (parseFloat(r.preco) >= menor || menor == 0) { 
                  this.produtos.push(r);
                //   console.log(this.produtos)
                // console.log("IF 1")
                }  
              
                
            }else {
             
                if(parseFloat(r.preco) <= m || m <= 0) {
                  m = parseFloat(r.preco)
                  // console.log(m)
                  this.lP = r;
                  
                }
                if(parseFloat(r.preco) >= m || m >= 0){
                  this.pL.push(r);
                }
                                              
            }
         
         

            // console.log(doc.data())


          })



        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
    }

  }

  // dowloadImagem(){
  //   let ref = firebase.storage().ref()
  //   .child(`produtos/${this.produto.id}.jpg`);

  //   ref.getDownloadURL().then(url => {
  //     this.imagem = url;
  //   })
  // }
  // nomeIgual(){

  //   if(r.nome = r.nome){
  //     this.produtoIgual.push(r);
  //     console.log(this.produtoIgual)
  //   }
  // }

  cadastrarLoja() {
    this.router.navigate(['/cadastro-de-loja']);
  }

  bcaa() {
    this.router.navigate(['/bcaa']);
  }
  whey() {
    this.router.navigate(['/whey-list']);
  }
  creatina() {
    this.router.navigate(['/creatine-list']);
  }
  tribulus() {
    this.router.navigate(['/tribulus-list']);
  }

  logar() {
    this.router.navigate(['/list']);
  }

  logoff() {
    this.router.navigate(['/logoff']);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  CalculeSuaIMC() {
    this.router.navigate(['/imc']);

  }

  slides = [
    {
      img: '../assets/2.png',
      titulo: 'Whey Protein Gold Standard',
    },
    {
      img: '../assets/3.png',
      titulo: 'Visivel',
    },
    {
      img: '../assets/001.png',
      titulo: 'Hi-Whey Protein',
    },


  ]



  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 1000,
  };


  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }


  async presentModal() {
    this.router.navigate(['/modal-page']);
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: {
        'firstName': this.produtos,
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }





  // connectedCallback() {
  //   const modalElement = document.querySelector('ion-modal');
  //   console.log(modalElement.componentProps.firstName);


  // }



}

import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { Loja } from '../model/loja';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Produto } from '../model/produto';


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
  produtoIgual: Produto[] = [];

  r: Produto = new Produto();

  imagem: string;

  loja: Loja = new Loja();
  email: string;

  listaDeProduto: Produto[] = [];
  produtosIguais: Produto[] = [];

  listaPerfil: Loja[] = [];

  

  constructor(public router: Router,
    private menu: MenuController,
    private firebaseauth: AngularFireAuth,
    public activatedRoute: ActivatedRoute,
    public MenuC: MenuController) {


  }

  ngOnInit() {
    this.MenuC.enable(false);
  }

  busca() {
    let menor = 0.0;

    console.log(this.textoBusca.value)

    this.listaDeProduto = [];
    var ref = firebase.firestore().collection("produto");
    //ref.orderBy('nome').startAfter(this.textoBusca.value).get().then(doc=> {    

    if (this.textoBusca.value != "") {
      ref.orderBy('nome').startAt(this.textoBusca.value).endAt(this.textoBusca.value + '\uf8ff').get().then(doc => {

        if (doc.size > 0) {

          doc.forEach(doc => {

            let r = new Produto();
            r.setDados(doc.data());
            r.id = doc.id;
            
              if(r.nomePrincipal != ""){
                if(parseFloat(r.preco) <= menor || menor <= 0){
                menor = parseFloat(r.preco)
                this.produtoMenor = r;
                console.log(r.preco)
                console.log(this.produtoMenor.nome)
                console.log("IF 1")
                }
              }else{
               
                let ref = firebase.storage().ref().child(`produtos/${doc.id}.jpg`).getDownloadURL().then(url => {
                  r.img = url;
                }).catch(err => {
                })
                this.listaDeProduto.push(r);
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




}

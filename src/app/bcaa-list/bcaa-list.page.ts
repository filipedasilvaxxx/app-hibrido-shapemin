import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from '../model/produto';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Pedido } from '../model/pedido';
import { Item } from '../model/item';
import { StorageService } from '../servico/storage.service';

@Component({
  selector: 'app-bcaa-list',
  templateUrl: './bcaa-list.page.html',
  styleUrls: ['./bcaa-list.page.scss'],
})
export class BcaaListPage implements OnInit {
  @ViewChild("textoBusca") textoBusca;

  listaBcaa: Produto[] = [];

  listaProduto : Produto[] = [];
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};

  categoria : string;

  pedido : Pedido;

  constructor(public router : Router,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public storageServ : StorageService){
    
  }
  ngOnInit() {
  this.getList();
  }

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("produto");
    ref.get().then(query => {
        query.forEach(doc => {
            let c = new Produto();
            c.setDados(doc.data());
            c.id = doc.id;
            this.listaProduto.push(c);
        });
       
        this.loadingController.dismiss();
    });

  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

  busca(){
    console.log(this.textoBusca.value)
    
    this.listaBcaa = [];
      var ref = firebase.firestore().collection("produto");
      //ref.orderBy('nome').startAfter(this.textoBusca.value).get().then(doc=> {
      ref.orderBy('nome').startAfter(this.textoBusca.value).endAt(this.textoBusca.value+'\uf8ff').get().then(doc=> {

        if (doc.size>0 ) {
          
          doc.forEach(doc =>{

            let r = new Produto();
            r.setDados(doc.data());
            r.id = doc.id;
            
            if (r.categoria == "Bcaa") {
              console.log(r);
              
              let ref = firebase.storage().ref().child(`produtos/${doc.id}.jpg`).getDownloadURL().then(url => {
                r.img = url;
                this.listaBcaa.push(r)
     
              }).catch(err => {
                this.listaBcaa.push(r);
              })            
              
    
            }
            
             
             
              
          })
          
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      })
    
    //this.router.navigate(['/Produto', { 'filtro': "busca" }]);
  }

  obterCategoria() {
    var ref = firebase.firestore().collection("produto");
    ref.get().then(query => {
      query.forEach(doc => {

        let c = new Produto();
        c.setDados(doc.data());
        c.id = doc.id;

       

        console.log(c.id);
        

        if (c.categoria == "Bcaa") {
          console.log(c);
          
          let ref = firebase.storage().ref().child(`produtos/${doc.id}.jpg`).getDownloadURL().then(url => {
            c.img = url;
            this.listaBcaa.push(c)
 
          }).catch(err => {
            this.listaBcaa.push(c);
          })            
          

        }
     

      });

    });

  }

  addCarrinho(produto : Produto){
    this.pedido = this.storageServ.getCart();

    let add = true;

    let i = new Item();
    i.produto = produto;
    i.quantidade = 1;

    if(this.pedido==null){ // caso pedido esteja vazio
      this.pedido = new Pedido(); // cria um novo pedido
      this.pedido.itens = []; // cria a lista de itens
    }

    this.pedido.itens.forEach(p => {
       if(p.produto.id = produto.id){
         add = false;
       }
    });

    if(add=true) this.pedido.itens.push(i);
    this.storageServ.setCart(this.pedido);
      
  }

  
}

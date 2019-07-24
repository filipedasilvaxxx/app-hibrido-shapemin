import { Component, OnInit } from '@angular/core';
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

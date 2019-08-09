import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Produto } from '../model/produto';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActionSheetController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { Router } from '@angular/router';





@Component({
  selector: 'app-tribulus-list',
  templateUrl: './tribulus-list.page.html',
  styleUrls: ['./tribulus-list.page.scss'],
})
export class TribulusListPage implements OnInit {

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  produto: Produto = new Produto();

  nome : string = "";

  id : string;

  listaTribulus : Produto[] = [];

  
  constructor(public fire: AngularFireAuth,public actionSheetController: ActionSheetController,public modalController: ModalController,public router: Router) { 

    this.fire.authState.subscribe(obj=>{
                  
      this.id = this.fire.auth.currentUser.uid;

    });
  }

  ngOnInit() {
    this.obterCategoria();
  }

  async presentModal() {
    this.router.navigate(['/modal-page']);
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: {
        'firstName': this.listaTribulus,
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }



  obterCategoria() {
    var ref = firebase.firestore().collection("produto");
    ref.get().then(query => {
        query.forEach(doc => {
          
            let c = new Produto();
            c.setDados(doc.data());

              if(c.categoria == "tribulus"){
                console.log(c);
                this.listaTribulus.push(c);
              }

      });
    });
  
  }



}

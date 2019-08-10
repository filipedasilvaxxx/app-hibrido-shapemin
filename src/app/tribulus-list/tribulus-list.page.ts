import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild("textoBusca") textoBusca;


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



  busca(){
    console.log(this.textoBusca.value)
    
    this.listaTribulus = [];
      var ref = firebase.firestore().collection("produto");
      //ref.orderBy('nome').startAfter(this.textoBusca.value).get().then(doc=> {
      ref.orderBy('nome').startAfter(this.textoBusca.value).endAt(this.textoBusca.value+'\uf8ff').get().then(doc=> {

        if (doc.size>0 ) {
          
          doc.forEach(doc =>{

            let r = new Produto();
            r.setDados(doc.data());
            r.id = doc.id;
            
            if (r.categoria == "creatina") {
              console.log(r);
              
              let ref = firebase.storage().ref().child(`produtos/${doc.id}.jpg`).getDownloadURL().then(url => {
                r.img = url;
                this.listaTribulus.push(r)
     
              }).catch(err => {
                this.listaTribulus.push(r);
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
        

        if (c.categoria == "tribulus") {
          console.log(c);
          
          let ref = firebase.storage().ref().child(`produtos/${doc.id}.jpg`).getDownloadURL().then(url => {
            c.img = url;
            this.listaTribulus.push(c)
 
          }).catch(err => {
            this.listaTribulus.push(c);
          })            
          

        }
     

      });

    });

  }



}

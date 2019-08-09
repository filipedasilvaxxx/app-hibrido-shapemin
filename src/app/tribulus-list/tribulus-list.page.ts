import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Produto } from '../model/produto';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActionSheetController } from '@ionic/angular';




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

  
  constructor(public fire: AngularFireAuth,public actionSheetController: ActionSheetController) { 

    this.fire.authState.subscribe(obj=>{
                  
      this.id = this.fire.auth.currentUser.uid;

    });
  }

  ngOnInit() {
    this.obterCategoria();
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
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}

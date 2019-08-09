import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../model/produto';
import * as firebase from 'firebase';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
 // Data passed in by componentProps
 @Input() firstName: string;
 @Input() lastName: string;
 @Input() middleInitial: string;

 id: string;

 firtsName: Produto [] = [];
 produtos : Produto [] = [];
  
 constructor(private modalController: ModalController,
            public modalCtrl: ModalController,
            public activatedRoute: ActivatedRoute,
            public navParams: NavParams
            ) {
              
              
   // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('firstName'));
    
 }


  ngOnInit() {
    
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });

    
    
  }

  







}

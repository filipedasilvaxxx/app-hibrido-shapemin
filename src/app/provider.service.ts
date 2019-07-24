import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

var pagseguroPagtoService : any;

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  
  constructor(public http: HttpClient) { }
}

import { Component, NgZone, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AddTokenModalComponent } from './add-token-modal/add-token-modal.component';
import { DefaultTickers } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  color = '#ffffff';
  tickers: any[] = [];

  prices: Array<any> =[];

  updateInterval: any;

  // Set your API key here
  APIKEY =  environment.apiKey;

  // Set the Covalent API
  covalentAPI = "https://api.covalenthq.com/v1"
  APIEndpoint = '/pricing/tickers'

  constructor(private zone: NgZone, private modalService: NgbModal){
    
  }


  async openAddCoin() {
    const modalRef = this.modalService.open(AddTokenModalComponent);
    modalRef.componentInstance.name = 'World';

    const newTicker = await modalRef.result;
    if(this.tickers.indexOf(newTicker)<0){
      this.tickers.push(newTicker);
      chrome.storage.sync.set({"coins":  this.tickers});
      this.updatePrices();
    }
    

    

  }

  async ngOnInit() {
    chrome.storage.sync.get(['coins'], async ({coins}) => {
      
      if(  !coins || coins.length <=0 ){
        chrome.storage.sync.set({"coins":  DefaultTickers},async () => {
          console.log("Storage of Tickers Succesful");
          this.tickers = coins;
          this.zone.run(()=>{
            this.updatePrices().then(()=>{})
          })

          //Start Timer

          this.updateInterval = setInterval(() => {
            this.updatePrices(); 
          }, 20000);
          //await this.updatePrices();
        });
      }else{
        this.tickers = coins;
        // await this.updatePrices();

        this.zone.run(()=>{
          this.updatePrices().then(()=>{})
        })
      }

      
    });
  }

  public updateColor(color: string) {
    chrome.storage.sync.set({ color});
  }

  public async updatePrices  (){
	
    // Covalent API request setup 
    const url = new URL(`${this.covalentAPI}${this.APIEndpoint}/`);
    //@ts-ignore
    url.search = new URLSearchParams({
      key: this.APIKEY,
      tickers: this.tickers
    })
  
    //@ts-ignore
    // Use Fetch API to get Covalent data and display in token table
    let data = await fetch(url)
    .then((resp) => resp.json());

    let tokens = data.data.items;
    this.prices=tokens;

    console.log('Prices are ', this.prices)

    // .then(function(data) {
    //   let tokens = data.data.items;
    //   this.tickers=tokens;

    //   // return tokens.map(function(token) { // Map through the results and for each run the code below
    //   // tableRef.insertRow().innerHTML = 
    //   //   `<td><img src=${token.logo_url} style=width:40px;height:40px;></td>` +
    //   //   `<td> ${token.contract_name} </td>` +
    //   //   `<td> ${token.contract_ticker_symbol} </td>` +
    //   //   `<td> $${parseFloat(token.quote_rate).toFixed(2)} </td>`
    //   // })
    // })
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  
}

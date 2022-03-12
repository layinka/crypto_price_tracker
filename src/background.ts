import { DefaultTickers } from "./app/constants";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' });
  // Set your crypto tickers here
  
  chrome.storage.sync.get(['coins'],function (result){
		if(  !result || result.length <=0 ){
			chrome.storage.sync.set({"coins":  DefaultTickers},function (){
				console.log("Storage of Tickers Succesful");
			});
		}
  });

  // chrome.webNavigation.onCompleted.addListener(() => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
  //     if (id) {
  //       chrome.pageAction.show(id);
  //     }
  //   });
  // }, { url: [{ urlMatches: 'google.com' }] });
});

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiListService {

  constructor(
    private http: HttpClient
  ) { }



  queryMenu() {
    // const apiUrl = 'https://dev-mychannel.cdc.ais.th' + api ||''
    const apiUrl = 'api/newlogin/queryMenuTopicLanding' || ''
    // if(!!token){
     let token = 'Bearer '
    // }    
    let header = new HttpHeaders({
      'x-authorization': token || ''
    })
    
    let body = {
      "condition": { }
    }
    const httpOptions = {
      headers: header
    }
    return this.http.post(apiUrl,body, httpOptions).toPromise();
  }
  queryMenuSub() {
    // const apiUrl = 'https://dev-mychannel.cdc.ais.th' + api ||''
    const apiUrl = 'api/newlogin/queryMenuSubTopicLanding' || ''
    // if(!!token){
      let token = 'Bearer ' 
    // }
    let header = new HttpHeaders({
      'x-authorization': token|| ''
    })
    
    let body = {
      "condition": { }
    }
    const httpOptions = {
      headers: header
    }
    return this.http.post(apiUrl,body, httpOptions).toPromise();
  }

  loginAis () {
    const apiUrl = '/api/newlogin/login-ais';
    const body = {"tokenID": 'token'}
    return this.http.post(apiUrl,body).toPromise();
  }
  // oauth2Code (code: any, _macaddress: any,_channel: any, udid?: any, channelType?:any) {
  //   const apiUrl = '/api/newlogin/oauth2Code';
  //   const body = {
  //     condition : { }

  //   };
  //   console.log('body',body);
  //   let header = new HttpHeaders({
  //     'ipmacaddress': _macaddress|| ''      
  //   })
    
  //   const httpOptions = {
  //     headers: header
  //   }
    
  //   return this.http.post(apiUrl, body, httpOptions).toPromise();
    
  // }
}

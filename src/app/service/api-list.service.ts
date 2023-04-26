import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      "condition": {}
    }
    const httpOptions = {
      headers: header
    }
    return this.http.post(apiUrl, body, httpOptions).toPromise();
  }
  queryMenuSub() {
    const apiUrl = 'api/newlogin/queryMenuSubTopicLanding' || ''
    let token = 'Bearer '
    let header = new HttpHeaders({
      'x-authorization': token || ''
    })

    let body = {
      "condition": {}
    }
    const httpOptions = {
      headers: header
    }
    return this.http.post(apiUrl, body, httpOptions).toPromise();
  }

  loginAis() {
    const apiUrl = '/api/newlogin/login-ais';
    const body = { "tokenID": 'token' }
    return this.http.post(apiUrl, body).toPromise();
  }

  addMenuTopicLanding(formData: any) {
    const apiUrl = '/api/newlogin/addMenuTopicLanding';
    const body = formData
    // let token = 'Bearer ' 

    let header = new HttpHeaders({
      'x-authorization': 'Bearer'
    })
    const httpOptions = {
      headers: header
    }
    return this.http.post(apiUrl, body, httpOptions).toPromise();
  }

  addMenuSubTopicLanding(formData: any) {
    const apiUrl = '/api/newlogin/addMenuSubTopicLanding';
    const body = formData
    // let token = 'Bearer ' 

    let header = new HttpHeaders({
      'x-authorization': 'Bearer'
    })
    const httpOptions = {
      headers: header
    }
    return this.http.post(apiUrl, body, httpOptions).toPromise();
  }

  updateMenuTopicLanding(formData: any, token: any) {
    const apiUrl = '/api/newlogin/updateMenuTopicLanding';
    const body = formData
    // console.log('formData', formData);

    // let token = 'Bearer ' 

    let header = new HttpHeaders({
      'x-authorization': 'Bearer' + token || ''
    })
    const httpOptions = {
      headers: header
    }
    return this.http.post(apiUrl, body, httpOptions).toPromise();
  }
  updateMenuSubTopicLanding(formData: any, token: any) {
    const apiUrl = '/api/newlogin/updateMenuSubTopicLanding';
    const body = formData
    // console.log('formData', formData);

    // let token = 'Bearer ' 

    let header = new HttpHeaders({
      'x-authorization': 'Bearer' + token || ''
    })
    const httpOptions = {
      headers: header
    }
    return this.http.post(apiUrl, body, httpOptions).toPromise();
  }

  delMenuTopicLanding(id:any,outTopicName:any) {
    const apiUrl = '/api/newlogin/delMenuTopicLanding';
    let header = new HttpHeaders({
      'x-authorization': 'Bearer'
    })
    const httpOptions = {
      headers: header
    }
    const body = {
      "id": id,
      "outTopicName": outTopicName
    }
    return this.http.post(apiUrl, body,httpOptions).toPromise();
  }

  delMenuSubTopicLanding(id:any,outSubTopicName:any) {
    const apiUrl = '/api/newlogin/delMenuSubTopicLanding';
    let header = new HttpHeaders({
      'x-authorization': 'Bearer'
    })
    const httpOptions = {
      headers: header
    }
    const body = {
      "id": id,
      "outSubTopicName": outSubTopicName
    }
    return this.http.post(apiUrl, body,httpOptions).toPromise();
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

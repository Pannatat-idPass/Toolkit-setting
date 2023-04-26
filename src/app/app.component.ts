import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiListService } from 'src/app/service/api-list.service'
// import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// export interface Mysetting {
//   AccessToken?:any,
//   Enviroment?:any
// }
export class AppComponent {
  title = 'setting-api';
  // token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpNVE1DUzAxIiwidGltZXN0YW1wIjoiMjAyMDAyMTcxNTE4IiwibG9jYXRpb25Db2RlIjoiMTAwNjAyMCIsImVtYWlsIjoiIiwiZmlyc3RuYW1lIjoiIiwibGFzdG5hbWUiOiIiLCJzaGFyZWRVc2VyIjoiSk1UTUNTMDEiLCJ1c2VyVHlwZSI6IkFTUCIsInJvbGUiOiJBU1AiLCJjaGFubmVsVHlwZSI6InNmZi13ZWIiLCJhc2NDb2RlIjoiIiwibW9iaWxlTm8iOiIiLCJpYXQiOjE1MjU0MzgzNTAsImV4cCI6MTkyODAzMDM1MH0.C-ZgIe7DrBrNQsMER8b9q_0VV3OVxSet1taBzNKyUqQ'
  token: string = 'TEST'
  // api:string ='api/newlogin/queryMenuTopicLanding'
  // api:string ='https://dev-mychannel.cdc.ais.th/api/newlogin/queryMenuTopicLanding'
  dataList: any = []
  dataListOff: any = []
  dataListSub = []
  dataSubListOff = []
  ListSub = []
  listNameMenu: any = []
  // objectList = []
  objecSubtList = []
  filterdata = []
  fillterRole = []
  filterLocation = []
  filterGroup = []
  loopRule = []
  showChanneltype = []
  roleKey = [];
  menuSubname = []
  subInsideList: any = []
  MenuKey = []
  fromUpdate = []
  dataUpdate: any = []
  listLocationUpdate: any = []
  listRoleUserUpdate: any = []
  showCheck: any = []
  menusUpdate: any = []
  pushMenus: any = []
  checkDetail: any
  selectSub: any
  flagSub: boolean = false;
  edit: boolean = false;
  openhide: boolean = false;
  openhideSub: boolean = false;
  deleteMenu: boolean = false;
  roleList = ['BACKOFFICEAIS', 'BACKOFFICECSS', 'AISSHOP', 'ASP', 'TELEWIZ', 'BACKOFFICEAIS', 'AISBUDDYEXCLUSIVE', 'RETAILCHAIN', 'AISMINICORNER', 'PCBRANDAIS']
  channelTypeList = ['All', 'SFF-WEB', 'MYCHANNEL-APP']
  locationList = ['1100', '1111']
  formCreate = ['keywords',
    'rules',
    'outTopicName', //Not change outTopicName
    'outTopicId',
    'outTopicGroup',
    'priority',
    'imgBase64',
    'isActive',
    'isRedirect',
    'function',
    'outUrl']
  myForm: FormGroup;
  myFormAddTopic: FormGroup;
  AccessToken: any
  Enviroment: any
  _channel: any = 'Select Role'
  _channelType: any = 'channelType'
  topicGroup: any = 'topicGroup'
  _showDetail: any = [];
  templatMenu: any = []
  errorMessenger: string = '';
  addMenu: boolean = false
  countDel: boolean = true;
  countAdd: boolean = true;
  upDateOpen: boolean = false;
  constructor(
    public ApiListService: ApiListService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {
    this.myForm = this.fb.group({
      AccessToken: '',
      Enviroment: '',
      Roleuser: '',
      channelType: '',
      locationCode: '',
    });

    this.myFormAddTopic = this.fb.group({
      roleUser: '',
      channelType: '',
    });

    this.getDataMenuAll()
  }
  getDataMenu() {
    this.dataList = []
    this.dataListSub = []
    this.dataListOff = []
    this.listNameMenu = []
    this.dataSubListOff = []
    let objectList = []
    this.objecSubtList = []
    this.subInsideList = []
    this.ApiListService.queryMenu().then((res: any) => {
      objectList = res.data
      objectList.forEach((data: any) => {
        try {
          if (this.filterData(data) === true) {
            this.listNameMenu.push(data['outTopicName'])
            if (data.priority && data.isActive) {
              // console.log('filterData', this.filterData(data) === true);
              this.dataList.push(data);
            } else {
              this.dataListOff.push(data);
            }
          }
        } catch (err: any) {
          console.log('catch', data['outTopicName']);
        }
      })
      this.dataList = this.dataList.sort((a: any, b: any) => a['priority'] - b['priority']);
    }).catch((res) => {
      this.dataList = []
      this.errorMessenger = JSON.stringify(res.error)
    })
    this.ApiListService.queryMenuSub().then((res: any) => {
      this.objecSubtList = res.data
      this.objecSubtList.forEach((data) => {
        if (this.filterData(data) === true) {
          if (data['priority'] && data['isActive']) {
            this.dataListSub.push(data);
          } else {
            this.dataSubListOff.push(data);
          }
        }
      })
      this.ListSub = this.dataListSub.sort((a, b) => a['priority'] - b['priority']);
    }).catch((res) => {
      console.log(res.error);
      this.dataListSub = []
      this.ListSub = []
      this.errorMessenger = JSON.stringify(res.error)
    })
  }

  getDataMenuAll() {
    this.dataList = []
    this.dataListSub = []
    this.listNameMenu = []
    this.dataListOff = []
    this.dataSubListOff = []
    let objectList = []
    this.objecSubtList = []
    this.subInsideList = []
    // this.ListSub = []
    this.ApiListService.queryMenu().then((res: any) => {
      objectList = res.data
      objectList.forEach((data: any) => {
        this.listNameMenu.push(data['outTopicName'])
        if (data['priority'] && data['isActive']) {
          this.dataList.push(data);
        } else {
          this.dataListOff.push(data);
        }
      })
      this.dataList = this.dataList.sort((a: any, b: any) => a['priority'] - b['priority']);
    })
    this.ApiListService.queryMenuSub().then((res: any) => {
      this.objecSubtList = res.data
      this.objecSubtList.forEach((data) => {
        if (data['priority'] && data['isActive']) {
          this.dataListSub.push(data);
        } else {
          this.dataSubListOff.push(data);
        }
      })
      this.ListSub = this.dataListSub.sort((a, b) => a['priority'] - b['priority']);
      // console.log('this.dataListSu', this.dataListSub);
    })
  }

  clear() {
    this.AccessToken = " "
    this.Enviroment = " "
    this.myForm.value.Enviroment = " "
    this.myForm.value.AccessToken = " "
    this.myForm.value.Roleuser = ""
    this.myForm.value.locationCode = ""
  }

  byPass(data: any) {
    return this.sanitizer.bypassSecurityTrustUrl(data.imgBase64);
  }



  filterData(roleuser: any) {
    let channelTypeByRole = false;
    let location = false;
    this.filterLocation = roleuser['rules'][0]['location']
    location = this.filterLocation.some((val: String) => {
      if (!this.myForm.value.locationCode) {
        this.myForm.value.locationCode = "ALL";
      }
      if (val.toUpperCase() === "ALL" || val === this.myForm.value.locationCode || this.myForm.value.locationCode === "ALL") {
        return true;
      }
      return false;
    });

    if (location) {
      this.filterdata = roleuser['rules'][0]['roleUser']
      try {
        this.filterdata.forEach((role) => {
          let roleKey = Object.keys(role)
          const matchesRole = roleKey.filter(role => {
            return role.toUpperCase() === 'ALL' || role.toUpperCase() === this.myForm.value.Roleuser;
          });
          this.fillterRole = role[matchesRole[0]]
          if (matchesRole.length > 0) {
            console.log('this.myForm.value.channelType', this.myForm.value.channelType);

            channelTypeByRole = this.fillterRole.some((channelType: string) => {
              if (!this.myForm.value.channelType || this.myForm.value.channelType == 'channelType') {
                return true
              }
              if (channelType.toUpperCase() === "ALL" || channelType.toUpperCase() === this.myForm.value.channelType.toUpperCase()) {
                return true;
              }
              return false;
            })
          }
        });
      } catch (err: any) {
        console.log('err', err, 'roleuser', roleuser);
      }
    }
    if (location && channelTypeByRole) {
      return true
    } else {
      return false
    }
  }

  filterSubGroup(velueSub: any, res: any) {
    let channelTypeByRole = false;
    let location = false;
    let checkGroup = false
    this.filterLocation = res['rules'][0]['location']
    location = this.filterLocation.some((val: String) => {
      if (!this.myForm.value.locationCode) {
        this.myForm.value.locationCode = "ALL";
      }
      if (val.toUpperCase() === "ALL" || val === this.myForm.value.locationCode || this.myForm.value.locationCode === "ALL") {
        return true;
      }
      return false;
    });

    if (location) {
      this.filterdata = res['rules'][0]['roleUser']
      this.filterdata.forEach((role) => {
        let roleKey = Object.keys(role)
        const matchesRole = roleKey.filter(role => {
          return role.toUpperCase() === 'ALL' || role.toUpperCase() === this.myForm.value.Roleuser;
        });
        this.fillterRole = role[matchesRole[0]]
        if (matchesRole.length > 0) {
          channelTypeByRole = this.fillterRole.some((channelType: string) => {

            if (!this.myForm.value.channelType) {
              this.myForm.value.channelType = "undefined";
            }
            if (channelType.toUpperCase() === "ALL" || channelType.toUpperCase() === this.myForm.value.channelType.toUpperCase()) {
              return true;
            }
            return false;
          })
        }
      });
    }
    if (channelTypeByRole) {
      if (res['topicGroup'] === velueSub) {
        checkGroup = true
      } else {
        checkGroup = false
      }
    }
    if (location && channelTypeByRole && checkGroup) {
      return true
    } else {
      return false
    }
  }

  showDetail(data: any) {
    this.upDateOpen = false;
    this._showDetail = data;
    this._showDetail['json'] = JSON.stringify(data, null, 4);
    sessionStorage.setItem('Detail', JSON.stringify(data))
    this.listLocationUpdate = [...this._showDetail['rules'][0]['location']]
    this.listRoleUserUpdate = [...this._showDetail['rules'][0]['roleUser']]
    let res: any = sessionStorage.getItem("Detail")
    this.showCheck['isActive'] = JSON.parse(res).isActive
    this.showCheck['isRedirect'] = JSON.parse(res).isRedirect
    this.addControl(this._showDetail)
  }

  templatMenuTopic(data: any, subInside: boolean) {
    this.addControl(data)
    this._showDetail = data
    this.flagSub = subInside
    this.listLocationUpdate = []
    this.listRoleUserUpdate = [{}]
    delete data['_id']
    delete data['isActive']
    this.templatMenu = Object.keys(data)
    console.log('this.templatMenu', this.templatMenu)
  }

  addControl(ListControl: any) {
    Object.keys(ListControl).forEach((res: any) => {
      if (res == 'rules') {
        Object.keys(ListControl[res][0]).forEach((xx: any) => {
          this.myFormAddTopic.addControl(xx, this.fb.control(''));
        })
      } else {
        this.myFormAddTopic.addControl(res, this.fb.control(''));
      }
    })
  }

  open() {
    this.errorMessenger = '';
  }

  showSubTopic(velue: any) {
    this.ListSub = []
    this.ListSub = this.dataListSub;
    this.subInsideList = []
    let SubTopic: any = []
    if (this.ListSub.length > 0) {

      this.ListSub.forEach((res) => {
        if (this.filterSubGroup(velue, res)) {
          SubTopic.push(res)
        }
      })
      this.ListSub = SubTopic
    } else {
      this.ListSub = []
    }
  }

  selectMenuSub(dataGroup: any) {
    this.subInsideList = []
    this.selectSub = dataGroup
    this.menuSubname = dataGroup['menus']
    this.menuSubname.forEach((res) => {
      if (this.filterData(res) || !this.myFormAddTopic.value.roleUser && !this.myFormAddTopic.value.channelType) {
        this.subInsideList.push(res)
      }
    })
    console.log('this.selectSub', this.selectSub);
    // console.log('updateMenus', this.subInsideList);
  }


  viewMenuTopic() {
    this.edit = false;
    this.MenuKey = []
    let data: any = Object.keys(this._showDetail)
    this.MenuKey = data
  }

  fillterMenuKey(data: any) {
    if (data == 'rules') {
      let velue = []
      velue = Object.keys(this._showDetail[data][0])
      return velue || "null"
    } else {
      return this._showDetail[data] || "null"
    }
  }

  ObjectReturn(data: any) {
    let velue = []
    velue = Object.keys(data)
    return velue || ''
  }

  isJSON(str: string) {
    try {
      return JSON.stringify(str)
    } catch (e) {
      return false;
    }
  }
  checkTypeBoolean(velue: any) {
    if (typeof (this._showDetail[velue]) == 'boolean') {
      return true
    } else {
      return false
    }
  }

  AddMenuTopic() {
    if (this._showDetail['outTopicName']) {
      this.addMenuTopicLanding()
    } else if (!!this.flagSub) {
      this.addMenus()
    } else {
      this.addMenuSubTopicLanding()
    }
  }

  addMenuTopicLanding() {
    let formMenu: any
    let isRedirect: boolean
    if (this.showCheck["isRedirect"] !== this._showDetail['isRedirect']) {
      isRedirect = this.showCheck["isRedirect"]
    } else {
      isRedirect = false
    }
    formMenu = {
      'keywords': [this.myFormAddTopic.value.keywords] || [''],
      'rules': [{
        'roleUser': this.listRoleUserUpdate,
        'location': this.listLocationUpdate,
        'type': '',
      }],
      'outTopicName': this.myFormAddTopic.value.outTopicName || '', //Not change outTopicName
      'outTopicId': this.myFormAddTopic.value.outTopicId || '',
      'outTopicGroup': this.myFormAddTopic.value.outTopicGroup || '',
      'priority': this.myFormAddTopic.value.priority || 99,
      'imgBase64': this.myFormAddTopic.value.imgBase64 || '',
      'isActive': true,
      'isRedirect': isRedirect,
      'function': this.myFormAddTopic.value.function || '',
      'outUrl': this.myFormAddTopic.value.outUrl || ''
    }
    if (formMenu['function'].match(/^ *$/) !== null) {
      formMenu['function'] = ''
    }
    console.log('formMenu', formMenu);

    this.ApiListService.addMenuTopicLanding(formMenu).then(((res) => {
      console.log(res);
      window.location.href = ''
    })).catch((err: any) => {
      console.log('err', err);
      this.errorMessenger = JSON.stringify(err.error.developerMessage)
    })
  }
  addMenuSubTopicLanding() {
    let formMenu: any
    // let isRedirect: boolean
    // if (this.showCheck["isRedirect"] !== this._showDetail['isRedirect']) {
    //   isRedirect = this.showCheck["isRedirect"]
    // } else {
    //   isRedirect = false
    // }
    formMenu = {
      'keywords': [this.myFormAddTopic.value.keywords] || [''],
      'menus': [],
      'rules': [{
        'roleUser': this.listRoleUserUpdate,
        'location': this.listLocationUpdate,
        'type': '',
      }],
      'outSubTopicName': this.myFormAddTopic.value.outSubTopicName || '', //Not change outTopicName
      'outSubTopicId': this.myFormAddTopic.value.outSubTopicId || '',
      'topicGroup': this.myFormAddTopic.value.topicGroup || '',
      'image': this.myFormAddTopic.value.image || '',
      'outUrl': this.myFormAddTopic.value.outUrl || '',
      'priority': this.myFormAddTopic.value.priority || 99,
      'isActive': true,
      // 'isRedirect': isRedirect,
      'function': this.myFormAddTopic.value.function || ''
    }
    if (formMenu['function'].match(/^ *$/) !== null) {
      formMenu['function'] = ''
    }
    console.log('formMenu', formMenu);

    this.ApiListService.addMenuSubTopicLanding(formMenu).then(((res) => {
      console.log(res);
      window.location.href = ''
    })).catch((err: any) => {
      console.log('err', err);
      this.errorMessenger = JSON.stringify(err.error.developerMessage)
    })
  }

  addMenus() {
    console.log('addMenus.selectSub', this.selectSub);

    let formMenu: any
    // let isRedirect: boolean
    formMenu = {
      'keywords': [this.myFormAddTopic.value.keywords] || [''],
      'menus': [],
      'rules': [{
        'roleUser': this.listRoleUserUpdate,
        'location': this.listLocationUpdate,
        'type': '',
      }],
      'outSubTopicName': this.myFormAddTopic.value.outSubTopicName || '', //Not change outTopicName
      'outSubTopicId': this.myFormAddTopic.value.outSubTopicId || '',
      'subTopicGroup': this.selectSub.outSubTopicName || '',
      'image': this.myFormAddTopic.value.image || '',
      'outUrl': this.myFormAddTopic.value.outUrl || '',
      'priority': this.myFormAddTopic.value.priority || 0,
      'isActive': true,
      'function': this.myFormAddTopic.value.function || ''
    }
    if (formMenu['function'].match(/^ *$/) !== null) {
      formMenu['function'] = ''
    }
    console.log('formMenu', formMenu);
    this.pushMenus = formMenu || []
    if (!!this.pushMenus) {
      console.log('pushMenus', this.pushMenus);
      this.flagSub = false
      this.showDetail(this.selectSub)
      this.updateMenuSubTopic()
    }
  }

  deleteMenuTopic() {
    if (this._showDetail['outTopicName']) {
      this.ApiListService.delMenuTopicLanding(this._showDetail['_id'], this._showDetail['outTopicName'])
    } else {
      this.ApiListService.delMenuSubTopicLanding(this._showDetail['_id'], this._showDetail['outSubTopicName'])
    }
    this.deleteMenu = false;
    setTimeout(() => {                           // <<<---using ()=> syntax
      window.location.href = ''
    }, 1000);
    // window.location.href = ''
  }

  setTimeout() {
    this.countDel = true
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.countDel = false;
    }, 3000);
  }
  updateMenu() {
    if (this._showDetail['outTopicName']) {
      this.updateMenuTopic()
    } else if (this._showDetail['subTopicGroup']) {
      this.updateMenus()
    } else {
      this.updateMenuSubTopic()
    }
  }

  updateMenus() {
    let formMenus: any = []
    let dataSubUpdate: any = [...this.selectSub['menus']]
    formMenus = {
      'keywords': this._showDetail['keywords'],
      'rules': [{
        'roleUser': this.listRoleUserUpdate || this._showDetail['rules'][0]['roleUser'],
        'location': this.listLocationUpdate || this._showDetail['rules'][0]['location'],
        'type': this._showDetail['rules'][0]['type'],
      }],
      'menus': this._showDetail['menus'] || [],//Not change _id to id
      'outSubTopicName': this._showDetail['outSubTopicName'], //Not change outTopicName
      'outSubTopicId': this.myFormAddTopic.value.outSubTopicId || this._showDetail['outSubTopicId'],
      'subTopicGroup': this.myFormAddTopic.value.subTopicGroup || this._showDetail['subTopicGroup'],
      'priority': this.myFormAddTopic.value.priority || this._showDetail['priority'],
      'image': this.myFormAddTopic.value.image || this._showDetail['image'],
      'isActive': true,
      'function': this.myFormAddTopic.value.function || this._showDetail['function'],
      'outUrl': this.myFormAddTopic.value.outUrl || this._showDetail['outUrl'],
    }
    if (formMenus['function'] && formMenus['function'].match(/^ *$/) !== null) {
      formMenus['function'] = ''
    }
    if (!!this.myFormAddTopic.value.keywords) {
      formMenus['keywords'] = [this.myFormAddTopic.value.keywords]
    }
    this.selectSub['menus'].forEach((res: any, index: any) => {
      if (res['outSubTopicName'] === formMenus['outSubTopicName']) {
        Object.keys(formMenus).forEach((Res: any) => {
          try {
            if (typeof (formMenus[Res]) === 'boolean' || !!dataSubUpdate[Res] && formMenus[Res]) {
              dataSubUpdate[index][Res] = formMenus[Res]
            } else if (typeof (formMenus[Res]) === 'boolean') {
              dataSubUpdate[index][Res] = formMenus[Res]
            } else {
              dataSubUpdate[index][Res] = formMenus[Res] || ''
            }
          } catch (err: any) {
            console.log('Resforeach', Res);
          }

        })
      }
      delete dataSubUpdate[index]['json'];
    })
    // console.log('CHECK==',JSON.stringify(this.checkDetail) === JSON.stringify(formMenus));
    // console.log('dataSubUpdate',dataSubUpdate);
    this.menusUpdate = dataSubUpdate
    if (!!this.menusUpdate) {
      console.log('menusUpdate', this.menusUpdate);
      this.showDetail(this.selectSub)
      this.updateMenuSubTopic()
    }
  }
  updateMenuTopic() {
    let Menu: any = []
    this.dataUpdate = Object.assign({}, this._showDetail);
    let isActive: boolean
    let isRedirect: boolean
    let isfunction: any

    if (this.showCheck["isActive"] !== this._showDetail['isActive']) {
      isActive = this.showCheck["isActive"]
    } else {
      isActive = this._showDetail["isActive"]
    }
    if (this.showCheck["isRedirect"] !== this._showDetail['isRedirect']) {
      isRedirect = this.showCheck["isRedirect"]
    } else {
      isRedirect = this._showDetail["isRedirect"]
    }
    Menu = {
      'keywords': this._showDetail['keywords'],
      'rules': [{
        'roleUser': this.listRoleUserUpdate || this._showDetail['rules'][0]['roleUser'],
        'location': this.listLocationUpdate || this._showDetail['rules'][0]['location'],
        'type': this._showDetail['rules'][0]['type'],
      }],
      '_id': this._showDetail['_id'],//Not change _id to id
      'outTopicName': this._showDetail['outTopicName'], //Not change outTopicName
      'outTopicId': this.myFormAddTopic.value.outTopicId || this._showDetail['outTopicId'],
      'outTopicGroup': this.myFormAddTopic.value.outTopicGroup || this._showDetail['outTopicGroup'],
      'priority': this.myFormAddTopic.value.priority || this._showDetail['priority'],
      'imgBase64': this.myFormAddTopic.value.imgBase64 || this._showDetail['imgBase64'],
      'isActive': isActive,
      'isRedirect': isRedirect,
      'function': this.myFormAddTopic.value.function || this._showDetail['function'],
      'outUrl': this.myFormAddTopic.value.outUrl || this._showDetail['outUrl'],
      'json': this._showDetail['json'],
      '__v': this._showDetail['__v'],
    }

    if (Menu['function'].match(/^ *$/) !== null) {
      Menu['function'] = ''
    }

    if (!!this.myFormAddTopic.value.keywords) {
      Menu['keywords'] = [this.myFormAddTopic.value.keywords]
    }
    Object.keys(Menu).forEach((Res: any) => {
      try {
        this.dataUpdate[Res] = Menu[Res]
      } catch (err: any) {
        console.log('Resforeach', Res);
      }
    })
    let data: any = sessionStorage.getItem('Detail')
    this.checkDetail = JSON.parse(data)
    this.countAdd = (JSON.stringify(this.dataUpdate) === JSON.stringify(this.checkDetail))
    console.log(this.countAdd);
    if (!this.countAdd) {
      delete this.dataUpdate['__v'];
      delete this.dataUpdate['json'];
      this.dataUpdate = JSON.parse(JSON.stringify(this.dataUpdate).replace('_id', 'id'));
      this.ApiListService.updateMenuTopicLanding(this.dataUpdate, this.token).then((res) => {
        window.location.href = ''
      }).catch((err) => {
        this.countDel = true
      })
      this.myFormAddTopic.reset()
      this.errorMessenger = ''
    } else {
      this.countAdd = true;
      this.errorMessenger = JSON.stringify('ตรวจสอบข้อมูลให้ถูกต้อง')
    }
  }

  updateMenuSubTopic() {
    let Menu: any = []
    this.dataUpdate = Object.assign({}, this._showDetail);
    let isActive: boolean
    if (this.showCheck["isActive"] !== this._showDetail['isActive']) {
      isActive = this.showCheck["isActive"] || false
    } else {
      isActive = this._showDetail["isActive"] || false
    }
    Menu = {
      'keywords': this._showDetail['keywords'],
      'rules': [{
        'roleUser': this.listRoleUserUpdate || this._showDetail['rules'][0]['roleUser'],
        'location': this.listLocationUpdate || this._showDetail['rules'][0]['location'],
        'type': this._showDetail['rules'][0]['type'],
      }],
      '_id': this._showDetail['_id'],//Not change _id to id
      'menus': this._showDetail['menus'] || [],//Not change _id to id
      'outSubTopicName': this._showDetail['outSubTopicName'], //Not change outTopicName
      'outSubTopicId': this.myFormAddTopic.value.outSubTopicId || this._showDetail['outSubTopicId'],
      'topicGroup': this.myFormAddTopic.value.topicGroup || this._showDetail['topicGroup'],
      'priority': this.myFormAddTopic.value.priority || this._showDetail['priority'],
      'image': this.myFormAddTopic.value.image || this._showDetail['image'],
      'isActive': isActive,
      // 'isRedirect': isRedirect,
      'function': this.myFormAddTopic.value.function || this._showDetail['function'],
      'outUrl': this.myFormAddTopic.value.outUrl || this._showDetail['outUrl'],
      'json': this._showDetail['json'],
      '__v': this._showDetail['__v'],
    }
    // if (!!this.menusUpdate) {
    //   Menu['menus'] = this.menusUpdate
    // }
    if (!!this.pushMenus) {
      Menu['menus'].push(this.pushMenus)
    }

    if (Menu['function'] && Menu['function'].match(/^ *$/) !== null) {
      Menu['function'] = ''
    }

    if (!!this.myFormAddTopic.value.keywords) {
      Menu['keywords'] = [this.myFormAddTopic.value.keywords]
    }
    console.log('Menu', Menu);
    Object.keys(Menu).forEach((Res: any) => {
      try {
        if (typeof (Menu[Res]) === 'boolean' || !!this.dataUpdate[Res] && Menu[Res]) {
          this.dataUpdate[Res] = Menu[Res]
        } else if (typeof (Menu[Res]) === 'boolean') {
          this.dataUpdate[Res] = Menu[Res]
        } else {
          this.dataUpdate[Res] = Menu[Res] || ''
        }
      } catch (err: any) {
        console.log('Resforeach', Res);
      }
    })

    let data: any = sessionStorage.getItem('Detail')

    this.checkDetail = JSON.parse(data)
    delete this.checkDetail['json'];
    delete this.checkDetail['__v'];
    delete this.dataUpdate['__v'];
    delete this.dataUpdate['json'];
    // console.log('C.dataUpdate',this.dataUpdate);
    // console.log('C.checkDetail',this.checkDetail);
    console.log(JSON.stringify(this.dataUpdate) === JSON.stringify(this.checkDetail));
    this.countAdd = (JSON.stringify(this.dataUpdate) === JSON.stringify(this.checkDetail))
    if (!this.countAdd) {
      this.dataUpdate = JSON.parse(JSON.stringify(this.dataUpdate).replace('_id', 'id'));
      this.ApiListService.updateMenuSubTopicLanding(this.dataUpdate, this.token).then((res) => {
        window.location.href = ''
      }).catch((err) => {
        this.countDel = true
      })
      this.myFormAddTopic.reset()
      this.errorMessenger = ''
    } else {
      this.countAdd = true;
      this.errorMessenger = JSON.stringify('ตรวจสอบข้อมูลให้ถูกต้อง')
    }
  }

  addButton(role: any) {
    if (role == 'location') {
      if (!!this.myFormAddTopic.value.location) {
        this.listLocationUpdate.push(this.myFormAddTopic.value.location);
      }
      this.myFormAddTopic.reset({
        "location": "",
      })

    } else if (role == 'roleUser') {
      if (this.myFormAddTopic.value.roleUser && this.myFormAddTopic.value.channelType) {
        let roleUser = this.myFormAddTopic.value.roleUser
        let channelType = this.myFormAddTopic.value.channelType
        let cloneList = (this.listRoleUserUpdate[0][roleUser] = [channelType])
        this.listRoleUserUpdate[0][roleUser] = [...cloneList]
      }
      this.myFormAddTopic.reset({
        "roleUser": "",
      })

    }
  }


  delButton(index: any, role: any) {
    if (role == 'location') {
      this.listLocationUpdate.forEach((element: any, i: any) => {
        if (i == index) this.listLocationUpdate.splice(i, 1);
      });

    } else if (role == 'roleUser') {
      delete this.listRoleUserUpdate[0][index]
    }
  }

  cannel() {
    this.errorMessenger = ''
    this.myFormAddTopic.reset()
  }

  isCheck(velue: boolean, data: any) {
    this.showCheck[data] = velue
  }
}

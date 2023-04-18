import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
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
  dataList:any = []
  dataListSub = []
  ListSub = []
  objectList = []
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
  subName: any
  edit: boolean = false;
  deleteMenu: boolean = false;
  roleList = ['BACKOFFICEAIS', 'BACKOFFICECSS', 'AISSHOP', 'ASP', 'TELEWIZ', 'BACKOFFICEAIS', 'AISBUDDYEXCLUSIVE', 'RETAILCHAIN', 'AISMINICORNER', 'PCBRANDAIS']
  channelTypeList = ['SFF-WEB', 'MYCHANNEL-APP']
  locationList = ['1100', '1111']
  myForm: FormGroup;
  myFormAddTopic: FormGroup;
  AccessToken: any
  Enviroment: any
  _channel: any = 'Select Role'
  _channelType: any = 'channelType(All)'
  _showDetail: any = [];
  errorMessenger: string = '';
  countDel:boolean = true;
  upDateOpen: boolean = false;
  constructor(
    public ApiListService: ApiListService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    // private clipboard: Clipboard
  ) {
    this.myForm = this.fb.group({
      AccessToken: '',
      Enviroment: '',
      Roleuser: '',
      channelType: '',
      locationCode: '',
      // email: '',
      // phone: ''
    });

    this.myFormAddTopic = this.fb.group({
      // roleUser:new FormControl(''),
      // location:new FormControl(''),
      // rules:new FormControl(''),
      // keywords:new FormControl(''),
      // _id:new FormControl(''),
      // outTopicName:new FormControl(''),
      // outTopicId:new FormControl(''),
      // outTopicGroup:new FormControl(''),
      // priority:new FormControl(''),
      // imgBase64:new FormControl(''),
      // isActive:new FormControl(''),
      // isRedirect:new FormControl(''),
      // function:new FormControl(''),
      // outUrl:new FormControl(''),
      // json:new FormControl(''),
      roleUser:'',
      location:'',
      rules:'',
      keywords:'',
      _id:'',
      outTopicName:'',
      outTopicId:'',
      outTopicGroup:'',
      priority:'',
      imgBase64:'',
      isActive:new FormControl('', Validators.required),
      isRedirect:new FormControl('', Validators.required),
      function:'',
      outUrl:'',
      json:'',
      __v:''
    });

    this.getDataMenuAll()
  }
  // async ngOnInit() {
  //   throw new Error('Method not implemented.');
  // }

  // async OnInit(){
  //   console.log('1');

  //   this.getDataMenu()
  // }

  getDataMenu() {
    this.dataList = []
    this.dataListSub = []
    this.objectList = []
    this.objecSubtList = []
    this.subInsideList = []
    this.ApiListService.queryMenu().then((res: any) => {
      this.objectList = res.data
      // console.log('this.objectList',this.objectList);
        this.objectList.forEach((data:any) => {
          console.log('OUT',data['outTopicName']);
          try {
            if (data.priority && data.isActive) {
              if (this.filterData(data) === true) {
                console.log('filterData', this.filterData(data) === true);
                this.dataList.push(data);
              }
            }
          } catch(err:any){
            console.log('catch',data['outTopicName']);
          }
        })

        console.log('this.dataList',this.dataList);
        this.dataList = this.dataList.sort((a:any, b:any) => a['priority'] - b['priority']);
      
    }).catch((res) => {
      this.dataList = []
      this.errorMessenger = JSON.stringify(res.error)
    })

    //  }
    this.ApiListService.queryMenuSub().then((res: any) => {
      this.objecSubtList = res.data
      this.objecSubtList.forEach((data) => {
        // console.log('OUT',data['outTopicName']);
        if (data['priority'] && data['isActive']) {
          if (this.filterData(data) === true) {
            this.dataListSub.push(data);
          }
        }
      })
      this.ListSub = this.dataListSub.sort((a, b) => a['priority'] - b['priority']);
      console.log('this.ListSub',this.ListSub);
      
    }).catch((res) => {
      console.log(res.error);
      this.dataListSub = []
      this.ListSub = []
      this.errorMessenger = JSON.stringify(res.error)
    })
    //  }
  }

  getDataMenuAll() {
    this.dataList = []
    this.dataListSub = []
    this.objectList = []
    this.objecSubtList = []
    this.subInsideList = []
    this.ListSub = []
    this.ApiListService.queryMenu().then((res: any) => {
      this.objectList = res.data
      this.objectList.forEach((data) => {
        if (data['priority'] && data['isActive']) {
          this.dataList.push(data);
        }
      })
      this.dataList = this.dataList.sort((a:any, b:any) => a['priority'] - b['priority']);
    })
    this.ApiListService.queryMenuSub().then((res: any) => {
      this.objecSubtList = res.data
      this.objecSubtList.forEach((data) => {
        if (data['priority'] && data['isActive']) {
          this.ListSub.push(data);
        }
      })
      this.ListSub = this.ListSub.sort((a, b) => a['priority'] - b['priority']);
    })
    //  }
  }
  checkSelectRole() {
    // this._channel = this.test?this.test.nativeElement.value : this._channel
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
        // this.myForm.value.locationCode = "undefined";
        this.myForm.value.locationCode = "ALL";
      }
      if (val.toUpperCase() === "ALL" || val === this.myForm.value.locationCode || this.myForm.value.locationCode === "ALL") {
        // console.log('location ALL)(',location);
        // console.log('location', val.toUpperCase() === "ALL");

        // console.log('val === this.myForm.value.locationCode',val === this.myForm.value.locationCode);

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
            channelTypeByRole = this.fillterRole.some((channelType: string) => {
              // console.log('channelType', channelType);
  
              if (!this.myForm.value.channelType) {
                this.myForm.value.channelType = "undefined";
              }
              if (channelType.toUpperCase() === "ALL" || channelType.toUpperCase() === this.myForm.value.channelType.toUpperCase()) {
                // console.log('channelType return',true);
                return true;
              }
              return false;
            })
          }
        });
      } catch(err:any){
        console.log('err',err,'roleuser',roleuser);
      }
    }
    if (location && channelTypeByRole) {
      return true
    } else {
      return false
    }
  }

  filterSubGroup(velueSub: any, res: any) {
    // console.log('sub', velueSub);
    // console.log('res', res);

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
            // console.log('channelType', channelType);

            if (!this.myForm.value.channelType) {
              this.myForm.value.channelType = "undefined";
            }
            if (channelType.toUpperCase() === "ALL" || channelType.toUpperCase() === this.myForm.value.channelType.toUpperCase()) {
              // console.log('channelType return',true);
              return true;
            }
            return false;
          })
        }
      });
    }
    // console.log('channelTypeByRole', channelTypeByRole);

    if (channelTypeByRole) {
      // console.log('checkGroup', res['topicGroup']);
      // console.log('checkGroup res', velueSub);

      if (res['topicGroup'] === velueSub) {
        checkGroup = true
      } else {
        checkGroup = false
      }
    }
    // console.log('location && channelTypeByRole && checkGroup', location && channelTypeByRole && checkGroup);

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
    // this.loopRule = data['rules'][0]['roleUser']
    // this.loopRule.forEach((res) => {
    //   let roleKey: any = Object.keys(res)
    //   this.roleKey = roleKey


    //   // console.log('this._showDetail',this._showDetail);
    //   this.roleKey.forEach((res: any) => {
    //     // this._showDetail['roleuser'].push(res)
    //     console.log('res', res);
    //     console.log('res cha', data['rules'][0]['roleUser'][0][res]);
    //     let mix = []
    //     mix = res
    //     console.log('mix',mix);

    //     this._showDetail.push(mix)
    //     console.log('_showDetail', this._showDetail);
    //     // console.log('cha', this._showDetail['roleuser'],'===',res);
    //     // this._showDetail['roleuser'][res].push(data['rules'][0]['roleUser'][0][res])

    //     // console.log('datas', this._showDetail['roleuser']);
    //   })


    // })
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
      console.log('SubTopic', SubTopic);
    } else {
      this.ListSub = []
    }

    // this.dataListSub = data
  }

  dropSub(dataGroup: any) {
    this.subInsideList = []
    let data = []
    console.log('dataGroup', dataGroup);
    this.subName = dataGroup
    this.menuSubname = dataGroup['menus']
    this.menuSubname.forEach((res) => {
      console.log('res.menus', res);
      if (this.filterData(res)) {
        this.subInsideList.push(res)
      }
    })
    console.log('subsub', this.subInsideList);
  }

  UpdateMenuTopic() {
    this.edit = false;
    this.MenuKey = []
    // if(!this.upDateOpen){
    // console.log('this._showDetail',this._showDetail);
    let data: any = Object.keys(this._showDetail)
    this.MenuKey = data
    // console.log('data',this.MenuKey);
    // }

  }

  fillterMenuKey(data: any) {
    // console.log(this._showDetail['outTopicName']);

    if (data == 'rules') {
      let velue = []
      velue = Object.keys(this._showDetail[data][0])
      return velue || "null"
    } else {
      // console.log('2',data,' ==> ',this._showDetail[data]);
      // console.log('data',data);
      
      return this._showDetail[data] || "null"
    }
  }

  ObjectReturn(data: any) {
    // console.log('ObjectReturn',data );
    let velue = []
    velue = Object.keys(data)
    // console.log('velue',velue);
    // console.log('this.myFormAddTopic.controls',this.myFormAddTopic.controls);
    
    return velue|| ''
  }

  isJSON(str: string) {
    try {
      return JSON.stringify(str)
    } catch (e) {
      return false;
    }
  }
  checkTypeOf(velue: any) {
    // console.log('typeof(str)',velue);
    if (typeof (this._showDetail[velue]) == 'boolean') {
      return true
    } else {
      return false
    }
  }

  deleteMenuTopic() {
    // console.log('Delete', 'ID', this._showDetail['_id'], 'Name', this._showDetail['outTopicName']);
    window.location.href = ''
    // this.getDataMenu()
    this.ApiListService.delMenuTopicLanding(this._showDetail['_id'],this._showDetail['outTopicName'])
    this.deleteMenu = false;
  }



  setTimeout(){
    this.countDel = true
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.countDel = false;
    }, 3000);
  }
  
  updateMenuTopic(){
    let Menu:any = []
    Menu = {
      'keywords': [this.myFormAddTopic.value.keywords]  || this._showDetail['keywords'],
      'rules': [],
      'id': this._showDetail['_id'],//Not change _id to id
      // 'outTopicName': this.myFormAddTopic.value.outTopicName  || this._showDetail['outTopicName'],
      'outTopicName': this._showDetail['outTopicName'], //Not change outTopicName
      'outTopicId': this.myFormAddTopic.value.outTopicId  || this._showDetail['outTopicId'],
      'outTopicGroup': this.myFormAddTopic.value.outTopicGroup  || this._showDetail['outTopicGroup'],
      'priority': this.myFormAddTopic.value.priority  || this._showDetail['priority'],
      'imgBase64': this.myFormAddTopic.value.imgBase64  || this._showDetail['imgBase64'],
      'isActive': this.myFormAddTopic.value.isActive  || this._showDetail['isActive'],
      'isRedirect': this.myFormAddTopic.value.isRedirect  || this._showDetail['isRedirect'],
      'function': this.myFormAddTopic.value.function  || this._showDetail['function'],
      'outUrl': this.myFormAddTopic.value.outUrl  || this._showDetail['outUrl'],
      'json': this.myFormAddTopic.value.json  || this._showDetail['json'],
    }
    Menu['rules'] = [{
      // 'roleUser': [this.myFormAddTopic.value.roleUser]|| this._showDetail['rules'][0]['roleUser'],
      // 'location': [this.myFormAddTopic.value.location] || this._showDetail['rules'][0]['location'][0],
      'roleUser': this._showDetail['rules'][0]['roleUser'],
      'location': this._showDetail['rules'][0]['location'],
      'type': this._showDetail['rules'][0]['type'],
    }]    

    console.log('Menu',Menu);
    console.log('this._showDetail',this._showDetail);

    console.log('===',JSON.stringify(this._showDetail) === JSON.stringify(Menu));
    // delete Menu['_id'];
    delete Menu['__v'];
    delete Menu['json'];
    // Menu['id'] = JSON.stringify(this._showDetail['_id'])
    // Menu.replace("_id", "id"); 
    // Menu = JSON.parse(Menu)
    console.log('Menu Parse',Menu);
    
    // Menu.Replace("_id", "id"); 
    if(Menu['outTopicName'] && Menu['id']){
      this.ApiListService.updateMenuTopicLanding(Menu,this.token).then((res)=>{
        console.log('res',res);
        window.location.href = ''
      })
    }
    this.myFormAddTopic.reset()
  }


  cannel(){
    this.myFormAddTopic.reset()
  }
}

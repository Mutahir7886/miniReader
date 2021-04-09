import {Component, ElementRef, HostListener, AfterViewInit, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Socket} from "ngx-socket-io";
import {HttpService} from "../../../services/http.service";
import {apiUrls} from "../../../environments/apis/api.urls";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialog} from "@angular/material/dialog";
import {getTime} from "ngx-bootstrap/chronos/utils/date-getters";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";


@Component({
  selector: 'app-logreader',
  templateUrl: './logreader.component.html',
  styleUrls: ['./logreader.component.css']
})
export class LogreaderComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild('div1', {static: false}) private div1: ElementRef;
  @ViewChild('div2', {static: false}) private div2: ElementRef;
  @ViewChild('startSession', {static: false}) private startSession: ElementRef;
  // @ViewChild('headerClicked', {static: false}) private headerClicked: ElementRef;

  email;
  domain;
  myData = [];
  idToPass;
  indexToBeDeleted;
  readerStatus = 'Disconnected';
  codeArray = [];

  constructor(public router: Router,
              private httpService: HttpService,
              private socket: Socket,
              private modalService: NgbModal,
              private ngxUiLoaderService: NgxUiLoaderService,
              private toastr: ToastrService
  ) {

    if (localStorage.getItem('session_logs')) {
      let session_logs = JSON.parse(localStorage.getItem('session_logs'))
      session_logs.forEach(value => {
        this.myData.push(value)
      })
    }
    if (localStorage.getItem('session_codes')) {
      let session_codes = JSON.parse(localStorage.getItem('session_codes'))
      session_codes.forEach(value => {
        this.codeArray.push(value)
      })
    }
  }

  loading = true;

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('user_object')).email
    this.domain = JSON.parse(localStorage.getItem('user_object')).domain

    this.loading = true

    this.socket.connect();
    this.socket.on("logs", (data) => {
      this.loading = false

      if (data.logType == 'unable_to_connect_reader' || data.logType == 'connecting_reader') {
        this.readerStatus = 'Disconnected'

      }
      if (data.logType == 'connected_reader') {
        this.readerStatus = 'Connected'

      }

      if (data.logType == 'code') {
        // data.time = (new Date().getHours()).toString() + ":" + (new Date().getMinutes()).toString()
        this.codeArray.push({
          'code': parseInt(data.originalCode.code, 10),
          'time': data.originalCode.createdAt,
          '_id': data.originalCode._id
        })
        // this.codeArray.push(data)
        // console.log('123',this.codeArray)
        // data.codeScrollId=this.getUniqueId()
      }
      // data.uuid=this.getUniqueId()
      this.myData.push(data)

      setTimeout(() => {
        // const postDiv = document.getElementById(data.uuid);
        // postDiv.scrollIntoView({behavior: 'smooth'});
        this.div1.nativeElement.scrollTop = this.div1.nativeElement.scrollHeight;
        // postDiv.scrollTo(0,postDiv.scrollHeight);

        if (data.logType == 'code') {
          // const codeScrolldiv = document.getElementById(data.codeScrollId);
          // // codeScrolldiv.scrollTo(0,codeScrolldiv.scrollHeight);
          // codeScrolldiv.scrollIntoView({behavior: 'smooth'});
          this.div2.nativeElement.scrollTop = this.div2.nativeElement.scrollHeight;
        }
      }, 100);


    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    $event.returnValue = " ";
    this.ngOnDestroy()
    return $event.returnValue;
  }

  ngOnDestroy(): void {

    if (localStorage.getItem('user_object')) {
      localStorage.setItem('session_logs', JSON.stringify(this.myData))
      localStorage.setItem('session_codes', JSON.stringify(this.codeArray))
    }
    this.socket.disconnect();
  }

  ngAfterViewInit(): void {
    this.modalService.open(this.startSession, {backdrop: 'static', keyboard: false})
    // this.headerClicked.nativeElement.click();
  }

  signout(): void {
    this.ngxUiLoaderService.start();
    this.modalService.dismissAll()

    this.httpService.post(apiUrls.signout, {}).subscribe(data => {
      console.log(data)
      this.ngxUiLoaderService.stop();
      this.socket.disconnect();
      this.modalService.dismissAll()
      this.toastr.success('Logout Successfully');
      localStorage.removeItem('user_object')
      localStorage.removeItem("dripInventoryToken")
      localStorage.removeItem('session_logs')
      localStorage.removeItem('session_codes')
      this.router.navigate(['/login']);
    }, error => {
      console.log(error)
      this.ngxUiLoaderService.stop();


    });
    console.log('123')

  }

  // disconnect() {
  //   this.connected = false;
  // }
  //
  // connect() {
  //   this.connected = true;
  //   // this.lisst.push('B')
  //
  // }

  openDeleteModal(modal, indexToBeDeleted, idToPass) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});
    this.idToPass = idToPass;
    this.indexToBeDeleted = indexToBeDeleted;

  }

  delete() {
    this.ngxUiLoaderService.start();
    console.log(this.idToPass)
    console.log(this.indexToBeDeleted)
    this.modalService.dismissAll()
    this.httpService.post(apiUrls.delete, {id: this.idToPass}).subscribe(data => {
      console.log('returneddata', data)
      this.toastr.success('Deleted Successfully');
      this.ngxUiLoaderService.stop();
      this.codeArray.splice(this.indexToBeDeleted, 1)
      this.modalService.dismissAll()
    }, error => {
      this.ngxUiLoaderService.stop();

      console.log(error.error)
    });

  }

  // clearLogs() {
  //   this.mydata = []
  // }
  //
  //
  // gotoTop() {
  //   const goTop = document.getElementById('logScreen');
  //   goTop.scrollTop = 0
  // }

  openEndSession(modal) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false});

  }
}



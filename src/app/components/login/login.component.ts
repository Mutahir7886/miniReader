import {Component, OnInit, Sanitizer} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../services/http.service";
import {Router} from "@angular/router";
import {apiUrls} from "../../../environments/apis/api.urls";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ToastrService} from "ngx-toastr";
import {NoSpaceValidator} from '../../shared/validator';
import {DomSanitizer} from "@angular/platform-browser";

// import { passwordSpaceValidator } from '../../shared/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formGroup1: FormGroup;
  urlBackground =
    'url("../../../assets/loginBackground.png") no-repeat center / cover';
  urlGif =
    'url(../../../assets/dripanimation.gif) center center / contain no-repeat #000';
  gifPlayed = false;


  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService,
              public router: Router,
              private ngxUiLoaderService: NgxUiLoaderService,
              private toastr: ToastrService,
              private sanitizer: DomSanitizer) {
    this.formGroup1 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      domain: ['', [Validators.required, NoSpaceValidator.cannotContainSpace]],
      password: ['', [Validators.required, Validators.minLength(5), NoSpaceValidator.cannotContainSpace]],
    });

  }

  ngOnInit(): void {
    setInterval(() => {
      this.gifPlayed = true;
    }, 3000)
  }

  get domain(): FormControl {
    return this.formGroup1.get('domain') as FormControl;
  }

  get email(): FormControl {
    return this.formGroup1.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.formGroup1.get('password') as FormControl;
  }

  submit(formGroup1: FormGroup) {
    this.ngxUiLoaderService.start();
    console.log(formGroup1.value);
    console.log(apiUrls.login)
    this.httpService.post(apiUrls.login, {
      email: this.email.value,
      password: this.password.value,
      domain: this.domain.value
    }).subscribe(data => {
      console.log(data)
      console.log(data.token)
      localStorage.setItem("dripInventoryToken", data.token)
      localStorage.removeItem('session_logs')
      localStorage.removeItem('session_codes')
      this.toastr.success('Successfully logged in')
      this.ngxUiLoaderService.stop();
      localStorage.setItem("user_object", JSON.stringify(formGroup1.value))
      this.router.navigate(['/logreader']);
      formGroup1.reset();
    }, error => {
      this.ngxUiLoaderService.stop();

    });

  }
}

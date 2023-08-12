import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  public formSubmitted: boolean = false;

  @ViewChild('googleBtn')
  public googleBtn?: ElementRef;

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private usuarioService: UsuarioService) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    console.log({ google });

      google.accounts.id.initialize({
        client_id: "278391627802-d6ii9qp0fmp567fbaio5otutq70gj902.apps.googleusercontent.com",
        callback: (response: any) => this.ngZone.run(() => this.handleCredentialResponse(response))
      });
      google.accounts.id.renderButton(
        this.googleBtn?.nativeElement,
        { theme: "outline", size: "large" }
      );
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
      .subscribe({
        next: resp => {
          console.log({ login: resp })
          this.router.navigateByUrl('/');
        },
        error: err => console.log({ err })
      });
  }

  login() {
    console.log(this.loginForm.value);

    this.usuarioService.login(this.loginForm.value)
      .subscribe({
        next: resp => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value)
          }
          else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      });

  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { ToastType } from 'src/app/constants/toast.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  async login() {
    // this.isFormSubmitted = true;
    // if (!this.loginForm.valid) return;
    // const value = this.loginForm.value;
    // this.loading = true;
    const result = await this.authService.login(
      this.username.trim(),
      this.password.trim()
    );

    if (
      result.success &&
      !result.data?.primerLogueo &&
      !result.data?.cambiarContraseña
    ) {
      this.utilsService.showToast(result.message);
      this.router.navigate(['pages/home']);
      } else if (result.data?.primerLogueo) {
        this.utilsService.showToast(result.message);
        this.router.navigate(['auth/createUser']);
        // this.router.navigate(['/auth/restore-password'], {
        //   queryParams: { token: result.data.restoreToken },
        // });
    } else if (result.data?.cambiarContraseña) {
      this.utilsService.showToast(result.message);
      this.router.navigate(['auth/changePassword'], {
        queryParams: { idUsuario: result.data.id_usuario },
      });
    } else {
      this.utilsService.showToast(result.message, ToastType.ERROR);
      this.username = '';
      this.password = '';
    }
  }
}

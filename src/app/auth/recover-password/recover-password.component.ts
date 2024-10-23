import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { ToastType } from 'src/app/constants/toast.constant';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  async forgotPassword() {
    const result = await this.authService.forgotPassword(this.email.trim());
    if (result.success) {
      this.utilsService.showToast(result.message);
      this.router.navigate(['auth/login']);
    } else {
      this.utilsService.showToast(result.message, ToastType.ERROR);
      this.email = '';
    }
  }
}

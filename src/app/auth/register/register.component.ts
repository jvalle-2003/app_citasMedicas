import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { ToastType } from 'src/app/constants/toast.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: String = '';
  email: String = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  async register() {
    const result = await this.authService.register(
      this.username.trim(),
      this.email.trim()
    );

    if (result.success) {
      this.utilsService.showToast(result.message);
      this.router.navigate(['auth/login']);
    } else {
      this.utilsService.showToast(result.message, ToastType.ERROR);
      this.username = '';
      this.email = '';
    }
  }
}

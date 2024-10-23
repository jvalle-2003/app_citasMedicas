import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { ToastType } from 'src/app/constants/toast.constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  newPassword: String = '';
  confirmPassword: String = '';
  idUsuario: number | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idUsuario = params['idUsuario'];
    });
  }

  async changePassword() {
    const result = await this.authService.changePassword(
      this.newPassword.trim(),
      this.confirmPassword.trim(),
      this.idUsuario
    );
    if (result.success) {
      this.utilsService.showToast(result.message);
      this.router.navigate(['pages/home']);
    } else {
      this.utilsService.showToast(result.message, ToastType.ERROR);
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { ToastType } from 'src/app/constants/toast.constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  idUsuario: number | undefined;
  data: any = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.data = localStorage.getItem('Usuario');
    if (this.data) {
      const usuarioData = JSON.parse(this.data);
      this.idUsuario = usuarioData.id_usuario;
    }
  }

  async changePassword() {
    if (!this.idUsuario) {
      this.utilsService.showToast(
        'El usuario no está autenticado',
        ToastType.ERROR
      );
      return;
    }

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

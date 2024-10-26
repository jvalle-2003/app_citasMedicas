import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { ToastType } from 'src/app/constants/toast.constant';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  // Propiedad para controlar la visibilidad de la contraseña
  showPassword: boolean = false;

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  data: any = '';
  paciente = {
    id_usuario: 0,
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    codigo_paciente: '',
  };

  actualPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.data = localStorage.getItem('Usuario');
    if (this.data) {
      const usuarioData = JSON.parse(this.data);
      this.paciente.id_usuario = usuarioData.id_usuario;
      this.paciente.codigo_paciente = usuarioData.id_usuario;
      this.paciente.correo_electronico = usuarioData.correoElectronico;
    }
  }

  async guardarPaciente() {
    try {
      // Primero, verifica si el usuario está autenticado
      if (!this.paciente.id_usuario) {
        this.utilsService.showToast(
          'El usuario no está autenticado',
          ToastType.ERROR
        );
        return;
      }

      // Guarda al paciente y verifica si la operación fue exitosa
      const saveResult = await this.authService.savePacient(
        this.paciente,
        this.paciente.id_usuario
      );
      if (!saveResult.success) {
        this.utilsService.showToast(saveResult.message, ToastType.ERROR);
        return;
      }

      // Cambia la contraseña después de guardar el paciente
      const passwordResult = await this.authService.changePasswordRegister(
        this.actualPassword.trim(),
        this.newPassword.trim(),
        this.confirmPassword.trim(),
        this.paciente.id_usuario
      );

      if (passwordResult.success) {
        this.utilsService.showToast('Paciente creado correctamente');
        this.router.navigate(['pages/home']);
      } else {
        this.utilsService.showToast(passwordResult.message, ToastType.ERROR);
        this.newPassword = '';
        this.confirmPassword = '';
      }
    } catch (error) {
      console.error('Error al guardar el paciente:', error);
      this.utilsService.showToast(
        'Ocurrió un error inesperado',
        ToastType.ERROR
      );
    }
  }

  async changePassword() {}
}

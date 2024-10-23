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
    const result = await this.authService.savePacient(
      this.paciente,
      this.paciente.id_usuario
    );

    if (result.success) {
      this.utilsService.showToast(result.message);
      this.router.navigate(['pages/home']);
    } else {
      this.utilsService.showToast(result.message, ToastType.ERROR);
    }
  }
}

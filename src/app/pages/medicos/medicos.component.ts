import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { Medico } from '../../interfaces/medico';
import { ToastType } from 'src/app/constants/toast.constant';
import { MedicoService } from 'src/app/services/medicoService/medico-service.service';
import { UsuarioServiceService } from 'src/app/services/usuarioService/usuario-service.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss'],
})
export class MedicosComponent {
  medico: Medico[] = [];
  usuario: any[] = [];

  modalVisible: boolean = false;
  modalHeader: string = '';
  modalMode: 'crear' | 'editar' | 'ver' = 'crear';
  fecha: string = '';
  medicoSeleccionado: any = 0;

  data = {
    idUsuario: 0,
    especialidad: '',
    numeroLicencia: '',
    apellidos: '',
    nombres: '',
  };
  constructor(
    private utilsService: UtilsService,
    private usuarioService: UsuarioServiceService,
    private medicoService: MedicoService
  ) {
    this.cargarUsuarios();
  }

  ngOnInit(): void {
    this.listarMedicos();
  }
  async cargarUsuarios() {
    try {
      const result = await this.usuarioService.obtenerTodosLosUsuariosMedicos();
      console.log(result);

      if (result.success) {
        this.usuario = result.data.map((usuario: any) => ({
          label: `${usuario.id_usuario}` + ' | ' + `${usuario.nombreUsuario} `,
          value: usuario.id_usuario,
        }));
      }
    } catch (error) {
      this.utilsService.showToast(
        'Error al cargar los usuarios',
        ToastType.ERROR
      );
    }
  }

  formatFechaHora(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  async listarMedicos() {
    try {
      const result = await this.medicoService.listarMedicos();
      console.log(result);

      this.medico = result.data;
    } catch (error) {
      this.utilsService.showToast(
        'Error al cargar los Medicos',
        ToastType.ERROR
      );
    }
  }

  mostrarModal(mode: 'crear' | 'editar' | 'ver', medico?: Medico) {
    this.modalMode = mode;
    this.modalHeader =
      mode === 'crear'
        ? 'Nuevo Medico'
        : mode === 'editar'
        ? 'Editar MEdico'
        : 'Ver Medico';
    this.modalVisible = true;

    if (medico && (mode === 'editar' || mode === 'ver')) {
      this.medicoSeleccionado = medico.id_medico;
      this.data = {
        idUsuario: medico.idUsuario,
        especialidad: medico.especialidad,
        numeroLicencia: medico.numeroLicencia,
        apellidos: medico.apellidos,
        nombres: medico.nombres,
      };
    } else {
      this.data = {
        idUsuario: 0,
        especialidad: '',
        numeroLicencia: '',
        apellidos: '',
        nombres: '',
      };
    }
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  async guardarMedico() {
    try {
      // Validación de campos vacíos
      if (
        !this.data.idUsuario ||
        !this.data.especialidad ||
        !this.data.numeroLicencia ||
        !this.data.apellidos ||
        !this.data.nombres
      ) {
        this.utilsService.showToast(
          'Por favor, complete todos los campos obligatorios.',
          ToastType.ERROR
        );
        return; // Salir del método si hay campos vacíos
      }

      if (this.modalMode === 'crear') {
        const result = await this.medicoService.guardarMedico(this.data);
        if (result.success) {
          this.utilsService.showToast(result.message);
          this.listarMedicos();
        } else {
          this.utilsService.showToast(result.message, ToastType.ERROR);
        }
      } else if (this.modalMode === 'editar') {
        const result = await this.medicoService.actualizarMedico(
          this.medicoSeleccionado,
          this.data
        );

        if (result.success) {
          this.utilsService.showToast(result.message);
          this.listarMedicos();
        } else {
          this.utilsService.showToast(result.message, ToastType.ERROR);
        }
      }
      // Restablece data para limpiar el formulario después de guardar
      this.data = {
        idUsuario: 0,
        especialidad: '',
        numeroLicencia: '',
        apellidos: '',
        nombres: '',
      };
    } catch (error) {
      this.utilsService.showToast(
        'Error al guardar el medico',
        ToastType.ERROR
      );
    }

    this.cerrarModal();
  }

  async eliminarMedico(medico: Medico) {
    try {
      console.log(medico.id_medico);

      const result = await this.medicoService.eliminarMedico(medico.id_medico);
      console.log(result);

      if (result.success) {
        console.log(result);

        this.utilsService.showToast(result.message);
      } else {
        this.utilsService.showToast(result.message, ToastType.ERROR);
      }
      this.listarMedicos();
    } catch (error) {
      this.utilsService.showToast(
        'Error al eliminar el medico',
        ToastType.ERROR
      );
    }
  }
}

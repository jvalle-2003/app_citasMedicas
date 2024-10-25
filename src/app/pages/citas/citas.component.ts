import { PacienteService } from './../../services/pacienteService/paciente-service.service';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { DatingServiceService } from 'src/app/services/datingService/dating-service.service';
import { Cita } from '../../interfaces/cita';
import { ToastType } from 'src/app/constants/toast.constant';
import { MedicoService } from 'src/app/services/medicoService/medico-service.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
})
export class CitasComponent implements OnInit {
  citas: Cita[] = [];
  medicos: any[] = [];
  estados: any[] = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'Cancelada', value: 'cancelada' },
    { label: 'Completada', value: 'completada' },
  ];

  estadoSelecionado = '';
  modalVisible: boolean = false;
  modalHeader: string = '';
  modalMode: 'crear' | 'editar' | 'ver' = 'crear';
  fecha: string = '';
  citaSeleccionada: any = 0;
  pacientes: any[] = [];

  data = {
    paciente: {
      id_paciente: 0,
    },
    medico: {
      id_medico: 0,
    },
    fechaHora: new Date() as Date | string,
    motivoConsulta: '',
    estado: 'pendiente',
  };

  constructor(
    private utilsService: UtilsService,
    private datingService: DatingServiceService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService
  ) {
    this.cargarCitas();
    this.getPacientes();
  }

  ngOnInit(): void {
    this.cargarCitas();
  }

  async getPacientes() {
    try {
      const result = await this.pacienteService.listarPacientes();
      if (result.success) {
        this.pacientes = result.data.map((paciente: any) => ({
          label: `${paciente.nombres} ${paciente.apellidos}`,
          value: paciente.id_paciente,
        }));
      }
    } catch (error) {
      this.utilsService.showToast(
        'Error al cargar los pacientes',
        ToastType.ERROR
      );
    }
  }

  async getMedicos(event: Date) {
    this.data.fechaHora = event;
    const fechaHoraFormateada = this.formatFechaHora(this.data.fechaHora);
    this.fecha = fechaHoraFormateada;
    try {
      const result = await this.medicoService.obtenerMedicosSinCita(
        fechaHoraFormateada
      );
      if (result.success) {
        this.medicos = result.data.map((medico: any) => ({
          label: `${medico.nombres} ${medico.apellidos}`,
          value: medico.id_medico,
        }));
      }
    } catch (error) {
      this.utilsService.showToast(
        'Error al cargar los médicos',
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

  async cargarCitas() {
    try {
      const result = await this.datingService.obtenerTodasLasCitas();
      this.citas = result.data;
    } catch (error) {
      this.utilsService.showToast('Error al cargar las citas', ToastType.ERROR);
    }
  }

  getSeverity(estado: string): string {
    switch (estado) {
      case 'pendiente':
        return 'warning';
      case 'completada':
        return 'success';
      case 'cancelada':
        return 'danger';
      default:
        return 'info';
    }
  }

  mostrarModal(mode: 'crear' | 'editar' | 'ver', cita?: Cita) {
    this.modalMode = mode;
    this.modalHeader =
      mode === 'crear'
        ? 'Nueva Cita'
        : mode === 'editar'
        ? 'Editar Cita'
        : 'Ver Cita';
    this.modalVisible = true;

    if (cita && (mode === 'editar' || mode === 'ver')) {
      this.citaSeleccionada = cita.id_cita;
      this.data = {
        paciente: { id_paciente: cita.paciente.id_paciente },
        medico: { id_medico: cita.medico.id_medico },
        fechaHora: new Date(cita.fechaHora),
        motivoConsulta: cita.motivoConsulta,
        estado: cita.estado,
      };
    } else {
      this.data = {
        paciente: { id_paciente: 0 },
        medico: { id_medico: 0 },
        fechaHora: new Date(),
        motivoConsulta: '',
        estado: 'pendiente',
      };
    }
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  async guardarCita() {
    try {
      // Validación de campos vacíos
      if (
        !this.data.paciente.id_paciente ||
        !this.data.medico.id_medico ||
        !this.data.fechaHora ||
        !this.data.motivoConsulta
      ) {
        this.utilsService.showToast(
          'Por favor, complete todos los campos obligatorios.',
          ToastType.ERROR
        );
        return; // Salir del método si hay campos vacíos
      }

      if (this.modalMode === 'crear') {
        this.data.fechaHora = this.fecha; // Confirma que se está asignando el valor correcto
        const result = await this.datingService.saveCita(this.data);
        if (result.success) {
          this.utilsService.showToast(result.message);
          this.cargarCitas();
        } else {
          this.utilsService.showToast(result.message, ToastType.ERROR);
        }
      } else if (this.modalMode === 'editar') {
        this.data.fechaHora = this.fecha;
        console.log('Estado enviado:', this.data.estado); // Verifica el valor en consola
        const result = await this.datingService.actualizarCita(
          this.citaSeleccionada,
          this.data
        );

        if (result.success) {
          this.utilsService.showToast(result.message);
          this.cargarCitas();
        } else {
          this.utilsService.showToast(result.message, ToastType.ERROR);
        }
      }
      // Restablece data para limpiar el formulario después de guardar
      this.data = {
        paciente: { id_paciente: 0 },
        medico: { id_medico: 0 },
        fechaHora: new Date(),
        motivoConsulta: '',
        estado: 'pendiente', // Estado por defecto
      };
    } catch (error) {
      this.utilsService.showToast('Error al guardar la cita', ToastType.ERROR);
    }

    this.cerrarModal();
  }

  async eliminarCita(cita: Cita) {
    try {
      const result = await this.datingService.eliminarCita(cita.id_cita);
      this.citas = this.citas.filter((c) => c.id_cita !== cita.id_cita);
      this.utilsService.showToast(result.message);
    } catch (error) {
      this.utilsService.showToast('Error al eliminar la cita', ToastType.ERROR);
    }
  }
}

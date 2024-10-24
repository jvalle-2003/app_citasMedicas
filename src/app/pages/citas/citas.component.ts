import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { DatingServiceService } from 'src/app/services/datingService/dating-service.service'; // Importa el servicio
import { Cita } from '../../interfaces/cita'; // Asegúrate de que la interfaz Cita esté importada
import { ToastType } from 'src/app/constants/toast.constant';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
})
export class CitasComponent implements OnInit {
  citas: Cita[] = [];
  pacientes: [] = [];
  medicos: [] = [];
  modalVisible: boolean = false;
  modalHeader: string = '';
  modalMode: 'crear' | 'editar' | 'ver' = 'crear';
  citaSeleccionada: Cita = this.crearNuevaCita();

  constructor(
    private utilsService: UtilsService,
    private datingService: DatingServiceService // Inyecta el servicio aquí
  ) {
    this.cargarCitas();
  }

  ngOnInit(): void {
    this.cargarCitas();
  }

  async cargarCitas() {
    try {
      const result = await this.datingService.obtenerTodasLasCitas(); // Asegúrate de que el método esté definido en el servicio
      this.citas = result.data; // Suponiendo que la respuesta tiene un campo "data" con las citas
    } catch (error) {
      this.utilsService.showToast('Error al cargar las citas', ToastType.ERROR);
    }
  }

  mostrarModal(mode: 'crear' | 'editar' | 'ver', cita?: Cita) {
    this.modalMode = mode;
    this.citaSeleccionada = cita ? { ...cita } : this.crearNuevaCita();
    this.modalHeader =
      mode === 'crear'
        ? 'Nueva Cita'
        : mode === 'editar'
        ? 'Editar Cita'
        : 'Ver Cita';
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.citaSeleccionada = this.crearNuevaCita();
  }

  async guardarCita() {
    try {
      let result;

      if (this.modalMode === 'crear') {
        result = await this.datingService.saveCita(this.citaSeleccionada); // Asegúrate de que el método esté definido en el servicio
        this.utilsService.showToast('Cita creada con éxito');
        this.citas.push(result.data); // Asumiendo que el nuevo objeto se devuelve en "data"
      } else if (this.modalMode === 'editar') {
        result = await this.datingService.actualizarCita(
          this.citaSeleccionada.id_cita,
          this.citaSeleccionada
        ); // Asegúrate de que el método esté definido en el servicio
        this.utilsService.showToast('Cita actualizada con éxito');
        const index = this.citas.findIndex(
          (c) => c.id_cita === this.citaSeleccionada.id_cita
        );
        if (index !== -1) this.citas[index] = { ...this.citaSeleccionada };
      }
    } catch (error) {
      this.utilsService.showToast('Error al guardar la cita', ToastType.ERROR);
    }

    this.cerrarModal();
  }

  async eliminarCita(cita: Cita) {
    try {
      const result = await this.datingService.eliminarCita(cita.id_cita);
      console.log(result);
      console.log(result.success);

      this.citas = this.citas.filter((c) => c.id_cita !== cita.id_cita);
      if (result.success) {
        console.log(result.success);
        this.utilsService.showToast(result.message);
      } else {
        this.utilsService.showToast(result.message, ToastType.ERROR);
      }
      this.utilsService.showToast(result.message);
    } catch (error) {
      this.utilsService.showToast('Error al eliminar la cita', ToastType.ERROR);
    }
  }

  private crearNuevaCita(): Cita {
    return {
      id_cita: 0,
      paciente: {
        id_paciente: 0,
        idUsuario: 0,
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        direccion: '',
        telefono: '',
        correoElectronico: '',
        codigoPaciente: '',
        fechaCreacion: '',
      },
      medico: {
        id_medico: 0,
        idUsuario: 0,
        nombres: '',
        apellidos: '',
        especialidad: '',
        numeroLicencia: '',
        fechaCreacion: '',
      },
      fechaHora: '',
      motivoConsulta: '',
      estado: '',
      fechaCreacion: '',
    };
  }
}

import { Component,OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { Paciente } from 'src/app/interfaces/paciente'; 
import { ToastType } from 'src/app/constants/toast.constant';
import { PacienteService } from 'src/app/services/pacienteService/paciente-service.service'; 
import { UsuarioServiceService } from 'src/app/services/usuarioService/usuario-service.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent {
  paciente: Paciente[] = [];
  usuario: any[] = [];

  modalVisible: boolean = false;
  modalHeader: string = '';
  modalMode: 'crear' | 'editar' | 'ver' = 'crear';
  fecha: string = '';
  pacienteSeleccionado: any = 0;

  data = {
    idUsuario: 0,
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "", // Formato ISO (YYYY-MM-DD) o como cadena
    correoElectronico: "", // Opcional si no siempre se utiliza
    codigoPaciente: ""
   

  };
  constructor(
    private utilsService: UtilsService,
    private usuarioService: UsuarioServiceService,
    private pacienteService: PacienteService,
    
    
  ) {
    this.cargarPacientes();
    this.cargarUsuarios();
  }

  ngOnInit(): void {
    this.listarPacientes();
    
  }
  async cargarPacientes() {
    try {
      const result = await this.pacienteService.listarPacientes();
      if (result.success) {
        this.paciente = result.data.map((paciente: any) => ({
          label: `${paciente.id_usuario}`,
          value: paciente.id_usuario,
        }));
      }
    } catch (error) {
      this.utilsService.showToast(
        'Error al cargar los pacientes',
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

  async listarPacientes() {
    try {
      const result = await this.pacienteService.listarPacientes();
      this.paciente = result.data;
    } catch (error) {
      this.utilsService.showToast('Error al cargar los Pacientes', ToastType.ERROR);
    }
  }

 

  mostrarModal(mode: 'crear' | 'editar' | 'ver', paciente?: Paciente) {
    this.modalMode = mode;
    this.modalHeader =
      mode === 'crear'
        ? 'Nuevo Paciente'
        : mode === 'editar'
        ? 'Editar Paciente'
        : 'Ver Medico';
    this.modalVisible = true;

    if (paciente && (mode === 'editar' || mode === 'ver')) {
      this.pacienteSeleccionado = paciente.id_paciente;
      this.data = {
        idUsuario: paciente.idUsuario ,
        nombres:paciente.nombres,
        apellidos:paciente.apellidos,
        telefono:paciente.telefono,
        direccion:paciente.direccion,
        fechaNacimiento:paciente.fechaNacimiento,
        correoElectronico:paciente.correoElectronico,
        codigoPaciente:paciente.codigoPaciente
    
      };
    } else {
      this.data = {
        idUsuario: 0,
        nombres: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        fechaNacimiento: "", // Formato ISO (YYYY-MM-DD) o como cadena
        correoElectronico: "", // Opcional si no siempre se utiliza
        codigoPaciente: ""
      };
    }
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  async guardarPaciente() {
    try {
      // Validación de campos vacíos
      if (
        !this.data.idUsuario ||
        !this.data.nombres ||
        !this.data.apellidos ||
        !this.data.telefono ||
        !this.data.fechaNacimiento ||
        !this.data.correoElectronico ||
        !this.data.codigoPaciente ||
        !this.data.nombres
      ) {
        this.utilsService.showToast(
          'Por favor, complete todos los campos obligatorios.',
          ToastType.ERROR
        );
        return; // Salir del método si hay campos vacíos
      }

      if (this.modalMode === 'crear') {
        const result = await this.pacienteService.guardarPaciente(this.data.idUsuario,this.data);
        if (result.success) {
          this.utilsService.showToast(result.message);
          this.listarPacientes();
        } else {
          this.utilsService.showToast(result.message, ToastType.ERROR);
        }
      } else if (this.modalMode === 'editar') {
        const result = await this.pacienteService.actualizarPaciente(
          this.pacienteSeleccionado,
          this.data
        );

        if (result.success) {
          this.utilsService.showToast(result.message);
          this.listarPacientes();
        } else {
          this.utilsService.showToast(result.message, ToastType.ERROR);
        }
      }
      // Restablece data para limpiar el formulario después de guardar
      this.data = {
        idUsuario: 0,
        nombres: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        fechaNacimiento: "", // Formato ISO (YYYY-MM-DD) o como cadena
        correoElectronico: "", // Opcional si no siempre se utiliza
        codigoPaciente: ""
    
      };
    } catch (error) {
      this.utilsService.showToast('Error al guardar el paciente', ToastType.ERROR);
    }

    this.cerrarModal();
  }

  async eliminarPAciente(paciente: Paciente) {
    try {
      console.log(paciente.id_paciente);
      
      const result = await this.pacienteService.eliminarPaciente(paciente.id_paciente);
      console.log(result);
      
      if(result.success){
        console.log(result);
        
        this.utilsService.showToast(result.message);
      } else{
        this.utilsService.showToast(result.message,ToastType.ERROR);
      }
      this.listarPacientes();
    } catch (error) {
      this.utilsService.showToast('Error al eliminar el medico', ToastType.ERROR);
    }
    
  }

  async cargarUsuarios() {
    try {
      const result = await this.usuarioService.obtenerTodosLosUsuarios();
      if (result.success) {
        this.usuario = result.data.map((usuario: any) => ({
          label: `${usuario.id_usuario}`,
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

}

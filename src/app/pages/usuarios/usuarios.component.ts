import { Component,OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utilsService/utils-service.service';
import { Usuarios } from '../../interfaces/usuarios';
import { ToastType } from 'src/app/constants/toast.constant';
import { UsuarioServiceService } from 'src/app/services/usuarioService/usuario-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  usuarios: Usuarios[] = [];;

  modalVisible: boolean = false;
  modalHeader: string = '';
  modalMode: 'crear' | 'editar' | 'ver' = 'crear';
  fecha: string = '';
  usuarioSeleccionado: any = 0;
  roles: any[] = [
    { label: 'Administrador', value: 'ADMINISTRADOR' },
    { label: 'Medico', value: 'MEDICO' },
    { label: 'Paciente', value: 'PACIENTE' },
    { label: 'Recepcionista', value: 'RECEPCIONISTA' },
  ];


  data = {
    nombreUsuario:"",
    correoElectronico:"",
    rol:"",

  };
  constructor(
    private utilsService: UtilsService,
    private usuarioService: UsuarioServiceService,
    
  ) {

  }

 

  ngOnInit(): void {
    this.cargarUsuarios();
    
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

  async cargarUsuarios() {
    try {
      const result = await this.usuarioService.obtenerTodosLosUsuarios();
      this.usuarios = result.data;
    } catch (error) {
      this.utilsService.showToast('Error al cargar los Usuarios', ToastType.ERROR);
    }
  }

 

  mostrarModal(mode: 'crear' | 'editar' | 'ver', usuario?: Usuarios) {
    this.modalMode = mode;
    this.modalHeader =
      mode === 'crear'
        ? 'Nuevo Usuario'
        : mode === 'editar'
        ? 'Editar Usuario'
        : 'Ver Usuario';
    this.modalVisible = true;

    if (usuario && (mode === 'editar' || mode === 'ver')) {
      this.usuarioSeleccionado = usuario.id_usuario;
      this.data = {
        nombreUsuario:usuario.nombreUsuario,
        correoElectronico:usuario.correoElectronico,
        rol:usuario.rol,
    
      };
    } else {
      this.data = {
        nombreUsuario:"",
        correoElectronico:"",
        rol:"",
      };
    }
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  async guardarUsuario() {
    try {
      // Validación de campos vacíos
      if (
        !this.data.nombreUsuario ||
        !this.data.correoElectronico ||
        !this.data.rol
      ) {
        this.utilsService.showToast(
          'Por favor, complete todos los campos obligatorios.',
          ToastType.ERROR
        );
        return; // Salir del método si hay campos vacíos
      }

      if (this.modalMode === 'crear') {
        const result = await this.usuarioService.registerAdmin(this.data);
        if (result.success) {
          this.utilsService.showToast(result.message);
          this.cargarUsuarios();
        } else {
          this.utilsService.showToast(result.message, ToastType.ERROR);
        }
      } else if (this.modalMode === 'editar') {
        const result = await this.usuarioService.actualizarUsuario(
          this.usuarioSeleccionado,
          this.data
        );

        if (result.success) {
          this.utilsService.showToast(result.message);
          this.cargarUsuarios();
        } else {
          this.utilsService.showToast(result.message, ToastType.ERROR);
        }
      }
      // Restablece data para limpiar el formulario después de guardar
      this.data = {
        nombreUsuario:"",
        correoElectronico:"",
        rol:"",
    
      };
    } catch (error) {
      this.utilsService.showToast('Error al guardar el usuario', ToastType.ERROR);
    }

    this.cerrarModal();
  }

  async eliminarUsuario(usuario: Usuarios) {
    try {
      console.log(usuario.id_usuario);
      
      const result = await this.usuarioService.eliminarUsuario(usuario.id_usuario);
      console.log(result);
      
      if(result.success){
        console.log(result);
        
        this.utilsService.showToast(result.message);
      } else{
        this.utilsService.showToast(result.message,ToastType.ERROR);
      }
      this.cargarUsuarios();
    } catch (error) {
      this.utilsService.showToast('Error al eliminar el usuario', ToastType.ERROR);
    }
  }

}

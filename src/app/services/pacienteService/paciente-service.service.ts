import { Injectable } from '@angular/core';
import { HttpRequestService } from './../httpService/http-service.service';
import { Result } from '../../interfaces/result';
import { Paciente } from '../../interfaces/paciente'; // Asegúrate de tener la interfaz Paciente importada
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  constructor(private http: HttpRequestService) {}

  // Método para listar todos los pacientes
  async listarPacientes(): Promise<Result> {
    try {
      const result = await this.http.get(`${environment.baseUrl}pacientes`);
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        unauthorized: error?.unauthorized,
      };
    }
  }

  // Método para guardar un nuevo paciente
  async guardarPaciente(
    idUsuario: number,
    paciente: Paciente
  ): Promise<Result> {
    try {
      const result = await this.http.post(
        `${environment.baseUrl}pacientes/savePacient/${idUsuario}`,
        paciente
      );
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        unauthorized: error?.unauthorized,
      };
    }
  }

  // Método para obtener un paciente por ID
  async obtenerPacientePorId(id: number): Promise<Result> {
    try {
      const result = await this.http.get(
        `${environment.baseUrl}pacientes/${id}`
      );
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        unauthorized: error?.unauthorized,
      };
    }
  }

  // Método para actualizar un paciente
  async actualizarPaciente(id: number, paciente: Paciente): Promise<Result> {
    try {
      const result = await this.http.put(
        `${environment.baseUrl}pacientes/${id}`,
        paciente
      );
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        unauthorized: error?.unauthorized,
      };
    }
  }

  // Método para eliminar un paciente
  async eliminarPaciente(id: number): Promise<Result> {
    try {
      const result = await this.http.delete(
        `${environment.baseUrl}pacientes/${id}`
      );
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        unauthorized: error?.unauthorized,
      };
    }
  }
}

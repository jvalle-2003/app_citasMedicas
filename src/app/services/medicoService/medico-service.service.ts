import { Injectable } from '@angular/core';
import { HttpRequestService } from './../httpService/http-service.service';
import { Result } from '../../interfaces/result';
import { Medico } from '../../interfaces/medico'; // Asegúrate de tener la interfaz Medico importada
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http: HttpRequestService) {}

  // Método para listar todos los médicos
  async listarMedicos(): Promise<Result> {
    try {
      const result = await this.http.get(`${environment.baseUrl}medicos`);
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        unauthorized: error?.unauthorized,
      };
    }
  }

  // Método para guardar un nuevo médico
  async guardarMedico(medico: Medico): Promise<Result> {
    try {
      const result = await this.http.post(
        `${environment.baseUrl}medicos`,
        medico
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

  // Método para obtener un médico por ID
  async obtenerMedicoPorId(id: number): Promise<Result> {
    try {
      const result = await this.http.get(`${environment.baseUrl}medicos/${id}`);
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        unauthorized: error?.unauthorized,
      };
    }
  }

  // Método para actualizar un médico
  async actualizarMedico(id: number, medicoDetalles: Medico): Promise<Result> {
    try {
      const result = await this.http.put(
        `${environment.baseUrl}medicos/${id}`,
        medicoDetalles
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

  // Método para eliminar un médico
  async eliminarMedico(id: number): Promise<Result> {
    try {
      const result = await this.http.delete(
        `${environment.baseUrl}medicos/${id}`
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

  // Método para obtener médicos sin cita en un horario específico
  async obtenerMedicosSinCita(fechaHora: string): Promise<Result> {
    try {
      // Concatenar el parámetro en la URL
      const result = await this.http.get(
        `${environment.baseUrl}medicos/sin-cita?fechaHora=${encodeURIComponent(
          fechaHora
        )}`
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

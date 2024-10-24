import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from './../httpService/http-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Result } from '../../interfaces/result';
import { Cita } from '../../interfaces/cita'; // Asegúrate de tener la interfaz Cita importada

@Injectable({
  providedIn: 'root',
})
export class DatingServiceService {
  constructor(
    private router: Router,
    private http: HttpRequestService,
    private httpClient: HttpClient
  ) {}

  // Método para guardar una nueva cita
  async saveCita(cita: Cita): Promise<Result> {
    try {
      const result = await this.http.post(
        `${environment.baseUrl}citas/saveDating`,
        cita
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

  // Método para obtener todas las citas
  async obtenerTodasLasCitas(): Promise<Result> {
    try {
      const result = await this.http.get(`${environment.baseUrl}citas`);
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        unauthorized: error?.unauthorized,
      };
    }
  }

  // Método para obtener una cita por ID
  async obtenerCitaPorId(id: number): Promise<Result> {
    try {
      const result = await this.http.get(`${environment.baseUrl}citas/${id}`);
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        unauthorized: error?.unauthorized,
      };
    }
  }

  // Método para actualizar una cita
  async actualizarCita(id: number, citaDetalles: Cita): Promise<Result> {
    try {
      const result = await this.http.put(
        `${environment.baseUrl}citas/${id}`,
        citaDetalles
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

  // Método para eliminar una cita
  async eliminarCita(id: number): Promise<Result> {
    try {
      const result = await this.http.delete(
        `${environment.baseUrl}citas/${id}`
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

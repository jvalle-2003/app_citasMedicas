import { Injectable } from '@angular/core';
import { Result } from '../../interfaces/result';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private http: HttpClient) {}
  async get(url: string, params?: HttpParams): Promise<Result> {
    try {
      return await lastValueFrom(this.http.get<Result>(url, { params }));
    } catch (error: any) {
      return {
        success: false,
        message: error.error.message,
        unauthorized: error.error.unauthorized,
      };
    }
  }

  async post(url: string, body: any): Promise<Result> {
    try {
      return await lastValueFrom(this.http.post<Result>(url, body));
    } catch (error: any) {
      return {
        success: false,
        message: error.error.message,
        unauthorized: error.error.unauthorized,
      };
    }
  }

  async put(url: string, body: any): Promise<Result> {
    try {
      return await lastValueFrom(this.http.put<Result>(url, body));
    } catch (error: any) {
      return {
        success: false,
        message: error.error.message,
        unauthorized: error.error.unauthorized,
      };
    }
  }

  async delete(url: string): Promise<Result> {
    try {
      return await lastValueFrom(this.http.delete<Result>(url));
    } catch (error: any) {
      return {
        success: false,
        message: error.error.message,
        unauthorized: error.error.unauthorized,
      };
    }
  }
  async patch(url: string, body?: any): Promise<Result> {
    try {
      return await lastValueFrom(this.http.patch<Result>(url, body));
    } catch (error: any) {
      return {
        success: false,
        message: error.error.message,
        unauthorized: error.error.unauthorized,
      };
    }
  }

  async putUrlencoded(url: string, body: any): Promise<Result> {
    try {
      // Convertir el cuerpo a x-www-form-urlencoded
      const params = new HttpParams({ fromObject: body });
  
      // Configurar las cabeceras
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
  
      // Enviar la solicitud con el cuerpo codificado
      return await lastValueFrom(
        this.http.put<Result>(url, params.toString(), { headers })
      );
    } catch (error: any) {
      return {
        success: false,
        message: error.error.message,
        unauthorized: error.error.unauthorized,
      };
    }
  }
  //TODO: agregar metodo para subir y leer archivos
}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from './../httpService/http-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Result } from '../../interfaces/result';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private router: Router,
    private http: HttpRequestService,
    private httpClient: HttpClient) { 
    
  }
  async registerAdmin(
  data:any
  ): Promise<Result> {
    try {
     

      const result = await this.http.post(
        `${environment.baseUrl}usuarios/registerAdmin`,
        data
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

  async obtenerTodosLosUsuarios(): Promise<Result> {
    try {
      const result = await this.http.get(`${environment.baseUrl}usuarios`);
      return result;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        unauthorized: error?.unauthorized,
      };
    }
  }

  async actualizarUsuario(id: number, data: any): Promise<Result> {
    try {
      const result = await this.http.put(
        `${environment.baseUrl}usuarios/${id}`,
        data
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
  async eliminarUsuario(id: number): Promise<Result> {
    try {
      const result = await this.http.delete(
        `${environment.baseUrl}usuarios/${id}`
      );
      console.log(result);
      
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

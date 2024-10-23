import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from './../httpService/http-service.service'
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Result } from '../../interfaces/result';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpRequestService,
    private httpClient: HttpClient
  ) {}

  /**
   * Login with username 
   *
   * @param {string} nombreUsuario - Username
   * @param {string} password - Password
   */
  async login(
    nombreUsuario: string,
    password: string,
  ): Promise<Result> {
    try {
      const credentials = { nombreUsuario, password };

      const result = await this.http.post(
        `${environment.baseUrl}usuarios/login`,
        credentials
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

  /**
   * Solicita que se reinicie la contaseña del usuario por medio de
   * el ingreso de su correo electronico
   *
   * @param {string} correoElectronico - email
   */
  async forgotPassword(
    correoElectronico: string,
  ): Promise<Result> {
    try {
      const data = { correoElectronico };

      const result = await this.http.post(
        `${environment.baseUrl}usuarios/restorePassword`,
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

  /**
   * Cambia la contraseña del usuario
   *
   * @param {string} password - password
   * @param {string} confirmPassword - confirmPassword
   * @param {number} idUsuario -idUsuario
   */
  async changePassword(
    password: string,
    confirmPassword: string,
    id: number | undefined
  ): Promise<Result> {
    try {
      const data = { password,confirmPassword  };

      const result = await this.http.putUrlencoded(
        `${environment.baseUrl}usuarios/changePassword/` +id ,
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


}

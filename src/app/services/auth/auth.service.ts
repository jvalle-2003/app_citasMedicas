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
   * Login with username and save session data in local storage
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
   * Login with username and save session data in local storage
   *
   * @param {string} nombreUsuario - Username
   * @param {string} password - Password
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


}

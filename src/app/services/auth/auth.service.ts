import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from './../httpService/http-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Result } from '../../interfaces/result';

@Injectable({
  providedIn: 'root',
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
  async login(nombreUsuario: string, password: string): Promise<Result> {
    try {
      const credentials = { nombreUsuario, password };

      const result = await this.http.post(
        `${environment.baseUrl}usuarios/login`,
        credentials
      );

      localStorage.setItem('Usuario', JSON.stringify(result.data));

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
  async forgotPassword(correoElectronico: string): Promise<Result> {
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
      const data = { password, confirmPassword };

      const result = await this.http.putUrlencoded(
        `${environment.baseUrl}usuarios/changePassword/` + id,
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
   * Guarda los datos de un paciente en el sistema.
   *
   * Este método envía una solicitud POST al backend para guardar la información
   * de un paciente específico, utilizando su ID y otros datos relevantes.
   *
   * @param {any} paciente - Objeto que contiene los datos del paciente a guardar.
   * @param {number} id - El ID del usuario relacionado con el paciente.
   * @returns {Promise<Result>} Un objeto `Result` que indica el resultado de la operación,
   *                            incluyendo un mensaje y el estado de éxito.
   *
   * @throws {Error} Si ocurre un error en la solicitud HTTP, se captura y devuelve
   *                 un objeto `Result` con el mensaje de error.
   */
  async savePacient(paciente: any, id: number): Promise<Result> {
    try {
      const data = {
        idUsuario: paciente.id_usuario,
        nombres: paciente.nombres,
        apellidos: paciente.apellidos,
        fechaNacimiento: paciente.fecha_nacimiento,
        direccion: paciente.direccion,
        telefono: paciente.telefono,
        correoElectronico: paciente.correo_electronico,
        codigoPaciente: paciente.codigo_paciente.toString(),
      };

      const result = await this.http.post(
        `${environment.baseUrl}pacientes/savePacient/` + id,
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
   * Registro en el sistema
   *
   * @param {string} nombreUsuario - Username
   * @param {string} correoElectronico - correoElectronico
   */
  async register(
    nombreUsuario: string,
    correoElectronico: string
  ): Promise<Result> {
    try {
      const credentials = { nombreUsuario, correoElectronico };

      const result = await this.http.post(
        `${environment.baseUrl}usuarios/register`,
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
}

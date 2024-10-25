export interface Medico {
  idMedico?: number; // Opcional, ya que puede no estar presente en la creación
  nombres: string;
  apellidos: string;
  especialidad: string;
  numeroLicencia: string;
  idUsuario: number;
}

export interface Paciente {
  id_paciente: number; // Opcional, ya que puede no estar presente en la creación
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string; // Formato ISO (YYYY-MM-DD) o como cadena
  correoElectronico: string; // Opcional si no siempre se utiliza
  codigoPaciente: string;
  idUsuario: number; // Opcional si no siempre se utiliza
}

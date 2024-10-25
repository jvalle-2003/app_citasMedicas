export interface Cita {
  id_cita: number; // ID de la cita
  paciente: {
    id_paciente: number; // ID del paciente
    idUsuario: number; // ID del usuario asociado al paciente
    nombres: string; // Nombres del paciente
    apellidos: string; // Apellidos del paciente
    fechaNacimiento: string; // Fecha de nacimiento del paciente
    direccion: string; // Dirección del paciente
    telefono: string; // Teléfono del paciente
    correoElectronico: string; // Correo electrónico del paciente
    codigoPaciente: string; // Código del paciente
    fechaCreacion: string; // Fecha de creación del registro del paciente
  };
  medico: {
    id_medico: number; // ID del médico
    idUsuario: number; // ID del usuario asociado al médico
    nombres: string; // Nombres del médico
    apellidos: string; // Apellidos del médico
    especialidad: string; // Especialidad del médico
    numeroLicencia: string; // Número de licencia del médico
    fechaCreacion: string; // Fecha de creación del registro del médico
  };
  fechaHora: Date; // Fecha y hora de la cita
  motivoConsulta: string; // Motivo de la consulta
  estado: string; // Estado de la cita (ej. "pendiente")
  fechaCreacion: string; // Fecha de creación de la cita
}


export interface IPeriodoAcademico {
    año: number;
    semestre: number;
  }

  export interface IAsignatura {
    id: number;
    seccion:string;
    nombre: string;
    periodo_academico: IPeriodoAcademico;
    horas_semanales: number;
  }
  
  export interface IDocente {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    asignaturas: number[]; // Array de IDs de asignaturas
    isActive: boolean;
  }
  
  export interface IData {
    docentes: IDocente[];
    asignaturas: IAsignatura[];
  }
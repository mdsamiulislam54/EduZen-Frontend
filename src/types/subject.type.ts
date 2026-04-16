export interface ISubject {
  id: string;
  coachingCenterId: string;
  name: string;
  subject_code: string | null;
  status: "ACTIVE" | "INACTIVE";
}
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SubjectResponse {
    data: ISubject[];
    meta?: Meta;
  
}
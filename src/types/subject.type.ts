

enum SubjectStatus {
  ACTIVE,
  INACTIVE
    }

export interface ISubject {
    id:string,
    coachingCenterId: string,
    name:string,
    subject_code: string,
    status: SubjectStatus,
}
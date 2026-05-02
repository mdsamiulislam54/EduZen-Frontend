import { Meta } from "./subject.type";

export interface IStudentAttendanceResponse {
    data: IStudentAttendance[];
    meta?: Meta;
}

export interface IStudentAttendance {
  status: "PRESENT" | "ABSENT";
  date: string;
  studentId: string;
  batchId: string;
  student: IStudentInfo;
  batch: IBatchInfo;
}

export interface IStudentInfo {
  name: string;
  image: string | null;
  rollNumber: string;
}

export interface IBatchInfo {
  batchName: string;
}


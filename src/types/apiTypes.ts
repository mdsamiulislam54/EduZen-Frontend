export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?:{
    page:number,
    totalPage:number,
    limit:number,
    total:number

  }
}
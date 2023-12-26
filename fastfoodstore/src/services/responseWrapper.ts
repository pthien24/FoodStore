type ResponseWrapper<T> = {
  errorCode: number;
  message: string;
  data: T;
  pageIndex: number;
  pageSize: number;
  recordCount: number;
  totalPage: number;
  error: string;
  statusCode: number;
  statusMessage: string;
  token: string;
};
export default ResponseWrapper;

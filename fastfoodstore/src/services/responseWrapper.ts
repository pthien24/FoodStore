type ResponseWrapper<T> = {
  errorCode: number;
  message: string;
  data: T;
  last_page: number;
  error: string;
};
export default ResponseWrapper;

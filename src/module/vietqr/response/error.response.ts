export default class ErrorResponse {
  constructor(
    public error: boolean,
    public errorReason: string,
    public toastMessage: string,
    public object: object,
  ) {}
}

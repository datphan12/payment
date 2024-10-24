export default class SuccessResponse {
  constructor(
    public error: boolean,
    public errorReason: string,
    public toastMessage: string,
    public object: object,
  ) {}
}

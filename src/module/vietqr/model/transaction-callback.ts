export default class TransactionCallback {
  constructor(
    public transactionid: string,
    public transactiontime: string,
    public referencenumber: string,
    public amount: string,
    public content: string,
    public bankaccount: string,
    public orderId: string,
    public sign: string,
    public terminalCode: string,
    public urlLink: string,
    public serviceCode: string,
    public subTerminalCode: string,
  ) {}
}

export class HttpResponse {
  private successCode: boolean;

  private data: Array<object>;

  private message: string;

  constructor(successCode: boolean, message: string, data: any = []) {
    this.successCode = successCode;
    this.message = message;

    if (data.length === 0) {
      this.data = [];
    } else if (data.length > 1) {
      this.data = data;
    } else {
      this.data = [data];
    }
  }
}

export class NbUser {

  constructor(public id?: number,
              public email?: string,
              public password?: string,
              public rememberMe?: boolean,
              public terms?: boolean,
              public confirmedpassword?: string,
              public userame?: string) {
  }
}

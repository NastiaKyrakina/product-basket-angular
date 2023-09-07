export class PasswordEncoder {

  static encode(password: string): string {
    const encodedPassword = btoa(password);
    let sum = 0;
    for (let i = 0; i < encodedPassword.length; i++) {
      sum += encodedPassword.charCodeAt(i);
    }
    return encodedPassword;
  }
}

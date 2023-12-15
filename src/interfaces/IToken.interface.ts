export default interface IToken {
  exp: number;
  iss: string;
  sub: string;
  nbf: number;
  userType: string;
  given_name: string;
  family_name: string;
}

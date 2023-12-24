export default interface IToken {
  exp: number;
  iss: string;
  user_id: string;
  nbf: number;
  userType: string;
  given_name: string;
  family_name: string;
}

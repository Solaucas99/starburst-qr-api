export interface RespondChallengeProtocol {
  username: string;
  password: string;
  name: string;
  nickname: string;
  phone_number: string;

  auth_challenge: {
    challenge_name: string;
    session: string;
  };
}

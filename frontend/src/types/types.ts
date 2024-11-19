export interface EmailcodeRes {
  verificationCode: string;
}

export interface LoginRes {
  message: string;
  data: {
    id: number;
    username: string;
    nickname: string;
    access_token: string;
  };
}
export interface ImageRes {
  category: string;
  description: string;
  title: string;
  losttime: string;
  lostdate: string;
}
export interface SearchRes {
  lostid: number;
  image: string;
  title: string;
  category: string;
  getwhere: string;
  lostdate: string;
  losttime: string;
  nowwhere: string;
}

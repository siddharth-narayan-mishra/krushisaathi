export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
  adhaar: string;
  address: string;
  passbook: string;
  photo: string;
  ekyf: string;
}

export class UserModel implements User {
  id:string;
  name: string;
  username: string;
  password: string;
  role: string = "farmer";
  adhaar: string;
  address: string;
  passbook: string;
  photo: string;
  ekyf: string;

  constructor(user: Partial<User>) {
    this.id = user.id || "";
    this.name = user.name || "";
    this.username = user.username || "";
    this.password = user.password || "";
    this.role = user.role || "user";
    this.adhaar = user.adhaar || "";
    this.address = user.address || "";
    this.passbook = user.passbook || "";
    this.photo = user.photo || "";
    this.ekyf = user.ekyf || "";
  }
}

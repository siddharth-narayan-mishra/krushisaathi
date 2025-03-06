export interface User {
  name: string;
  username: string;
  password: string;
  role: string;
  adhaar: string;
  address: string;
  passbook: string;
  photo: string;
  ekyf: string;
  isVerified: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
}

export class UserModel implements User {
  name: string;
  username: string;
  password: string;
  role: string = "user"; // Default value
  adhaar: string;
  address: string;
  passbook: string;
  photo: string;
  ekyf: string;
  isVerified: boolean = false; // Default value
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date = new Date(); // Default value
  verifyToken: string;
  verifyTokenExpiry: Date = new Date(); // Default value

  constructor(user: Partial<User>) {
    this.name = user.name || "";
    this.username = user.username || "";
    this.password = user.password || "";
    this.role = user.role || "user"; // Default value
    this.adhaar = user.adhaar || "";
    this.address = user.address || "";
    this.passbook = user.passbook || "";
    this.photo = user.photo || "";
    this.ekyf = user.ekyf || "";
    this.isVerified = user.isVerified || false; // Default value
    this.forgotPasswordToken = user.forgotPasswordToken || "";
    this.forgotPasswordTokenExpiry =
      user.forgotPasswordTokenExpiry || new Date(); // Default value
    this.verifyToken = user.verifyToken || "";
    this.verifyTokenExpiry = user.verifyTokenExpiry || new Date(); // Default value
  }
}

import { string } from "yup";

export interface Lab {
  username: string;
  password: string;
  role: string;
  labName: string;
  users: {
    userId: string;
    farmName: string;
    sampleNames: string[];
    status: { rejected: string } | { pending: string } | { complete: string };
  }[];

  position?: {
    latitude: number;
    longitude: number;
  };

  address?: {
    pincode: number;
    streetaddress: string;
    city: string;
    country: string;
    state: string;
    district: string;
    fulladdress: string;
  };
  phone?: number;
}

export class LabModel implements Lab {
  username: string;
  password: string;
  role: string;
  labName: string;
  position?: {
    latitude: number;
    longitude: number;
  };
  address?: {
    pincode: number;
    streetaddress: string;
    city: string;
    country: string;
    state: string;
    district: string;
    fulladdress: string;
  };
  users: {
    userId: string;
    farmName: string;
    sampleNames: string[];
    status: { rejected: string } | { pending: string } | { complete: string };
  }[];
  phone?: number;

  constructor(lab: Partial<Lab>) {
    this.password = lab.password || "";
    this.labName = lab.labName || "";
    this.username = lab.username || "";
    this.role = lab.role || "";
    this.position = lab.position;
    this.address = lab.address;
    this.phone = lab.phone;
    this.users = lab.users ?? [];
  }
}

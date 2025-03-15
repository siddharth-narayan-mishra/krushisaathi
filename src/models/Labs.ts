export interface Lab {
  id: string;
  username: string;
  password: string;
  role: string;
  labName: string;
  users: {
    userId: string;
    farmName: string;
    sampleNames: string[];
    status: "rejected" | "pending" | "complete";
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
  id: string;
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
    status: "rejected" | "pending" | "complete";
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
    this.id = lab.id || "";
  }
}

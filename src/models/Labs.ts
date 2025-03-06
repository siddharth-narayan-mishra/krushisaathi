export interface Lab {
  name: string;
  position:
    | {
        latitude: number;
        longitude: number;
      }
    | undefined;
  address:
    | {
        country: string;
        state: string;
        district: string;
        fulladdress: string;
      }
    | undefined;
  phone: number | undefined;
}

export class LabModel implements Lab {
  name: string;
  position:
    | {
        latitude: number;
        longitude: number;
      }
    | undefined;
  address:
    | {
        country: string;
        state: string;
        district: string;
        fulladdress: string;
      }
    | undefined;
  phone: number | undefined;
  constructor(lab: Partial<Lab>) {
    this.name = lab.name || "";
    this.position = lab.position;
    this.address = lab.address;
    this.phone = lab.phone;
  }
}

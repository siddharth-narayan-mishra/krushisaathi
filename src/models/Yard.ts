export interface Yard {
  yardId: string;
  yardName: string;
  userId: string;
  labId: string;
  samples: {
    sampleId: string;
    sampleName: string;
    status: string;
    suggestions: string;
    pdfUrl: string;
  }[];
}

export class YardModel implements Yard {
  yardId: string;
  yardName: string;
  userId: string;
  labId: string;
  samples: {
    sampleId: string;
    sampleName: string;
    status: string;
    suggestions: string;
    pdfUrl: string;
  }[];

  constructor(yard: Partial<Yard>) {
    this.yardId = yard.yardId || "";
    this.yardName = yard.yardName || "";
    this.userId = yard.userId || "";
    this.labId = yard.labId || "";
    this.samples = yard.samples || [];
  }
}

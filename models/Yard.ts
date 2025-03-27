export interface Yard {
  updatedAt: string;
  yardId: string;
  yardName: string;
  userId: string;
  labId: string;
  samples: {
    sampleId: string;
    sampleName: string;
    createdAt: any;
    status: string;
    suggestions: string;
    pdfUrl: string;
    nutrients: {
      macroNutrients: Record<string, string>;
      secondaryNutrients: Record<string, string>;
      microNutrients: Record<string, string>;
      physicalParameters: Record<string, string>;
    };
  }[];
}

export class YardModel implements Yard {
  yardId: string;
  yardName: string;
  userId: string;
  labId: string;
  updatedAt: string;
  samples: {
    sampleId: string;
    sampleName: string;
    status: string;
    suggestions: string;
    createdAt: any;
    pdfUrl: string;
    nutrients: {
      macroNutrients: Record<string, string>;
      secondaryNutrients: Record<string, string>;
      microNutrients: Record<string, string>;
      physicalParameters: Record<string, string>;
    };
  }[];

  constructor(yard: Partial<Yard>) {
    this.yardId = yard.yardId || "";
    this.yardName = yard.yardName || "";
    this.userId = yard.userId || "";
    this.labId = yard.labId || "";
    this.updatedAt = yard.updatedAt || new Date().toISOString();

    this.samples =
      yard.samples?.map((sample) => ({
        sampleId: sample.sampleId || "",
        sampleName: sample.sampleName || "",
        status: sample.status || "pending",
        suggestions: sample.suggestions || "",
        pdfUrl: sample.pdfUrl || "",
        createdAt: sample.createdAt,
        nutrients: {
          macroNutrients: sample.nutrients?.macroNutrients || {
            "Nitrogen (N)": "",
            "Phosphorus (P)": "",
            "Potassium (K)": ""
          },
          secondaryNutrients: sample.nutrients?.secondaryNutrients || {
            "Sulfur (S)": ""
          },
          microNutrients: sample.nutrients?.microNutrients || {
            "Zinc (Zn)": "",
            "Iron (Fe)": "",
            "Copper (Cu)": "",
            "Manganese (Mn)": "",
            "Boron (Bo)": ""
          },
          physicalParameters: sample.nutrients?.physicalParameters || {
            pH: "",
            "Electrical Conductivity (EC)": "",
            "Organic Content (OC)": ""
          }
        }
      })) || [];
  }
}

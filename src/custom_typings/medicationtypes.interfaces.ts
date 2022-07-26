export interface MedicationTypesResponse {
  items: MedicationType[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface MedicationType {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface MedicationTypeForCreation extends MedicationTypeForManipulation {

}

export interface MedicationTypeForUpdate extends MedicationTypeForManipulation {
  id: string;
}

interface MedicationTypeForManipulation {
  name: string;
  description: string;
}
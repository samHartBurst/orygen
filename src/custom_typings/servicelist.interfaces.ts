export interface ServiceListResponse {
  serviceList: Service[];
  totalCount: number;
  totalPages: number;
}

export interface Service {
  id: string;
  name: string;
  status: string;
  noOfSites: number;
}

export interface ServiceForCreation {
  serviceData: SiteListForCreation;
  siteList: SiteListForCreation[];
}

export interface ServiceForUpdate {
  serviceData: SiteListForCreation;
  siteList: SiteListForCreation[];
  totalCount: number;
  totalPages: number;
}

export interface SiteListForCreation {
  id: string;
  name: string;
  isActive: boolean;
}

export interface ServiceForUpdate extends ServiceForManipulation {
  id: string;
}

interface ServiceForManipulation {
  name: string;
  description: string;
}

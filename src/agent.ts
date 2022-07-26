import { string } from 'prop-types';
//import httpclient from 'react-http-client';
const httpclient = require('react-http-client');
import {
  MedicationTypesResponse,
  MedicationType,
  MedicationTypeForCreation,
  MedicationTypeForUpdate,
} from './custom_typings/medicationtypes.interfaces';

import {
  ServiceListResponse,
  Service,
  ServiceForCreation,
  ServiceForUpdate,
  SiteListForCreation,
} from './custom_typings/servicelist.interfaces';

const adminBaseUrl = process.env.NEXT_PUBLIC_ADMINAPI_ENDPOINT;

//See https://dev.azure.com/day3heartburst/Hail%20CX/_git/Hail%20CX%20Admin%20WebApp?path=/src/agents/index.ts for example

const requests = {
  get: async <T>(url: string) => {
    const response = await fetch(`${adminBaseUrl}${url}`);
    return await response.json();
  },

  //   post: async <T>(url: string, data: any) => {
  //     debugger;
  //     const response = await fetch(`${adminBaseUrl}${url}`, {
  //       method: 'POST',
  //       //mode: 'cors',
  //       cache: 'no-cache',
  //       credentials: 'same-origin',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       //body: JSON.stringify(data),
  //     });
  //     return await response.json();
  //   },

  post: async <T>(url: string, data: any) => {
    const req = httpclient.post(`${adminBaseUrl}${url}`, data);
    return await req.json();
  },

  //   const req = this.httpClient.post(PlanningCenterSettings.baseURL + 'ManageUsers/AddOrEditUser', this.userData).subscribe(
  //     res => {
  //         this.getAllActiveUsers(true, "Add Edit User");
  //     }, err => {
  //         this.showLoader = false;
  //         this.showErrorModal = true;
  //         this.errorMessage = "Error occurred while saving data.";
  //     });

  put: async <T>(url: string, body?: {}) => {
    const response = await fetch(`${adminBaseUrl}${url}`, {
      method: 'PUT',
      //mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  },

  delete: async <T>(url: string) => {
    const response = await fetch(`${adminBaseUrl}${url}`, {
      method: 'DELETE',
      //mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  },
};

//https://localhost:5003/api/v1/MedicationType/b5661fd2-a019-4f4a-93dc-c3c498bb221e

const Demographic = {
  getList: (pageNumber: Number, pageSize: Number) =>
    requests.get<any>(
      `/api/v1/Demographic?pageNumber=${pageNumber}&pageSize=${pageSize}`
    ),
};

const MedicationType = {
  list: (pageNumber: Number, pageSize: Number) =>
    requests.get<MedicationTypesResponse>(
      `/api/v1/MedicationType?pageNumber=${pageNumber}&pageSize=${pageSize}`
    ),
  get: (id: string) =>
    requests.get<MedicationType>(`/api/v1/MedicationType/${id}`),
  create: (request: MedicationTypeForCreation) =>
    requests.post<string>(`/api/v1/MedicationType`, request),
  update: (request: MedicationTypeForUpdate) =>
    requests.put<boolean>(`/api/v1/MedicationType`, request),
  delete: (id: string) =>
    requests.delete<boolean>(`/api/v1/MedicationType/${id}`),
};

const Service = {
  list: (pageSize: Number, pageNumber: Number) =>
    requests.get<ServiceListResponse>(
      `service/getServiceList?pageSize=${pageSize}&pageNumber=${pageNumber}`
    ),
  create: (request: {
    serviceData: SiteListForCreation;
    siteList: SiteListForCreation[];
  }) => requests.post<string>(`service/insertOrUpdateServiceAndSite`, request),

  get: (serviceId: String, pageSize: Number, pageNumber: Number) =>
    requests.get<ServiceForCreation>(
      `service/getServiceAndSiteData?serviceId=${serviceId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    ),
};

const agent = {
  MedicationType,
  Demographic,
  Service,
};

export default agent;

import React from 'react';
import Create from '../../components/Service/Create/Create';

export default function CreateServiceForm() {
  return (
    <Create
      pageTitle={'Add a Service'}
      serviceId=""
      serviceName=""
      serviceStatus={true}
      siteList={[]}
      submitLabel={'Create Service'}></Create>
  );
}

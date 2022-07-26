import React, { useEffect, useState } from 'react';
import Create from '../../../../components/Service/Create/Create';
import { EuiLoadingSpinner } from '@elastic/eui';
import agent from '../../../../agent';
import { ServiceForUpdate } from '../../../../custom_typings/servicelist.interfaces';
import { useRouter } from 'next/router';

export const Update = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ServiceForUpdate | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      getServiceAndSiteData();
    }
  }, [router.isReady]);

  useEffect(() => {}, [data]);

  const getServiceAndSiteData = () => {
    async function loadData() {
      setLoading(true);
      if (id != null && id != undefined) {
        var response = await agent.Service.get(`${id}`, 10, 1);
      }
      setData(response);
      setLoading(false);
    }
    loadData();
  };

  return (
    <div>
      {loading && <EuiLoadingSpinner size="xxl" />}
      {data && (
        <Create
          pageTitle="Edit Service"
          serviceId={`${data.serviceData.id}`}
          serviceName={`${data?.serviceData.name}`}
          serviceStatus={data.serviceData.isActive}
          siteList={data.siteList}
          submitLabel={'Update Service'}></Create>
      )}
    </div>
  );
};
export default Update;

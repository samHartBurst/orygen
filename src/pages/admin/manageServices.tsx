import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { EuiButton, EuiLoadingSpinner, EuiSpacer } from '@elastic/eui';
import {
  ServiceListResponse,
  ServiceForCreation,
  ServiceForUpdate,
} from '../../custom_typings/servicelist.interfaces';
import styles from '../../styles/Home.module.css';

import agent from '../../agent';
import List from '../../components/Service/List';
import Link from 'next/link';
import { PAGE_SIZE } from '../../components/constants';

interface IProps {
  ServiceListResponse: ServiceListResponse;
}

const ManageServices: NextPage<IProps> = ({ ServiceListResponse }) => {
  const [data, setData] = useState<ServiceListResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [activePageIndex, setActivePageIndex] = useState<number>(1);

  useEffect(() => {
    loadServiceList();
  }, [activePageIndex]);
  useEffect(() => {
    loadServiceList();
  }, []);

  const loadServiceList = () => {
    setLoading(true);

    async function loadData() {
      var response = await agent.Service.list(PAGE_SIZE, activePageIndex);
      setData(response);
      setLoading(false);
    }
    loadData();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Services
          <Link href={'/admin/CreateServiceForm'}>
            <EuiButton className={styles.button}>Create Service</EuiButton>
          </Link>
        </h1>
        {/* <EuiSpacer></EuiSpacer> */}
        {/* {loading && <EuiLoadingSpinner size="xxl" />} */}
        {/* <div></div> */}
        {/* <EuiSpacer></EuiSpacer> */}
        {/* <CreateForm onCreateCompleted={loadMedicationTypeList} /> */}
        <div className={styles.list}>
          {data && (
            <List
              activePageIndex={activePageIndex}
              setActivePageIndex={setActivePageIndex}
              onDeleted={loadServiceList}
              serviceListResponse={data}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageServices;

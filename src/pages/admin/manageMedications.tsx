import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { EuiLoadingSpinner, EuiSpacer } from '@elastic/eui';
import {
  MedicationTypesResponse,
  MedicationTypeForCreation,
  MedicationTypeForUpdate,
} from '../../custom_typings/medicationtypes.interfaces';
import styles from '../../styles/Home.module.css';

import agent from '../../agent';
import CreateForm from '../../components/MedicationType/CreateForm';
import List from '../../components/MedicationType/List';

interface IProps {
  medicationTypesResponse: MedicationTypesResponse;
}

const ManageMedications: NextPage<IProps> = ({ medicationTypesResponse }) => {
  //const { items, totalCount, hasNextPage } = medicationTypesResponse;

  const [data, setData] = useState<MedicationTypesResponse | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [activePageIndex, setActivePageIndex] = useState<number>(1);

  useEffect(() => {
    loadMedicationTypeList();
  }, [activePageIndex]);

  const testMethod = async (pageNumber: Number, pageSize: Number) => {
    //var getListResponse = await agent.MedicationType.list(pageNumber, pageSize);

    const createRequest: MedicationTypeForCreation = {
      name: 'From Web UI',
      description: ' Created from Web UI',
    };
    const createResponse = await agent.MedicationType.create(createRequest);

    var getResponse = await agent.MedicationType.get(createResponse);

    const updateRequest: MedicationTypeForUpdate = {
      id: createResponse,
      name: 'From Web UI',
      description: ' Updated from Web UI',
    };
    const updateResponse = await agent.MedicationType.update(updateRequest);

    const deleteResponse = await agent.MedicationType.delete(createResponse);

    console.log({
      createResponse,
      getResponse,
      updateResponse,
      deleteResponse,
    });
  };

  const loadMedicationTypeList = () => {
    setLoading(true);

    async function loadData() {
      var response = await agent.MedicationType.list(activePageIndex, 10);
      setData(response);
      setLoading(false);
    }

    loadData();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Manage Medication Screen</h1>

        <EuiSpacer></EuiSpacer>

        {loading && <EuiLoadingSpinner size="xxl" />}

        <CreateForm onCreateCompleted={loadMedicationTypeList} />

        {data && (
          <List
            activePageIndex={activePageIndex}
            setActivePageIndex={setActivePageIndex}
            onDeleted={loadMedicationTypeList}
            medicationTypesResponse={data}
          />
        )}
      </main>
    </div>
  );
};

export default ManageMedications;

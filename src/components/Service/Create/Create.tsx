import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiSwitch,
  EuiForm,
  EuiDescribedFormGroup,
  EuiBasicTable,
  EuiHealth,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiHorizontalRule,
} from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import agent from '../../../agent';
import styles from '../../../styles/Home.module.css';
import {
  ServiceForCreation,
  SiteListForCreation,
} from '../../../custom_typings/servicelist.interfaces';
import { useRouter } from 'next/router';
import ConfirmAction from './Alert';

interface CUProps {
  pageTitle: string;
  serviceId: string;
  serviceName: string;
  serviceStatus: boolean;
  siteList: SiteListForCreation[];
  submitLabel: string;
}

const Create = (props: CUProps) => {
  const [isError, setIsError] = useState(false);
  /* #region  Formik */
  const router = useRouter(); // define router, this is for use in onSubmit to go back to previous page.
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // set intial values
      serviceName: props.serviceName,
      isServiceActive: props.serviceStatus,
      siteList: {
        siteId: '',
        siteName: '',
        isSiteActive: true,
      },
    },
    validationSchema: Yup.object().shape(
      {
        serviceName: Yup.string().min(1, 'Cannot be empty').required(''),
        siteList: Yup.object().shape({
          siteName: Yup.string().when('siteList.siteName', val => {
            if (val) {
              return Yup.string()
                .min(1, 'Cannot be empty')
                .max(255, 'Must be less than 255 characters long');
            } else {
              return Yup.string()
                .transform((val, originalVal) => {
                  if (!val) {
                    return null;
                  }
                  return originalVal;
                })
                .nullable()
                .optional();
            }
          }),
        }),
      },
      [['siteList.siteName', 'siteList.siteName']]
    ),
    onSubmit: async values => {
      if (localArray.length !== 0) {
        // validation
        const createRequest: ServiceForCreation = {
          // reate API request
          serviceData: {
            id: props.serviceId,
            name: values.serviceName,
            isActive: isSwitchChecked,
          },
          siteList: localArray,
        };
        const createResponse = await agent.Service.create(createRequest).then(
          // send API request
          // @ts-ignore
          router.push('/admin/manageServices') // route back to manageServices page
        );
      } else setIsError(true);
      formik.setSubmitting(false);
    },
  });
  /* #endregion */
  /* #region  Service */
  const serviceNameHandleChange = (event: any) => {
    // Service name text field controlled component
    setServiceNameField(event.target.value); // when field changes, update the value.
    formik.handleChange(event); // let formik also handle the change
  };
  const [serviceNameField, setServiceNameField] = useState(props.serviceName);
  const [showServiceErrors, setShowServiceErrors] = useState(false);

  const onSwitchChange = () => {
    // Service Switch controlled component
    setIsSwitchChecked(!isSwitchChecked); // NOT switch value
    if (isSwitchChecked) {
      // update corresponding text
      setIsActive('Inactive');
    } else {
      setIsActive('Active');
    }
  };
  const [isSwitchChecked, setIsSwitchChecked] = useState(props.serviceStatus);
  const [isActive, setIsActive] = useState('Active');
  /* #endregion */
  /* #region  Site */
  const siteNameHandleChange = (event: any) => {
    // Site name text field controlled component
    setSiteNameField(event.target.value); // when field changes, update the value.
    formik.handleChange(event); // let formik also handle the change
  };
  const [siteNameField, setSiteNameField] = useState<string>();
  const [showSiteErrors, setShowSiteErrors] = useState(false);

  const onSiteSwitchChange = () => {
    // Site Switch controlled component
    setSiteIsSwitchChecked(!isSiteSwitchChecked); // NOT switch value
    if (isSiteSwitchChecked) {
      // update corresponding text
      setSiteIsActive('Inactive');
    } else {
      setSiteIsActive('Active');
    }
  };
  const [isSiteSwitchChecked, setSiteIsSwitchChecked] = useState(true);
  const [isSiteActive, setSiteIsActive] = useState('Active');
  /* #endregion */
  /* #region  Add new Site to LocalArray function */
  const [localArray, setLocalArray] = useState<any>([]);
  useEffect(() => {}, [localArray]); // when localArray updates, refresh page.

  function addSiteToList(id: string, name: string, isActive: boolean) {
    // add new site to local list
    if (name !== '' && name.valueOf()[0] !== ' ') {
      // validation
      setLocalArray([
        ...localArray,
        {
          id: id,
          name: name,
          isActive: isActive,
        },
      ]);
    } else setShowSiteErrors(true);
  }
  /* #endregion */
  /* #region  Modal constants */
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSiteCancelOpen, setIsSiteCancelOpen] = useState(false);
  const [isSiteConfirmOpen, setIsSiteConfirmOpen] = useState(false);
  const updateLocalArray = (item: any, itemIndex: number) => {
    localArray[itemIndex] = item; // overwrite item in array with new item
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemIndex, setItemIndex] = useState<number>();
  const [item, setItem] = useState<any>();
  const [modalSiteName, setModalSiteName] = useState(); // modal site name text field state
  const [modalSiteSwitch, setModalSiteSwitch] = useState<boolean | undefined>(); // switch hook

  const modalSiteNameHandleChange = (event: any) => {
    // controlled component
    setModalSiteName(event.target.value); // when field changes, update the value
  };

  const onModalSiteSwitchChange = () => {
    // controlled component
    setModalSiteSwitch(!modalSiteSwitch); // NOT modal site switch
    setIsModalSiteActive(!modalSiteSwitch ? 'Active' : 'Inactive');
  };

  const [isModalSiteActive, setIsModalSiteActive] = useState<
    string | undefined
  >(); // text hook

  const closeModal = () => {
    // close the modal
    setIsModalVisible(false);
  };

  const showModal = (item: any, itemIndex: number) => {
    // show modal with item and index of item as params
    setItem(item); // set the item state
    setItemIndex(itemIndex); // set the item index
    setModalSiteName(item.name); // set the site name text field
    setModalSiteSwitch(item.isActive); // set the site status switch
    setIsModalSiteActive(item.isActive ? 'Active' : 'Inactive'); // set the site status switch text
    setIsModalVisible(true); // show the modal
  };

  /* #endregion */
  /* #region  useEffects */
  useEffect(() => {
    // Load service data into components
    if (props.serviceStatus) {
      // load service active value into switch
      setIsActive('Active');
    } else {
      setIsActive('Inactive');
    }
    const sites = []; // define THIS local array
    for (const site of props.siteList || []) {
      // add the sites from the service data into the functions local array
      sites.push(site);
    }
    setLocalArray(sites); // set the THIS local array to the global local array
  }, []);

  useEffect(() => {
    if (siteNameField) setShowSiteErrors(false);
    if (serviceNameField) setShowServiceErrors(false);
  }, [siteNameField, serviceNameField]);

  let errors;
  {
    showSiteErrors ? (errors = ['Must not be empty']) : null;
    showServiceErrors ? (errors = ['Must not be empty']) : null;
  }
  /* #endregion */
  return (
    <form onSubmit={formik.handleSubmit} autoComplete={'off'}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>{props.pageTitle}</h1>
          <EuiForm className={styles.list}>
            <EuiDescribedFormGroup
              title={<h3 className={styles.subHeading}>Service Name</h3>}>
              <EuiFormRow isInvalid={showServiceErrors} error={errors}>
                <>
                  <EuiFieldText
                    name="serviceName"
                    type="text"
                    value={`${serviceNameField}`}
                    onChange={serviceNameHandleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={showServiceErrors}></EuiFieldText>
                  {formik.touched.serviceName && formik.errors.serviceName ? (
                    <div>{formik.errors.serviceName}</div>
                  ) : null}
                </>
              </EuiFormRow>
            </EuiDescribedFormGroup>
            <EuiDescribedFormGroup
              title={<h3 className={styles.subHeading}>Service Status</h3>}>
              <EuiFormRow>
                <EuiSwitch
                  name="isServiceActive"
                  type="button"
                  label={isActive}
                  checked={isSwitchChecked}
                  onChange={onSwitchChange}></EuiSwitch>
              </EuiFormRow>
            </EuiDescribedFormGroup>
            <>
              {' '}
              <EuiFlexGroup style={{ maxWidth: 600 }}>
                <EuiFlexItem style={{ width: 200 }}>
                  <EuiFormRow
                    label="Site Name"
                    isInvalid={showSiteErrors}
                    error={errors}>
                    <>
                      <EuiFieldText
                        name="siteList.siteName"
                        value={siteNameField}
                        type="text"
                        onChange={siteNameHandleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={showSiteErrors}></EuiFieldText>
                      {formik.touched.siteList?.siteName &&
                      formik.errors.siteList?.siteName ? (
                        <div>{formik.errors.siteList?.siteName}</div>
                      ) : null}
                    </>
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow display="center" label="Status">
                    <EuiSwitch
                      label={isSiteActive}
                      checked={isSiteSwitchChecked}
                      onChange={onSiteSwitchChange}></EuiSwitch>
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  {' '}
                  {/** This is where the new site is added  */}
                  <EuiFormRow hasEmptyLabelSpace display="center">
                    <EuiButton
                      onClick={() => {
                        addSiteToList(
                          '',
                          formik.values.siteList.siteName,
                          isSiteSwitchChecked
                        );
                        formik.setFieldValue('siteList.siteName', '');
                        setSiteNameField('');
                      }}>
                      Add New Site
                    </EuiButton>
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiHorizontalRule></EuiHorizontalRule>
              <EuiDescribedFormGroup
                title={
                  <h1 className={styles.subHeading}>Sites</h1>
                }></EuiDescribedFormGroup>
              {/** This is where the table is rendered */}
              <EuiBasicTable
                tableCaption="Site's to be added"
                items={localArray}
                rowHeader="Site Name"
                columns={[
                  // { field: 'id', name: 'Site ID' },
                  { field: 'name', name: 'Name' },
                  {
                    field: 'isActive',
                    name: 'Status',
                    dataType: 'boolean',
                    render: (isActive: any) => {
                      const color = isActive ? 'success' : 'danger';
                      const label = isActive ? 'Active' : 'Inactive';
                      return <EuiHealth color={color}>{label}</EuiHealth>;
                    },
                  },
                  {
                    name: 'Action',
                    render: (item: any) => {
                      return (
                        // This is where the edit item takes place
                        <EuiButtonEmpty
                          name="edit"
                          onClick={() => {
                            showModal(item, localArray.indexOf(item));
                          }}
                          iconType="documentEdit"></EuiButtonEmpty>
                      );
                    },
                  },
                ]}></EuiBasicTable>
            </>
          </EuiForm>
          <div className={styles.list}>
            <EuiButton
              onClick={() => setIsCancelModalOpen(true)}
              color="danger">
              Cancel
            </EuiButton>
            <EuiButton
              onClick={() => {
                if (serviceNameField.length != 0) {
                  if (localArray.length != 0) {
                    setIsConfirmModalOpen(true);
                  } else setIsError(true);
                } else setShowServiceErrors(true);
              }}
              className={styles.button}>
              {props.submitLabel}
            </EuiButton>
            <ConfirmAction
              title=" "
              onCancel={() => setIsCancelModalOpen(false)}
              onConfirm={() => {
                setIsCancelModalOpen(false);
                router.push('/admin/manageServices');
                {
                  /** This is where we go back a page */
                }
              }}
              cancelButtonText="No, don't cancel"
              confirmButtonText="Yes, cancel"
              description="Are you sure you want to cancel your changes?"
              isOpen={isCancelModalOpen}></ConfirmAction>
            <ConfirmAction
              title=" "
              onCancel={() => {
                setIsConfirmModalOpen(false);
              }}
              onConfirm={() => {
                setIsConfirmModalOpen(true);
                formik.handleSubmit();
                {
                  /** This is where the API is called */
                }
              }}
              cancelButtonText="No, cancel"
              confirmButtonText="Yes, update"
              description="Are you sure you want to update this service?"
              isOpen={isConfirmModalOpen}></ConfirmAction>
            <ConfirmAction
              title=" "
              onCancel={() => setIsSiteCancelOpen(false)}
              onConfirm={() => {
                setIsSiteCancelOpen(false);
                setIsModalVisible(false);
              }}
              cancelButtonText="No, don't cancel"
              confirmButtonText="Yes, cancel"
              description="Are you sure want to cancel your changes?"
              isOpen={isSiteCancelOpen}></ConfirmAction>
            <ConfirmAction
              title=" "
              onCancel={() => setIsSiteConfirmOpen(false)}
              onConfirm={() => {
                {
                  /** This is where the site in the list is updated */
                }
                setIsSiteConfirmOpen(false);
                // save site changes
                var tempItem: any = {
                  // create a temp item
                  id: item.id,
                  name: modalSiteName,
                  isActive: modalSiteSwitch,
                };
                updateLocalArray(tempItem, itemIndex!); // call function with temp item
                setIsModalVisible(false); // close the modal
              }}
              cancelButtonText="No, cancel"
              confirmButtonText="Yes, update"
              description="Are you sure you want to update this site?"
              isOpen={isSiteConfirmOpen}></ConfirmAction>
            <ConfirmAction
              title=" "
              onCancel={() => {
                setIsError(false);
              }}
              onConfirm={() => {
                setIsError(false);
                setIsConfirmModalOpen(false);
              }}
              cancelButtonText=""
              confirmButtonText="OK"
              description="Site list can't be empty"
              isOpen={isError}></ConfirmAction>
            {isModalVisible ? (
              <EuiModal onClose={closeModal}>
                <EuiModalHeader>
                  <EuiModalHeaderTitle>
                    <h1>Edit Site</h1>
                  </EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiModalBody>
                  <EuiFormRow label="Site Name">
                    <>
                      <EuiFieldText
                        name="siteName"
                        type="text"
                        value={modalSiteName}
                        onChange={modalSiteNameHandleChange}></EuiFieldText>
                    </>
                  </EuiFormRow>
                  <EuiFormRow label="Site Status">
                    <>
                      <EuiSwitch
                        name="siteStatus"
                        type="button"
                        label={isModalSiteActive}
                        checked={modalSiteSwitch!}
                        onChange={onModalSiteSwitchChange}></EuiSwitch>
                    </>
                  </EuiFormRow>
                </EuiModalBody>
                <EuiModalFooter>
                  <EuiButtonEmpty
                    onClick={() => {
                      setIsSiteCancelOpen(true);
                    }}>
                    Cancel
                  </EuiButtonEmpty>
                  <EuiButton onClick={() => setIsSiteConfirmOpen(true)} fill>
                    Save
                  </EuiButton>
                </EuiModalFooter>
              </EuiModal>
            ) : null}
          </div>
        </main>
      </div>
    </form>
  );
};
export default Create;

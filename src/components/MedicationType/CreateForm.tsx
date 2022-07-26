import { EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiFieldText, EuiButton, EuiTitle } from "@elastic/eui"
import React, { } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import agent from "../../agent";
import { MedicationTypeForCreation } from "../../custom_typings/medicationtypes.interfaces";

interface IProps {
  onCreateCompleted: any

}

const CreateForm = (props: IProps) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(5, 'Must be 5 characters or less')
        .required('Required'),
      description: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .required('Required'),
    }),
    onSubmit: async values => {
      const createRequest: MedicationTypeForCreation = {
        name: values.name,
        description: values.description
      };
      const createResponse = await agent.MedicationType.create(createRequest);
      props.onCreateCompleted();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} autoComplete={"off"}>
      <EuiTitle size='s'><h4>Create Medication Test</h4></EuiTitle>
      <EuiFlexGroup style={{ maxWidth: 600 }}>
        <EuiFlexItem>
          <EuiFormRow label="Name" helpText="Medication Name">
            <>
              <EuiFieldText
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </>
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Description" helpText="Medication Description">
            <>
              <EuiFieldText
                name="description"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </>
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFormRow hasEmptyLabelSpace>
            <EuiButton
              type="submit"
            >
              Add
            </EuiButton>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </form>
  )
};

export default CreateForm;
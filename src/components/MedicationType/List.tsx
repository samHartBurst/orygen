import { EuiFlexItem, EuiPanel, EuiText, EuiInMemoryTable, EuiButton, EuiFlexGroup, EuiPagination, EuiButtonEmpty } from "@elastic/eui";
import React, { Fragment, useState } from "react";
import agent from "../../agent";
import { MedicationType, MedicationTypesResponse } from "../../custom_typings/medicationtypes.interfaces";

interface IProps {
  medicationTypesResponse: MedicationTypesResponse;
  onDeleted: any
  activePageIndex: number
  setActivePageIndex: any
}

function List(props: IProps) {
  const { items, totalPages, pageIndex } = props.medicationTypesResponse;

  const columns = [{
    field: 'name',
    name: 'Name',
    width: '30%',
  }, {
    field: 'description',
    name: 'Description',
    width: '50%',
  }, {
    field: 'enabled',
    name: 'Actions',
    width: '120px',
    render: (enabled: boolean, item: MedicationType) => {
      return (
        <EuiFlexGroup
          gutterSize="s">
          {/* <EuiButton color="danger"
            onClick={() => handleDelete(item.id)}>
            Delete
          </EuiButton> */}
          <EuiButtonEmpty iconType="pencil"></EuiButtonEmpty>
        </EuiFlexGroup>
      )
    }
  }];

  async function handleDelete(id: string) {
    var result = confirm("Are you sure?")

    if (!result) return;

    const deleteResponse = await agent.MedicationType.delete(id);
    props.onDeleted();
  }

  return (
    <>
      <EuiFlexItem>
        <EuiPanel>
          {items &&
            <Fragment>
              <EuiText>
                <p>
                  {`${items.length} ${items.length === 1 ? 'record' : 'records'} found`}
                </p>
              </EuiText>
              <EuiInMemoryTable
                items={items}
                rowHeader="Name"
                hasActions={false}
                columns={columns}
                pagination={false}
                sorting={false}
              />
              <EuiPagination
                aria-label="Many pages example"
                pageCount={totalPages}
                activePage={pageIndex - 1}
                onPageClick={(activePage) => props.setActivePageIndex(activePage + 1)}
              />
            </Fragment>
          }
        </EuiPanel>
      </EuiFlexItem>
    </>
  )
}

export default List;
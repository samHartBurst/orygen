import {
  EuiFlexItem,
  EuiPanel,
  EuiText,
  EuiInMemoryTable,
  EuiButton,
  EuiFlexGroup,
  EuiPagination,
  EuiButtonEmpty,
  EuiPopover,
} from '@elastic/eui';
import Link from 'next/link';
import Router from 'next/router';
import React, { Fragment, useState } from 'react';
import agent from '../../agent';
import {
  Service,
  ServiceListResponse,
} from '../../custom_typings/servicelist.interfaces';

interface IProps {
  serviceListResponse: ServiceListResponse;
  onDeleted: any;
  activePageIndex: number;
  setActivePageIndex: any;
}

function List(props: IProps) {
  const { serviceList, totalCount, totalPages } = props.serviceListResponse;

  const columns = [
    {
      field: 'id',
      name: 'Service Id',
    },
    {
      field: 'name',
      name: 'Name',
      width: '50%',
    },
    {
      field: 'status',
      name: 'Status',
    },
    {
      field: 'noOfSites',
      name: 'Number of Sites',
      width: '150px',
    },
    {
      field: 'actions',
      name: 'Actions',

      render: (enabled: boolean, item: Service) => {
        return (
          <EuiFlexGroup>
            <EuiButtonEmpty
              name="edit"
              onClick={() => {
                EditService(item);
              }}
              iconType="documentEdit"></EuiButtonEmpty>
          </EuiFlexGroup>
        );
      },
    },
  ];

  const EditService = (service: Service) => {
    // return alert(service.name);
    Router.push(`/admin/updateService/${service.id}`);
  };

  return (
    <>
      <EuiFlexItem>
        {serviceList && (
          <Fragment>
            <EuiInMemoryTable
              items={serviceList}
              rowHeader="Name"
              hasActions={false}
              columns={columns}
              pagination={false}
              sorting={false}
            />
            <EuiPagination
              aria-label="Many pages example"
              pageCount={totalPages}
              activePage={props.activePageIndex - 1}
              onPageClick={activePage =>
                props.setActivePageIndex(activePage + 1)
              }
            />
          </Fragment>
        )}
      </EuiFlexItem>
      {/* <Edit></Edit> */}
    </>
  );
}

export default List;

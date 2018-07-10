import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CNewIntr from '../../components/Sales/NewIntr';

export default class NewIntr extends PureComponent {
  render() {
    return (
      <PageHeaderLayout>
        <CNewIntr />
      </PageHeaderLayout>
    );
  }
}

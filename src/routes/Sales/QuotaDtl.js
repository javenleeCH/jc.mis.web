import React, { PureComponent } from 'react';
import { Affix, Card, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import QuotaEditor from '../../components/Sales/QuotaEditor';

export default class QuotaDtl extends PureComponent {
  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Affix>
            <Button type="dashed" onClick={() => { this.props.history.goBack(); }}>返回</Button>
          </Affix>
          <QuotaEditor id={this.props.match.params.id} />
        </Card>
      </PageHeaderLayout>
    );
  }
}

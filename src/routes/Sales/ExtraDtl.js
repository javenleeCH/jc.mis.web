import React, { PureComponent } from 'react';
import { Affix, Card, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ExtraEditor from '../../components/Sales/ExtraEditor';

export default class RemitDtl extends PureComponent {
  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Affix>
            <Button type="dashed" onClick={() => { this.props.history.goBack(); }}>返回</Button>
          </Affix>
          <ExtraEditor id={this.props.match.params.id} />
        </Card>
      </PageHeaderLayout>
    );
  }
}

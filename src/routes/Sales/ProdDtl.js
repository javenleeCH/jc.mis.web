import React, { PureComponent } from 'react';
import { Affix, Card, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ProdEditor from '../../components/Sales/ProdEditor';

export default class ProdDtl extends PureComponent {
  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Affix>
            <Button type="dashed" onClick={() => { this.props.history.goBack(); }}>返回</Button>
          </Affix>
          <ProdEditor id={this.props.match.params.id} />
        </Card>
      </PageHeaderLayout>
    );
  }
}

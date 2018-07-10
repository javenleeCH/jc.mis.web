import React, { PureComponent } from 'react';
import { Affix, Card, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UserEditor from '../../components/Organ/UserEditor';

export default class RemitDtl extends PureComponent {
  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Affix>
            <Button type="dashed" onClick={() => { this.props.history.goBack(); }}>返回</Button>
          </Affix>
          <UserEditor id={this.props.match.params.id} />
        </Card>
      </PageHeaderLayout>
    );
  }
}

import React, { PureComponent } from 'react';
import { Affix, Card, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RecruitEditor from '../../components/Recruit/RecruitEditor';

export default class CandidateDetails extends PureComponent {
  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          {/* <Affix>
            <Button type="dashed" onClick={() => { this.props.history.goBack(); }}>返回</Button>
          </Affix> */}
          <RecruitEditor cid={this.props.match.params.id} />
        </Card>
      </PageHeaderLayout>
    );
  }
}

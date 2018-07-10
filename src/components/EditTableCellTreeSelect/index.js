import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';

export default class EditTableCellTreeSelect extends PureComponent {
  static defaultProps = {
    editable: false,
    options: [],
    selectValue: '',
    onChange: () => {},
  }
  static propTypes = {
    editable: PropTypes.bool,
    options: PropTypes.array,
    selectValue: PropTypes.any,
    onChange: PropTypes.func,
  }
  render() {
    const { editable, selectValue, options, onChange } = this.props;
    return (
      <div>
        { <TreeSelect
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, minWidth: 200, overflow: 'auto' }}
          treeDefaultExpandAll
          placeholder="选择部门"
          disabled={!editable}
          value={selectValue + ''}
          treeData={options}
          onChange={value => onChange(value)}
        />}
      </div>
    );
  }
}

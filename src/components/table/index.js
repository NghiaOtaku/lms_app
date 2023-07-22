import { Table } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const TableCustom = ({ datas, loading }) => {
    const { header, data, scroll } = datas;
    return (
        <>
            <Table columns={header} dataSource={data} loading={loading} scroll={scroll} />
        </>
    );
};

TableCustom.propTypes = {
    datas: PropTypes.object,
    loading: PropTypes.bool,
};
export default TableCustom;

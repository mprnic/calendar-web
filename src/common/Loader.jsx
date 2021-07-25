import { Spin } from 'antd';
import React from 'react';

export const Loader = () =>
    <div className="loader">
        <Spin
            size="large"
            tip="Loading..."
        />
    </div>;

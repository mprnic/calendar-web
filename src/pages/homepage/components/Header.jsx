import { Button, PageHeader, Select } from 'antd';
import React from 'react';

import { Modes } from '../../../const';

export const Header = ({ mode, onModeChange }) =>
    <PageHeader
        extra={[
            <Select
                defaultValue={mode}
                key="mode"
                style={{ width: 140 }}
                onChange={value => onModeChange(value)}
            >
                <Select.Option value={Modes.DAY}>Today</Select.Option>
                <Select.Option value={Modes.WEEK}>Next 7 days</Select.Option>
                <Select.Option value={Modes.MONTH}>Next 30 days</Select.Option>
            </Select>,
            <Button
                key="create-new"
                type="primary"
                onClick={() => window.location.assign('/events/new')}
            >
                Create new event
            </Button>
        ]}
        ghost
        title="My events"
    />;

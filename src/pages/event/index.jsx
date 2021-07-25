import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { Loader } from '../../common';
import { GoogleApi } from '../../services';

import './event.scss';

export const Event = ({ isGapiLoaded }) => {
    const [event, setEvent] = useState({});
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getEvent = async () => {
        const id = window.location.pathname.split('/').slice(-1)[0];
        setId(id);
        if (id !== "new") {
            try {
                const event = await GoogleApi.getEvent(id);
                setEvent(event);
            } catch (error) {
                console.log(error);
            }
        }
        setIsLoading(false);
    }

    const getInitialValues = () => {
        if (event.summary) {
            return {
                summary: event.summary,
                date: [
                    moment(event.start.dateTime),
                    moment(event.end.dateTime)
                ]
            }
        }

        return {};
    }

    const onFinish = async data => {
        const event = {
            summary: data.summary,
            end: { dateTime: data.date[1].format() },
            start: { dateTime: data.date[0].format() }
        };

        try {
            if (id === "new") {
                await GoogleApi.createEvent(event);
            } else {
                await GoogleApi.updateEvent(event, id);
            }
            window.location.assign('/events');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isGapiLoaded)
            getEvent();
    }, [isGapiLoaded]);

    return (
        <div className="page event">
            {isLoading
                ? <Loader />
                :
                <Card>
                    <Card.Meta
                        description={
                            <Form
                                initialValues={getInitialValues()}
                                labelCol={{ span: 7 }}
                                layout="horizontal"
                                wrapperCol={{ span: 12 }}
                                onFinish={onFinish}
                            >
                                <Button
                                    icon={<ArrowLeftOutlined />}
                                    onClick={() => window.history.back()}
                                />
                                <Form.Item wrapperCol={{ offset: 7, span: 12 }}>
                                    <h2>New event</h2>
                                </Form.Item>
                                <Form.Item
                                    label="Summary"
                                    name="summary"
                                    rules={[{ required: true, message: 'Summary is required' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Date"
                                    name="date"
                                    rules={[{ required: true, message: 'Date is required' }]}
                                >
                                    <DatePicker.RangePicker showTime />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 7, span: 12 }}>
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        }
                    />
                </Card>
            }
        </div>
    );
}

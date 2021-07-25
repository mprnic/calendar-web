import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Card, List } from 'antd';
import React from 'react';

export const EventsCard = ({ events, title, onEventDelete }) =>
    <Card className="event-group">
        <Card.Meta
            description={
                <List
                    dataSource={events}
                    itemLayout="horizontal"
                    renderItem={event => (
                        <List.Item
                            actions={[
                                <Button
                                    ghost
                                    icon={<EditTwoTone />}
                                    key="edit"
                                    type="primary"
                                    onClick={() => window.location.assign(`/events/${event.id}`)}
                                >
                                    edit
                                </Button>,
                                <Button
                                    danger
                                    icon={<DeleteTwoTone twoToneColor="#ff4d4f" />}
                                    key="delete"
                                    onClick={() => onEventDelete(event.id)}
                                >
                                    delete
                                </Button>
                            ]}
                            key={event.id}
                        >
                            <List.Item.Meta
                                description={`${(new Date(event.start.dateTime)).toLocaleString()} - ${(new Date(event.end.dateTime)).toLocaleString()}`}
                                title={event.summary}
                            />
                        </List.Item>
                    )}
                />
            }
            title={title}
        />
    </Card>;

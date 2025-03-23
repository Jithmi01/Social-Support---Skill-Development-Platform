import { Table, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WrapperCard from '../../common/Wrapper_card';
import CustomRow from '../../common/Form_header';
import '../Event-Main.css';

const MyTable = () => {

    const { id } = useParams();
    const [registeredEntities, setRegisteredEntities] = useState([]);

    const getSpecific = () => {
        axios
            .get("http://localhost:4000/event/get/" + id)
            .then((res) => {
                setRegisteredEntities(res.data.Event.registeredEntities);
            })
            .catch(() => {
                alert("Error Occurred On Delete");
            });
    }

    useEffect(() => getSpecific(), []);

    const handleDelete = (eid) => {
        axios
            .delete(`http://localhost:4000/event/${id}/registeredEntityId/${eid}`)
            .then(() => {
                window.location.reload(false);
            })
            .catch(() => {
                alert("Error Occurred On Delete");
            });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure to delete this value?"
                    onConfirm={() => handleDelete(record._id)}
                >
                    <DeleteOutlined style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }} />
                </Popconfirm>
            ),
        },
    ];

    const data = registeredEntities.map((entity) => {
        return {
            key: entity._id,
            name: entity.name,
            id: entity.id,
            _id: entity._id,
        }
    });

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '40px 0',
            backgroundColor: '#f4f6f9',
            minHeight: '100vh'
        }}>
            <div style={{
                width: '80%',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '24px'
            }}>
                <WrapperCard style={{ backgroundColor: "#37475E", borderRadius: '8px', padding: '20px' }}>
                    <CustomRow
                        style={{
                            display: 'flex',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <h1 style={{
                            color: 'white',
                            fontSize: '1.8rem',
                            fontWeight: '600',
                        }}>
                            Participants in event
                        </h1>
                    </CustomRow>
                </WrapperCard>
                <div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="key"
                        pagination={{
                            pageSize: 10,
                            style: { textAlign: 'center', padding: '12px 0', backgroundColor: '#ffffff', borderRadius: '8px' }
                        }}
                        style={{
                            marginTop: '20px',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            fontSize:'20px'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyTable;
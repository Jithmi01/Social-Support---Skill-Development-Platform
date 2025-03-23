import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Collapse, Input, Modal, Typography } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import {
  PlusIcon,
  SearchIcon,
  PrinterIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
} from 'lucide-react'
const { Search } = Input
const { Panel } = Collapse
const AllEvent = () => {
  const [eventDetails, setAllEventDetails] = useState([])
  const [searchDetail, setsearchDetail] = useState('')
  const [eventId, setEventId] = useState('')
  const [count, setcount] = useState(0)
  const { confirm } = Modal
  useEffect(() => {
    axios
      .get('http://localhost:4000/event/getAll')
      .then((res) => setAllEventDetails(res.data.Event))
      .catch(() => alert('Check The Connectivity'))
  }, [])
  function deleteEventDetail(id) {
    axios
      .delete(`http://localhost:4000/event/delete/${id}`)
      .then(() => window.location.reload(false))
      .catch(() => alert('Error Occurred On Delete'))
  }
  const showPromiseConfirm = (val) => {
    confirm({
      title: 'Do you want to delete this event?',
      icon: <ExclamationCircleFilled />,
      content: 'Once deleted, this event cannot be restored.',
      async onOk() {
        try {
          await deleteEventDetail(val._id)
        } catch {
          console.log('Oops, an error occurred!')
        }
      },
    })
  }
  const handleEventSelect = (eventId) => {
    setEventId(eventId)
    setcount(0)
    axios
      .get(`http://localhost:4000/event/${eventId}/registered-entities-count`)
      .then((res) => setcount(res.data))
      .catch(() => alert('Something went wrong while fetching count'))
  }
  const showCount = (eid, cid) => (eid === cid ? count.count : 0)
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Event Management
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <Link to="/addevent">
            <Button
              type="primary"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
              icon={<PlusIcon className="w-4 h-4" />}
            >
              Add Event
            </Button>
          </Link>
          <Search
            placeholder="Search events"
            allowClear
            enterButton={
              <div className="flex items-center gap-2">
                <SearchIcon className="w-4 h-4" />
                Search
              </div>
            }
            size="large"
            onSearch={setsearchDetail}
            className="w-full md:w-96"
          />
        </div>
        <div className="space-y-4">
          {eventDetails
            .filter(
              (val) =>
                searchDetail === '' ||
                val.eventName
                  .toLowerCase()
                  .includes(searchDetail.toLowerCase()),
            )
            .map((eventDetailsVal, index) => (
              <Collapse
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <Panel
                  header={
                    <div className="flex items-center gap-3">
                      <Badge
                        count={eventDetailsVal.eventNo}
                        className="bg-orange-500"
                      />
                      <span className="font-medium text-gray-700">
                        {eventDetailsVal.eventName}
                      </span>
                    </div>
                  }
                  extra={
                    <Badge
                      count={eventDetailsVal.eventDate}
                      className="bg-purple-600"
                    />
                  }
                >
                  <Card className="border-none shadow-none">
                    <div className="flex flex-wrap gap-3 justify-end mb-4">
                      <Link to={`/updateEvent/${eventDetailsVal._id}`}>
                        <Button
                          className="flex items-center gap-2 bg-amber-500 text-white hover:bg-amber-600"
                          icon={<PencilIcon className="w-4 h-4" />}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Link to={`/printDetails/${eventDetailsVal._id}`}>
                        <Button
                          className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600"
                          icon={<PrinterIcon className="w-4 h-4" />}
                        >
                          Print
                        </Button>
                      </Link>
                      <Button
                        className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
                        onClick={() => showPromiseConfirm(eventDetailsVal)}
                        icon={<TrashIcon className="w-4 h-4" />}
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <Button
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200"
                        onClick={() => handleEventSelect(eventDetailsVal._id)}
                      >
                        <UsersIcon className="w-4 h-4" />
                        Participants
                      </Button>
                      <Link
                        to={`/AllParticipants/${eventDetailsVal._id}`}
                        className="flex-1"
                      >
                        <Button className="w-full bg-gray-100 hover:bg-gray-200">
                          {showCount(eventDetailsVal._id, count.id)}
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      <Card
                        className="bg-gray-50"
                        title={<span className="text-gray-700">Location</span>}
                      >
                        {eventDetailsVal.eventPlace}
                      </Card>
                      <Card
                        className="bg-gray-50"
                        title={<span className="text-gray-700">Description</span>}
                      >
                        {eventDetailsVal.eventDetails}
                      </Card>
                    </div>
                  </Card>
                </Panel>
              </Collapse>
            ))}
        </div>
      </div>
    </div>
  )
}
export default AllEvent
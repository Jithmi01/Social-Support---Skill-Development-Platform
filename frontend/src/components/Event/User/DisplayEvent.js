import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button, Input, Form } from 'antd'
import { MapPinIcon, CalendarIcon } from 'lucide-react'
const DisplayEvent = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [eventDetails, setAllEventDetails] = useState([])
  const [id, setid] = useState('')
  const [name, setname] = useState('')
  const [eventId, setEventId] = useState('')
  const [selectedEventId, setSelectedEventId] = useState(null)
  useEffect(() => {
    axios
      .get("http://localhost:4000/event/getAll")
      .then((res) => {
        setAllEventDetails(res.data.Event)
        setEventId(res.data.Event[0]?._id)
      })
      .catch(() => alert("Check The Connectivity"))
  }, [])
  const handleSubmit = () => {
    axios
      .post(`http://localhost:4000/event/${eventId}/registered-entities`, { id, name })
      .then(() => window.location.reload(false))
      .catch((err) => alert(err))
  }
  const showModal = (eventId) => {
    setSelectedEventId(eventId)
    setEventId(eventId)
    setModalVisible(true)
  }
  const handleCancel = () => {
    setModalVisible(false)
  }
  const getStatusColor = (status) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'
  }
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Upcoming Events</h1>
          <div className="w-64">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid gap-6">
          {eventDetails.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {event.eventName}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.eventStatus)}`}
                  >
                    {event.eventStatus}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">{event.eventPlace}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">{event.eventDate}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600">
                    {event.eventDetails.length > 150
                      ? event.eventDetails.substring(0, 150) + '...'
                      : event.eventDetails}
                  </p>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => showModal(event._id)}
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <div className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">
                        Read more & participate
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
          className="rounded-xl overflow-hidden"
          title={<h3 className="text-xl font-bold">Event Details</h3>}
        >
          {selectedEventId &&
            eventDetails.find((event) => event._id === selectedEventId) && (
              <div className="py-2">
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    {
                      eventDetails.find(
                        (event) => event._id === selectedEventId
                      )?.eventName
                    }
                  </h4>
                  <p className="text-gray-600 whitespace-pre-line">
                    {
                      eventDetails.find(
                        (event) => event._id === selectedEventId
                      )?.eventDetails
                    }
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-center mb-4">
                    Register for this Event
                  </h3>
                  <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your name',
                        },
                      ]}
                      className="mb-4"
                    >
                      <Input
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Enter your full name"
                        className="py-2"
                      />
                    </Form.Item>
                    <Form.Item
                      label="ID Number"
                      name="id"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your ID',
                        },
                      ]}
                      className="mb-6"
                    >
                      <Input
                        onChange={(e) => setid(e.target.value)}
                        placeholder="Enter your ID number"
                        className="py-2"
                      />
                    </Form.Item>
                    <div className="flex justify-end">
                      <Button onClick={handleCancel} className="mr-2">
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Register Now
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            )}
        </Modal>
      </div>
    </div>
  )
}


export default DisplayEvent;
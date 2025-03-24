import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomRow from "./CustomRow";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventNo: "",
    eventName: "",
    eventPlace: "",
    eventDate: null,
    eventDetails: ""
  });
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      eventDate: date
    });
    if (errors.eventDate) {
      setErrors({
        ...errors,
        eventDate: null
      });
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.eventNo) newErrors.eventNo = "Event No is required!";
    if (!formData.eventName) newErrors.eventName = "Event Name is required!";
    if (!formData.eventPlace) newErrors.eventPlace = "Event Location is required!";
    if (!formData.eventDate) newErrors.eventDate = "Event Date is required!";
    if (!formData.eventDetails) newErrors.eventDetails = "Event Description is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };
  const handleReset = () => {
    setFormData({
      eventNo: "",
      eventName: "",
      eventPlace: "",
      eventDate: null,
      eventDetails: ""
    });
    setErrors({});
  };
  const confirmSubmit = async () => {
    setShowConfirmModal(false);
    try {
      await axios.post("http://localhost:4000/event/addevent", {
        ...formData,
        eventDate: formData.eventDate ? formData.eventDate.toISOString().split('T')[0] : null
      });
      setShowSuccessModal(true);
    } catch (err) {
      console.log(err);
      setShowErrorModal(true);
    }
  };
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/allevent");
  };
  return (
    <div className="flex justify-center p-5 md:p-8 min-h-screen">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <CustomRow style={{ justifyContent: "center" }}>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 pb-2 border-b-4 border-blue-600 inline-block">
                Add Event
              </h1>
            </CustomRow>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="eventNo" className="block text-sm font-medium text-gray-700 mb-1">
                    Event No
                  </label>
                  <input
                    type="text"
                    id="eventNo"
                    name="eventNo"
                    value={formData.eventNo}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                      errors.eventNo ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholder="Enter Event No"
                  />
                  {errors.eventNo && (
                    <p className="mt-1 text-sm text-red-600">{errors.eventNo}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                      errors.eventName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholder="Enter Event Name"
                  />
                  {errors.eventName && (
                    <p className="mt-1 text-sm text-red-600">{errors.eventName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="eventPlace" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Location
                  </label>
                  <input
                    type="text"
                    id="eventPlace"
                    name="eventPlace"
                    value={formData.eventPlace}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                      errors.eventPlace ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholder="Enter Event Location"
                  />
                  {errors.eventPlace && (
                    <p className="mt-1 text-sm text-red-600">{errors.eventPlace}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date
                  </label>
                  <DatePicker
                    selected={formData.eventDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                      errors.eventDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholderText="Select Event Date"
                  />
                  {errors.eventDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.eventDate}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="eventDetails" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Description
                  </label>
                  <textarea
                    id="eventDetails"
                    name="eventDetails"
                    value={formData.eventDetails}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                      errors.eventDetails ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    placeholder="Enter Event Description"
                  />
                  {errors.eventDetails && (
                    <p className="mt-1 text-sm text-red-600">{errors.eventDetails}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Event Addition</h3>
            </div>
            <p className="mb-6 text-gray-600">Are you sure you want to add this event?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={confirmSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Success</h3>
            </div>
            <p className="mb-6 text-gray-600">Event added successfully!</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                onClick={handleSuccessClose}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center mb-4">
            <XCircle className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Error</h3>
            </div>
            <p className="mb-6 text-gray-600">Error adding event!</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                onClick={() => setShowErrorModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddEvent;
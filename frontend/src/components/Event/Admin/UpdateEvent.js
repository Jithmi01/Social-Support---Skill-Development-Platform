import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CheckCircle } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const UpdateEvent = () => {
    const [eventNo, seteventNo] = useState("");
    const [eventName, seteventName] = useState("");
    const [eventPlace, seteventPlace] = useState("");
    const [eventDetails, seteventDetails] = useState("");
    const [eventDate, seteventDate] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal

    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate

    const getEventDetails = () => {
        axios.get(`http://localhost:4000/event/get/${id}`)
            .then((res) => {
                const { eventNo, eventName, eventPlace, eventDetails, eventDate } = res.data.Event;
                seteventNo(eventNo);
                seteventName(eventName);
                seteventPlace(eventPlace);
                seteventDetails(eventDetails);
                seteventDate(dayjs(eventDate).toDate());
            })
            .catch((err) => alert(err.message));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const confirmUpdate = async () => {
        const newEvent = {
            eventNo,
            eventName,
            eventPlace,
            eventDetails,
            eventDate: dayjs(eventDate).format("YYYY-MM-DD"),
        };
        try {
            await axios.put(`http://localhost:4000/event/update/${id}`, newEvent);
            setShowConfirmModal(false);
            setShowSuccessModal(true); // Show success modal after update
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSuccessOk = () => {
        setShowSuccessModal(false);
        navigate("/allevent"); // Redirect to AllEvent page
    };

    useEffect(() => {
        getEventDetails();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg mb-8">
                    <div className="px-6 py-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                            Update Event
                        </h1>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Event No
                                </label>
                                <input
                                    type="text"
                                    value={eventNo}
                                    disabled
                                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Name
                                </label>
                                <input
                                    type="text"
                                    value={eventName}
                                    onChange={(e) => seteventName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Location
                                </label>
                                <input
                                    type="text"
                                    value={eventPlace}
                                    onChange={(e) => seteventPlace(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Date
                                </label>
                                <DatePicker
                                    selected={eventDate ? new Date(eventDate) : null}
                                    onChange={(date) => seteventDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Description
                                </label>
                                <textarea
                                    value={eventDetails}
                                    onChange={(e) => seteventDetails(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    Update Event
                                </button>
                                <button
                                    type="button"
                                    onClick={() => getEventDetails()}
                                    className="px-6 py-2.5 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md mx-4 p-6">
                        <div className="flex items-center mb-4">
                            <CheckCircle className="h-6 w-6 text-yellow-500 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-900">Confirm Update</h3>
                        </div>
                        <p className="text-gray-600 mb-6">Are you sure you want to update this event?</p>
                        <div className="flex justify-end space-x-3">
                            <button onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
                                Cancel
                            </button>
                            <button onClick={confirmUpdate}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md mx-4 p-6">
                        <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-center text-gray-900">Event Updated Successfully!</h3>
                        <div className="mt-4 flex justify-center">
                            <button onClick={handleSuccessOk} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateEvent;

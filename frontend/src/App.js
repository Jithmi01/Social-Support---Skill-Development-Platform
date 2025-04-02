import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/common/header";
import PublishAd from "./components/DonationAdmin/PublishAd";
import Ads from "./components/DonationAdmin/ShowAllAds";
import AddEvent from "./components/Event/Admin/AddEvent";
import AllEvent from "./components/Event/Admin/AllEvent";
import UpdateEvent from "./components/Event/Admin/UpdateEvent";
import DetailsPrint from "./components/Event/Admin/DetailsPrint";
import Showvacancies from "./components/JobFind/Show_Vacancies";
import JobApply from "./components/JobFind/JobApply";
import AppliedJobs from "./components/JobFind/AppliedJobs";
import Home from "./pages/Home/Home";
import MakeDonations from "./components/DoDonations/MakeDonations";
import Register from "./components/Register/Register";
import ShowDonations from "./components/DoDonations/ShowDonations";
import UpdateAd from "./components/DonationAdmin/UpdateAd";
import DisplayEvent from "./components/Event/User/DisplayEvent";
import EditDonations from "./components/DoDonations/EditDonations";
import JobPost from "./components/JobPortal/JobPost";
import JobList from "./components/JobPortal/JobList";
import CoursesContainer from "./components/courses/CoursesContainer";
import UserCoursesContainer from "./components/user-course/UserCoursesContainer";
import AppliedUsers from "./components/JobPortal/AppliedUsers";
import AllParticipants from "./components/Event/Admin/AllParticipants ";
import CardDetails from "./components/DoDonations/CardDetails";
import Card from "./components/Campaign/User/Card";
import Login from "./components/User/Login";
import PaymentPortal from "./components/DoDonations/PaymentPortal";
import UserLayout from "./layouts/UserLayout";
import AdsUserView from "./components/DonationAdmin/AdsUserView";
import axios from "axios";
import Admin from "./pages/AdminDashboard/Admin_dashboard";
import Financial from "./components/Financial/Financial";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import ManageCampaigns from "./components/Campaign/Admin/ManageCampaigns";
import ViewCampaigns from "./components/Campaign/User/ViewCampaigns";
import MakeDonation from "./components/Campaign/User/MakeDonation";
import DonationConfirmation from "./components/Campaign/User/DonationConfirmation";
import ViewDonations from "./components/Campaign/Admin/ViewDonations";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

// Protected Route Component
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  // Axios Interceptor for adding Authorization headers
  axios.interceptors.request.use(
    function (config) {
      if (localStorage.getItem("token"))
        config.headers.Authorization = localStorage.getItem("token");
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/userDash"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/add"
        element={
          <PrivateRoute>
            <JobPost />
          </PrivateRoute>
        }
      />
      <Route
        path="/joblist"
        element={
          <PrivateRoute>
            <AdminLayout>
              <JobList />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <AdminLayout>
            <CoursesContainer />
          </AdminLayout>
        }
      />
      <Route
        path="/appliedUsers/:id"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AppliedUsers />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/showVacancies"
        element={
          <PrivateRoute>
            <UserLayout>
              <Showvacancies />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/user-courses"
        element={
          <UserLayout>
            <UserCoursesContainer />
          </UserLayout>
        }
      />
      <Route
        path="/jobApply/:id"
        element={
          <PrivateRoute>
            <UserLayout>
              <JobApply />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/appliedjobs"
        element={
          <PrivateRoute>
            <UserLayout>
              <AppliedJobs />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/pdonation"
        element={
          <PrivateRoute>
            <PublishAd />
          </PrivateRoute>
        }
      />
      <Route
        path="/showAds"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Ads />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/update-ad/:_id"
        element={
          <PrivateRoute>
            <UpdateAd />
          </PrivateRoute>
        }
      />
      <Route
        path="/donate"
        element={
          <PrivateRoute>
            <UserLayout>
              <MakeDonations />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/showDonation"
        element={
          <PrivateRoute>
            <UserLayout>
              <ShowDonations />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/editDonation/:id"
        element={
          <PrivateRoute>
            <EditDonations />
          </PrivateRoute>
        }
      />
      <Route
        path="/cardDetails/"
        element={
          <PrivateRoute>
            <CardDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/Card/"
        element={
          <PrivateRoute>
            <Card />
          </PrivateRoute>
        }
      />
      <Route
        path="/paymentDetails/"
        element={
          <PrivateRoute>
            <PaymentPortal />
          </PrivateRoute>
        }
      />
      <Route
        path="/adsUserView/"
        element={
          <PrivateRoute>
            <UserLayout>
              <AdsUserView />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/addevent"
        element={
          <PrivateRoute>
            <AddEvent />
          </PrivateRoute>
        }
      />
      <Route
        path="/financial"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Financial />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/allEvent"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AllEvent />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/updateEvent/:id"
        element={
          <PrivateRoute>
            <UpdateEvent />
          </PrivateRoute>
        }
      />
      <Route
        path="/printDetails/:id"
        element={
          <PrivateRoute>
            <DetailsPrint />
          </PrivateRoute>
        }
      />
      <Route
        path="/userEvent"
        element={
          <PrivateRoute>
            <UserLayout>
              <DisplayEvent />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/AllParticipants/:id"
        element={
          <PrivateRoute>
            <AllParticipants />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/campaigns"
        element={
          <AdminLayout>
            <ManageCampaigns />
          </AdminLayout>
        }
      />
      <Route
        path="/campaigns"
        element={
          <UserLayout>
            <ViewCampaigns />
          </UserLayout>
        }
      />
      <Route
        path="/makeDonation"
        element={
          <UserLayout>
            <MakeDonation />
          </UserLayout>
        }
      />
      <Route
        path="/donationConfirmation"
        element={
          <UserLayout>
            <DonationConfirmation />
          </UserLayout>
        }
      />
      <Route
        path="/admin/donations"
        element={
          <AdminLayout>
            <ViewDonations />
          </AdminLayout>
        }
      />
      <Route path="/" element={<Navigate to={isAuthenticated() ? "/userDash" : "/login"} />} />
    </Routes>
  );
}

export default App;

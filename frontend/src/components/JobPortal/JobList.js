import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import axios from "axios";
import { EditTwoTone, DeleteOutlined, SelectOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../common/DeleteModal";
import jsPDF from "jspdf";
import "jspdf-autotable";
import JobPost from "./JobPost";
import logo from "../../assets/images/EmpowerHub.png";

const { Search } = Input;

const JobList = () => {
  const [jobList, setJobList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getJobList();
  }, []);

  function getJobList() {
    axios
      .get("http://localhost:4000/jobHire/")
      .then((res) => setJobList(res.data))
      .catch((err) => alert(err.message));
  }

  const refresh = async () => {
    await getJobList();
  };

  const handleDelete = (_id) => {
    setIsDeleteModalOpen(true);
    setSelectedItem(_id);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete("http://localhost:4000/jobHire/delete/" + selectedItem)
      .then(() => {
        setIsDeleteModalOpen(false);
        refresh();
      })
      .catch((err) => console.log(err));
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    // Load Image 
    const imgWidth = 20; 
    const imgHeight = 20; 
    const imgX = 10;  
    const imgY = 10;  

    const img = new Image();
    img.src = logo;

    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgBase64 = canvas.toDataURL('image/png');

        // Add the Image
        doc.addImage(imgBase64, 'PNG', imgX, imgY, imgWidth, imgHeight);

        // Company Details
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('EmpowerHub - Skill Development & Learning Platform', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('No.40, Kaduwela Road, Malabe', 105, 28, { align: 'center' });
        doc.text('Tel: +94 77 444 5555 | Email: empowerhub@gmail.com', 105, 36, { align: 'center' });

        // Separator Line
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(10, 45, 200, 45);

        // PDF Title
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Job Vacancies', 105, 55, { align: 'center' });

        // Table - Replace 'jobList' with your actual data array
        doc.autoTable({
            startY: 65,
            columns: [
                { header: 'Job Title', dataKey: 'jobTitle' },
                { header: 'Company', dataKey: 'company' },
                { header: 'Location', dataKey: 'location' },
                { header: 'Opening Date', dataKey: 'openingDate' },
                { header: 'Closing Date', dataKey: 'closingDate' },
            ],
            body: jobList.map((job) => ({
                jobTitle: job.jobTitle,
                company: job.company,
                location: job.location,
                openingDate: job.openingDate,
                closingDate: job.closingDate,
            })),
            theme: 'grid',
        });

        // Save PDF
        doc.save('Job_Vacancies_Report.pdf');
    };
};


  const columns = [
    { title: "Job Title", dataIndex: "jobTitle", key: "jobTitle" },
    { title: "Company", dataIndex: "company", key: "company" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Opening Date", dataIndex: "openingDate", key: "openingDate" },
    { title: "Closing Date", dataIndex: "closingDate", key: "closingDate" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            icon={<EditTwoTone />}
            onClick={() => {
              setIsEditModalOpen(true);
              setSelectedItem(record);
            }}
          />
          <Button icon={<DeleteOutlined style={{ color: "red" }} />} onClick={() => handleDelete(record._id)} />
          <Button icon={<SelectOutlined style={{ color: "blue" }} />} onClick={() => navigate("/appliedUsers/" + record._id)} />
        </span>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column", backgroundColor: "#E8F9FF" }}>
      <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "darkblue", textAlign: "left", marginBottom: "20px" }}>Job Vacancies</h1>
      <Button onClick={() => setIsModalOpen(true)} type="primary" style={{ marginBottom: 20 }}>Add New Vacancy</Button>
      <div style={{ width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 5, boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <Search placeholder="Search by job title" onChange={(e) => setSearchText(e.target.value)} style={{ width: 250 }} />
          <Button icon={<FilePdfOutlined style={{ fontSize: "21px", color: "red" }} />} onClick={generatePdf} />
        </div>
        <Table columns={columns} dataSource={jobList.filter((job) => job.jobTitle.toLowerCase().includes(searchText.toLowerCase()))} />
      </div>
      <JobPost isOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)} handleOk={refresh} />
      <JobPost isOpen={isEditModalOpen} handleCancel={() => setIsEditModalOpen(false)} handleOk={refresh} selectedItem={selectedItem} />
      <DeleteModal isModalOpen={isDeleteModalOpen} handleCancel={() => setIsDeleteModalOpen(false)} handleOk={handleDeleteConfirm} text="Do you want to delete the Job details?" />
    </div>
  );
};

export default JobList;

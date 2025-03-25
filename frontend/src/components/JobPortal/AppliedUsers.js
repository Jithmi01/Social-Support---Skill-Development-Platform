import React, { useState, useEffect } from "react";
import { Table, Input, Card, Button } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoImage from "../../assets/images/EmpowerHub.png";

const Showvacancies = () => {
  const [appliedUsersList, setAppliedUsersList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { id } = useParams();

  useEffect(() => {
    function getAppliedUsers() {
      axios
        .get("http://localhost:4000/jobFind/applications/" + id)
        .then((res) => {
          setAppliedUsersList(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAppliedUsers();
  }, [id]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNum",
      key: "contactNum",
    },
    {
      title: "Past Experience",
      dataIndex: "pastExp",
      key: "pastExp",
      render: (text) => {
        return <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{text}</div>;
      }
    },
  ];

  // PDF generation
  const generatePdf = () => {
    const doc = new jsPDF();

    // Add Logo Image to PDF
    const imgWidth = 20;
    const imgHeight = 20;
    const imgX = 10;
    const imgY = 10;

    // Adding the logo to PDF
    doc.addImage(logoImage, "PNG", imgX, imgY, imgWidth, imgHeight);

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
    doc.text('Applied Users List', 105, 55, { align: 'center' });

    // Table
    doc.autoTable({
      startY: 65,
      columns: [
        { header: 'First Name', dataKey: 'firstName' },
        { header: 'Last Name', dataKey: 'lastName' },
        { header: 'Email', dataKey: 'email' },
        { header: 'Contact Number', dataKey: 'contactNum' },
        { header: 'Past Experience', dataKey: 'pastExp' },
      ],
      body: appliedUsersList.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNum: user.contactNum,
        pastExp: user.pastExp,
      })),
      theme: 'grid',
    });

    // Save PDF
    doc.save('Applied_Users_Report.pdf');
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: "80%",
          maxWidth: "1000px",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            backgroundColor: "#001f3f",
            padding: "12px",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "white", margin: 0 }}>Applied Users</h2>
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Input
            placeholder="Search by name"
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: "250px",
              textAlign: "center",
              borderRadius: "20px",
            }}
          />
        </div>

        {/* PDF Download Button */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button
            onClick={generatePdf}
            type="primary"
            style={{ backgroundColor: "#D84040", borderColor: "#001f3f" }}
          >
            Download PDF
          </Button>
        </div>

        {/* Data Table */}
        <Table
          columns={columns}
          dataSource={appliedUsersList.filter((user) =>
            user.firstName.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default Showvacancies;

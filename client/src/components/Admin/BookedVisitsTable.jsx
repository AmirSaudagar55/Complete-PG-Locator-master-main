import React, { useState, useEffect } from "react";
import { getAllUsers, getAllProperties } from "../../utils/api"; // Import getAllProperties
import { Table, Spin, Alert } from "antd"; // Added Spin and Alert for loading and error handling

const BookedVisitsTable = () => {
  const [bookedVisitsData, setBookedVisitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const email = "user@example.com"; // Replace with the user's email or get it dynamically
        // const token = "your-auth-token"; // Replace with the user's authentication token or get it dynamically

        const allUsers = await getAllUsers();
        const allProperties = await getAllProperties(); // Fetch all properties

        const usersWithBookedVisits = allUsers
          .filter((user) => user.bookedVisits.length > 0)
          .map((user) => ({
            email: user.email,
            visits: user.bookedVisits.map((visit) => ({
              date: visit.date,
              residencyId: visit.id,
              residencyName: getResidencyNameById(visit.id, allProperties), // Get residency name by id
            })),
          }));

        setBookedVisitsData(usersWithBookedVisits);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getResidencyNameById = (id, allProperties) => {
    const property = allProperties.find((property) => property.id === id);
    return property ? property.title : ""; // Assuming the name property exists in your residency object
  };
  

  const columns = [
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Residency Name", // Updated title
      dataIndex: "visits",
      key: "residencyName",
      render: (visits) => (
        <span>
          {visits.map((visit) => (
            <div key={visit.residencyId}>{visit.residencyName}</div>
          ))}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "visits",
      key: "date",
      render: (visits) => (
        <span>
          {visits.map((visit) => (
            <div key={visit.date}>{visit.date}</div>
          ))}
        </span>
      ),
    },
  ];

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return <Table dataSource={bookedVisitsData} columns={columns} />;
};

export default BookedVisitsTable;

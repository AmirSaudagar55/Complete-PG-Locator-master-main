import React, { useState, useEffect } from "react";
import { getAllUsers, getAllProperties } from "../../utils/api";
import { Table, Spin, Alert } from "antd";

const BookedVisitsTable = () => {
  const [bookedVisitsData, setBookedVisitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsers = await getAllUsers();
        const allProperties = await getAllProperties();

        const usersWithBookedVisits = allUsers
          .filter((user) => user.bookedVisits.length > 0)
          .map((user) => ({
            email: user.email,
            name: user.name, // Include user's name
            phone: user.phone, // Include user's phone number
            visits: user.bookedVisits.map((visit) => ({
              date: visit.date,
              residencyId: visit.id,
              residencyName: getResidencyNameById(visit.id, allProperties),
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
    return property ? property.title : "";
  };

  const columns = [
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Name", // Added title
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User Phone", // Added title
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Residency Name",
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

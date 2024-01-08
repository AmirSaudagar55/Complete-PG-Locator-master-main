import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Input, Col, Grid, Loader } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation, useQuery } from "react-query";
import UserDetailContext from "../../context/UserDetailContext.js";
import { bookVisit, updateUserDetails, getAllUsers } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showForm, setShowForm] = useState(true);

  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  // Query to fetch user details
  const { data: allUsersData, isLoading: allUsersLoading } = useQuery("allUsers", getAllUsers);

  useEffect(() => {
    // Update form fields if user data is available
    if (allUsersData && allUsersData.length > 0) {
      const foundUser = allUsersData.find((user) => user.email === email);

      if (foundUser) {
        setName(foundUser.name);
        setPhone(foundUser.phone);
      }
    }
  }, [allUsersData, email]);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: (error) => {
      if (error?.response?.status === 400) {
        toast.error("Booking failed: " + error.response.data.message);
      } else {
        toast.error("Something went wrong, Please try again");
      }
    },
    onSettled: () => setOpened(false),
  });

  const handleFormSubmit = () => {
    if (!name || !phone) {
      toast.error("Name and phone number are required");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number should be 10 digits");
      return;
    }

    updateUserDetails(email, token, name, phone).then(() => {
      setShowForm(false);
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      {allUsersLoading ? (
        <Loader size="md" />
      ) : showForm ? (
        // Display the Mantine form to enter name and phone number
        <Grid>
          <Col span={12}>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>
          <Col span={12}>
            <Input
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Col>
          <Col span={12}>
            <Button
              disabled={!name || !phone || isLoading}
              onClick={handleFormSubmit}
            >
              Next
            </Button>
          </Col>
        </Grid>
      ) : (
        // Display the date picker
        <div className="flexColCenter" style={{ gap: "1rem" }}>
          <DatePicker value={value} onChange={setValue} minDate={new Date()} />
          <Button disabled={!value || isLoading} onClick={() => mutate()}>
            Book visit
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default BookingModal;

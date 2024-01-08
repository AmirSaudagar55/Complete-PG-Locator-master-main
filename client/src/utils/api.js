import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://server-beta-ruddy.vercel.app/api",
  // baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email, token, name = "", phone = "") => {
  try {
    await api.post(
      `/user/register`,
      { email, name, phone },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};


export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");

    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

export const getAllFav = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allFav`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data["favResidenciesID"];
  } catch (e) {
    toast.error("Something went wrong while fetching favs");
    throw e;
  }
};

export const getAllBookings = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allBookings`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data["bookedVisits"];
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error;
  }
};

export const createResidency = async (data, token) => {
  console.log(data);
  try {
    const res = await api.post(
      `/residency/create`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteResidency = async (residencyId) => {
  try {
    const response = await api.delete(
      `/residency/delete/${residencyId}`
      // , {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
    );

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    toast.error("Something went wrong while deleting residency");
    throw error;
  }
};

export const updateResidency = async (residencyId, data) => {
  try {
    const response = await api.put(`/residency/update/${residencyId}`, {
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        address: data.address,
        country: data.country,
        city: data.city,
        facilities: data.facilities,
        image: data.image,
        userEmail: data.userEmail,
        owner: { connect: { email: data.userEmail } }, // Connect with the new owner based on email
      },
    }, 
    
    //  {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
    );

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    toast.error("Something went wrong while updating residency");
    throw error;
  }
};


export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/allUsers", {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    toast.error("Something went wrong while fetching users");
    throw error;
  }
};

export const updateUserDetails = async (email, token, name, phone) => {
  try {
    await api.post(
      `/user/updateDetails`,
      { email, name, phone },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong while updating user details");
    throw error;
  }
};





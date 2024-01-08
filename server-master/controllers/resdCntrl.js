import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
        bookedBedrooms: 0,
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with the same address already exists");
    }
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});

//Function to delete residency
export const deleteResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the residency exists
    const existingResidency = await prisma.residency.findUnique({
      where: { id },
    });

    if (!existingResidency) {
      return res.status(404).json({ message: 'Residency not found' });
    }

    // Delete the residency
    await prisma.residency.delete({
      where: { id },
    });

    res.json({ message: 'Residency deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Function to update Residency
export const updateResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  try {
    // Check if the residency exists
    const existingResidency = await prisma.residency.findUnique({
      where: { id },
    });

    if (!existingResidency) {
      return res.status(404).json({ message: 'Residency not found' });
    }

    // Update the residency
    const updatedResidency = await prisma.residency.update({
      where: { id },
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.json({ message: 'Residency updated successfully', residency: updatedResidency });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

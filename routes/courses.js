import express from "express";
import { Course } from "../models/Course.js";
const router = express.Router();

//save a new course
// router.post("/", async (request, response) => {
//   try {
//     if (
//       !request.body.title ||
//       !request.body.instructor ||
//       !request.body.description ||
//       !request.body.image
//     ) {
//       return response.status(400).send("All fields are required");
//     }
//     const newCourse = {
//       title: request.body.title,
//       instructor: request.body.instructor,
//       description: request.body.description,
//       image: request.body.image,
//     };
//     const course = await Course.create(newCourse);
//     return response.status(200).json(course); // Send JSON response
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).json({ message: "Server Error" });
//   }
// });

// Assuming you have a Course model

router.post("/", async (request, response) => {
  try {
    const { title, instructor, description } = request.body;
    if (!title || !instructor || !description) {
      return response.status(400).send("All fields are required");
    }
    const newCourse = {
      title,
      instructor,
      description,
    };
    const course = await Course.create(newCourse);
    return response.status(200).json(course);
  } catch (error) {
    console.error("Error adding course:", error.message);
    response.status(500).json({ message: "Failed to add course" });
  }
});

//get all courses

router.get("/", async (request, response) => {
  try {
    const courses = await Course.find({});
    return response.status(200).json(courses);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Server Error");
  }
});

// get single course

router.get("/:id", async (request, response) => {
  try {
    const courses = await Course.findById(request.params.id);
    if (!courses) return response.status(404).send("Course not found");
    return response.status(200).json(courses);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Server Error");
  }
});

// update course

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.instructor ||
      !request.body.description ||
      !request.body.image
    ) {
      return response.status(400).send("All fields are required");
    }
    const course = await Course.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    if (!course) return response.status(404).send("Course not found");
    return response.status(200).json(course);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Server Error");
  }
});

// delete course

router.delete("/:id", async (request, response) => {
  try {
    const course = await Course.findByIdAndDelete(request.params.id);
    if (!course) return response.status(404).send("Course not found");
    return response.status(200).send(course);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Server Error");
  }
});

export default router;

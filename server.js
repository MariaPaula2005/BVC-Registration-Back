const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const Course = require('./models/course');
const Program = require('./models/program');
const userRoutes = require('./routes/userRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');


const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
  };

  app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/messages', messageRoutes);

//Better practice to use a different password
//Also better to store in a different .env file for security reasons
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

//connection to mongodb
const dbURI = 'mongodb+srv://Maria:12345@bvcregistration.qf6qh.mongodb.net/?retryWrites=true&w=majority&appName=BVCRegistration'; 
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(5000, () => {
        console.log('Server running on port 5000');
    });
})
.catch(err => console.log(err));


app.use(bodyParser.json());


//create list of curses
app.get('/add-course', (req, res) =>{

    const courses =[
        {
            "id": 1,
            "Code": "SODV2301",
            "Course": "Introduction to Programming",
            "Program": "Diploma (2 years)",
            "Term": "Fall 2024",
            "StartDate": "2024-09-01",
            "EndDate": "2025-05-31",
            "Description": "Learn the basics of programming using C#.",
            "Fees": "$1500"
        },
        {
            "id": 2,
            "Code": "SODV2302",
            "Course": "Web Development Fundamentals",
            "Program": "Diploma (2 years)",
            "Term": "Fall 2024",
            "StartDate": "2024-09-01",
            "EndDate": "2025-05-31",
            "Description": "Master HTML, CSS, and JavaScript for web development.",
            "Fees": "$1500"
        },
        {
            "id": 3,
            "Code": "SODV2303",
            "Course": "Database Management Systems",
            "Program": "Diploma (2 years)",
            "Term": "Winter 2025",
            "StartDate": "2025-01-10",
            "EndDate": "2025-04-30",
            "Description": "Explore relational databases and SQL.",
            "Fees": "$1500"
        },
        {
            "id": 4,
            "Code": "SODV2304",
            "Course": "Mobile Application Development",
            "Program": "Diploma (2 years)",
            "Term": "Winter 2025",
            "StartDate": "2025-01-10",
            "EndDate": "2025-04-30",
            "Description": "Develop applications for Android and iOS platforms.",
            "Fees": "$1600"
        },
        {
            "id": 5,
            "Code": "SODV2305",
            "Course": "Software Engineering Principles",
            "Program": "Diploma (2 years)",
            "Term": "Spring 2025",
            "StartDate": "2025-03-01",
            "EndDate": "2025-06-30",
            "Description": "Learn software development methodologies and lifecycle.",
            "Fees": "$1600"
        },
        {
            "id": 6,
            "Code": "SODV2306",
            "Course": "Data Structures and Algorithms",
            "Program": "Diploma (2 years)",
            "Term": "Spring 2025",
            "StartDate": "2025-03-01",
            "EndDate": "2025-06-30",
            "Description": "Understand data structures and algorithm design.",
            "Fees": "$1600"
        },
        {
            "id": 7,
            "Code": "SODV2307",
            "Course": "Full-Stack Web Development",
            "Program": "Diploma (2 years)",
            "Term": "Summer 2025",
            "StartDate": "2025-06-01",
            "EndDate": "2025-08-31",
            "Description": "Build complete web applications from front to back.",
            "Fees": "$1700"
        },
        {
            "id": 8,
            "Code": "SODV2308",
            "Course": "Game Development Basics",
            "Program": "Diploma (2 years)",
            "Term": "Summer 2025",
            "StartDate": "2025-06-01",
            "EndDate": "2025-08-31",
            "Description": "Create simple games using Unity.",
            "Fees": "$1700"
        },
        {
            "id": 9,
            "Code": "SODV2311",
            "Course": "Advanced Data Science",
            "Program": "Post-Diploma (1 year)",
            "Term": "Fall 2024",
            "StartDate": "2024-09-01",
            "EndDate": "2025-05-31",
            "Description": "Explore machine learning techniques and data analysis.",
            "Fees": "$2000"
        },
        {
            "id": 10,
            "Code": "SODV2312",
            "Course": "DevOps Practices",
            "Program": "Post-Diploma (1 year)",
            "Term": "Winter 2025",
            "StartDate": "2025-01-10",
            "EndDate": "2025-04-30",
            "Description": "Learn CI/CD and cloud automation tools.",
            "Fees": "$2000"
        },
        {
            "id": 11,
            "Code": "SODV2313",
            "Course": "Blockchain Development",
            "Program": "Post-Diploma (1 year)",
            "Term": "Spring 2025",
            "StartDate": "2025-03-01",
            "EndDate": "2025-06-30",
            "Description": "Understand blockchain technology and smart contracts.",
            "Fees": "$2000"
        },
        {
            "id": 12,
            "Code": "SODV2314",
            "Course": "Artificial Intelligence Basics",
            "Program": "Post-Diploma (1 year)",
            "Term": "Summer 2025",
            "StartDate": "2025-06-01",
            "EndDate": "2025-08-31",
            "Description": "Explore AI concepts and applications.",
            "Fees": "$2100"
        },
        {
            "id": 13,
            "Code": "SODV2315",
            "Course": "Web Development Essentials",
            "Program": "Certificate (6 months)",
            "Term": "Fall 2024",
            "StartDate": "2024-09-01",
            "EndDate": "2025-02-28",
            "Description": "Learn HTML, CSS, and JavaScript for web development.",
            "Fees": "$1000"
        },
        {
            "id": 14,
            "Code": "SODV2316",
            "Course": "Introduction to Programming with Python",
            "Program": "Certificate (6 months)",
            "Term": "Winter 2025",
            "StartDate": "2025-01-10",
            "EndDate": "2025-06-30",
            "Description": "Get started with programming using Python.",
            "Fees": "$1000"
        },
        {
            "id": 15,
            "Code": "SODV2317",
            "Course": "Data Science Fundamentals",
            "Program": "Certificate (6 months)",
            "Term": "Spring 2025",
            "StartDate": "2025-03-01",
            "EndDate": "2025-08-31",
            "Description": "Understand data analysis and visualization techniques.",
            "Fees": "$1000"
        },
        {
            "id": 16,
            "Code": "SODV2318",
            "Course": "Introduction to Cybersecurity",
            "Program": "Certificate (6 months)",
            "Term": "Summer 2025",
            "StartDate": "2025-06-01",
            "EndDate": "2025-11-30",
            "Description": "Learn the basics of cybersecurity practices.",
            "Fees": "$1100"
        }
    ];
    

    Course.insertMany(courses)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error saving courses');
        });
});

//create list of programs
app.get('/add-program', (req, res) =>{

    const programs = 
    [
        {
            "Code": "SODV2201",
            "Department": "Software Development",
            "Program": "Diploma (2 years)",
            "Term": "Fall 2024",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2024-09-01",
            "EndDate": "2025-05-31",
            "Fees": 5000
        },
        {
            "Code": "SODV2202",
            "Department": "Software Development",
            "Program": "Diploma (2 years)",
            "Term": "Winter 2025",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2025-01-10",
            "EndDate": "2025-04-30",
            "Fees": 6000
        },
        {
            "Code": "SODV2203",
            "Department": "Software Development",
            "Program": "Diploma (2 years)",
            "Term": "Spring 2025",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2025-03-01",
            "EndDate": "2025-06-30",
            "Fees": 7000
        },
        {
            "Code": "SODV2204",
            "Department": "Software Development",
            "Program": "Diploma (2 years)",
            "Term": "Summer 2025",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2025-06-01",
            "EndDate": "2025-08-31",
            "Fees": 8000
        },
        {
            "Code": "SODV2205",
            "Department": "Software Development",
            "Program": "Post-Diploma (1 year)",
            "Term": "Fall 2024",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2024-09-01",
            "EndDate": "2025-05-31",
            "Fees": 4500
        },
        {
            "Code": "SODV2206",
            "Department": "Software Development",
            "Program": "Post-Diploma (1 year)",
            "Term": "Winter 2025",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2025-01-15",
            "EndDate": "2025-04-30",
            "Fees": 6500
        },
        {
            "Code": "SODV2207",
            "Department": "Software Development",
            "Program": "Post-Diploma (1 year)",
            "Term": "Spring 2025",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2025-03-01",
            "EndDate": "2025-06-30",
            "Fees": 7500
        },
        {
            "Code": "SODV2208",
            "Department": "Software Development",
            "Program": "Post-Diploma (1 year)",
            "Term": "Summer 2025",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2025-06-10",
            "EndDate": "2025-08-30",
            "Fees": 6200
        },
        {
            "Code": "SODV2209",
            "Department": "Software Development",
            "Program": "Certificate (6 months)",
            "Term": "Fall 2024",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2024-09-01",
            "EndDate": "2025-05-31",
            "Fees": 6000
        },
        {
            "Code": "SODV2210",
            "Department": "Software Development",
            "Program": "Certificate (6 months)",
            "Term": "Winter 2025",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2025-01-12",
            "EndDate": "2025-04-28",
            "Fees": 6500
        },
        {
            "Code": "SODV2211",
            "Department": "Software Development",
            "Program": "Certificate (6 months)",
            "Term": "Spring 2025",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2025-03-01",
            "EndDate": "2025-06-30",
            "Fees": 7000
        },
        {
            "Code": "SODV2212",
            "Department": "Software Development",
            "Program": "Certificate (6 months)",
            "Term": "Summer 2025",
            "Description": "Gain the skills you need to create the latest computer, mobile, and gaming applications. Prepare to transform your ideas into reality all while developing your problem-solving skills.",
            "StartDate": "2025-06-05",
            "EndDate": "2025-08-30",
            "Fees": 5500
        }
    ];

    Program.insertMany(programs)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error saving courses');
        });
});


//get all courses
app.get("/api/courses", async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await Program.find();
      res.json(programs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//drop a course
app.delete("/delete-course/:id", (req, res) => {
    const courseId = req.params._id;

    Course.findByIdAndDelete(courseId)
        .then((result) => {
            if (result) {
                res.status(200).send({ message: 'Course deleted successfully', course: result });
            } else {
                res.status(404).send({ message: 'Course not found' });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ message: 'Server error' });
        });
});

app.post("/api/courses/newcourse", async (req, res) => {
    const { id, Course: courseName, Code, Program, Term, StartDate, EndDate, Description, Fees } = req.body;

    try {
        const newCourse = new Course({
            id,
            Course: courseName,
            Code,
            Program,
            Term,
            StartDate,
            EndDate,
            Description,
            Fees,
        });

        const savedCourse = await newCourse.save();
        res.status(201).json({ message: 'Course added successfully', course: savedCourse });
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ message: 'Failed to add course', error });
    }
});
  
  // Edit an existing course
  app.put("/api/courses/edit/:id", async (req, res) => {
    const { id } = req.params;  
    const courseData = req.body;

     // Validate required felds
    if (!courseData.Course || !courseData.Program || !courseData.Term || !courseData.Fees) {
        return res.status(400).json({ message: 'Missing required fields: Course, Program, Term or Fees' });
    }


    try {
     // update the course using  id
        const updatedCourse = await Course.findOneAndUpdate({ id }, req.body, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Failed to update course', error });
    }
});
  
  // Delete a course
  app.delete("/api/courses/delete/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
        const deletedCourse = await Course.findOneAndDelete({ id });
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully', course: deletedCourse });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Failed to delete course', error });
    }
});


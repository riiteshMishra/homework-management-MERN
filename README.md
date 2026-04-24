# 📚 Homework Management System

A full-stack web application for managing homework assignments between teachers and students. Teachers can create and assign homework, students can submit answers (via text or links), and teachers can grade submissions with marks and feedback.

---

## 🧱 Tech Stack

| Layer         | Technology                              |
| ------------- | --------------------------------------- |
| Frontend      | React, Redux Toolkit, Tailwind CSS      |
| Backend       | Node.js, Express.js                     |
| Database      | MongoDB (Mongoose)                      |
| Auth          | JWT (JSON Web Tokens)                   |
| Notifications | React Hot Toast                         |
| File Sharing  | URL links (YouTube, Google Drive, etc.) |

---

## 📁 Project Structure

```
project/
│
├── backend/
│   ├── controllers/
│   │   ├── homeworkController.js      # Homework CRUD
│   │   └── submissionController.js    # Submit, grade, fetch results
│   ├── models/
│   │   ├── UserModel.js               # Student / Teacher schema
│   │   ├── HomeworkModel.js           # Homework schema
│   │   └── SubmitModel.js             # Submission schema
│   ├── routes/
│   │   ├── homeworkRoutes.js
│   │   └── submissionRoutes.js
│   ├── middlewares/
│   │   ├── auth.js                    # JWT verification
│   │   └── isStudent.js / isTeacher.js
│   └── index.js                       # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── dashboard/
│   │   │       ├── MyHomeworks.jsx    # Student homework list
│   │   │       └── SubmitModal.jsx    # Submission modal
│   │   ├── services/
│   │   │   ├── apiConnector.js        # Axios base instance
│   │   │   ├── allEndpoints.js        # All API endpoint constants
│   │   │   └── oprations/
│   │   │       ├── homework.js        # Homework API calls
│   │   │       └── submission.js      # Submission API calls
│   │   ├── redux/
│   │   │   └── slices/
│   │   │       └── authSlice.js       # Token & user state
│   │   └── App.jsx
│   └── package.json
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/riiteshMishra/homework-management-MERN
cd homework-management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=4000
MONGO_URI=mongodb+srv://your-mongo-uri
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:4000`.

---

## 🔐 Authentication

All protected routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

**Roles:**

- `student` — can view homeworks, submit answers, view their result
- `teacher` — can create homeworks, view all submissions, grade submissions

---

## 📡 API Reference

### Base URL

```
http://localhost:4000/api/v1
```

---

### 🔑 Auth Routes

| Method | Endpoint         | Description                 | Access |
| ------ | ---------------- | --------------------------- | ------ |
| POST   | `/auth/register` | Register new user           | Public |
| POST   | `/auth/login`    | Login and receive JWT token | Public |

**Login Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "664abc...",
    "name": "Ravi Kumar",
    "email": "ravi@example.com",
    "role": "student"
  }
}
```

---

### 📝 Homework Routes

| Method | Endpoint                | Description           | Access           |
| ------ | ----------------------- | --------------------- | ---------------- |
| POST   | `/homework/create`      | Create a new homework | Teacher          |
| GET    | `/homework/all`         | Get all homeworks     | Teacher, Student |
| GET    | `/homework/:homeworkId` | Get homework by ID    | Teacher, Student |
| DELETE | `/homework/:homeworkId` | Delete a homework     | Teacher          |

**Create Homework — Request Body:**

```json
{
  "title": "Chapter 5 Questions",
  "description": "Answer all questions from Chapter 5",
  "subject": "Mathematics",
  "dueDate": "2025-05-10",
  "students": ["studentId1", "studentId2"]
}
```

**Get All Homeworks — Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "hw123",
      "title": "Chapter 5 Questions",
      "description": "Answer all questions from Chapter 5",
      "subject": "Mathematics",
      "status": "published",
      "students": ["studentId1"],
      "submissions": ["submissionId1"],
      "createdAt": "2025-04-20T10:00:00.000Z"
    }
  ]
}
```

---

### 📤 Submission Routes

| Method | Endpoint                                | Description              | Access  |
| ------ | --------------------------------------- | ------------------------ | ------- |
| POST   | `/submission/submit`                    | Submit homework answer   | Student |
| GET    | `/submission/all-submissions`           | Get all submissions      | Teacher |
| POST   | `/submission/create-result/:homeworkId` | Grade a submission       | Teacher |
| GET    | `/submission/result/:homeworkId`        | Get student's own result | Student |

---

#### POST `/submission/submit`

Submit a homework answer. Accepts text and/or an attached link (YouTube, Google Drive, etc.)

**Headers:**

```
Authorization: Bearer <student_token>
Content-Type: multipart/form-data
```

**Request Body (FormData):**

```
homeworkId   → string   (required)
textAnswer   → string   (optional if attachedFile is provided)
attachedFile → string   (URL link — optional if textAnswer is provided)
```

**Example (fetch):**

```javascript
const formData = new FormData();
formData.append("homeworkId", "hw123");
formData.append("textAnswer", "The answer is 42.");
formData.append("attachedFile", "https://drive.google.com/file/d/abc123");

const res = await fetch("http://localhost:4000/api/v1/submission/submit", {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: formData,
});
```

**Success Response:**

```json
{
  "success": true,
  "message": "Homework submitted successfully",
  "data": {
    "_id": "sub789",
    "student": "studentId1",
    "homework": "hw123",
    "textAnswer": "The answer is 42.",
    "attachedFile": "https://drive.google.com/file/d/abc123",
    "isLate": false,
    "createdAt": "2025-04-24T08:30:00.000Z"
  }
}
```

---

#### GET `/submission/all-submissions`

Returns all submissions across all homeworks. Teacher only.

**Success Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "sub789",
      "student": { "name": "Ravi Kumar", "email": "ravi@example.com" },
      "homework": { "title": "Chapter 5 Questions" },
      "textAnswer": "The answer is 42.",
      "attachedFile": "https://drive.google.com/...",
      "marks": null,
      "feedback": null,
      "isLate": false
    }
  ]
}
```

---

#### POST `/submission/create-result/:homeworkId`

Grade a student's submission with marks and feedback.

**Request Body:**

```json
{
  "marks": 18,
  "feedback": "Good effort! Work on your explanation."
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Result saved successfully",
  "data": {
    "marks": 18,
    "feedback": "Good effort! Work on your explanation."
  }
}
```

---

#### GET `/submission/result/:homeworkId`

Student fetches their own result for a specific homework.

**Success Response (graded):**

```json
{
  "success": true,
  "message": "Result fetched successfully",
  "data": {
    "student": { "name": "Ravi Kumar", "email": "ravi@example.com" },
    "homework": { "title": "Chapter 5 Questions", "description": "..." },
    "textAnswer": "The answer is 42.",
    "attachedFile": "https://drive.google.com/...",
    "isGraded": true,
    "marks": 18,
    "feedback": "Good effort!",
    "isLate": false,
    "submittedAt": "2025-04-24T08:30:00.000Z"
  }
}
```

**Success Response (not graded yet):**

```json
{
  "success": true,
  "message": "Result not declared yet",
  "data": null
}
```

---

## 🖥️ Frontend Usage

### Submitting Homework (Student)

```jsx
import SubmitModal from "./SubmitModal";

// In your component:
const [selectedHomeworkId, setSelectedHomeworkId] = useState(null);

// Open modal on button click:
<button onClick={() => setSelectedHomeworkId(hw._id)}>Submit</button>;

// Render modal:
{
  selectedHomeworkId && (
    <SubmitModal
      homeworkId={selectedHomeworkId}
      onClose={() => setSelectedHomeworkId(null)}
      onSubmitSuccess={async () => {
        setSelectedHomeworkId(null);
        const res = await getAllHomeworks(token);
        setHomeworks(res);
      }}
    />
  );
}
```

### Fetching Student Result

```javascript
import { getStudentResult } from "../services/oprations/submission";

const result = await getStudentResult(homeworkId, token);

if (!result?.data) {
  console.log("Result not declared yet");
} else {
  console.log("Marks:", result.data.marks);
  console.log("Feedback:", result.data.feedback);
}
```

---

## 🚦 Homework Status Types

| Status      | Meaning                                  |
| ----------- | ---------------------------------------- |
| `published` | Visible and open for submission          |
| `draft`     | Created but not yet released to students |
| `closed`    | Deadline passed, no more submissions     |

---

## ⚠️ Common Errors

| Status Code | Message                                           | Reason                                     |
| ----------- | ------------------------------------------------- | ------------------------------------------ |
| 400         | `"Please provide a text answer or attach a file"` | Both fields empty on submit                |
| 401         | `"Unauthorized"`                                  | Token missing or expired                   |
| 403         | `"Access denied"`                                 | Wrong role (e.g. student on teacher route) |
| 404         | `"Homework not found"`                            | Invalid `homeworkId`                       |
| 500         | `"Something went wrong"`                          | Server error                               |

---

## 📌 Notes

- `attachedFile` field accepts a **URL string** (Google Drive, YouTube, or any valid link) — not an actual file upload
- A student can submit **text only**, **link only**, or **both**
- `marks: 0` is a valid score — the system correctly distinguishes between "not graded" (`null`) and "scored zero" (`0`)
- JWT token must be stored in Redux state under `state.auth.token`

---

## 🙋 Author

Built with ❤️ — contributions and feedback welcome!

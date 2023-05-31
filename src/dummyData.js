import dayjs from "dayjs";

const DATE_NOW = new Date();
const dateFormat = "YYYY-MM-DD";
export const events = [
  {
    title: "Science Class",
    start: dayjs(DATE_NOW).format(dateFormat),
    end: dayjs(DATE_NOW).add(5, "days").format(dateFormat),
    color: "#dc3545",
  },
  {
    title: "Finance 101",
    start: dayjs(DATE_NOW).subtract(9, "days").format(dateFormat),
    end: dayjs(DATE_NOW).subtract(4, "days").format(dateFormat),
    color: "#ffc107",
    //007bff
  },
  {
    title: "Math Class",
    start: dayjs(DATE_NOW).add(7, "days").format(dateFormat),
    end: dayjs(DATE_NOW).add(13, "days").format(dateFormat),
    color: "#007bff",
    //007bff
  },
];

export const teacherClasses = [
  {
    title: "Science Class",
    classBanner: "./assets/images/classes/sem01.png",
    startDate: "10-7-21",
    studentCount: 11,
    status: "Done",
  },
  {
    title: "Math Class",
    classBanner: "./assets/images/classes/sem02.png",
    startDate: "08-7-2021",
    studentCount: 18,
    status: "Pending",
  },
  {
    title: "Finance 101",
    classBanner: "./assets/images/classes/sem04.png",
    startDate: "11-7-2021",
    studentCount: 2,
    status: "Done",
  },
  {
    title: "Design Masterclass",
    classBanner: "./assets/images/classes/sem03.png",
    startDate: "10-7-2021",
    studentCount: 11,
    status: "Cancelled",
  },
];
export const teacherStudents = [
  {
    id: 1,
    name: "Henry Caparas",
    email: "henry@gmail.com",
    phoneNumber: "+123 456 789",
    gradeLevel: "Grade School",
    age: 12,
  },
  {
    id: 2,
    name: "Olivia Caparas",
    email: "olivia@gmail.com",
    phoneNumber: "+234 456 789",
    gradeLevel: "Grade School",
    age: 11,
  },
  {
    id: 3,
    name: "John Doe",
    email: "olivia@gmail.com",
    phoneNumber: "+345 456 789",
    gradeLevel: "Senior High",
    age: 17,
  },
  {
    id: 3,
    name: "John Doe",
    email: "olivia@gmail.com",
    phoneNumber: "+345 456 789",
    gradeLevel: "Senior High",
    age: 17,
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    phoneNumber: "+345 456 789",
    gradeLevel: "Junior High",
    age: 14,
  },
  {
    id: 5,
    name: "Robert Redford",
    email: "robertredford@gmail.com",
    phoneNumber: "+567 456 789",
    gradeLevel: "Senior High",
    age: 18,
  },
  {
    id: 6,
    name: "Frank Sinatra",
    email: "frank@gmail.com",
    phoneNumber: "+678 456 789",
    gradeLevel: "Senior High",
    age: 17,
  },
  {
    id: 7,
    name: "Seth McFarlane",
    email: "3@gmail.com",
    phoneNumber: "+123 456 789",
    gradeLevel: "Junior High",
    age: 15,
  },
  {
    id: 8,
    name: "Salman Rushdie",
    email: "6@gmail.com",
    phoneNumber: "+234 456 789",
    gradeLevel: "Senior High",
    age: 17,
  },
  {
    id: 9,
    name: "Happy Peanuts",
    email: "emaiul@gmail.com",
    phoneNumber: "+345 456 789",
    gradeLevel: "Grade School",
    age: 18,
  },
  {
    id: 10,
    name: "Pia Ttos",
    email: "test@gmail.com",
    phoneNumber: "+456 456 789",
    gradeLevel: "Senior High",
    age: 16,
  },
  {
    id: 11,
    name: "Firstlast Name",
    email: "gmail@gmail.com",
    phoneNumber: "+567 456 789",
    gradeLevel: "Senior High",
    age: 17,
  },
  {
    id: 12,
    name: "Firstlast Name",
    email: "gmail@gmail.com",
    phoneNumber: "+567 456 789",
    gradeLevel: "Senior High",
    age: 17,
  },
];

export const teacherStats = [
  {
    stat: "monthlyClasses",
    value: 2376,
  },
  {
    stat: "monthlyStudents",
    value: 3670,
  },
  {
    stat: "monthlyEarnings",
    value: 1562,
  },
  {
    stat: "rating",
    value: 4.9,
  },
];

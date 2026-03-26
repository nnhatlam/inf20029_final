# inf20029_final

## Project name: Student Support System
Actors: Student

## Requirements:
Scalable, responsive layout, for both laptops and mobile devices

## Pages:
Login: fix credential check: user: student, pass: inf20029

Submit Enquiry Dashboard: The main landing page for the process where students can initiate a new request through a chat box, AI suggest enquiry category. Displays the AI response and allows the student to either confirm resolution or request human assistance. a button to choose to accept resolution forward the enquiry to staff view previous enquiries and file attachments (limit to 5 recent). Notification button for users to check upcoming noti

Appointments: View passed and upcoming appointment and requested appointment (like students are asked for appointments from staff). Can click on upcoming appointment to view details

Settings: view personal information

CRUD UI Design: limited access to specific users only. Students can only view all there related data that is linked to their studentID. Add search function. Staff can view, edit, delete data from all students

## Data:
Student: StudentID, StudentName, Username, Password, Email, Major
Enquiry: EnquiryId, StudentID, Category, Details, Status, SubmissionTime, Complexity, ResolvedBy, Response
Appointment: AppointmentID, DateTime, Location, Status, StudentID, StaffID
## Tech Stack:
- HTML, CSS, JavaScripts
## Styling:
- Background: background: linear-gradient(180deg, #FFEAEF 0%, #FFDCE4 52.08%, #FEB1C7 100%);
- Primary: #FEB1C7
- Secondary: #ffdce4
- Text color: #1f1f1f
- Buttons has shadow and mouse-hover effect. Active page will have their name highlighted in the nav bar
- everypage has header (nav bar + logo) and footer





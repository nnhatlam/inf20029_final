# inf20029_final

## Project name: Student Support System

Actors: Student

## Requirements:

Scalable, responsive layout, for both laptops and mobile devices

## Pages:

Login: fix credential check: user: student, pass: inf20029

Submit Enquiry Dashboard: The main landing page for the process where students can initiate a new enquiry through a chat box. The enquiry will be pushed directly to staff. Notification button for users to check upcoming noti.
Do not required user to choose enquiry category when creating enquiry, only need the box to input enquiry and add some chip buttons listing the enquiry category for user to choose. if user do not choose any category, auto assign category to it (random).
a box to attach file, documents to the enquery
Enquiry Category: Documents, administations, calendar & key dates, Records & assessments, academic success, timetable& attendance, IT and systems, other
the Enquiry should be shown in table with columns: Enquiry ID, Enquiry Details, Category, Status, Response, CreatedAt

a small side card on the right showing upcoming appointment

Enquiry:
View all enquiries

- Search by: Enquiry Details, Status, Date.
- shown in table: Fields: Enquiry ID (read-only), Details, Category, Status, Response (if have). Don't allowed students to delete resolved enquiries
- Navigation: From Enquiry detail → Appointment detail (if linked).
  View enquiry in details by clicking to the enquiry overview:
- show current state of the enquiry: submitted, resolving, appointment, resolved, canceled.
- a field show expected resolved day
- response (if have)
- navigate to appointment if requested

Appointments:
flow: only allow students to book new appointment if staff request for appointment from students. and students will book appointment based on staff availability schedule. so add a tab for pending invitation to show staffs invitation for appointment with the name of the staff in charged and link to the enquiry id, next to it is a book appointment button. book appointment button will open an overlay of calendar showing available and non avai schedule of staffs.

View passed and upcoming appointment and requested appointment (like students are asked for appointments from staff). Can click on upcoming appointment to view details

Settings: view personal information

- Account Settings:

* big card for a place holder image on left, the right have name, student ID, email, phone number, and password change button
* below is other notifications settings and sign out button

## Data:

Student: StudentID, StudentName, Username, Password, Email, Major
Enquiry: EnquiryId, StudentID, Category, Details, Status, SubmissionTime, Complexity, ResolvedBy, Response
Appointment: AppointmentID, DateTime, Location, Status, StudentID, StaffID

## Tech Stack:

- HTML, CSS, JavaScripts

## Styling:

/\*

- Student Support System - Main Stylesheet
- Colors:
- - Background: linear-gradient(180deg, #FFEAEF 0%, #FFDCE4 52.08%, #FEB1C7 100%)
- - Primary: #9e182b, text: #f2e0d2 (use this for nav bar, primary buttons and footer)
- - Secondary: #f9cb56, text: #9e182b (use this for secondary buttons, highlights and accents)
    shadow or border: #f2afbc
    make the button bigger,, change font to Poppins

  \*/

- Buttons has shadow and mouse-hover effect. Active page will have their name highlighted in the nav bar
- everypage has header (nav bar + logo) and footer

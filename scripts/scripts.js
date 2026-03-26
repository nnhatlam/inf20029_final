// ============================================
// Global Variables & Data
// ============================================

const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;

const ENQUIRY_DB_KEY = 'studentSupportEnquiries';

// Simulated database with required Enquiry fields:
// EnquiryId, StudentID, Category, Details, Status, SubmissionTime, Complexity, ResolvedBy, Response
const defaultEnquiries = [
    {
        enquiryId: 'ENQ001',
        studentID: 'SWH01234',
        category: 'Academic Support',
        details: 'Need help with my programming assignment on JavaScript functions and DOM events.',
        status: 'Resolved',
        submissionTime: '2026-03-20 10:30',
        complexity: 'Medium',
        resolvedBy: 'AI Assistant',
        response: 'Review the workshop resources and practice DOM event handling in small tasks. A tutor session is also recommended.'
    },
    {
        enquiryId: 'ENQ002',
        studentID: 'SWH01234',
        category: 'Financial Aid',
        details: 'Enquiring about available emergency financial support and scholarship eligibility.',
        status: 'Not Resolved',
        submissionTime: '2026-03-22 14:15',
        complexity: 'High',
        resolvedBy: 'Support Staff (Pending)',
        response: 'Your request has been escalated to staff for document verification and eligibility assessment.'
    },
    {
        enquiryId: 'ENQ003',
        studentID: 'SWH01234',
        category: 'Accommodation',
        details: 'Need advice on on-campus housing options for next semester.',
        status: 'Resolved',
        submissionTime: '2026-03-10 09:20',
        complexity: 'Low',
        resolvedBy: 'Student Housing Team',
        response: 'You are eligible for on-campus housing waitlist. Please submit your preferred room type before 5 April.'
    },
    {
        enquiryId: 'ENQ004',
        studentID: 'SWH01234',
        category: 'Career Services',
        details: 'Need resume review and internship application guidance.',
        status: 'Resolved',
        submissionTime: '2026-03-02 16:05',
        complexity: 'Medium',
        resolvedBy: 'Career Advisor',
        response: 'Your resume feedback is attached in the career portal. Booked a mock interview slot for next Tuesday.'
    },
    {
        enquiryId: 'ENQ005',
        studentID: 'SWH01234',
        category: 'Technical Issues',
        details: 'Cannot access the assignment upload page in LMS due to repeated timeout errors.',
        status: 'Not Resolved',
        submissionTime: '2026-03-24 08:45',
        complexity: 'High',
        resolvedBy: 'IT Helpdesk (Pending)',
        response: 'Ticket escalated to LMS platform team. Temporary workaround: submit via alternate upload endpoint.'
    }
];

let enquiries = loadEnquiries();
let latestSubmittedEnquiryId = null;

let appointments = [
    {
        id: 'APT001',
        dateTime: '2026-03-28 14:00',
        location: 'Student Services Building, Room 205',
        status: 'upcoming',
        staffName: 'Prof. Johnson'
    },
    {
        id: 'APT002',
        dateTime: '2026-03-15 10:30',
        location: 'Online - Zoom',
        status: 'past',
        staffName: 'Ms. Smith'
    },
    {
        id: 'APT003',
        dateTime: '2026-03-30 11:00',
        location: 'Library, Meeting Room B',
        status: 'requested',
        staffName: 'Dr. Wilson'
    }
];

const studentData = {
    studentID: 'SWH01234',
    username: 'student',
    password: 'inf20029',
    name: 'John Doe',
    email: 'john.doe@student.swin.edu.au',
    major: 'Business Analytics'
};

const notifications = [
    'You have a new appointment scheduled for tomorrow at 2:00 PM',
    'Your enquiry #ENQ001 has been updated with a response'
];

function loadEnquiries() {
    const stored = localStorage.getItem(ENQUIRY_DB_KEY);
    if (!stored) {
        localStorage.setItem(ENQUIRY_DB_KEY, JSON.stringify(defaultEnquiries));
        return [...defaultEnquiries];
    }

    try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
            const normalized = parsed
                .map(normalizeEnquiry)
                .filter(Boolean);

            if (normalized.length > 0) {
                localStorage.setItem(ENQUIRY_DB_KEY, JSON.stringify(normalized));
                return normalized;
            }
        }
    } catch (error) {
        console.warn('Invalid enquiry DB found in localStorage. Resetting to defaults.', error);
    }

    localStorage.setItem(ENQUIRY_DB_KEY, JSON.stringify(defaultEnquiries));
    return [...defaultEnquiries];
}

function saveEnquiries() {
    localStorage.setItem(ENQUIRY_DB_KEY, JSON.stringify(enquiries));
}

function normalizeEnquiry(rawEnquiry) {
    if (!rawEnquiry || typeof rawEnquiry !== 'object') {
        return null;
    }

    const enquiryId = rawEnquiry.enquiryId || rawEnquiry.id || `ENQ${String(Date.now()).slice(-6)}`;
    const studentID = rawEnquiry.studentID || currentUser?.studentID || studentData.studentID;
    const category = rawEnquiry.category ? capitalizeText(String(rawEnquiry.category)) : 'Other';
    const details = rawEnquiry.details || 'No details provided.';
    const status = normalizeStatus(rawEnquiry.status);
    const submissionTime = rawEnquiry.submissionTime || getFormattedNow();
    const complexity = rawEnquiry.complexity || inferComplexity(details);
    const response = rawEnquiry.response || 'No response available.';
    const resolvedBy = rawEnquiry.resolvedBy || (status === 'Resolved' ? 'AI Assistant' : 'Support Staff (Pending)');

    return {
        enquiryId,
        studentID,
        category,
        details,
        status,
        submissionTime,
        complexity,
        resolvedBy,
        response
    };
}

function normalizeStatus(status) {
    const normalizedStatus = String(status || '').toLowerCase().trim();
    if (normalizedStatus === 'resolved' || normalizedStatus === 'completed') {
        return 'Resolved';
    }
    if (normalizedStatus === 'not resolved' || normalizedStatus === 'not-resolved') {
        return 'Not Resolved';
    }
    if (normalizedStatus === 'pending') {
        return 'Pending';
    }
    if (normalizedStatus === 'in-progress' || normalizedStatus === 'in progress') {
        return 'Pending';
    }
    return 'Pending';
}

function getNextEnquiryId() {
    const maxId = enquiries.reduce((maxValue, enquiry) => {
        const numericId = Number(String(enquiry.enquiryId || '').replace('ENQ', ''));
        return Number.isNaN(numericId) ? maxValue : Math.max(maxValue, numericId);
    }, 0);

    const nextId = maxId + 1;
    return `ENQ${String(nextId).padStart(3, '0')}`;
}

// ============================================
// Component Loading
// ============================================

async function loadComponent(componentPath, containerId) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            initializeComponent(containerId);
        }
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

function initializeComponent(componentId) {
    if (componentId === 'navbar-container') {
        setupNavbar();
    } else if (componentId === 'footer-container') {
        setupFooter();
    }
}

// ============================================
// Navbar Setup
// ============================================

function setupNavbar() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (navbarToggle) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }

    // Highlight active page
    const currentPage = getCurrentPageName();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu?.classList.remove('active');
        });
    });
}

function getCurrentPageName() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    return currentPage || 'dashboard';
}

// ============================================
// Login Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Load components
    if (document.getElementById('navbar-container')) {
        loadComponent('components/navbar.html', 'navbar-container');
    }
    if (document.getElementById('footer-container')) {
        loadComponent('components/footer.html', 'footer-container');
    }

    // Check if user is logged in for protected pages
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['dashboard.html', 'enquiries.html', 'appointments.html', 'settings.html'];

    if (protectedPages.includes(currentPage) && !currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Dashboard functionality
    if (document.getElementById('enquiryForm')) {
        initializeDashboard();
    }

    // Appointments functionality
    if (document.querySelector('.appointments-section')) {
        initializeAppointments();
    }

    // Settings functionality
    if (document.querySelector('.settings-section')) {
        initializeSettings();
    }

    // Enquiries page functionality
    if (document.querySelector('.enquiries-page-section')) {
        initializeEnquiriesPage();
    }
});

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (username === studentData.username && password === studentData.password) {
        // Store user session
        sessionStorage.setItem('currentUser', JSON.stringify({
            studentID: studentData.studentID,
            name: studentData.name,
            username: studentData.username,
            email: studentData.email
        }));

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        errorMessage.textContent = 'Invalid username or password. Use: student / inf20029';
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
}

// ============================================
// Dashboard Functionality
// ============================================

function initializeDashboard() {
    const enquiryForm = document.getElementById('enquiryForm');
    const aiResponseSection = document.getElementById('aiResponseSection');
    const acceptBtn = document.getElementById('acceptBtn');
    const escalateBtn = document.getElementById('escalateBtn');

    initializeNotificationOverlay();

    enquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const category = document.getElementById('category').value;
        const selectedOption = document.querySelector('#category option:checked');
        const categoryLabel = selectedOption ? selectedOption.textContent : category;
        const details = document.getElementById('details').value;

        // Simulate AI response
        const aiResponse = generateAIResponse(category, details);
        displayAIResponse(aiResponse);

        const newEnquiry = {
            enquiryId: getNextEnquiryId(),
            studentID: currentUser?.studentID || studentData.studentID,
            category: categoryLabel,
            details,
            status: 'Pending',
            submissionTime: getFormattedNow(),
            complexity: inferComplexity(details),
            resolvedBy: 'AI Assistant (Suggested)',
            response: aiResponse
        };

        enquiries.push(newEnquiry);
        saveEnquiries();
        latestSubmittedEnquiryId = newEnquiry.enquiryId;

        // Show AI response section
        aiResponseSection.style.display = 'block';
        aiResponseSection.scrollIntoView({ behavior: 'smooth' });

        // Reset form
        enquiryForm.reset();
    });

    acceptBtn.addEventListener('click', function () {
        updateLatestEnquiryStatus('Resolved', 'AI Assistant');
        alert('Thank you! Your resolution has been accepted. Your enquiry has been marked as completed.');
        aiResponseSection.style.display = 'none';
        displayEnquiries();
    });

    escalateBtn.addEventListener('click', function () {
        updateLatestEnquiryStatus('Not Resolved', 'Support Staff (Pending)');
        alert('Your enquiry has been escalated to our support staff. You will be contacted soon.');
        aiResponseSection.style.display = 'none';
        displayEnquiries();
    });

    // Display existing enquiries
    displayEnquiries();
}

function initializeNotificationOverlay() {
    const notificationButton = document.getElementById('notificationButton');
    const notificationOverlay = document.getElementById('notificationOverlay');
    const notificationClose = document.getElementById('notificationClose');
    const notificationCount = document.getElementById('notificationCount');
    const notificationList = document.getElementById('notificationList');

    if (!notificationButton || !notificationOverlay || !notificationClose) {
        return;
    }

    if (notificationCount) {
        notificationCount.textContent = String(notifications.length);
    }

    if (notificationList) {
        notificationList.innerHTML = notifications.map((message, index) => `
            <div class="notification-item">
                <span class="notification-badge">${index + 1}</span>
                <p>${message}</p>
            </div>
        `).join('');
    }

    notificationButton.addEventListener('click', function () {
        notificationOverlay.classList.add('show');
        notificationOverlay.setAttribute('aria-hidden', 'false');
    });

    notificationClose.addEventListener('click', function () {
        notificationOverlay.classList.remove('show');
        notificationOverlay.setAttribute('aria-hidden', 'true');
    });

    notificationOverlay.addEventListener('click', function (event) {
        if (event.target === notificationOverlay) {
            notificationOverlay.classList.remove('show');
            notificationOverlay.setAttribute('aria-hidden', 'true');
        }
    });
}

function generateAIResponse(category, details) {
    const responses = {
        academic: 'Based on your query, I recommend attending our weekly tutoring sessions or accessing the course materials on our learning platform. Would you like me to schedule an appointment with an academic advisor?',
        financial: 'We offer various scholarship and financial aid options. Please visit the Financial Aid office with your enrollment documents and ID to discuss the best options for you.',
        accommodation: 'I can help you find suitable accommodation. Our housing office has several options available both on and off campus. Would you like to speak with our accommodation specialist?',
        career: 'Career services offers resume reviews, interview coaching, and job placement assistance. I recommend booking a consultation with our career counselor.',
        health: 'Our health and wellness center provides counseling, medical services, and wellness programs. You can book an appointment directly through our health portal.',
        technical: 'For technical issues, please ensure your software is up to date. You can submit a detailed technical report to our IT helpdesk for further assistance.',
        other: 'Thank you for reaching out. Could you provide more details so we can better assist you?'
    };

    return responses[category] || responses.other;
}

function displayAIResponse(response) {
    document.getElementById('aiResponse').innerHTML = `<p>${response}</p>`;
}

function displayEnquiries() {
    const enquiriesList = document.getElementById('enquiriesList');

    if (enquiries.length === 0) {
        enquiriesList.innerHTML = '<p class="placeholder-text">No enquiries yet. Submit your first enquiry above.</p>';
        return;
    }

    const recentEnquiries = [...enquiries]
        .sort((a, b) => new Date(b.submissionTime) - new Date(a.submissionTime))
        .slice(0, 5);

    enquiriesList.innerHTML = recentEnquiries.map(enquiry => `
        <div class="enquiry-item">
            <h3>Enquiry #${enquiry.enquiryId}</h3>
            <p><strong>Category:</strong> ${enquiry.category}</p>
            <p><strong>Submitted:</strong> ${enquiry.submissionTime}</p>
            <p><strong>Complexity:</strong> ${enquiry.complexity}</p>
            <p>${truncateText(enquiry.details, 100)}</p>
            <span class="status-badge ${statusClassFromText(enquiry.status)}">${enquiry.status}</span>
        </div>
    `).join('');
}

function updateLatestEnquiryStatus(status, resolvedBy) {
    if (!latestSubmittedEnquiryId) {
        return;
    }

    const latestEnquiry = enquiries.find(enquiry => enquiry.enquiryId === latestSubmittedEnquiryId);
    if (!latestEnquiry) {
        return;
    }

    latestEnquiry.status = status;
    latestEnquiry.resolvedBy = resolvedBy;
    saveEnquiries();
}

function initializeEnquiriesPage() {
    const searchInput = document.getElementById('enquirySearch');

    renderAllEnquiries('');

    if (searchInput) {
        searchInput.addEventListener('input', function (event) {
            renderAllEnquiries(event.target.value || '');
        });
    }
}

function renderAllEnquiries(searchTerm) {
    const allEnquiriesList = document.getElementById('allEnquiriesList');
    if (!allEnquiriesList) {
        return;
    }

    const normalizedSearch = searchTerm.trim().toLowerCase();
    const sortedEnquiries = [...enquiries].sort((a, b) => new Date(b.submissionTime) - new Date(a.submissionTime));
    const filteredEnquiries = normalizedSearch
        ? sortedEnquiries.filter(enquiry => {
            const searchable = [
                enquiry.enquiryId,
                enquiry.category,
                enquiry.details,
                enquiry.status,
                enquiry.response,
                enquiry.resolvedBy
            ].join(' ').toLowerCase();
            return searchable.includes(normalizedSearch);
        })
        : sortedEnquiries;

    if (filteredEnquiries.length === 0) {
        allEnquiriesList.innerHTML = '<p class="placeholder-text">No enquiries match your search.</p>';
        return;
    }

    allEnquiriesList.innerHTML = filteredEnquiries.map(enquiry => `
        <article class="enquiry-history-item">
            <div class="enquiry-history-top">
                <h3>${enquiry.enquiryId}</h3>
                <span class="status-badge ${statusClassFromText(enquiry.status)}">${enquiry.status}</span>
            </div>
            <div class="enquiry-history-meta">
                <p><strong>Student ID:</strong> ${enquiry.studentID}</p>
                <p><strong>Category:</strong> ${enquiry.category}</p>
                <p><strong>Submitted:</strong> ${enquiry.submissionTime}</p>
                <p><strong>Complexity:</strong> ${enquiry.complexity}</p>
                <p><strong>Resolved By:</strong> ${enquiry.resolvedBy}</p>
            </div>
            <div class="enquiry-history-body">
                <p><strong>Details:</strong> ${enquiry.details}</p>
                <p><strong>Response:</strong> ${enquiry.response}</p>
            </div>
        </article>
    `).join('');
}

function statusClassFromText(status) {
    const normalizedStatus = (status || '').toLowerCase().replace(/\s+/g, '-');
    if (normalizedStatus === 'resolved' || normalizedStatus === 'completed') {
        return 'resolved';
    }
    if (normalizedStatus === 'not-resolved') {
        return 'not-resolved';
    }
    if (normalizedStatus === 'pending') {
        return 'pending';
    }
    return 'in-progress';
}

function inferComplexity(details) {
    const detailLength = (details || '').trim().length;
    if (detailLength < 80) {
        return 'Low';
    }
    if (detailLength < 180) {
        return 'Medium';
    }
    return 'High';
}

function getFormattedNow() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) {
        return text;
    }
    return `${text.substring(0, maxLength)}...`;
}

// ============================================
// Appointments Functionality
// ============================================

function initializeAppointments() {
    displayAppointments();

    // Modal functionality
    const modal = document.getElementById('appointmentModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', function () {
        modal.classList.remove('show');
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
}

function displayAppointments() {
    const upcomingList = document.getElementById('upcomingList');
    const requestsList = document.getElementById('requestsList');
    const pastList = document.getElementById('pastList');

    const upcoming = appointments.filter(apt => apt.status === 'upcoming');
    const requests = appointments.filter(apt => apt.status === 'requested');
    const past = appointments.filter(apt => apt.status === 'past');

    upcomingList.innerHTML = upcoming.length > 0 ?
        upcoming.map(apt => createAppointmentElement(apt)).join('') :
        '<p class="placeholder-text">No upcoming appointments scheduled.</p>';

    requestsList.innerHTML = requests.length > 0 ?
        requests.map(apt => createAppointmentElement(apt, true)).join('') :
        '<p class="placeholder-text">No pending appointment requests.</p>';

    pastList.innerHTML = past.length > 0 ?
        past.map(apt => createAppointmentElement(apt)).join('') :
        '<p class="placeholder-text">No past appointments.</p>';
}

function createAppointmentElement(appointment, isRequest = false) {
    return `
        <div class="appointment-item" onclick="showAppointmentDetail('${appointment.id}')">
            <h3>Appointment with ${appointment.staffName}</h3>
            <p><strong>Date & Time:</strong> ${appointment.dateTime}</p>
            <p><strong>Location:</strong> ${appointment.location}</p>
            ${isRequest ? '<p style="font-size: 12px; font-style: italic;">Staff has requested this appointment</p>' : ''}
            <span class="status-badge ${appointment.status}">${capitalizeText(appointment.status)}</span>
        </div>
    `;
}

function showAppointmentDetail(appointmentId) {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    const modal = document.getElementById('appointmentModal');
    const detailDiv = document.getElementById('appointmentDetail');

    if (appointment) {
        detailDiv.innerHTML = `
            <div class="appointment-detail-content">
                <h2>Appointment Details</h2>
                <div class="appointment-info">
                    <div class="info-item">
                        <span class="info-label">ID:</span>
                        <span class="info-value">${appointment.id}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Staff:</span>
                        <span class="info-value">${appointment.staffName}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Date & Time:</span>
                        <span class="info-value">${appointment.dateTime}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Location:</span>
                        <span class="info-value">${appointment.location}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Status:</span>
                        <span class="info-value">${capitalizeText(appointment.status)}</span>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    ${appointment.status === 'requested' ? 
                        `<button class="btn btn-primary" onclick="confirmAppointment('${appointment.id}')">Confirm Appointment</button>
                         <button class="btn btn-secondary" onclick="declineAppointment('${appointment.id}')" style="margin-left: 10px;">Decline</button>`
                        : ''}
                </div>
            </div>
        `;

        modal.classList.add('show');
    }
}

function confirmAppointment(appointmentId) {
    const apt = appointments.find(a => a.id === appointmentId);
    if (apt) {
        apt.status = 'upcoming';
        displayAppointments();
        document.getElementById('appointmentModal').classList.remove('show');
        alert('Appointment confirmed!');
    }
}

function declineAppointment(appointmentId) {
    const apt = appointments.find(a => a.id === appointmentId);
    if (apt) {
        appointments = appointments.filter(a => a.id !== appointmentId);
        displayAppointments();
        document.getElementById('appointmentModal').classList.remove('show');
        alert('Appointment declined.');
    }
}

// ============================================
// Settings Functionality
// ============================================

function initializeSettings() {
    const settingsForm = document.getElementById('settingsForm');

    if (settingsForm && currentUser) {
        document.getElementById('studentID').value = currentUser.studentID;
        document.getElementById('studentName').value = currentUser.name;
        document.getElementById('email').value = currentUser.email;
        document.getElementById('username').value = currentUser.username;
        document.getElementById('major').value = studentData.major;
    }
}

function savePreferences() {
    const notificationsEnabled = document.getElementById('notifications').checked;
    const darkModeEnabled = document.getElementById('darkMode').checked;

    localStorage.setItem('preferences', JSON.stringify({
        notifications: notificationsEnabled,
        darkMode: darkModeEnabled
    }));

    alert('Preferences saved successfully!');
}

// ============================================
// General Functions
// ============================================

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function capitalizeText(text) {
    return text
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// ============================================
// Footer Setup
// ============================================

function setupFooter() {
    // Footer links can have event listeners if needed
}

const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;

const USER_PROFILES = [
    {
        username: 'student',
        password: 'inf20029',
        role: 'student',
        roleLabel: 'Student',
        studentID: 'SWH01234',
        studentName: 'John Doe',
        email: 'john.doe@student.swin.edu.au',
        phone: '+61 412 345 678',
        major: 'Business Analytics'
    },
    {
        username: 'student2',
        password: 'inf20029',
        role: 'student',
        roleLabel: 'Student Profile 2',
        studentID: 'SWH04567',
        studentName: 'Emma Lee',
        email: 'emma.lee@student.swin.edu.au',
        phone: '+61 498 765 432',
        major: 'Information Technology'
    },
    {
        username: 'manager',
        password: 'inf20029',
        role: 'manager',
        roleLabel: 'Manager',
        managerID: 'MGR001',
        studentName: 'Alex Turner',
        email: 'alex.turner@unilink.edu.au',
        phone: '+61 411 200 333',
        major: 'Operations'
    }
];

const DEFAULT_STUDENT = USER_PROFILES[0];
const STAFF_MEMBERS = ['Ms. Rachel Nguyen', 'Dr. Amit Sharma', 'Ms. Chloe Tan', 'Mr. Liam Patel'];

const ENQUIRIES_KEY = 'sss_enquiries';
const APPOINTMENTS_KEY = 'sss_appointments';
const INVITATIONS_KEY = 'sss_invitations';
const PREFERENCES_KEY = 'sss_preferences';
const NOTIFICATIONS_FILE = 'data/notifications.json';
const SUPPORT_DATA_FILE = 'data/support-data.json';
const STUDENTS_FILE = 'data/students.json';
const DATA_SEED_KEY = 'sss_seed_version';
const DATA_SEED_VERSION = '2026-04-02-v1';

const ENQUIRY_CATEGORIES = [
    'Documents',
    'Administrations',
    'Calendar & Key Dates',
    'Records & Assessments',
    'Academic Success',
    'Timetable & Attendance',
    'IT and Systems',
    'Other'
];

const PENDING_ENQUIRY_STATES = ['Submitted', 'Resolving', 'Appointment'];

const defaultEnquiries = [
    {
        enquiryId: 'ENQ001',
        studentID: 'SWH01234',
        details: 'Unable to find the final assessment rubric in Canvas for INF20029.',
        category: 'Records & Assessments',
        status: 'Resolving',
        response: 'Staff is reviewing your unit content access and will update shortly.',
        createdAt: '2026-03-24',
        expectedResolvedDay: '2026-04-02',
        resolvedAt: '',
        linkedAppointmentId: 'APT001',
        attachmentName: '',
        assignedStaff: 'Ms. Rachel Nguyen',
        linkedPastEnquiryIds: [],
        feedbackRating: null,
        feedbackSentAt: ''
    },
    {
        enquiryId: 'ENQ002',
        studentID: 'SWH01234',
        details: 'Need to update timetable due to work placement conflict on Wednesdays.',
        category: 'Timetable & Attendance',
        status: 'Submitted',
        response: '',
        createdAt: '2026-03-27',
        expectedResolvedDay: '2026-04-04',
        resolvedAt: '',
        linkedAppointmentId: '',
        attachmentName: '',
        assignedStaff: 'Dr. Amit Sharma',
        linkedPastEnquiryIds: [],
        feedbackRating: null,
        feedbackSentAt: ''
    },
    {
        enquiryId: 'ENQ003',
        studentID: 'SWH01234',
        details: 'Requesting confirmation letter for scholarship document submission.',
        category: 'Documents',
        status: 'Resolved',
        response: 'Confirmation letter has been issued and sent to your student email.',
        createdAt: '2026-03-17',
        expectedResolvedDay: '2026-03-25',
        resolvedAt: '2026-03-23',
        linkedAppointmentId: '',
        attachmentName: 'Scholarship-Request.pdf',
        assignedStaff: 'Ms. Chloe Tan',
        linkedPastEnquiryIds: [],
        feedbackRating: 5,
        feedbackSentAt: '2026-03-24'
    },
    {
        enquiryId: 'ENQ004',
        studentID: 'SWH04567',
        details: 'Need help to re-open submission access for late assignment upload.',
        category: 'Records & Assessments',
        status: 'Resolved',
        response: 'Upload access reopened for 24 hours.',
        createdAt: '2026-03-18',
        expectedResolvedDay: '2026-03-24',
        resolvedAt: '2026-03-24',
        linkedAppointmentId: '',
        attachmentName: '',
        assignedStaff: 'Mr. Liam Patel',
        linkedPastEnquiryIds: [],
        feedbackRating: null,
        feedbackSentAt: ''
    },
    {
        enquiryId: 'ENQ005',
        studentID: 'SWH04567',
        details: 'Laptop cannot connect to campus secure Wi-Fi from library.',
        category: 'IT and Systems',
        status: 'Submitted',
        response: '',
        createdAt: '2026-03-29',
        expectedResolvedDay: '2026-04-05',
        resolvedAt: '',
        linkedAppointmentId: '',
        attachmentName: '',
        assignedStaff: 'Dr. Amit Sharma',
        linkedPastEnquiryIds: [],
        feedbackRating: null,
        feedbackSentAt: ''
    },
    {
        enquiryId: 'ENQ006',
        studentID: 'SWH01234',
        details: 'Unable to access exam timetable for Term 2 in the student portal.',
        category: 'Calendar & Key Dates',
        status: 'Appointment',
        response: 'Please attend the scheduled advising appointment for timetable clarification.',
        createdAt: '2026-03-30',
        expectedResolvedDay: '2026-04-06',
        resolvedAt: '',
        linkedAppointmentId: '',
        attachmentName: '',
        assignedStaff: 'Ms. Rachel Nguyen',
        linkedPastEnquiryIds: ['ENQ003'],
        feedbackRating: null,
        feedbackSentAt: ''
    },
    {
        enquiryId: 'ENQ007',
        studentID: 'SWH01234',
        details: 'Need advice on unit withdrawal deadline and fee implications.',
        category: 'Administrations',
        status: 'Resolved',
        response: 'Withdrawal deadline details and fee policy emailed to your account.',
        createdAt: '2026-03-10',
        expectedResolvedDay: '2026-03-15',
        resolvedAt: '2026-03-14',
        linkedAppointmentId: '',
        attachmentName: '',
        assignedStaff: 'Mr. Liam Patel',
        linkedPastEnquiryIds: [],
        feedbackRating: 4,
        feedbackSentAt: '2026-03-15'
    },
    {
        enquiryId: 'ENQ008',
        studentID: 'SWH04567',
        details: 'Requesting transcript update for internship provider verification.',
        category: 'Documents',
        status: 'Resolving',
        response: 'Transcript office is processing your request.',
        createdAt: '2026-03-28',
        expectedResolvedDay: '2026-04-03',
        resolvedAt: '',
        linkedAppointmentId: '',
        attachmentName: 'Internship-Letter.pdf',
        assignedStaff: 'Ms. Chloe Tan',
        linkedPastEnquiryIds: [],
        feedbackRating: null,
        feedbackSentAt: ''
    }
];

const defaultInvitations = [
    {
        invitationId: 'INV001',
        enquiryId: 'ENQ001',
        studentID: 'SWH01234',
        staffName: 'Ms. Rachel Nguyen',
        message: 'Please book an appointment to review your assessment record access issue.',
        availableSlots: [
            { date: '2026-04-04', time: '10:00', available: true },
            { date: '2026-04-04', time: '13:30', available: true },
            { date: '2026-04-07', time: '09:30', available: true },
            { date: '2026-04-07', time: '14:00', available: false }
        ],
        status: 'Pending'
    },
    {
        invitationId: 'INV002',
        enquiryId: 'ENQ006',
        studentID: 'SWH01234',
        staffName: 'Ms. Rachel Nguyen',
        message: 'Let us review your exam timetable issue together.',
        availableSlots: [
            { date: '2026-04-09', time: '11:00', available: true },
            { date: '2026-04-09', time: '15:00', available: true },
            { date: '2026-04-11', time: '10:30', available: false }
        ],
        status: 'Pending'
    },
    {
        invitationId: 'INV003',
        enquiryId: 'ENQ008',
        studentID: 'SWH04567',
        staffName: 'Ms. Chloe Tan',
        message: 'Book a quick call to confirm transcript delivery timeline.',
        availableSlots: [
            { date: '2026-04-08', time: '09:00', available: true },
            { date: '2026-04-08', time: '14:30', available: true },
            { date: '2026-04-10', time: '13:00', available: false }
        ],
        status: 'Pending'
    },
    {
        invitationId: 'INV004',
        enquiryId: 'ENQ005',
        studentID: 'SWH04567',
        staffName: 'Dr. Amit Sharma',
        message: 'Please choose a slot so we can troubleshoot your Wi-Fi issue.',
        availableSlots: [
            { date: '2026-04-05', time: '10:00', available: true },
            { date: '2026-04-05', time: '16:00', available: true },
            { date: '2026-04-12', time: '09:30', available: true }
        ],
        status: 'Pending'
    }
];

const defaultAppointments = [
    {
        appointmentId: 'APT001',
        enquiryId: 'ENQ001',
        dateTime: '2026-04-02 11:00',
        location: 'Student Services Building, Room 205',
        status: 'Upcoming',
        studentID: 'SWH01234',
        staffID: 'STF102',
        staffName: 'Ms. Rachel Nguyen'
    },
    {
        appointmentId: 'APT002',
        enquiryId: 'ENQ003',
        dateTime: '2026-03-18 09:30',
        location: 'Online - Teams',
        status: 'Past',
        studentID: 'SWH01234',
        staffID: 'STF077',
        staffName: 'Dr. Amit Sharma'
    },
    {
        appointmentId: 'APT003',
        enquiryId: 'ENQ007',
        dateTime: '2026-03-22 14:00',
        location: 'Student Services Hub - Consultation Room 2',
        status: 'Past',
        studentID: 'SWH01234',
        staffID: 'STF114',
        staffName: 'Mr. Liam Patel'
    }
];

const defaultPreferences = {
    emailNotifications: true,
    pushNotifications: true,
    weeklySummary: false
};

let enquiries = loadState(ENQUIRIES_KEY, defaultEnquiries);
let appointments = loadState(APPOINTMENTS_KEY, defaultAppointments);
let invitations = loadState(INVITATIONS_KEY, defaultInvitations);
let studentRecords = [];
let customNotifications = [];
let selectedDashboardCategory = '';
let activeInvitationId = '';
let selectedLinkedEnquiryIds = [];
let stagedLinkedEnquiryIds = [];
let bookingCalendarView = {
    invitationId: '',
    year: 0,
    month: 0,
    selectedDay: ''
};

const modalState = {
    enquiryId: '',
    appointmentId: ''
};

document.addEventListener('DOMContentLoaded', async function () {
    await hydrateSupportDataState();
    await loadNotificationsConfig();
    await loadStudentRecords();

    if (document.getElementById('navbar-container')) {
        loadComponent('components/navbar.html', 'navbar-container');
    }

    if (document.getElementById('footer-container')) {
        loadComponent('components/footer.html', 'footer-container');
    }

    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['dashboard.html', 'enquiries.html', 'appointments.html', 'settings.html', 'manager-dashboard.html', 'manager-students.html', 'feedback.html'];

    if (protectedPages.includes(currentPage) && !currentUser) {
        window.location.href = 'index.html';
        return;
    }

    if (currentPage === 'dashboard.html' && isManager()) {
        window.location.href = 'manager-dashboard.html';
        return;
    }

    if (currentPage === 'manager-dashboard.html' && !isManager()) {
        window.location.href = 'dashboard.html';
        return;
    }

    if (currentPage === 'manager-students.html' && !isManager()) {
        window.location.href = 'dashboard.html';
        return;
    }

    applyRoleVisibility();
    setupLogin();

    if (document.querySelector('.dashboard-section')) {
        if (isManager()) {
            renderManagerDashboardPage();
        } else {
            initializeDashboard();
        }
    }

    if (document.querySelector('.manager-students-section')) {
        initializeManagerStudentsPage();
    }

    if (document.querySelector('.enquiries-page-section')) {
        initializeEnquiriesPage();
    }

    if (document.querySelector('.appointments-section')) {
        initializeAppointmentsPage();
    }

    if (document.querySelector('.settings-section')) {
        initializeSettingsPage();
    }

    if (document.querySelector('.feedback-section')) {
        initializeFeedbackPage();
    }
});

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
        console.error('Error loading component', error);
    }
}

function initializeComponent(componentId) {
    if (componentId === 'navbar-container') {
        applyRoleVisibility();
        setupNavbar();
    }
}

function setupNavbar() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function () {
            navbarMenu.classList.toggle('active');
        });
    }

    const currentPageName = getCurrentPageName();
    const links = document.querySelectorAll('.nav-link');

    links.forEach(function (link) {
        const page = link.getAttribute('data-page');
        if (page === currentPageName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        link.addEventListener('click', function () {
            if (navbarMenu) {
                navbarMenu.classList.remove('active');
            }
        });
    });
}

function getCurrentPageName() {
    const page = window.location.pathname.split('/').pop().replace('.html', '');
    return page || 'dashboard';
}

function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        return;
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const usernameEl = document.getElementById('username');
        const passwordEl = document.getElementById('password');
        const errorEl = document.getElementById('errorMessage');

        const username = usernameEl ? usernameEl.value.trim() : '';
        const password = passwordEl ? passwordEl.value.trim() : '';

        const profile = USER_PROFILES.find(function (user) {
            return user.username === username && user.password === password;
        });

        if (profile) {
            sessionStorage.setItem('currentUser', JSON.stringify(profile));
            window.location.href = profile.role === 'manager' ? 'manager-dashboard.html' : 'dashboard.html';
            return;
        }

        if (errorEl) {
            errorEl.textContent = 'Invalid credentials. Use student, student2, or manager with password inf20029.';
            errorEl.classList.add('show');
        }
    });
}

function initializeDashboard() {
    setDashboardHeader();
    renderNotifications();
    bindDashboardActions();

    if (isManager()) {
        renderManagerDashboard();
        return;
    }

    bindCategoryChips();
    bindPreviousEnquiryModalActions();
    renderPastEnquiryLinks();
    renderLinkedEnquiriesSummary();
    renderDashboardEnquiriesTable();
    renderDashboardAppointmentCard();
    initializeStudentChatbot();
}

function setDashboardHeader() {
    const titleEl = document.getElementById('dashboardTitle');
    const greetingEl = document.getElementById('roleGreeting');
    if (!titleEl || !greetingEl) {
        return;
    }

    if (isManager()) {
        titleEl.textContent = 'Manager Dashboard';
    }

    greetingEl.textContent = `Hello ${currentUser?.roleLabel || 'Student'}`;
}

function applyRoleVisibility() {
    const managerMode = isManager();

    document.querySelectorAll('.manager-only').forEach(function (element) {
        if (managerMode) {
            element.hidden = false;
        } else {
            element.hidden = true;
        }
    });

    document.querySelectorAll('.student-only').forEach(function (element) {
        if (managerMode) {
            element.hidden = true;
        } else {
            element.hidden = false;
        }
    });
}

function bindCategoryChips() {
    const chips = document.querySelectorAll('.category-chip');
    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            chips.forEach(function (item) { item.classList.remove('selected'); });
            chip.classList.add('selected');
            selectedDashboardCategory = chip.getAttribute('data-category') || '';
        });
    });
}

function bindDashboardActions() {
    const enquiryForm = document.getElementById('enquiryForm');
    const viewAllBtn = document.getElementById('viewAllEnquiriesBtn');
    const notificationButton = document.getElementById('notificationButton');
    const notificationOverlay = document.getElementById('notificationOverlay');
    const notificationClose = document.getElementById('notificationClose');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', handleDashboardEnquirySubmit);
    }

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function () {
            window.location.href = 'enquiries.html';
        });
    }

    if (notificationButton && notificationOverlay) {
        notificationButton.addEventListener('click', function () {
            notificationOverlay.classList.add('show');
        });
    }

    if (notificationClose && notificationOverlay) {
        notificationClose.addEventListener('click', function () {
            notificationOverlay.classList.remove('show');
        });
    }

    if (notificationOverlay) {
        notificationOverlay.addEventListener('click', function (event) {
            if (event.target === notificationOverlay) {
                notificationOverlay.classList.remove('show');
            }
        });
    }

    const staffKpiClose = document.getElementById('staffKpiClose');
    const staffKpiModal = document.getElementById('staffKpiModal');

    if (staffKpiClose && staffKpiModal) {
        staffKpiClose.addEventListener('click', function () {
            staffKpiModal.classList.remove('show');
        });

        staffKpiModal.addEventListener('click', function (event) {
            if (event.target === staffKpiModal) {
                staffKpiModal.classList.remove('show');
            }
        });
    }
}

function handleDashboardEnquirySubmit(event) {
    event.preventDefault();

    const detailsEl = document.getElementById('details');
    const attachmentEl = document.getElementById('attachment');
    const errorEl = document.getElementById('enquirySubmitError');

    const details = detailsEl ? detailsEl.value.trim() : '';
    const attachmentName = attachmentEl && attachmentEl.files && attachmentEl.files[0]
        ? attachmentEl.files[0].name
        : '';

    if (!details) {
        showInlineError(errorEl, 'Please enter enquiry details before submitting.');
        return;
    }

    const chosenCategory = selectedDashboardCategory || getRandomCategory();
    const createdAt = getTodayISO();

    const newEnquiry = {
        enquiryId: getNextEnquiryId(),
        studentID: getCurrentStudentId(),
        details,
        category: chosenCategory,
        status: 'Submitted',
        response: '',
        createdAt,
        expectedResolvedDay: addDaysISO(createdAt, randomBetween(3, 10)),
        resolvedAt: '',
        linkedAppointmentId: '',
        attachmentName,
        assignedStaff: getRandomStaff(),
        linkedPastEnquiryIds: [...selectedLinkedEnquiryIds],
        feedbackRating: null,
        feedbackSentAt: ''
    };

    enquiries.unshift(newEnquiry);
    persistEnquiries();

    if (errorEl) {
        errorEl.classList.remove('show');
    }

    const form = document.getElementById('enquiryForm');
    if (form) {
        form.reset();
    }

    selectedDashboardCategory = '';
    selectedLinkedEnquiryIds = [];
    stagedLinkedEnquiryIds = [];
    document.querySelectorAll('.category-chip').forEach(function (chip) {
        chip.classList.remove('selected');
    });

    renderPastEnquiryLinks();
    renderLinkedEnquiriesSummary();
    renderDashboardEnquiriesTable();
    renderNotifications();
}

function bindPreviousEnquiryModalActions() {
    const openBtn = document.getElementById('openPreviousEnquiriesBtn');
    const closeBtn = document.getElementById('previousEnquiryClose');
    const cancelBtn = document.getElementById('previousEnquiryCancel');
    const applyBtn = document.getElementById('previousEnquiryApply');
    const modal = document.getElementById('previousEnquiryModal');

    if (openBtn) {
        openBtn.addEventListener('click', openPreviousEnquiryModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closePreviousEnquiryModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closePreviousEnquiryModal);
    }

    if (applyBtn) {
        applyBtn.addEventListener('click', applyPreviousEnquirySelection);
    }

    if (modal) {
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closePreviousEnquiryModal();
            }
        });
    }
}

function openPreviousEnquiryModal() {
    const modal = document.getElementById('previousEnquiryModal');
    if (!modal) {
        return;
    }

    stagedLinkedEnquiryIds = [...selectedLinkedEnquiryIds];
    renderPastEnquiryLinks();
    modal.classList.add('show');
}

function closePreviousEnquiryModal() {
    const modal = document.getElementById('previousEnquiryModal');
    if (!modal) {
        return;
    }

    stagedLinkedEnquiryIds = [...selectedLinkedEnquiryIds];
    modal.classList.remove('show');
}

function applyPreviousEnquirySelection() {
    selectedLinkedEnquiryIds = [...stagedLinkedEnquiryIds];
    renderLinkedEnquiriesSummary();
    closePreviousEnquiryModal();
}

function renderPastEnquiryLinks() {
    const container = document.getElementById('pastEnquiryLinks');
    if (!container || isManager()) {
        return;
    }

    const rows = getPastEnquiriesForCurrentStudent();
    if (rows.length === 0) {
        container.innerHTML = '<p class="muted-text">No past enquiries available to link yet.</p>';
        return;
    }

    container.innerHTML = rows.map(function (enquiry) {
        const selected = stagedLinkedEnquiryIds.includes(enquiry.enquiryId);
        return `
            <button
                type="button"
                class="past-enquiry-link-btn ${selected ? 'selected' : ''}"
                data-enquiry-id="${enquiry.enquiryId}"
                onclick="togglePastEnquirySelection('${enquiry.enquiryId}')"
            >
                <strong>${enquiry.enquiryId}</strong>: ${escapeHtml(truncateText(enquiry.details, 85))}
            </button>
        `;
    }).join('');
}

function togglePastEnquirySelection(enquiryId) {
    const exists = stagedLinkedEnquiryIds.includes(enquiryId);

    if (exists) {
        stagedLinkedEnquiryIds = stagedLinkedEnquiryIds.filter(function (id) { return id !== enquiryId; });
    } else {
        stagedLinkedEnquiryIds.push(enquiryId);
    }

    renderPastEnquiryLinks();
}

function renderLinkedEnquiriesSummary() {
    const container = document.getElementById('linkedEnquiriesSummary');
    if (!container || isManager()) {
        return;
    }

    if (selectedLinkedEnquiryIds.length === 0) {
        container.innerHTML = '<p class="muted-text">No previous enquiries linked.</p>';
        return;
    }

    const linkedRows = selectedLinkedEnquiryIds
        .map(function (linkedId) {
            return enquiries.find(function (item) { return item.enquiryId === linkedId; });
        })
        .filter(Boolean);

    container.innerHTML = linkedRows.map(function (enquiry) {
        return `<p class="linked-enquiry-item"><strong>${enquiry.enquiryId}</strong>: ${escapeHtml(truncateText(enquiry.details, 80))}</p>`;
    }).join('');
}

function getPastEnquiriesForCurrentStudent() {
    return getRoleScopedEnquiries().filter(function (enquiry) {
        return enquiry.status === 'Resolved' || enquiry.status === 'Canceled';
    }).sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
}

function renderDashboardEnquiriesTable() {
    const tableBody = document.getElementById('dashboardEnquiryTableBody');
    if (!tableBody) {
        return;
    }

    const rows = getRoleScopedEnquiries().sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }).slice(0, 6);

    if (rows.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="empty-cell">No enquiries yet.</td></tr>';
        return;
    }

    tableBody.innerHTML = rows.map(function (enquiry) {
        return `
            <tr>
                <td>${enquiry.enquiryId}</td>
                <td>${escapeHtml(truncateText(enquiry.details, 90))}</td>
                <td>${enquiry.category}</td>
                <td><span class="status-pill ${statusToClass(enquiry.status)}">${enquiry.status}</span></td>
                <td>${enquiry.response ? escapeHtml(truncateText(enquiry.response, 70)) : '-'}</td>
                <td>${enquiry.createdAt}</td>
            </tr>
        `;
    }).join('');
}

function renderDashboardAppointmentCard() {
    const card = document.getElementById('upcomingAppointmentCardBody');
    if (!card) {
        return;
    }

    const upcoming = getUpcomingAppointments();
    if (upcoming.length === 0) {
        card.innerHTML = '<p class="placeholder-text">No upcoming appointments.</p>';
        return;
    }

    const next = upcoming[0];
    card.innerHTML = `
        <div class="side-appointment-item">
            <p><strong>Appointment ID:</strong> ${next.appointmentId}</p>
            <p><strong>Staff:</strong> ${next.staffName}</p>
            <p><strong>Date & Time:</strong> ${next.dateTime}</p>
            <p><strong>Location:</strong> ${next.location}</p>
            <a class="btn btn-secondary" href="appointments.html?appointment=${next.appointmentId}">View Details</a>
        </div>
    `;
}

function renderNotifications() {
    const countEl = document.getElementById('notificationCount');
    const listEl = document.getElementById('notificationList');

    if (!countEl || !listEl) {
        return;
    }

    const notes = [];

    if (customNotifications.length > 0) {
        notes.push(...customNotifications);
    }

    if (notes.length === 0) {
        const pendingInvites = getRoleScopedInvitations().filter(function (invite) {
            return invite.status === 'Pending';
        });

        if (pendingInvites.length > 0) {
            notes.push(`You have ${pendingInvites.length} appointment invitation(s) to book.`);
        }

        const pendingEnquiries = getRoleScopedEnquiries().filter(function (enquiry) {
            return PENDING_ENQUIRY_STATES.includes(enquiry.status);
        }).length;

        if (pendingEnquiries > 0) {
            notes.push(`${pendingEnquiries} enquiry/enquiries are currently in progress.`);
        }
    }

    if (notes.length === 0) {
        notes.push('No new notifications right now.');
    }

    countEl.textContent = String(notes.length);
    listEl.innerHTML = notes.map(function (item, index) {
        return `
            <div class="notification-item">
                <span class="notification-badge">${index + 1}</span>
                <p>${item}</p>
            </div>
        `;
    }).join('');
}

function initializeStudentChatbot() {
    if (isManager()) {
        return;
    }

    const fab = document.getElementById('chatbotFab');
    const panel = document.getElementById('chatbotPanel');
    const closeBtn = document.getElementById('chatbotClose');
    const sendBtn = document.getElementById('chatbotSend');
    const input = document.getElementById('chatbotInput');
    const messages = document.getElementById('chatbotMessages');

    if (!fab || !panel || !closeBtn || !sendBtn || !input || !messages) {
        return;
    }

    function openPanel() {
        panel.classList.add('show');
        input.focus();
    }

    function closePanel() {
        panel.classList.remove('show');
    }

    function appendMessage(text, sender) {
        const item = document.createElement('p');
        item.className = `chatbot-message ${sender}`;
        item.textContent = text;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    }

    function buildReply(rawText) {
        const text = rawText.toLowerCase();

        if (text.includes('appointment') || text.includes('book')) {
            return 'Go to Appointments and use Book Appointment on a pending invitation from staff. You can only book when invited.';
        }

        if (text.includes('category') || text.includes('enquiry type')) {
            return 'You can tap a category chip before submitting. If you skip it, a random category is assigned automatically.';
        }

        if (text.includes('status') || text.includes('progress')) {
            return 'Track enquiry status in Enquiries: Submitted, Resolving, Appointment, Resolved, or Canceled.';
        }

        if (text.includes('hello') || text.includes('hi')) {
            return 'Hi! Ask me about creating enquiries, checking statuses, or booking appointments.';
        }

        return 'I can help with enquiry submission, category selection, and appointment booking flow.';
    }

    function sendChat() {
        const text = input.value.trim();
        if (!text) {
            return;
        }

        appendMessage(text, 'user');
        input.value = '';

        window.setTimeout(function () {
            appendMessage(buildReply(text), 'bot');
        }, 180);
    }

    fab.addEventListener('click', function () {
        if (panel.classList.contains('show')) {
            closePanel();
            return;
        }
        openPanel();
    });

    closeBtn.addEventListener('click', closePanel);
    sendBtn.addEventListener('click', sendChat);
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendChat();
        }
    });

    document.addEventListener('click', function (event) {
        if (!panel.classList.contains('show')) {
            return;
        }

        const clickedInsidePanel = panel.contains(event.target);
        const clickedFab = fab.contains(event.target);
        if (!clickedInsidePanel && !clickedFab) {
            closePanel();
        }
    });
}

async function loadNotificationsConfig() {
    try {
        const response = await fetch(NOTIFICATIONS_FILE, { cache: 'no-store' });
        if (!response.ok) {
            customNotifications = [];
            return;
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload?.notifications;

        if (!Array.isArray(items)) {
            customNotifications = [];
            return;
        }

        customNotifications = items
            .map(function (item) {
                if (typeof item === 'string') {
                    return item.trim();
                }
                if (item && typeof item === 'object' && typeof item.message === 'string') {
                    return item.message.trim();
                }
                return '';
            })
            .filter(function (message) { return message.length > 0; });
    } catch (error) {
        customNotifications = [];
    }
}

async function loadStudentRecords() {
    try {
        const response = await fetch(STUDENTS_FILE, { cache: 'no-store' });
        if (!response.ok) {
            studentRecords = [];
            return;
        }

        const payload = await response.json();
        studentRecords = Array.isArray(payload) ? payload : [];
    } catch (error) {
        studentRecords = [];
    }
}

async function hydrateSupportDataState() {
    try {
        const alreadySeeded = localStorage.getItem(DATA_SEED_KEY) === DATA_SEED_VERSION;
        if (alreadySeeded) {
            enquiries = loadState(ENQUIRIES_KEY, defaultEnquiries).map(normalizeEnquiryRecord);
            appointments = loadState(APPOINTMENTS_KEY, defaultAppointments);
            invitations = loadState(INVITATIONS_KEY, defaultInvitations);
            persistEnquiries();
            return;
        }

        const response = await fetch(SUPPORT_DATA_FILE, { cache: 'no-store' });
        if (!response.ok) {
            enquiries = loadState(ENQUIRIES_KEY, defaultEnquiries).map(normalizeEnquiryRecord);
            persistEnquiries();
            return;
        }

        const payload = await response.json();
        const nextEnquiries = Array.isArray(payload?.enquiries)
            ? payload.enquiries.map(normalizeEnquiryRecord)
            : structuredCloneSafe(defaultEnquiries).map(normalizeEnquiryRecord);
        const nextAppointments = Array.isArray(payload?.appointments)
            ? payload.appointments
            : structuredCloneSafe(defaultAppointments);
        const nextInvitations = Array.isArray(payload?.pendingAppointments)
            ? payload.pendingAppointments
            : structuredCloneSafe(defaultInvitations);

        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(nextEnquiries));
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(nextAppointments));
        localStorage.setItem(INVITATIONS_KEY, JSON.stringify(nextInvitations));
        localStorage.setItem(DATA_SEED_KEY, DATA_SEED_VERSION);

        enquiries = nextEnquiries;
        appointments = nextAppointments;
        invitations = nextInvitations;
    } catch (error) {
        enquiries = loadState(ENQUIRIES_KEY, defaultEnquiries).map(normalizeEnquiryRecord);
        appointments = loadState(APPOINTMENTS_KEY, defaultAppointments);
        invitations = loadState(INVITATIONS_KEY, defaultInvitations);
        persistEnquiries();
    }
}

function normalizeEnquiryRecord(enquiry) {
    return {
        ...enquiry,
        linkedPastEnquiryIds: Array.isArray(enquiry?.linkedPastEnquiryIds) ? enquiry.linkedPastEnquiryIds : [],
        feedbackRating: typeof enquiry?.feedbackRating === 'number' ? enquiry.feedbackRating : null,
        feedbackSentAt: enquiry?.feedbackSentAt || ''
    };
}

function renderManagerDashboard() {
    renderManagerSummary();
    renderStaffKpiCards();
}

function renderManagerSummary() {
    const metrics = document.getElementById('managerMetrics');
    if (!metrics) {
        return;
    }

    const pendingCount = enquiries.filter(function (enquiry) {
        return PENDING_ENQUIRY_STATES.includes(enquiry.status);
    }).length;

    const resolvedCount = enquiries.filter(function (enquiry) {
        return enquiry.status === 'Resolved';
    }).length;

    const canceledCount = enquiries.filter(function (enquiry) {
        return enquiry.status === 'Canceled';
    }).length;

    metrics.innerHTML = `
        <article class="metric-item">
            <p class="metric-label">Pending Enquiries</p>
            <p class="metric-value">${pendingCount}</p>
        </article>
        <article class="metric-item">
            <p class="metric-label">Resolved Enquiries</p>
            <p class="metric-value">${resolvedCount}</p>
        </article>
        <article class="metric-item">
            <p class="metric-label">Canceled Enquiries</p>
            <p class="metric-value">${canceledCount}</p>
        </article>
    `;
}

function renderStaffKpiCards() {
    const container = document.getElementById('staffKpiGrid');
    if (!container) {
        return;
    }

    const staffMetrics = calculateStaffPerformance();

    container.innerHTML = staffMetrics.map(function (staff) {
        return `
            <button type="button" class="staff-kpi-card" onclick="openStaffKpiDetail('${escapeHtml(staff.name)}')">
                <h3>${staff.name}</h3>
                <p><strong>Resolved:</strong> ${staff.resolved}</p>
                <p><strong>Resolved On Time:</strong> ${staff.resolvedOnTime}</p>
                <p><strong>Pending:</strong> ${staff.pending}</p>
            </button>
        `;
    }).join('');
}

function calculateStaffPerformance() {
    return STAFF_MEMBERS.map(function (staffName) {
        const staffEnquiries = enquiries.filter(function (enquiry) {
            return enquiry.assignedStaff === staffName;
        });

        const resolved = staffEnquiries.filter(function (enquiry) {
            return enquiry.status === 'Resolved';
        });

        const resolvedOnTime = resolved.filter(function (enquiry) {
            return enquiry.resolvedAt && enquiry.resolvedAt <= enquiry.expectedResolvedDay;
        }).length;

        const pending = staffEnquiries.filter(function (enquiry) {
            return PENDING_ENQUIRY_STATES.includes(enquiry.status);
        }).length;

        return {
            name: staffName,
            resolved: resolved.length,
            resolvedOnTime,
            pending,
            totalAssigned: staffEnquiries.length
        };
    });
}

function openStaffKpiDetail(staffNameRaw) {
    const staffName = decodeHtmlEntities(staffNameRaw);
    const modal = document.getElementById('staffKpiModal');
    const body = document.getElementById('staffKpiDetailBody');
    if (!modal || !body) {
        return;
    }

    const metric = calculateStaffPerformance().find(function (item) {
        return item.name === staffName;
    });

    if (!metric) {
        return;
    }

    body.innerHTML = `
        <div class="detail-grid">
            <p><strong>Name:</strong> ${metric.name}</p>
            <p><strong>Total Assigned:</strong> ${metric.totalAssigned}</p>
            <p><strong>Resolved Enquiries:</strong> ${metric.resolved}</p>
            <p><strong>Resolved On Time:</strong> ${metric.resolvedOnTime}</p>
            <p><strong>Pending Enquiries:</strong> ${metric.pending}</p>
        </div>
    `;

    modal.classList.add('show');
}

function initializeEnquiriesPage() {
    const detailsInput = document.getElementById('searchDetails');
    const statusInput = document.getElementById('searchStatus');
    const dateInput = document.getElementById('searchDate');

    if (detailsInput) {
        detailsInput.addEventListener('input', renderEnquiriesPageTable);
    }

    if (statusInput) {
        statusInput.addEventListener('change', renderEnquiriesPageTable);
    }

    if (dateInput) {
        dateInput.addEventListener('change', renderEnquiriesPageTable);
    }

    const modalClose = document.getElementById('enquiryDetailClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeEnquiryDetailModal);
    }

    const modalOverlay = document.getElementById('enquiryDetailModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (event) {
            if (event.target === modalOverlay) {
                closeEnquiryDetailModal();
            }
        });
    }

    renderEnquiriesPageTable();
    maybeOpenEnquiryFromHash();
}

function maybeOpenEnquiryFromHash() {
    const hash = window.location.hash || '';
    if (!hash.startsWith('#ENQ')) {
        return;
    }

    const enquiryId = hash.slice(1).toUpperCase();
    const exists = enquiries.some(function (item) { return item.enquiryId === enquiryId; });
    if (exists) {
        openEnquiryDetail(enquiryId);
    }
}

function renderEnquiriesPageTable() {
    const tableBody = document.getElementById('allEnquiriesTableBody');
    if (!tableBody) {
        return;
    }

    const detailsKeyword = (document.getElementById('searchDetails')?.value || '').trim().toLowerCase();
    const statusKeyword = (document.getElementById('searchStatus')?.value || '').trim();
    const dateKeyword = (document.getElementById('searchDate')?.value || '').trim();

    let roleRows = getRoleScopedEnquiries();

    const filtered = roleRows.filter(function (enquiry) {
        const matchDetails = !detailsKeyword || enquiry.details.toLowerCase().includes(detailsKeyword);
        const matchStatus = !statusKeyword || enquiry.status === statusKeyword;
        const matchDate = !dateKeyword || enquiry.createdAt === dateKeyword;
        return matchDetails && matchStatus && matchDate;
    }).sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" class="empty-cell">No enquiries match your filters.</td></tr>';
        return;
    }

    tableBody.innerHTML = filtered.map(function (enquiry) {
        const deleteDisabled = enquiry.status === 'Resolved' || isManager();
        const appointmentAction = enquiry.linkedAppointmentId
            ? `<button type="button" class="btn btn-secondary btn-sm" onclick="goToAppointment('${enquiry.linkedAppointmentId}')">Appointment</button>`
            : '<span class="muted-text">-</span>';

        const deleteButton = isManager()
            ? ''
            : `<button type="button" class="btn btn-danger btn-sm" onclick="deleteEnquiry('${enquiry.enquiryId}')" ${deleteDisabled ? 'disabled' : ''}>Delete</button>`;

        return `
            <tr>
                <td>${enquiry.enquiryId}</td>
                <td>${enquiry.studentID}</td>
                <td>${escapeHtml(truncateText(enquiry.details, 80))}</td>
                <td>${enquiry.category}</td>
                <td>${enquiry.assignedStaff || '-'}</td>
                <td><span class="status-pill ${statusToClass(enquiry.status)}">${enquiry.status}</span></td>
                <td>${enquiry.response ? escapeHtml(truncateText(enquiry.response, 60)) : '-'}</td>
                <td>${enquiry.createdAt}</td>
                <td class="table-actions">
                    <button type="button" class="btn btn-primary btn-sm" onclick="openEnquiryDetail('${enquiry.enquiryId}')">View</button>
                    ${appointmentAction}
                    ${deleteButton}
                </td>
            </tr>
        `;
    }).join('');
}

function openEnquiryDetail(enquiryId) {
    const modal = document.getElementById('enquiryDetailModal');
    const body = document.getElementById('enquiryDetailBody');

    if (!modal || !body) {
        return;
    }

    const enquiry = enquiries.find(function (item) { return item.enquiryId === enquiryId; });
    if (!enquiry) {
        return;
    }

    const linkedRows = (enquiry.linkedPastEnquiryIds || [])
        .map(function (linkedId) {
            return enquiries.find(function (item) { return item.enquiryId === linkedId; });
        })
        .filter(Boolean);

    const linkedMarkup = linkedRows.length === 0
        ? '<p>No linked past enquiries.</p>'
        : linkedRows.map(function (item) {
            return `<p><strong>${item.enquiryId}</strong>: ${escapeHtml(truncateText(item.details, 100))}</p>`;
        }).join('');

    const feedbackLabel = enquiry.feedbackRating
        ? `${enquiry.feedbackRating}/5${enquiry.feedbackSentAt ? ` on ${enquiry.feedbackSentAt}` : ''}`
        : 'Not rated yet';

    modalState.enquiryId = enquiryId;

    body.innerHTML = `
        <div class="detail-grid">
            <p><strong>Enquiry ID:</strong> ${enquiry.enquiryId}</p>
            <p><strong>Student ID:</strong> ${enquiry.studentID}</p>
            <p><strong>Category:</strong> ${enquiry.category}</p>
            <p><strong>Current State:</strong> <span class="status-pill ${statusToClass(enquiry.status)}">${enquiry.status}</span></p>
            <p><strong>Created At:</strong> ${enquiry.createdAt}</p>
            <p><strong>Expected Resolved Day:</strong> ${enquiry.expectedResolvedDay}</p>
            <p><strong>Assigned Staff:</strong> ${enquiry.assignedStaff || '-'}</p>
        </div>
        <div class="detail-block">
            <h3>Details</h3>
            <p>${escapeHtml(enquiry.details)}</p>
        </div>
        <div class="detail-block">
            <h3>Response</h3>
            <p>${enquiry.response ? escapeHtml(enquiry.response) : 'No response yet.'}</p>
        </div>
        <div class="detail-block">
            <h3>Attachment</h3>
            <p>${enquiry.attachmentName || 'No attachment uploaded.'}</p>
        </div>
        <div class="detail-block">
            <h3>Linked Past Enquiries</h3>
            ${linkedMarkup}
        </div>
        <div class="detail-block">
            <h3>Feedback</h3>
            <p>${feedbackLabel}</p>
        </div>
        <div class="detail-actions">
            ${enquiry.linkedAppointmentId ? `<button type="button" class="btn btn-secondary" onclick="goToAppointment('${enquiry.linkedAppointmentId}')">Go To Appointment</button>` : ''}
        </div>
    `;

    modal.classList.add('show');
}

function closeEnquiryDetailModal() {
    const modal = document.getElementById('enquiryDetailModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function deleteEnquiry(enquiryId) {
    const enquiry = enquiries.find(function (item) { return item.enquiryId === enquiryId; });
    if (!enquiry) {
        return;
    }

    if (enquiry.status === 'Resolved') {
        alert('Resolved enquiries cannot be deleted.');
        return;
    }

    enquiries = enquiries.filter(function (item) { return item.enquiryId !== enquiryId; });
    persistEnquiries();
    renderEnquiriesPageTable();
}

function goToAppointment(appointmentId) {
    window.location.href = `appointments.html?appointment=${appointmentId}`;
}

function initializeAppointmentsPage() {
    bindAppointmentModalEvents();
    bindManagerRequestActions();
    bindAppointmentSearchActions();
    renderInvitationsTable();
    renderAppointmentsTables();
    renderManagerRequestEnquiryOptions();
    maybeOpenAppointmentFromQuery();
}

function bindAppointmentSearchActions() {
    const input = document.getElementById('appointmentSearchInput');
    const clearBtn = document.getElementById('appointmentSearchClear');

    if (input) {
        input.addEventListener('input', renderAppointmentsTables);
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            if (input) {
                input.value = '';
                input.focus();
            }
            renderAppointmentsTables();
        });
    }
}

function bindAppointmentModalEvents() {
    const appointmentClose = document.getElementById('appointmentDetailClose');
    const appointmentModal = document.getElementById('appointmentDetailModal');

    if (appointmentClose) {
        appointmentClose.addEventListener('click', closeAppointmentDetailModal);
    }

    if (appointmentModal) {
        appointmentModal.addEventListener('click', function (event) {
            if (event.target === appointmentModal) {
                closeAppointmentDetailModal();
            }
        });
    }

    const bookingClose = document.getElementById('bookingClose');
    const bookingModal = document.getElementById('bookingModal');

    if (bookingClose) {
        bookingClose.addEventListener('click', closeBookingModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', function (event) {
            if (event.target === bookingModal) {
                closeBookingModal();
            }
        });
    }
}

function bindManagerRequestActions() {
    const form = document.getElementById('managerRequestForm');
    if (!form) {
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const enquirySelect = document.getElementById('managerEnquirySelect');
        const staffNameInput = document.getElementById('managerStaffName');
        const messageInput = document.getElementById('managerInviteMessage');

        const enquiryId = enquirySelect ? enquirySelect.value : '';
        const staffName = staffNameInput ? staffNameInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!enquiryId || !staffName || !message) {
            alert('Please complete all fields before creating a request.');
            return;
        }

        const linkedEnquiry = enquiries.find(function (item) { return item.enquiryId === enquiryId; });
        if (!linkedEnquiry) {
            alert('Selected enquiry was not found.');
            return;
        }

        invitations.push({
            invitationId: getNextInvitationId(),
            enquiryId,
            studentID: linkedEnquiry.studentID,
            staffName,
            message,
            availableSlots: buildDefaultSlots(),
            status: 'Pending'
        });

        linkedEnquiry.status = 'Appointment';
        linkedEnquiry.assignedStaff = staffName;

        persistInvitations();
        persistEnquiries();

        form.reset();
        renderInvitationsTable();
        renderManagerRequestEnquiryOptions();
        alert('Appointment request created successfully.');
    });
}

function renderManagerRequestEnquiryOptions() {
    const select = document.getElementById('managerEnquirySelect');
    if (!select) {
        return;
    }

    const pendingRows = enquiries.filter(function (enquiry) {
        return PENDING_ENQUIRY_STATES.includes(enquiry.status);
    });

    if (pendingRows.length === 0) {
        select.innerHTML = '<option value="">No pending enquiries available</option>';
        return;
    }

    select.innerHTML = pendingRows.map(function (enquiry) {
        return `<option value="${enquiry.enquiryId}">${enquiry.enquiryId} - ${truncateText(enquiry.details, 55)}</option>`;
    }).join('');
}

function renderInvitationsTable() {
    const body = document.getElementById('invitationTableBody');
    if (!body) {
        return;
    }

    const pending = getRoleScopedInvitations().filter(function (invite) { return invite.status === 'Pending'; });

    if (pending.length === 0) {
        body.innerHTML = '<tr><td colspan="5" class="empty-cell">No pending invitations from staff.</td></tr>';
        return;
    }

    body.innerHTML = pending.map(function (invite) {
        const actionButton = isManager()
            ? '<span class="status-pill appointment">Pending</span>'
            : `<button type="button" class="btn btn-primary btn-sm" onclick="openBookingModal('${invite.invitationId}')">Book Appointment</button>`;

        return `
            <tr>
                <td>${invite.invitationId}</td>
                <td>${invite.staffName}</td>
                <td><a class="table-link" href="enquiries.html#${invite.enquiryId}">${invite.enquiryId}</a></td>
                <td>${escapeHtml(invite.message)}</td>
                <td>${actionButton}</td>
            </tr>
        `;
    }).join('');
}

function renderAppointmentsTables() {
    const keyword = (document.getElementById('appointmentSearchInput')?.value || '').trim().toLowerCase();
    const scopedRows = getRoleScopedAppointments();
    const filteredRows = scopedRows.filter(function (appointment) {
        return !keyword || appointmentMatchesKeyword(appointment, keyword);
    });

    const countEl = document.getElementById('appointmentSearchResultCount');
    if (countEl) {
        if (!keyword) {
            countEl.textContent = `Showing all ${scopedRows.length} appointment${scopedRows.length === 1 ? '' : 's'}`;
        } else {
            countEl.textContent = `Showing ${filteredRows.length} of ${scopedRows.length} appointment${scopedRows.length === 1 ? '' : 's'}`;
        }
    }

    renderAppointmentTable('upcomingAppointmentBody', 'Upcoming', true, filteredRows, !!keyword);
    renderAppointmentTable('pastAppointmentBody', 'Past', false, filteredRows, !!keyword);
}

function appointmentMatchesKeyword(appointment, keyword) {
    const searchable = [
        appointment.appointmentId,
        appointment.enquiryId,
        appointment.staffName,
        appointment.dateTime,
        appointment.location,
        appointment.status
    ].join(' ').toLowerCase();

    return searchable.includes(keyword);
}

function renderAppointmentTable(containerId, status, withAction, rowsSource, hasSearchKeyword) {
    const body = document.getElementById(containerId);
    if (!body) {
        return;
    }

    const rows = rowsSource.filter(function (appointment) {
        return appointment.status === status;
    }).sort(function (a, b) {
        return new Date(a.dateTime.replace(' ', 'T')) - new Date(b.dateTime.replace(' ', 'T'));
    });

    if (rows.length === 0) {
        const message = hasSearchKeyword
            ? `No ${status.toLowerCase()} appointments match your search.`
            : `No ${status.toLowerCase()} appointments.`;
        body.innerHTML = `<tr><td colspan="6" class="empty-cell">${message}</td></tr>`;
        return;
    }

    body.innerHTML = rows.map(function (appointment) {
        const actionCell = withAction
            ? `<button type="button" class="btn btn-secondary btn-sm" onclick="openAppointmentDetail('${appointment.appointmentId}')">View</button>`
            : '<span class="muted-text">-</span>';

        return `
            <tr>
                <td>${appointment.appointmentId}</td>
                <td>${appointment.enquiryId || '-'}</td>
                <td>${appointment.staffName}</td>
                <td>${appointment.dateTime}</td>
                <td>${appointment.location}</td>
                <td>${actionCell}</td>
            </tr>
        `;
    }).join('');
}

function openAppointmentDetail(appointmentId) {
    const modal = document.getElementById('appointmentDetailModal');
    const body = document.getElementById('appointmentDetailBody');

    if (!modal || !body) {
        return;
    }

    const appointment = appointments.find(function (item) { return item.appointmentId === appointmentId; });
    if (!appointment) {
        return;
    }

    modalState.appointmentId = appointmentId;

    body.innerHTML = `
        <div class="detail-grid">
            <p><strong>Appointment ID:</strong> ${appointment.appointmentId}</p>
            <p><strong>Enquiry ID:</strong> ${appointment.enquiryId || '-'}</p>
            <p><strong>Staff:</strong> ${appointment.staffName}</p>
            <p><strong>Date & Time:</strong> ${appointment.dateTime}</p>
            <p><strong>Location:</strong> ${appointment.location}</p>
            <p><strong>Status:</strong> ${appointment.status}</p>
        </div>
    `;

    modal.classList.add('show');
}

function closeAppointmentDetailModal() {
    const modal = document.getElementById('appointmentDetailModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function maybeOpenAppointmentFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const appointmentId = params.get('appointment');

    if (appointmentId) {
        openAppointmentDetail(appointmentId);
    }
}

function openBookingModal(invitationId) {
    const invitation = invitations.find(function (item) { return item.invitationId === invitationId; });
    const modal = document.getElementById('bookingModal');
    const title = document.getElementById('bookingTitle');
    const monthLabel = document.getElementById('bookingMonthLabel');
    const prevMonthBtn = document.getElementById('bookingPrevMonth');
    const nextMonthBtn = document.getElementById('bookingNextMonth');

    if (!invitation || !modal || !title || !monthLabel || !prevMonthBtn || !nextMonthBtn) {
        return;
    }

    activeInvitationId = invitationId;
    const availableDates = invitation.availableSlots.map(function (slot) { return slot.date; }).sort();
    const firstDate = availableDates[0] || getTodayISO();
    const firstDateObj = new Date(`${firstDate}T00:00:00`);

    bookingCalendarView = {
        invitationId,
        year: firstDateObj.getFullYear(),
        month: firstDateObj.getMonth(),
        selectedDay: ''
    };

    title.textContent = `Book with ${invitation.staffName}`;

    prevMonthBtn.onclick = function () {
        bookingCalendarView.month -= 1;
        if (bookingCalendarView.month < 0) {
            bookingCalendarView.month = 11;
            bookingCalendarView.year -= 1;
        }
        renderBookingCalendar();
    };

    nextMonthBtn.onclick = function () {
        bookingCalendarView.month += 1;
        if (bookingCalendarView.month > 11) {
            bookingCalendarView.month = 0;
            bookingCalendarView.year += 1;
        }
        renderBookingCalendar();
    };

    const confirmBtn = document.getElementById('confirmBookingBtn');
    if (confirmBtn) {
        confirmBtn.onclick = confirmBookingFromModal;
    }

    renderBookingCalendar();
    renderBookingSlotsForDay();
    modal.classList.add('show');
}

function renderBookingCalendar() {
    const calendar = document.getElementById('bookingCalendar');
    const monthLabel = document.getElementById('bookingMonthLabel');
    const invitation = invitations.find(function (item) { return item.invitationId === bookingCalendarView.invitationId; });

    if (!calendar || !monthLabel || !invitation) {
        return;
    }

    const monthStart = new Date(bookingCalendarView.year, bookingCalendarView.month, 1);
    const monthEnd = new Date(bookingCalendarView.year, bookingCalendarView.month + 1, 0);
    const daysInMonth = monthEnd.getDate();
    const firstWeekday = monthStart.getDay();

    monthLabel.textContent = monthStart.toLocaleString('en-AU', { month: 'long', year: 'numeric' });

    const availableSet = new Set(
        invitation.availableSlots
            .filter(function (slot) { return slot.available; })
            .map(function (slot) { return slot.date; })
    );

    const cells = [];
    const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdayLabels.forEach(function (label) {
        cells.push(`<div class="booking-weekday">${label}</div>`);
    });

    for (let i = 0; i < firstWeekday; i += 1) {
        cells.push('<div class="calendar-day placeholder"></div>');
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
        const iso = `${bookingCalendarView.year}-${String(bookingCalendarView.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const available = availableSet.has(iso);
        const selected = bookingCalendarView.selectedDay === iso;
        const classes = ['calendar-day'];
        if (available) {
            classes.push('available');
        } else {
            classes.push('unavailable');
        }
        if (selected) {
            classes.push('selected');
        }

        const clickAction = available ? `onclick="selectBookingDay('${iso}')"` : '';
        cells.push(`<button type="button" class="${classes.join(' ')}" ${clickAction}>${day}</button>`);
    }

    calendar.innerHTML = cells.join('');
}

function selectBookingDay(isoDate) {
    bookingCalendarView.selectedDay = isoDate;
    renderBookingCalendar();
    renderBookingSlotsForDay();
}

function renderBookingSlotsForDay() {
    const slotList = document.getElementById('bookingSlots');
    const invitation = invitations.find(function (item) { return item.invitationId === bookingCalendarView.invitationId; });

    if (!slotList || !invitation) {
        return;
    }

    if (!bookingCalendarView.selectedDay) {
        slotList.innerHTML = '<p class="muted-text">Select an available day to see available time slots.</p>';
        return;
    }

    const slots = invitation.availableSlots.filter(function (slot) {
        return slot.date === bookingCalendarView.selectedDay;
    });

    if (slots.length === 0) {
        slotList.innerHTML = '<p class="muted-text">No slots found for this day.</p>';
        return;
    }

    slotList.innerHTML = slots.map(function (slot) {
        const disabledText = slot.available ? '' : 'disabled';
        const availabilityClass = slot.available ? 'slot-btn available' : 'slot-btn unavailable';

        return `
            <button type="button" class="${availabilityClass}" data-date="${slot.date}" data-time="${slot.time}" ${disabledText}>
                ${slot.time} ${slot.available ? '(Available)' : '(Unavailable)'}
            </button>
        `;
    }).join('');

    slotList.querySelectorAll('.slot-btn.available').forEach(function (button) {
        button.addEventListener('click', function () {
            slotList.querySelectorAll('.slot-btn.available').forEach(function (item) { item.classList.remove('selected'); });
            button.classList.add('selected');
        });
    });
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('show');
    }

    activeInvitationId = '';
    bookingCalendarView = {
        invitationId: '',
        year: 0,
        month: 0,
        selectedDay: ''
    };
}

function confirmBookingFromModal() {
    if (!activeInvitationId) {
        return;
    }

    const invitation = invitations.find(function (item) { return item.invitationId === activeInvitationId; });
    const selectedSlot = document.querySelector('#bookingSlots .slot-btn.available.selected');

    if (!invitation || !selectedSlot) {
        alert('Please select one available slot to book.');
        return;
    }

    const date = selectedSlot.getAttribute('data-date') || '';
    const time = selectedSlot.getAttribute('data-time') || '';

    const newAppointment = {
        appointmentId: getNextAppointmentId(),
        enquiryId: invitation.enquiryId,
        dateTime: `${date} ${time}`,
        location: 'Student Services Hub - Consultation Room 4',
        status: 'Upcoming',
        studentID: invitation.studentID,
        staffID: `STF${randomBetween(110, 199)}`,
        staffName: invitation.staffName
    };

    appointments.push(newAppointment);
    persistAppointments();

    invitation.status = 'Booked';
    persistInvitations();

    const enquiry = enquiries.find(function (item) { return item.enquiryId === invitation.enquiryId; });
    if (enquiry) {
        enquiry.status = 'Appointment';
        enquiry.linkedAppointmentId = newAppointment.appointmentId;
        enquiry.assignedStaff = invitation.staffName;
        enquiry.response = enquiry.response || 'Appointment requested by staff. Please attend your booked timeslot.';
        persistEnquiries();
    }

    closeBookingModal();
    renderInvitationsTable();
    renderAppointmentsTables();
    alert('Appointment booked successfully.');
}

function initializeSettingsPage() {
    fillStudentProfile();
    bindSettingsActions();
}

function initializeFeedbackPage() {
    if (isManager()) {
        window.location.href = 'manager-dashboard.html';
        return;
    }

    renderFeedbackTable();
}

function initializeManagerStudentsPage() {
    if (!isManager()) {
        window.location.href = 'dashboard.html';
        return;
    }

    const searchInput = document.getElementById('studentSearchInput');
    const clearBtn = document.getElementById('studentSearchClear');
    const tableBody = document.getElementById('studentTableBody');
    const modal = document.getElementById('studentDetailModal');
    const closeBtn = document.getElementById('studentDetailClose');

    if (searchInput) {
        searchInput.addEventListener('input', renderManagerStudentTable);
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            if (searchInput) {
                searchInput.value = '';
            }
            renderManagerStudentTable();
            if (searchInput) {
                searchInput.focus();
            }
        });
    }

    if (tableBody) {
        tableBody.addEventListener('click', function (event) {
            const row = event.target.closest('tr[data-student-id]');
            if (!row) {
                return;
            }

            const studentId = row.getAttribute('data-student-id') || '';
            if (studentId) {
                openStudentDetailModal(studentId);
            }
        });
    }

    if (modal) {
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeStudentDetailModal();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeStudentDetailModal);
    }

    renderManagerStudentTable();
}

function renderManagerStudentTable() {
    const tableBody = document.getElementById('studentTableBody');
    const countEl = document.getElementById('studentResultCount');

    if (!tableBody) {
        return;
    }

    const keyword = (document.getElementById('studentSearchInput')?.value || '').trim().toLowerCase();

    const filtered = studentRecords.filter(function (student) {
        const studentId = String(student.studentID || '').toLowerCase();
        const studentName = String(student.studentName || '').toLowerCase();
        return !keyword || studentId.includes(keyword) || studentName.includes(keyword);
    }).sort(function (a, b) {
        return String(a.studentName || '').localeCompare(String(b.studentName || ''));
    });

    if (countEl) {
        countEl.textContent = `${filtered.length} student${filtered.length === 1 ? '' : 's'} found`;
    }

    if (filtered.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="empty-cell">No students match your search.</td></tr>';
        return;
    }

    tableBody.innerHTML = filtered.map(function (student) {
        return `
            <tr class="student-row" data-student-id="${student.studentID}">
                <td>${student.studentID}</td>
                <td>${escapeHtml(student.studentName)}</td>
                <td>${escapeHtml(student.Major || student.major || '-')}</td>
                <td>${student.DOB || student.dob || '-'}</td>
                <td>${escapeHtml(student.Email || student.email || '-')}</td>
                <td>${escapeHtml(student.Phone || student.phone || '-')}</td>
            </tr>
        `;
    }).join('');
}

function openStudentDetailModal(studentId) {
    const modal = document.getElementById('studentDetailModal');
    const body = document.getElementById('studentDetailBody');
    const title = document.getElementById('studentDetailName');

    if (!modal || !body || !title) {
        return;
    }

    const student = studentRecords.find(function (item) {
        return item.studentID === studentId;
    });

    if (!student) {
        return;
    }

    title.textContent = student.studentName;
    body.innerHTML = `
        <div class="detail-grid">
            <p><strong>Student ID:</strong> ${student.studentID}</p>
            <p><strong>Name:</strong> ${escapeHtml(student.studentName)}</p>
            <p><strong>Major:</strong> ${escapeHtml(student.Major || student.major || '-')}</p>
            <p><strong>DOB:</strong> ${student.DOB || student.dob || '-'}</p>
            <p><strong>Email:</strong> ${escapeHtml(student.Email || student.email || '-')}</p>
            <p><strong>Phone:</strong> ${escapeHtml(student.Phone || student.phone || '-')}</p>
        </div>
    `;

    modal.classList.add('show');
}

function closeStudentDetailModal() {
    const modal = document.getElementById('studentDetailModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function renderFeedbackTable() {
    const body = document.getElementById('feedbackTableBody');
    if (!body) {
        return;
    }

    const resolvedRows = getRoleScopedEnquiries()
        .filter(function (enquiry) { return enquiry.status === 'Resolved'; })
        .sort(function (a, b) {
            return new Date(b.resolvedAt || b.createdAt) - new Date(a.resolvedAt || a.createdAt);
        });

    if (resolvedRows.length === 0) {
        body.innerHTML = '<tr><td colspan="6" class="empty-cell">No resolved enquiries available for feedback.</td></tr>';
        return;
    }

    body.innerHTML = resolvedRows.map(function (enquiry) {
        const hasRating = typeof enquiry.feedbackRating === 'number' && enquiry.feedbackRating > 0;
        const ratingOptions = [1, 2, 3, 4, 5].map(function (rating) {
            const selected = enquiry.feedbackRating === rating ? 'selected' : '';
            return `<option value="${rating}" ${selected}>${rating} / 5</option>`;
        }).join('');

        const actionCell = hasRating
            ? `<span class="status-pill resolved">Feedback sent (${enquiry.feedbackRating}/5)</span>`
            : `
                <div class="feedback-action-wrap">
                    <select id="feedbackRating-${enquiry.enquiryId}" class="feedback-rating-select">
                        <option value="">Choose rating</option>
                        ${ratingOptions}
                    </select>
                    <button type="button" class="btn btn-primary btn-sm" onclick="sendFeedbackRating('${enquiry.enquiryId}')">Send Rating</button>
                </div>
            `;

        const status = hasRating
            ? `Sent ${enquiry.feedbackSentAt ? `on ${enquiry.feedbackSentAt}` : ''}`.trim()
            : 'Awaiting feedback';

        return `
            <tr>
                <td>${enquiry.enquiryId}</td>
                <td>${escapeHtml(truncateText(enquiry.details, 85))}</td>
                <td>${enquiry.resolvedAt || '-'}</td>
                <td>${enquiry.assignedStaff || '-'}</td>
                <td>${hasRating ? `${enquiry.feedbackRating}/5` : '-'}</td>
                <td>
                    ${actionCell}
                    <p class="feedback-status-text">${status}</p>
                </td>
            </tr>
        `;
    }).join('');
}

function sendFeedbackRating(enquiryId) {
    const enquiry = enquiries.find(function (item) { return item.enquiryId === enquiryId; });
    if (!enquiry || enquiry.status !== 'Resolved') {
        return;
    }

    const select = document.getElementById(`feedbackRating-${enquiryId}`);
    const rating = Number(select?.value || 0);
    if (!rating || rating < 1 || rating > 5) {
        alert('Please choose a rating from 1 to 5.');
        return;
    }

    enquiry.feedbackRating = rating;
    enquiry.feedbackSentAt = getTodayISO();
    persistEnquiries();
    renderFeedbackTable();
}

function fillStudentProfile() {
    const fallback = {
        studentID: DEFAULT_STUDENT.studentID,
        studentName: DEFAULT_STUDENT.studentName,
        email: DEFAULT_STUDENT.email,
        phone: DEFAULT_STUDENT.phone,
        major: DEFAULT_STUDENT.major
    };

    const profile = currentUser || fallback;

    const mappings = {
        profileName: profile.studentName,
        profileStudentId: profile.studentID || profile.managerID || '-',
        profileEmail: profile.email,
        profilePhone: profile.phone,
        profileMajor: profile.major || 'Operations'
    };

    Object.keys(mappings).forEach(function (id) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = mappings[id];
        }
    });

    const preferences = loadState(PREFERENCES_KEY, defaultPreferences);
    const emailCheckbox = document.getElementById('prefEmail');
    const pushCheckbox = document.getElementById('prefPush');
    const weeklyCheckbox = document.getElementById('prefWeekly');

    if (emailCheckbox) {
        emailCheckbox.checked = Boolean(preferences.emailNotifications);
    }

    if (pushCheckbox) {
        pushCheckbox.checked = Boolean(preferences.pushNotifications);
    }

    if (weeklyCheckbox) {
        weeklyCheckbox.checked = Boolean(preferences.weeklySummary);
    }
}

function bindSettingsActions() {
    const saveBtn = document.getElementById('saveSettingsBtn');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const signOutBtn = document.getElementById('signOutBtn');

    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            const nextPreferences = {
                emailNotifications: Boolean(document.getElementById('prefEmail')?.checked),
                pushNotifications: Boolean(document.getElementById('prefPush')?.checked),
                weeklySummary: Boolean(document.getElementById('prefWeekly')?.checked)
            };

            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(nextPreferences));
            alert('Settings updated.');
        });
    }

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function () {
            alert('Password change is a placeholder in this prototype.');
        });
    }

    if (signOutBtn) {
        signOutBtn.addEventListener('click', function () {
            logout();
        });
    }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function loadState(key, fallback) {
    const raw = localStorage.getItem(key);

    if (!raw) {
        const initial = structuredCloneSafe(fallback);
        localStorage.setItem(key, JSON.stringify(initial));
        return initial;
    }

    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(fallback) && Array.isArray(parsed)) {
            return parsed;
        }
        if (!Array.isArray(fallback) && parsed && typeof parsed === 'object') {
            return parsed;
        }
    } catch (error) {
        console.warn('Failed to parse state. Resetting key:', key, error);
    }

    const reset = structuredCloneSafe(fallback);
    localStorage.setItem(key, JSON.stringify(reset));
    return reset;
}

function persistEnquiries() {
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
}

function persistAppointments() {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

function persistInvitations() {
    localStorage.setItem(INVITATIONS_KEY, JSON.stringify(invitations));
}

function getNextEnquiryId() {
    const max = enquiries.reduce(function (acc, enquiry) {
        const numeric = Number(String(enquiry.enquiryId || '').replace('ENQ', ''));
        return Number.isNaN(numeric) ? acc : Math.max(acc, numeric);
    }, 0);

    return `ENQ${String(max + 1).padStart(3, '0')}`;
}

function getNextAppointmentId() {
    const max = appointments.reduce(function (acc, appointment) {
        const numeric = Number(String(appointment.appointmentId || '').replace('APT', ''));
        return Number.isNaN(numeric) ? acc : Math.max(acc, numeric);
    }, 0);

    return `APT${String(max + 1).padStart(3, '0')}`;
}

function getNextInvitationId() {
    const max = invitations.reduce(function (acc, invitation) {
        const numeric = Number(String(invitation.invitationId || '').replace('INV', ''));
        return Number.isNaN(numeric) ? acc : Math.max(acc, numeric);
    }, 0);

    return `INV${String(max + 1).padStart(3, '0')}`;
}

function getRandomCategory() {
    const index = Math.floor(Math.random() * ENQUIRY_CATEGORIES.length);
    return ENQUIRY_CATEGORIES[index];
}

function getRandomStaff() {
    return STAFF_MEMBERS[Math.floor(Math.random() * STAFF_MEMBERS.length)];
}

function getTodayISO() {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function addDaysISO(isoDate, days) {
    const date = new Date(`${isoDate}T00:00:00`);
    date.setDate(date.getDate() + days);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getUpcomingAppointments() {
    const now = new Date();
    return getRoleScopedAppointments()
        .filter(function (appointment) { return appointment.status === 'Upcoming'; })
        .sort(function (a, b) {
            return new Date(a.dateTime.replace(' ', 'T')) - new Date(b.dateTime.replace(' ', 'T'));
        })
        .filter(function (appointment) {
            return new Date(appointment.dateTime.replace(' ', 'T')) >= now;
        });
}

function getRoleScopedEnquiries() {
    if (isManager()) {
        return [...enquiries];
    }

    const studentId = getCurrentStudentId();
    return enquiries.filter(function (enquiry) {
        return enquiry.studentID === studentId;
    });
}

function getRoleScopedInvitations() {
    if (isManager()) {
        return [...invitations];
    }

    const studentId = getCurrentStudentId();
    return invitations.filter(function (invitation) {
        return invitation.studentID === studentId;
    });
}

function getRoleScopedAppointments() {
    if (isManager()) {
        return [...appointments];
    }

    const studentId = getCurrentStudentId();
    return appointments.filter(function (appointment) {
        return appointment.studentID === studentId;
    });
}

function getCurrentStudentId() {
    return currentUser?.studentID || DEFAULT_STUDENT.studentID;
}

function isManager() {
    return currentUser?.role === 'manager';
}

function buildDefaultSlots() {
    const baseDate = new Date();
    const slots = [];
    const times = ['10:00', '13:30', '15:00'];

    for (let dayOffset = 1; dayOffset <= 3; dayOffset += 1) {
        const date = new Date(baseDate);
        date.setDate(date.getDate() + dayOffset);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const iso = `${y}-${m}-${d}`;

        times.forEach(function (time, index) {
            slots.push({
                date: iso,
                time,
                available: index !== 1
            });
        });
    }

    return slots;
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function statusToClass(status) {
    const normalized = String(status || '').toLowerCase().replace(/\s+/g, '-');
    if (normalized === 'submitted') {
        return 'submitted';
    }
    if (normalized === 'resolving') {
        return 'resolving';
    }
    if (normalized === 'appointment') {
        return 'appointment';
    }
    if (normalized === 'resolved') {
        return 'resolved';
    }
    if (normalized === 'canceled') {
        return 'canceled';
    }
    return 'submitted';
}

function truncateText(text, max) {
    if (!text || text.length <= max) {
        return text;
    }

    return `${text.slice(0, max)}...`;
}

function showInlineError(errorElement, message) {
    if (!errorElement) {
        return;
    }

    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function structuredCloneSafe(value) {
    return JSON.parse(JSON.stringify(value));
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function decodeHtmlEntities(value) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = value;
    return textarea.value;
}

// Manager Dashboard Prototype Functions
let prototypeManagerStats = null;

function renderManagerDashboardPage() {
    const page = getCurrentPageName();
    if (page !== 'manager-dashboard') {
        return;
    }

    prototypeManagerStats = buildPrototypeManagerStats();
    bindDashboardActions();
    renderNotifications();
    renderEnquirySummary();
    renderStaffPerformance();
    bindStaffDetailModal();
}

function buildPrototypeManagerStats() {
    const fakeNames = [
        'Ava Morgan',
        'Noah Bennett',
        'Mia Chen',
        'Leo Harrison',
        'Sofia Patel',
        'Ethan Alvarez'
    ];

    const resolved = randomBetween(35, 90);
    const unresolved = randomBetween(6, 24);
    const pending = randomBetween(12, 40);

    const staff = fakeNames.map(function (name) {
        const completionPercentage = randomBetween(62, 98);
        const total = randomBetween(18, 55);
        const resolvedCount = Math.round(total * (completionPercentage / 100));
        const pendingCount = Math.max(total - resolvedCount, 0);
        const onTime = Math.min(resolvedCount, Math.round(resolvedCount * (randomBetween(70, 96) / 100)));

        return {
            name,
            completionPercentage,
            total,
            resolved: resolvedCount,
            pending: pendingCount,
            onTime
        };
    });

    return {
        summary: {
            resolved,
            pending,
            unresolved
        },
        staff
    };
}

function renderEnquirySummary() {
    const summaryContainer = document.getElementById('enquirySummary');
    if (!summaryContainer || !prototypeManagerStats) {
        return;
    }

    const summary = prototypeManagerStats.summary;

    summaryContainer.innerHTML = `
        <div class="summary-card resolved">
            <div class="summary-card-number">${summary.resolved}</div>
            <div class="summary-card-label">Resolved</div>
        </div>
        <div class="summary-card pending">
            <div class="summary-card-number">${summary.pending}</div>
            <div class="summary-card-label">Pending</div>
        </div>
        <div class="summary-card unresolved">
            <div class="summary-card-number">${summary.unresolved}</div>
            <div class="summary-card-label">Unresolved</div>
        </div>
    `;
}

function renderStaffPerformance() {
    const gridContainer = document.getElementById('staffPerformanceGrid');
    if (!gridContainer || !prototypeManagerStats) {
        return;
    }

    let html = '';
    prototypeManagerStats.staff.forEach(function (staff) {
        html += `
            <div class="staff-performance-card" data-staff-name="${escapeHtml(staff.name)}">
                <div class="staff-header">
                    <h3 class="staff-name">${escapeHtml(staff.name)}</h3>
                </div>
                <p class="performance-title">Completion Rate</p>
                <div class="performance-meter">
                    <div class="performance-bar" style="width: ${staff.completionPercentage}%"></div>
                </div>
                <div class="performance-stats">
                    <div class="stat-item">
                        <span class="stat-label">Resolved:</span>
                        <span class="stat-value">${staff.resolved}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Pending:</span>
                        <span class="stat-value">${staff.pending}</span>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary view-details-btn" onclick="openStaffDetailModal('${escapeHtml(staff.name)}')">View Details</button>
            </div>
        `;
    });

    gridContainer.innerHTML = html;
}

function calculateStaffPerformanceWithPercentage() {
    if (!prototypeManagerStats) {
        prototypeManagerStats = buildPrototypeManagerStats();
    }
    return prototypeManagerStats.staff;
}

function bindStaffDetailModal() {
    const modal = document.getElementById('staffDetailModal');
    const overlay = document.getElementById('staffDetailOverlay');
    const closeBtn = document.getElementById('staffDetailClose');

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.setAttribute('hidden', '');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            modal.setAttribute('hidden', '');
        });
    }
}

function openStaffDetailModal(staffName) {
    const modal = document.getElementById('staffDetailModal');
    const nameEl = document.getElementById('staffDetailName');
    const bodyEl = document.getElementById('staffDetailBody');

    if (!modal) {
        return;
    }

    const staffPerformance = calculateStaffPerformanceWithPercentage();
    const staff = staffPerformance.find(function (s) { return s.name === staffName; });

    if (!staff) {
        return;
    }

    nameEl.textContent = staff.name;
    
    bodyEl.innerHTML = `
        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Completion Rate:</span>
                <span class="detail-value">${staff.completionPercentage}%</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Total Enquiries:</span>
                <span class="detail-value">${staff.total}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Resolved:</span>
                <span class="detail-value">${staff.resolved}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Pending:</span>
                <span class="detail-value">${staff.pending}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">On-Time Resolutions:</span>
                <span class="detail-value">${staff.onTime}/${staff.resolved}</span>
            </div>
        </div>
    `;

    modal.removeAttribute('hidden');
}

window.openEnquiryDetail = openEnquiryDetail;
window.deleteEnquiry = deleteEnquiry;
window.goToAppointment = goToAppointment;
window.openBookingModal = openBookingModal;
window.selectBookingDay = selectBookingDay;
window.openAppointmentDetail = openAppointmentDetail;
window.openStaffKpiDetail = openStaffKpiDetail;
window.togglePastEnquirySelection = togglePastEnquirySelection;
window.sendFeedbackRating = sendFeedbackRating;
window.openStaffDetailModal = openStaffDetailModal;
window.renderManagerDashboardPage = renderManagerDashboardPage;
window.openStudentDetailModal = openStudentDetailModal;

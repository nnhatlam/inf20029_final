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
        assignedStaff: 'Ms. Rachel Nguyen'
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
        assignedStaff: 'Dr. Amit Sharma'
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
        assignedStaff: 'Ms. Chloe Tan'
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
        assignedStaff: 'Mr. Liam Patel'
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
        assignedStaff: 'Dr. Amit Sharma'
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
            { date: '2026-04-01', time: '10:00', available: true },
            { date: '2026-04-01', time: '13:30', available: false },
            { date: '2026-04-02', time: '11:00', available: true },
            { date: '2026-04-03', time: '09:30', available: false },
            { date: '2026-04-03', time: '14:00', available: true }
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
        enquiryId: '',
        dateTime: '2026-03-18 09:30',
        location: 'Online - Teams',
        status: 'Past',
        studentID: 'SWH01234',
        staffID: 'STF077',
        staffName: 'Dr. Amit Sharma'
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
let customNotifications = [];
let selectedDashboardCategory = '';
let activeInvitationId = '';

const modalState = {
    enquiryId: '',
    appointmentId: ''
};

document.addEventListener('DOMContentLoaded', async function () {
    await loadNotificationsConfig();

    if (document.getElementById('navbar-container')) {
        loadComponent('components/navbar.html', 'navbar-container');
    }

    if (document.getElementById('footer-container')) {
        loadComponent('components/footer.html', 'footer-container');
    }

    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['dashboard.html', 'enquiries.html', 'appointments.html', 'settings.html', 'manager-dashboard.html'];

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

    applyRoleVisibility();
    setupLogin();

    if (document.querySelector('.dashboard-section')) {
        if (isManager()) {
            renderManagerDashboardPage();
        } else {
            initializeDashboard();
        }
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
    renderDashboardEnquiriesTable();
    renderDashboardAppointmentCard();
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
        assignedStaff: getRandomStaff()
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
    document.querySelectorAll('.category-chip').forEach(function (chip) {
        chip.classList.remove('selected');
    });

    renderDashboardEnquiriesTable();
    renderNotifications();
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
    if (isManager() && !statusKeyword) {
        roleRows = roleRows.filter(function (enquiry) {
            return PENDING_ENQUIRY_STATES.includes(enquiry.status);
        });
    }

    const filtered = roleRows.filter(function (enquiry) {
        const matchDetails = !detailsKeyword || enquiry.details.toLowerCase().includes(detailsKeyword);
        const matchStatus = !statusKeyword || enquiry.status === statusKeyword;
        const matchDate = !dateKeyword || enquiry.createdAt === dateKeyword;
        return matchDetails && matchStatus && matchDate;
    }).sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="empty-cell">No enquiries match your filters.</td></tr>';
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
                <td>${escapeHtml(truncateText(enquiry.details, 80))}</td>
                <td>${enquiry.category}</td>
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
    renderInvitationsTable();
    renderAppointmentsTables();
    renderManagerRequestEnquiryOptions();
    maybeOpenAppointmentFromQuery();
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
    renderAppointmentTable('upcomingAppointmentBody', 'Upcoming', true);
    renderAppointmentTable('pastAppointmentBody', 'Past', false);
}

function renderAppointmentTable(containerId, status, withAction) {
    const body = document.getElementById(containerId);
    if (!body) {
        return;
    }

    const rows = getRoleScopedAppointments().filter(function (appointment) {
        return appointment.status === status;
    }).sort(function (a, b) {
        return new Date(a.dateTime.replace(' ', 'T')) - new Date(b.dateTime.replace(' ', 'T'));
    });

    if (rows.length === 0) {
        body.innerHTML = `<tr><td colspan="6" class="empty-cell">No ${status.toLowerCase()} appointments.</td></tr>`;
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
    const slotList = document.getElementById('bookingSlots');

    if (!invitation || !modal || !title || !slotList) {
        return;
    }

    activeInvitationId = invitationId;
    title.textContent = `Book with ${invitation.staffName}`;

    slotList.innerHTML = invitation.availableSlots.map(function (slot) {
        const disabledText = slot.available ? '' : 'disabled';
        const availabilityClass = slot.available ? 'slot-btn available' : 'slot-btn unavailable';
        const label = `${slot.date} ${slot.time}`;

        return `
            <button type="button" class="${availabilityClass}" data-date="${slot.date}" data-time="${slot.time}" ${disabledText}>
                ${label} ${slot.available ? '(Available)' : '(Unavailable)'}
            </button>
        `;
    }).join('');

    slotList.querySelectorAll('.slot-btn.available').forEach(function (button) {
        button.addEventListener('click', function () {
            slotList.querySelectorAll('.slot-btn.available').forEach(function (item) { item.classList.remove('selected'); });
            button.classList.add('selected');
        });
    });

    const confirmBtn = document.getElementById('confirmBookingBtn');
    if (confirmBtn) {
        confirmBtn.onclick = confirmBookingFromModal;
    }

    modal.classList.add('show');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('show');
    }

    activeInvitationId = '';
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
window.openAppointmentDetail = openAppointmentDetail;
window.openStaffKpiDetail = openStaffKpiDetail;
window.openStaffDetailModal = openStaffDetailModal;
window.renderManagerDashboardPage = renderManagerDashboardPage;

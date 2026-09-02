// ============================================================
// SAN AULLAH AI COMMAND CENTER
// MAIN JAVASCRIPT
// ============================================================


// ============================================================
// APPLICATION STATE
// ============================================================

const AppState = {

    currentPage: "dashboard",

    sidebarOpen: false,

    searchOpen: false,

    notificationOpen: false,

    userMenuOpen: false,

    addProjectOpen: false,

    isProcessing: false,

    projects: [],

    tasks: [],

    activity: []

};


// ============================================================
// DOM ELEMENTS
// ============================================================

const DOM = {};


// ============================================================
// APPLICATION INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    initializeDOM();

    initializeApplication();

});


// ============================================================
// INITIALIZE DOM
// ============================================================

function initializeDOM() {

    DOM.appLoader =
        document.getElementById("appLoader");

    DOM.app =
        document.getElementById("app");

    DOM.sidebar =
        document.getElementById("mainSidebar");

    DOM.sidebarOverlay =
        document.getElementById("sidebarOverlay");

    DOM.sidebarToggle =
        document.getElementById("sidebarToggle");

    DOM.sidebarClose =
        document.getElementById("sidebarClose");

    DOM.pageTitle =
        document.getElementById("pageTitle");

    DOM.commandInput =
        document.getElementById("commandInput");

    DOM.executeCommandButton =
        document.getElementById("executeCommandButton");

    DOM.clearCommandButton =
        document.getElementById("clearCommandButton");

    DOM.quickCommandButtons =
        document.getElementById("quickCommandButtons");

    DOM.globalSearchButton =
        document.getElementById("globalSearchButton");

    DOM.globalSearchInput =
        document.getElementById("globalSearchInput");

    DOM.searchModal =
        document.getElementById("searchModal");

    DOM.closeSearchModal =
        document.getElementById("closeSearchModal");

    DOM.searchResults =
        document.getElementById("searchResults");

    DOM.notificationButton =
        document.getElementById("notificationButton");

    DOM.notificationPanel =
        document.getElementById("notificationPanel");

    DOM.closeNotificationPanel =
        document.getElementById("closeNotificationPanel");

    DOM.userMenuButton =
        document.getElementById("userMenuButton");

    DOM.userMenu =
        document.getElementById("userMenu");

    DOM.profileMenuButton =
        document.getElementById("profileMenuButton");

    DOM.addProjectButton =
        document.getElementById("addProjectButton");

    DOM.addProjectModal =
        document.getElementById("addProjectModal");

    DOM.closeAddProjectModal =
        document.getElementById("closeAddProjectModal");

    DOM.cancelProjectButton =
        document.getElementById("cancelProjectButton");

    DOM.addProjectForm =
        document.getElementById("addProjectForm");

    DOM.projectsGrid =
        document.getElementById("projectsGrid");

    DOM.toastContainer =
        document.getElementById("toastContainer");

    DOM.logoutButton =
        document.getElementById("logoutButton");

    DOM.heroStartButton =
        document.getElementById("heroStartButton");

    DOM.heroProjectsButton =
        document.getElementById("heroProjectsButton");

}


// ============================================================
// APPLICATION START
// ============================================================

function initializeApplication() {

    initializeLoader();

    initializeNavigation();

    initializeSidebar();

    initializeCommandCenter();

    initializeQuickCommands();

    initializeSearch();

    initializeNotifications();

    initializeUserMenu();

    initializeProjectModal();

    initializeHeroActions();

    initializeGlobalButtons();

    initializeKeyboardShortcuts();

    initializeDefaultData();

}


// ============================================================
// APPLICATION LOADER
// ============================================================

function initializeLoader() {

    window.setTimeout(function () {

        if (DOM.appLoader) {

            DOM.appLoader.classList.add("hidden");

        }

    }, 900);

}


// ============================================================
// NAVIGATION
// ============================================================

function initializeNavigation() {

    const navigationLinks =
        document.querySelectorAll(".nav-item");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const page =
                link.getAttribute("data-page");

            if (!page) {
                return;
            }

            navigateToPage(page);

        });

    });


    const pageButtons =
        document.querySelectorAll("[data-page-target]");

    pageButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const page =
                button.getAttribute("data-page-target");

            if (!page) {
                return;
            }

            navigateToPage(page);

        });

    });

}


// ============================================================
// NAVIGATE TO PAGE
// ============================================================

function navigateToPage(pageName) {

    const targetPage =
        document.getElementById(pageName);

    if (!targetPage) {

        console.warn(
            "Page not found:",
            pageName
        );

        return;

    }


    AppState.currentPage =
        pageName;


    const pageSections =
        document.querySelectorAll(".page-section");

    pageSections.forEach(function (section) {

        section.classList.remove("active");

    });


    targetPage.classList.add("active");


    const navigationLinks =
        document.querySelectorAll(".nav-item");

    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("data-page") === pageName
        ) {

            link.classList.add("active");

        }

    });


    updatePageTitle(pageName);

    closeAllPanels();

    closeMobileSidebar();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ============================================================
// UPDATE PAGE TITLE
// ============================================================

function updatePageTitle(pageName) {

    const titles = {

        "dashboard":
            "Dashboard",

        "ai-assistant":
            "AI Assistant",

        "tasks":
            "My Tasks",

        "projects":
            "Projects",

        "coding-agent":
            "Coding Agent",

        "web-agent":
            "Web Agent",

        "social-media":
            "Social Media",

        "research-agent":
            "Research Agent",

        "ai-memory":
            "AI Memory",

        "integrations":
            "Integrations",

        "activity":
            "Activity",

        "settings":
            "Settings"

    };


    if (DOM.pageTitle) {

        DOM.pageTitle.textContent =
            titles[pageName] || "Dashboard";

    }

}


// ============================================================
// SIDEBAR
// ============================================================

function initializeSidebar() {

    if (DOM.sidebarToggle) {

        DOM.sidebarToggle.addEventListener(
            "click",
            openMobileSidebar
        );

    }


    if (DOM.sidebarClose) {

        DOM.sidebarClose.addEventListener(
            "click",
            closeMobileSidebar
        );

    }


    if (DOM.sidebarOverlay) {

        DOM.sidebarOverlay.addEventListener(
            "click",
            closeMobileSidebar
        );

    }

}


// ============================================================
// OPEN MOBILE SIDEBAR
// ============================================================

function openMobileSidebar() {

    if (!DOM.sidebar) {
        return;
    }

    DOM.sidebar.classList.add("mobile-open");

    if (DOM.sidebarOverlay) {

        DOM.sidebarOverlay.classList.add("active");

    }

    AppState.sidebarOpen = true;

}


// ============================================================
// CLOSE MOBILE SIDEBAR
// ============================================================

function closeMobileSidebar() {

    if (DOM.sidebar) {

        DOM.sidebar.classList.remove("mobile-open");

    }

    if (DOM.sidebarOverlay) {

        DOM.sidebarOverlay.classList.remove("active");

    }

    AppState.sidebarOpen = false;

}


// ============================================================
// COMMAND CENTER
// ============================================================

function initializeCommandCenter() {

    if (DOM.executeCommandButton) {

        DOM.executeCommandButton.addEventListener(
            "click",
            handleCommandExecution
        );

    }


    if (DOM.clearCommandButton) {

        DOM.clearCommandButton.addEventListener(
            "click",
            clearCommand
        );

    }


    if (DOM.commandInput) {

        DOM.commandInput.addEventListener(
            "keydown",
            handleCommandKeydown
        );

    }

}


// ============================================================
// COMMAND KEYBOARD HANDLER
// ============================================================

function handleCommandKeydown(event) {

    if (
        event.key === "Enter" &&
        (event.ctrlKey || event.metaKey)
    ) {

        event.preventDefault();

        handleCommandExecution();

    }

}


// ============================================================
// EXECUTE COMMAND
// ============================================================

function handleCommandExecution() {

    if (AppState.isProcessing) {

        showToast(
            "A command is already being processed.",
            "info"
        );

        return;

    }


    if (!DOM.commandInput) {
        return;
    }


    const command =
        DOM.commandInput.value.trim();


    if (!command) {

        showToast(
            "Please enter a command first.",
            "error"
        );

        DOM.commandInput.focus();

        return;

    }


    processCommand(command);

}


// ============================================================
// PROCESS COMMAND
// ============================================================

function processCommand(command) {

    AppState.isProcessing = true;

    setCommandButtonLoading(true);


    console.log(
        "AI Command Received:",
        command
    );


    addActivity(
        "AI Command",
        command,
        "ai"
    );


    showToast(
        "Command received. AI processing will be connected later.",
        "info"
    );


    window.setTimeout(function () {

        AppState.isProcessing = false;

        setCommandButtonLoading(false);


        showToast(
            "Command pipeline is ready for AI integration.",
            "success"
        );


    }, 1200);

}


// ============================================================
// COMMAND BUTTON LOADING
// ============================================================

function setCommandButtonLoading(isLoading) {

    if (!DOM.executeCommandButton) {
        return;
    }


    if (isLoading) {

        DOM.executeCommandButton.disabled =
            true;

        DOM.executeCommandButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Processing...';

    } else {

        DOM.executeCommandButton.disabled =
            false;

        DOM.executeCommandButton.innerHTML =
            '<i class="fas fa-paper-plane"></i> Execute Command';

    }

}


// ============================================================
// CLEAR COMMAND
// ============================================================

function clearCommand() {

    if (!DOM.commandInput) {
        return;
    }

    DOM.commandInput.value = "";

    DOM.commandInput.focus();

}


// ============================================================
// QUICK COMMANDS
// ============================================================

function initializeQuickCommands() {

    if (!DOM.quickCommandButtons) {
        return;
    }


    const buttons =
        DOM.quickCommandButtons.querySelectorAll(
            ".quick-command"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const command =
                    button.getAttribute(
                        "data-command"
                    );

                if (!command) {
                    return;
                }


                if (DOM.commandInput) {

                    DOM.commandInput.value =
                        command;

                    DOM.commandInput.focus();

                }

            }
        );

    });

}


// ============================================================
// SEARCH
// ============================================================

function initializeSearch() {

    if (DOM.globalSearchButton) {

        DOM.globalSearchButton.addEventListener(
            "click",
            openSearch
        );

    }


    if (DOM.closeSearchModal) {

        DOM.closeSearchModal.addEventListener(
            "click",
            closeSearch
        );

    }


    if (DOM.searchModal) {

        const overlay =
            DOM.searchModal.querySelector(
                ".modal-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeSearch
            );

        }

    }


    if (DOM.globalSearchInput) {

        DOM.globalSearchInput.addEventListener(
            "input",
            function () {

                performSearch(
                    DOM.globalSearchInput.value
                );

            }
        );

    }

}


// ============================================================
// OPEN SEARCH
// ============================================================

function openSearch() {

    closeNotificationPanel();

    closeUserMenu();

    if (!DOM.searchModal) {
        return;
    }


    DOM.searchModal.classList.add("active");

    DOM.searchModal.setAttribute(
        "aria-hidden",
        "false"
    );


    AppState.searchOpen = true;


    window.setTimeout(function () {

        if (DOM.globalSearchInput) {

            DOM.globalSearchInput.focus();

        }

    }, 100);

}


// ============================================================
// CLOSE SEARCH
// ============================================================

function closeSearch() {

    if (!DOM.searchModal) {
        return;
    }


    DOM.searchModal.classList.remove("active");

    DOM.searchModal.setAttribute(
        "aria-hidden",
        "true"
    );


    AppState.searchOpen = false;


    if (DOM.globalSearchInput) {

        DOM.globalSearchInput.value = "";

    }


    resetSearchResults();

}


// ============================================================
// SEARCH DATA
// ============================================================

function getSearchItems() {

    return [

        {
            title: "Dashboard",
            description: "Main AI Command Center dashboard.",
            page: "dashboard",
            icon: "fa-home"
        },

        {
            title: "AI Assistant",
            description: "Your AI assistant workspace.",
            page: "ai-assistant",
            icon: "fa-robot"
        },

        {
            title: "My Tasks",
            description: "Manage active and completed tasks.",
            page: "tasks",
            icon: "fa-list-check"
        },

        {
            title: "Projects",
            description: "Manage your projects.",
            page: "projects",
            icon: "fa-folder-open"
        },

        {
            title: "Coding Agent",
            description: "AI coding and development agent.",
            page: "coding-agent",
            icon: "fa-code"
        },

        {
            title: "Web Agent",
            description: "AI web development agent.",
            page: "web-agent",
            icon: "fa-globe"
        },

        {
            title: "Social Media",
            description: "AI social media workspace.",
            page: "social-media",
            icon: "fa-share-nodes"
        },

        {
            title: "Research Agent",
            description: "Research and analysis agent.",
            page: "research-agent",
            icon: "fa-magnifying-glass"
        },

        {
            title: "AI Memory",
            description: "AI memory and knowledge.",
            page: "ai-memory",
            icon: "fa-database"
        },

        {
            title: "Integrations",
            description: "External services and APIs.",
            page: "integrations",
            icon: "fa-plug"
        },

        {
            title: "Activity",
            description: "View recent activity.",
            page: "activity",
            icon: "fa-chart-line"
        },

        {
            title: "Settings",
            description: "Command Center settings.",
            page: "settings",
            icon: "fa-gear"
        }

    ];

}


// ============================================================
// PERFORM SEARCH
// ============================================================

function performSearch(query) {

    if (!DOM.searchResults) {
        return;
    }


    const searchText =
        query.trim().toLowerCase();


    if (!searchText) {

        resetSearchResults();

        return;

    }


    const items =
        getSearchItems();


    const results =
        items.filter(function (item) {

            return (
                item.title
                    .toLowerCase()
                    .includes(searchText) ||

                item.description
                    .toLowerCase()
                    .includes(searchText)
            );

        });


    renderSearchResults(results);

}


// ============================================================
// RENDER SEARCH RESULTS
// ============================================================

function renderSearchResults(results) {

    if (!DOM.searchResults) {
        return;
    }


    if (results.length === 0) {

        DOM.searchResults.innerHTML = `

            <div class="search-empty">

                <i class="fas fa-circle-question"></i>

                <p>No results found</p>

            </div>

        `;

        return;

    }


    DOM.searchResults.innerHTML =
        results.map(function (item) {

            return `

                <button
                    class="search-result-item"
                    type="button"
                    data-search-page="${item.page}"
                >

                    <span class="search-result-icon">

                        <i class="fas ${item.icon}"></i>

                    </span>

                    <span class="search-result-info">

                        <strong>
                            ${escapeHTML(item.title)}
                        </strong>

                        <small>
                            ${escapeHTML(item.description)}
                        </small>

                    </span>

                    <i class="fas fa-arrow-right"></i>

                </button>

            `;

        }).join("");


    const resultButtons =
        DOM.searchResults.querySelectorAll(
            "[data-search-page]"
        );


    resultButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const page =
                    button.getAttribute(
                        "data-search-page"
                    );

                closeSearch();

                navigateToPage(page);

            }
        );

    });

}


// ============================================================
// RESET SEARCH RESULTS
// ============================================================

function resetSearchResults() {

    if (!DOM.searchResults) {
        return;
    }


    DOM.searchResults.innerHTML = `

        <div class="search-empty">

            <i class="fas fa-search"></i>

            <p>Start typing to search</p>

        </div>

    `;

}


// ============================================================
// NOTIFICATIONS
// ============================================================

function initializeNotifications() {

    if (DOM.notificationButton) {

        DOM.notificationButton.addEventListener(
            "click",
            toggleNotificationPanel
        );

    }


    if (DOM.closeNotificationPanel) {

        DOM.closeNotificationPanel.addEventListener(
            "click",
            closeNotificationPanel
        );

    }


    document.addEventListener(
        "click",
        function (event) {

            if (
                DOM.notificationPanel &&
                DOM.notificationButton &&
                !DOM.notificationPanel.contains(event.target) &&
                !DOM.notificationButton.contains(event.target)
            ) {

                closeNotificationPanel();

            }

        }
    );

}


// ============================================================
// TOGGLE NOTIFICATION PANEL
// ============================================================

function toggleNotificationPanel(event) {

    if (event) {
        event.stopPropagation();
    }


    closeUserMenu();


    if (!DOM.notificationPanel) {
        return;
    }


    const isActive =
        DOM.notificationPanel.classList.contains(
            "active"
        );


    if (isActive) {

        closeNotificationPanel();

    } else {

        DOM.notificationPanel.classList.add(
            "active"
        );

        AppState.notificationOpen = true;

    }

}


// ============================================================
// CLOSE NOTIFICATION PANEL
// ============================================================

function closeNotificationPanel() {

    if (!DOM.notificationPanel) {
        return;
    }


    DOM.notificationPanel.classList.remove(
        "active"
    );


    AppState.notificationOpen = false;

}


// ============================================================
// USER MENU
// ============================================================

function initializeUserMenu() {

    if (DOM.userMenuButton) {

        DOM.userMenuButton.addEventListener(
            "click",
            toggleUserMenu
        );

    }


    if (DOM.profileMenuButton) {

        DOM.profileMenuButton.addEventListener(
            "click",
            toggleUserMenu
        );

    }


    if (DOM.logoutButton) {

        DOM.logoutButton.addEventListener(
            "click",
            handleLogout
        );

    }


    document.addEventListener(
        "click",
        function (event) {

            if (
                DOM.userMenu &&
                DOM.userMenuButton &&
                !DOM.userMenu.contains(event.target) &&
                !DOM.userMenuButton.contains(event.target) &&
                !(
                    DOM.profileMenuButton &&
                    DOM.profileMenuButton.contains(event.target)
                )
            ) {

                closeUserMenu();

            }

        }
    );

}


// ============================================================
// TOGGLE USER MENU
// ============================================================

function toggleUserMenu(event) {

    if (event) {
        event.stopPropagation();
    }


    closeNotificationPanel();


    if (!DOM.userMenu) {
        return;
    }


    const isActive =
        DOM.userMenu.classList.contains(
            "active"
        );


    if (isActive) {

        closeUserMenu();

    } else {

        DOM.userMenu.classList.add(
            "active"
        );

        AppState.userMenuOpen = true;

    }

}


// ============================================================
// CLOSE USER MENU
// ============================================================

function closeUserMenu() {

    if (!DOM.userMenu) {
        return;
    }


    DOM.userMenu.classList.remove(
        "active"
    );


    AppState.userMenuOpen = false;

}


// ============================================================
// LOGOUT
// ============================================================

function handleLogout() {

    closeUserMenu();


    const confirmed =
        window.confirm(
            "Are you sure you want to sign out?"
        );


    if (!confirmed) {
        return;
    }


    showToast(
        "Sign out system will be connected later.",
        "info"
    );

}


// ============================================================
// PROJECT MODAL
// ============================================================

function initializeProjectModal() {

    if (DOM.addProjectButton) {

        DOM.addProjectButton.addEventListener(
            "click",
            openProjectModal
        );

    }


    if (DOM.closeAddProjectModal) {

        DOM.closeAddProjectModal.addEventListener(
            "click",
            closeProjectModal
        );

    }


    if (DOM.cancelProjectButton) {

        DOM.cancelProjectButton.addEventListener(
            "click",
            closeProjectModal
        );

    }


    if (DOM.addProjectModal) {

        const overlay =
            DOM.addProjectModal.querySelector(
                ".modal-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeProjectModal
            );

        }

    }


    if (DOM.addProjectForm) {

        DOM.addProjectForm.addEventListener(
            "submit",
            handleProjectSubmit
        );

    }


    const addProjectCard =
        document.querySelector(
            ".add-project-content"
        );


    if (addProjectCard) {

        addProjectCard.addEventListener(
            "click",
            openProjectModal
        );

    }

}


// ============================================================
// OPEN PROJECT MODAL
// ============================================================

function openProjectModal() {

    closeAllPanels();


    if (!DOM.addProjectModal) {
        return;
    }


    DOM.addProjectModal.classList.add(
        "active"
    );


    DOM.addProjectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    AppState.addProjectOpen = true;


    const projectName =
        document.getElementById(
            "projectName"
        );


    if (projectName) {

        window.setTimeout(function () {

            projectName.focus();

        }, 100);

    }

}


// ============================================================
// CLOSE PROJECT MODAL
// ============================================================

function closeProjectModal() {

    if (!DOM.addProjectModal) {
        return;
    }


    DOM.addProjectModal.classList.remove(
        "active"
    );


    DOM.addProjectModal.setAttribute(
        "aria-hidden",
        "true"
    );


    AppState.addProjectOpen = false;

}


// ============================================================
// PROJECT FORM SUBMIT
// ============================================================

function handleProjectSubmit(event) {

    event.preventDefault();


    const projectName =
        document.getElementById(
            "projectName"
        );


    const projectDescription =
        document.getElementById(
            "projectDescription"
        );


    const projectType =
        document.getElementById(
            "projectType"
        );


    if (!projectName) {
        return;
    }


    const name =
        projectName.value.trim();


    if (!name) {

        showToast(
            "Please enter a project name.",
            "error"
        );

        projectName.focus();

        return;

    }


    const project = {

        id:
            "PROJECT_" +
            Date.now(),

        name:
            name,

        description:
            projectDescription
                ? projectDescription.value.trim()
                : "",

        type:
            projectType
                ? projectType.value
                : "general",

        createdAt:
            new Date().toISOString()

    };


    AppState.projects.push(project);


    console.log(
        "New Project:",
        project
    );


    closeProjectModal();


    if (DOM.addProjectForm) {

        DOM.addProjectForm.reset();

    }


    showToast(
        "Project created successfully.",
        "success"
    );


    addActivity(
        "Project Created",
        project.name,
        "project"
    );

}


// ============================================================
// HERO ACTIONS
// ============================================================

function initializeHeroActions() {

    if (DOM.heroStartButton) {

        DOM.heroStartButton.addEventListener(
            "click",
            function () {

                navigateToPage(
                    "dashboard"
                );


                if (DOM.commandInput) {

                    DOM.commandInput.focus();

                    DOM.commandInput.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            }
        );

    }


    if (DOM.heroProjectsButton) {

        DOM.heroProjectsButton.addEventListener(
            "click",
            function () {

                navigateToPage(
                    "projects"
                );

            }
        );

    }

}


// ============================================================
// GLOBAL BUTTONS
// ============================================================

function initializeGlobalButtons() {

    const projectMenuButtons =
        document.querySelectorAll(
            ".project-menu"
        );


    projectMenuButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                showToast(
                    "Project actions will be available later.",
                    "info"
                );

            }
        );

    });

}


// ============================================================
// DEFAULT DATA
// ============================================================

function initializeDefaultData() {

    AppState.tasks = [

        {
            id: "TASK_001",
            title: "Build AI Dashboard",
            agent: "Coding Agent",
            progress: 75,
            status: "active"
        },

        {
            id: "TASK_002",
            title: "Market Research",
            agent: "Research Agent",
            progress: 45,
            status: "active"
        },

        {
            id: "TASK_003",
            title: "Website Optimization",
            agent: "Web Agent",
            progress: 60,
            status: "active"
        }

    ];


    AppState.projects = [

        {
            id: "PROJECT_001",
            name: "Sanaullah AI Command Center",
            type: "coding"
        },

        {
            id: "PROJECT_002",
            name: "ScaleFlow University",
            type: "education"
        }

    ];


    AppState.activity = [];

}


// ============================================================
// ACTIVITY
// ============================================================

function addActivity(
    title,
    description,
    type
) {

    const activity = {

        id:
            "ACTIVITY_" +
            Date.now(),

        title:
            title,

        description:
            description,

        type:
            type || "info",

        timestamp:
            new Date()

    };


    AppState.activity.unshift(
        activity
    );


    if (
        AppState.activity.length > 20
    ) {

        AppState.activity =
            AppState.activity.slice(
                0,
                20
            );

    }


    console.log(
        "Activity:",
        activity
    );

}


// ============================================================
// CLOSE ALL PANELS
// ============================================================

function closeAllPanels() {

    closeNotificationPanel();

    closeUserMenu();

    closeSearch();

}


// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================

function initializeKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeSearch();

                closeProjectModal();

                closeNotificationPanel();

                closeUserMenu();

                closeMobileSidebar();

            }


            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openSearch();

            }

        }
    );

}


// ============================================================
// TOAST SYSTEM
// ============================================================

function showToast(
    message,
    type = "info"
) {

    if (!DOM.toastContainer) {
        return;
    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast " + type;


    let icon =
        "fa-circle-info";


    if (type === "success") {

        icon =
            "fa-circle-check";

    }


    if (type === "error") {

        icon =
            "fa-circle-exclamation";

    }


    toast.innerHTML = `

        <i class="fas ${icon}"></i>

        <span>
            ${escapeHTML(message)}
        </span>

    `;


    DOM.toastContainer.appendChild(
        toast
    );


    window.setTimeout(function () {

        toast.classList.add(
            "hide"
        );


        window.setTimeout(function () {

            if (toast.parentNode) {

                toast.parentNode.removeChild(
                    toast
                );

            }

        }, 300);

    }, 3500);

}


// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }


    const element =
        document.createElement(
            "div"
        );


    element.textContent =
        String(value);


    return element.innerHTML;

}


// ============================================================
// WINDOW RESIZE
// ============================================================

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 800 &&
            AppState.sidebarOpen
        ) {

            closeMobileSidebar();

        }

    }
);


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

window.addEventListener(
    "error",
    function (event) {

        console.error(
            "Application Error:",
            event.error || event.message
        );

    }
);


// ============================================================
// GLOBAL PROMISE ERROR HANDLER
// ============================================================

window.addEventListener(
    "unhandledrejection",
    function (event) {

        console.error(
            "Unhandled Promise Error:",
            event.reason
        );

    }
);


// ============================================================
// APPLICATION API
// ============================================================

window.SanaullahAI = {

    navigateToPage:
        navigateToPage,

    showToast:
        showToast,

    processCommand:
        processCommand,

    openSearch:
        openSearch,

    openProjectModal:
        openProjectModal,

    getState:
        function () {

            return AppState;

        }

};


// ============================================================
// JAVASCRIPT READY
// ============================================================

console.log(
    "Sanaullah AI Command Center JavaScript loaded successfully."
);

// ============================================================
// SANAULLAH AI COMMAND CENTER
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

    currentCommand: "",

    currentTask: null,

    projects: [],

    tasks: [],

    activity: []

};


// ============================================================
// DOM ELEMENTS
// ============================================================

const appLoader = document.getElementById("appLoader");
const app = document.getElementById("app");

const mainSidebar = document.getElementById("mainSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarClose = document.getElementById("sidebarClose");

const pageTitle = document.getElementById("pageTitle");

const commandInput = document.getElementById("commandInput");
const executeCommandButton = document.getElementById("executeCommandButton");
const clearCommandButton = document.getElementById("clearCommandButton");

const globalSearchButton = document.getElementById("globalSearchButton");
const globalSearchInput = document.getElementById("globalSearchInput");

const searchModal = document.getElementById("searchModal");
const closeSearchModal = document.getElementById("closeSearchModal");
const searchResults = document.getElementById("searchResults");

const notificationButton = document.getElementById("notificationButton");
const notificationPanel = document.getElementById("notificationPanel");
const closeNotificationPanel = document.getElementById("closeNotificationPanel");

const userMenuButton = document.getElementById("userMenuButton");
const userMenu = document.getElementById("userMenu");
const profileMenuButton = document.getElementById("profileMenuButton");

const addProjectButton = document.getElementById("addProjectButton");
const addProjectModal = document.getElementById("addProjectModal");
const closeAddProjectModal = document.getElementById("closeAddProjectModal");
const cancelProjectButton = document.getElementById("cancelProjectButton");
const addProjectForm = document.getElementById("addProjectForm");

const projectsGrid = document.getElementById("projectsGrid");

const toastContainer = document.getElementById("toastContainer");

const logoutButton = document.getElementById("logoutButton");

const heroStartButton = document.getElementById("heroStartButton");
const heroProjectsButton = document.getElementById("heroProjectsButton");


// ============================================================
// APPLICATION INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    initializeApplication();

});


function initializeApplication() {

    loadDefaultData();

    registerNavigation();

    registerSidebarEvents();

    registerCommandEvents();

    registerSearchEvents();

    registerNotificationEvents();

    registerUserMenuEvents();

    registerProjectEvents();

    registerHeroEvents();

    registerKeyboardEvents();

    renderProjects();

    hideLoader();

    console.log("Sanaullah AI Command Center initialized.");

}


// ============================================================
// LOADER
// ============================================================

function hideLoader() {

    setTimeout(function () {

        if (appLoader) {
            appLoader.classList.add("hidden");
        }

        if (app) {
            app.classList.add("ready");
        }

    }, 600);

}


// ============================================================
// NAVIGATION
// ============================================================

function registerNavigation() {

    const navigationItems = document.querySelectorAll(".nav-item");

    navigationItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

            event.preventDefault();

            const targetPage = item.getAttribute("data-page-target");

            if (!targetPage) {
                return;
            }

            navigateToPage(targetPage);

        });

    });


    const pageButtons = document.querySelectorAll("[data-page-target]");

    pageButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const targetPage = button.getAttribute("data-page-target");

            if (!targetPage) {
                return;
            }

            navigateToPage(targetPage);

        });

    });

}


function navigateToPage(pageName) {

    AppState.currentPage = pageName;

    const sections = document.querySelectorAll(".page-section");

    sections.forEach(function (section) {

        section.classList.remove("active");

    });


    const targetSection = document.getElementById(pageName);

    if (targetSection) {

        targetSection.classList.add("active");

    }


    const navigationItems = document.querySelectorAll(".nav-item");

    navigationItems.forEach(function (item) {

        item.classList.remove("active");

        const target = item.getAttribute("data-page-target");

        if (target === pageName) {

            item.classList.add("active");

        }

    });


    updatePageTitle(pageName);

    closeSidebar();

}


function updatePageTitle(pageName) {

    if (!pageTitle) {
        return;
    }


    const titles = {

        dashboard: "Dashboard",

        assistant: "AI Assistant",

        tasks: "My Tasks",

        projects: "Projects",

        coding: "Coding Agent",

        web: "Web Agent",

        social: "Social Media",

        research: "Research Agent",

        memory: "AI Memory",

        integrations: "Integrations",

        activity: "Activity",

        settings: "Settings"

    };


    pageTitle.textContent = titles[pageName] || "Dashboard";

}


// ============================================================
// SIDEBAR
// ============================================================

function registerSidebarEvents() {

    if (sidebarToggle) {

        sidebarToggle.addEventListener("click", function () {

            openSidebar();

        });

    }


    if (sidebarClose) {

        sidebarClose.addEventListener("click", function () {

            closeSidebar();

        });

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener("click", function () {

            closeSidebar();

        });

    }

}


function openSidebar() {

    AppState.sidebarOpen = true;

    if (mainSidebar) {
        mainSidebar.classList.add("open");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.add("active");
    }

}


function closeSidebar() {

    AppState.sidebarOpen = false;

    if (mainSidebar) {
        mainSidebar.classList.remove("open");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove("active");
    }

}


// ============================================================
// COMMAND CENTER
// ============================================================

function registerCommandEvents() {

    if (executeCommandButton) {

        executeCommandButton.addEventListener("click", function () {

            processUserCommand();

        });

    }


    if (clearCommandButton) {

        clearCommandButton.addEventListener("click", function () {

            clearCommand();

        });

    }


    if (commandInput) {

        commandInput.addEventListener("keydown", function (event) {

            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {

                event.preventDefault();

                processUserCommand();

            }

        });

    }


    const quickButtons = document.querySelectorAll(".quick-command");

    quickButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const command = button.getAttribute("data-command");

            if (!command || !commandInput) {
                return;
            }

            commandInput.value = command;

            commandInput.focus();

        });

    });

}


// ============================================================
// PROCESS USER COMMAND
// ============================================================

async function processUserCommand() {

    if (AppState.isProcessing) {
        return;
    }


    if (!commandInput) {
        return;
    }


    const command = commandInput.value.trim();


    if (!command) {

        showToast(
            "Please enter a command first.",
            "warning"
        );

        commandInput.focus();

        return;
    }


    AppState.isProcessing = true;

    AppState.currentCommand = command;


    setCommandProcessingState(true);


    try {

        const task = commandEngine(command);

        AppState.currentTask = task;

        showCommandResult(task);

        saveTask(task);

        addActivity(
            "Command processed",
            task.agent.name + " selected for task.",
            "command"
        );


        showToast(
            "Command understood and planned successfully.",
            "success"
        );


    } catch (error) {

        console.error("Command Engine Error:", error);

        showToast(
            "Command could not be processed.",
            "error"
        );

    }


    setCommandProcessingState(false);

}


// ============================================================
// COMMAND ENGINE
// ============================================================

function commandEngine(command) {

    const normalizedCommand = normalizeCommand(command);


    const understanding = understandTask(
        command,
        normalizedCommand
    );


    const plan = createTaskPlan(
        command,
        understanding
    );


    const agent = selectAgent(
        understanding
    );


    const execution = prepareExecution(
        command,
        understanding,
        plan,
        agent
    );


    const result = createCommandResult(
        command,
        understanding,
        plan,
        agent,
        execution
    );


    return result;

}


// ============================================================
// TASK UNDERSTANDING
// ============================================================

function understandTask(command, normalizedCommand) {

    let type = "general";
    let action = "assist";
    let priority = "normal";


    if (
        containsAny(normalizedCommand, [
            "website",
            "web site",
            "landing page",
            "webpage",
            "html",
            "frontend",
            "web app"
        ])
    ) {

        type = "website";

    }


    else if (
        containsAny(normalizedCommand, [
            "code",
            "coding",
            "javascript",
            "python",
            "google apps script",
            "script",
            "program"
        ])
    ) {

        type = "coding";

    }


    else if (
        containsAny(normalizedCommand, [
            "research",
            "research about",
            "find information",
            "search",
            "analyze",
            "market research"
        ])
    ) {

        type = "research";

    }


    else if (
        containsAny(normalizedCommand, [
            "social media",
            "facebook",
            "instagram",
            "linkedin",
            "twitter",
            "post",
            "social post",
            "caption"
        ])
    ) {

        type = "social";

    }


    if (
        containsAny(normalizedCommand, [
            "create",
            "build",
            "make",
            "develop",
            "generate",
            "write"
        ])
    ) {

        action = "create";

    }


    else if (
        containsAny(normalizedCommand, [
            "fix",
            "repair",
            "debug",
            "correct"
        ])
    ) {

        action = "fix";

    }


    else if (
        containsAny(normalizedCommand, [
            "analyze",
            "analyse",
            "check",
            "review"
        ])
    ) {

        action = "analyze";

    }


    else if (
        containsAny(normalizedCommand, [
            "search",
            "find",
            "look for"
        ])
    ) {

        action = "search";

    }


    if (
        containsAny(normalizedCommand, [
            "urgent",
            "asap",
            "immediately"
        ])
    ) {

        priority = "high";

    }


    return {

        originalCommand: command,

        type: type,

        action: action,

        priority: priority,

        understood: true,

        timestamp: new Date().toISOString()

    };

}


// ============================================================
// TASK PLANNING
// ============================================================

function createTaskPlan(command, understanding) {

    let steps = [];


    if (understanding.type === "website") {

        steps = [

            "Understand website requirements",

            "Define website structure",

            "Prepare page components",

            "Create frontend implementation",

            "Validate website structure",

            "Test final result"

        ];

    }


    else if (understanding.type === "coding") {

        steps = [

            "Understand coding requirements",

            "Analyze existing code",

            "Prepare implementation plan",

            "Write or modify code",

            "Check for errors",

            "Validate final code"

        ];

    }


    else if (understanding.type === "research") {

        steps = [

            "Understand research question",

            "Identify required information",

            "Collect relevant information",

            "Analyze findings",

            "Prepare structured result",

            "Validate findings"

        ];

    }


    else if (understanding.type === "social") {

        steps = [

            "Understand social media objective",

            "Identify platform requirements",

            "Prepare content",

            "Review content",

            "Prepare final result"

        ];

    }


    else {

        steps = [

            "Understand user request",

            "Determine required action",

            "Prepare task strategy",

            "Execute required work",

            "Validate result"

        ];

    }


    return {

        totalSteps: steps.length,

        completedSteps: 0,

        steps: steps,

        status: "planned"

    };

}


// ============================================================
// AGENT SELECTION
// ============================================================

function selectAgent(understanding) {

    let agent = {

        id: "general-agent",

        name: "General Assistant",

        type: "general",

        status: "ready"

    };


    if (understanding.type === "website") {

        agent = {

            id: "web-agent",

            name: "Web Agent",

            type: "web",

            status: "ready"

        };

    }


    else if (understanding.type === "coding") {

        agent = {

            id: "coding-agent",

            name: "Coding Agent",

            type: "coding",

            status: "ready"

        };

    }


    else if (understanding.type === "research") {

        agent = {

            id: "research-agent",

            name: "Research Agent",

            type: "research",

            status: "ready"

        };

    }


    else if (understanding.type === "social") {

        agent = {

            id: "social-agent",

            name: "Social Media Agent",

            type: "social",

            status: "ready"

        };

    }


    return agent;

}


// ============================================================
// EXECUTION PREPARATION
// ============================================================

function prepareExecution(
    command,
    understanding,
    plan,
    agent
) {

    return {

        status: "ready",

        mode: "simulation",

        agent: agent.id,

        message:
            "Execution engine is ready. Real tools will be connected in the next stage.",

        requiresApproval: checkApprovalRequired(
            understanding
        )

    };

}


// ============================================================
// APPROVAL CHECK
// ============================================================

function checkApprovalRequired(understanding) {

    const sensitiveActions = [

        "send",

        "delete",

        "publish",

        "payment",

        "purchase",

        "transfer",

        "remove"

    ];


    const actionText = understanding.originalCommand.toLowerCase();


    for (let i = 0; i < sensitiveActions.length; i++) {

        if (actionText.includes(sensitiveActions[i])) {

            return true;

        }

    }


    return false;

}


// ============================================================
// COMMAND RESULT
// ============================================================

function createCommandResult(
    command,
    understanding,
    plan,
    agent,
    execution
) {

    return {

        id: createID("TASK"),

        command: command,

        understanding: understanding,

        plan: plan,

        agent: agent,

        execution: execution,

        status: "ready",

        createdAt: new Date().toISOString()

    };

}


// ============================================================
// SHOW COMMAND RESULT
// ============================================================

function showCommandResult(task) {

    let resultBox = document.getElementById(
        "commandEngineResult"
    );


    if (!resultBox) {

        resultBox = document.createElement("div");

        resultBox.id = "commandEngineResult";

        resultBox.className = "command-engine-result";


        const commandArea =
            commandInput ?
            commandInput.closest(".command-center") :
            null;


        if (commandArea) {

            commandArea.appendChild(resultBox);

        } else if (commandInput) {

            commandInput.parentElement.appendChild(
                resultBox
            );

        }

    }


    resultBox.innerHTML = buildCommandResultHTML(task);

    resultBox.classList.add("visible");

}


// ============================================================
// BUILD COMMAND RESULT HTML
// ============================================================

function buildCommandResultHTML(task) {

    const understanding = task.understanding;

    const plan = task.plan;

    const agent = task.agent;

    const execution = task.execution;


    let stepsHTML = "";


    plan.steps.forEach(function (step, index) {

        stepsHTML += `
            <div class="command-step">
                <span class="step-number">${index + 1}</span>
                <span class="step-text">${escapeHTML(step)}</span>
            </div>
        `;

    });


    return `

        <div class="command-result-header">

            <div>

                <small>COMMAND ENGINE</small>

                <h3>Task Understood</h3>

            </div>

            <span class="command-status">
                READY
            </span>

        </div>


        <div class="command-result-command">

            <strong>Your Command</strong>

            <p>${escapeHTML(task.command)}</p>

        </div>


        <div class="command-result-grid">

            <div class="result-item">

                <small>Task Type</small>

                <strong>
                    ${escapeHTML(
                        formatTaskType(understanding.type)
                    )}
                </strong>

            </div>


            <div class="result-item">

                <small>Action</small>

                <strong>
                    ${escapeHTML(
                        formatTaskType(understanding.action)
                    )}
                </strong>

            </div>


            <div class="result-item">

                <small>Priority</small>

                <strong>
                    ${escapeHTML(
                        formatTaskType(understanding.priority)
                    )}
                </strong>

            </div>


            <div class="result-item">

                <small>Selected Agent</small>

                <strong>
                    ${escapeHTML(agent.name)}
                </strong>

            </div>

        </div>


        <div class="command-plan">

            <div class="command-plan-title">

                <strong>Task Plan</strong>

                <span>
                    ${plan.totalSteps} Steps
                </span>

            </div>


            <div class="command-steps">

                ${stepsHTML}

            </div>

        </div>


        <div class="command-execution">

            <strong>Execution Status</strong>

            <p>
                ${escapeHTML(execution.message)}
            </p>


            ${
                execution.requiresApproval
                ?
                `
                <div class="approval-warning">

                    Approval Required

                </div>
                `
                :
                `
                <div class="approval-ready">

                    No approval required for planning

                </div>
                `
            }

        </div>

    `;

}


// ============================================================
// TASK TYPE FORMATTER
// ============================================================

function formatTaskType(value) {

    if (!value) {
        return "";
    }


    return value
        .replace(/-/g, " ")
        .replace(/\b\w/g, function (letter) {

            return letter.toUpperCase();

        });

}


// ============================================================
// COMMAND PROCESSING STATE
// ============================================================

function setCommandProcessingState(isProcessing) {

    AppState.isProcessing = isProcessing;


    if (executeCommandButton) {

        executeCommandButton.disabled = isProcessing;


        if (isProcessing) {

            executeCommandButton.dataset.originalText =
                executeCommandButton.textContent;

            executeCommandButton.textContent =
                "Processing...";

        } else {

            executeCommandButton.textContent =
                executeCommandButton.dataset.originalText ||
                "Execute Command";

        }

    }


    if (commandInput) {

        commandInput.disabled = isProcessing;

    }

}


// ============================================================
// CLEAR COMMAND
// ============================================================

function clearCommand() {

    if (commandInput) {

        commandInput.value = "";

        commandInput.focus();

    }


    const resultBox = document.getElementById(
        "commandEngineResult"
    );


    if (resultBox) {

        resultBox.classList.remove("visible");

    }


    AppState.currentCommand = "";

    AppState.currentTask = null;

}


// ============================================================
// SEARCH
// ============================================================

function registerSearchEvents() {

    if (globalSearchButton) {

        globalSearchButton.addEventListener("click", function () {

            openSearchModal();

        });

    }


    if (closeSearchModal) {

        closeSearchModal.addEventListener("click", function () {

            closeSearch();

        });

    }


    if (globalSearchInput) {

        globalSearchInput.addEventListener("input", function () {

            performSearch(
                globalSearchInput.value.trim()
            );

        });

    }

}


function openSearchModal() {

    AppState.searchOpen = true;

    if (searchModal) {

        searchModal.classList.add("active");

    }


    if (globalSearchInput) {

        globalSearchInput.focus();

    }

}


function closeSearch() {

    AppState.searchOpen = false;

    if (searchModal) {

        searchModal.classList.remove("active");

    }

}


function performSearch(query) {

    if (!searchResults) {
        return;
    }


    if (!query) {

        searchResults.innerHTML = "";

        return;

    }


    const searchableItems = [

        {
            title: "Dashboard",
            page: "dashboard"
        },

        {
            title: "AI Assistant",
            page: "assistant"
        },

        {
            title: "My Tasks",
            page: "tasks"
        },

        {
            title: "Projects",
            page: "projects"
        },

        {
            title: "Coding Agent",
            page: "coding"
        },

        {
            title: "Web Agent",
            page: "web"
        },

        {
            title: "Social Media",
            page: "social"
        },

        {
            title: "Research Agent",
            page: "research"
        },

        {
            title: "AI Memory",
            page: "memory"
        },

        {
            title: "Integrations",
            page: "integrations"
        },

        {
            title: "Activity",
            page: "activity"
        },

        {
            title: "Settings",
            page: "settings"
        }

    ];


    const results = searchableItems.filter(function (item) {

        return item.title
            .toLowerCase()
            .includes(query.toLowerCase());

    });


    if (results.length === 0) {

        searchResults.innerHTML =
            "<p>No results found.</p>";

        return;

    }


    searchResults.innerHTML = results.map(function (item) {

        return `

            <button
                class="search-result-item"
                data-page-target="${item.page}"
            >

                ${escapeHTML(item.title)}

            </button>

        `;

    }).join("");


    const resultButtons =
        searchResults.querySelectorAll(
            "[data-page-target]"
        );


    resultButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            navigateToPage(
                button.getAttribute("data-page-target")
            );

            closeSearch();

        });

    });

}


// ============================================================
// NOTIFICATIONS
// ============================================================

function registerNotificationEvents() {

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleNotificationPanel();

            }
        );

    }


    if (closeNotificationPanel) {

        closeNotificationPanel.addEventListener(
            "click",
            function () {

                closeNotifications();

            }
        );

    }

}


function toggleNotificationPanel() {

    AppState.notificationOpen =
        !AppState.notificationOpen;


    if (notificationPanel) {

        notificationPanel.classList.toggle(
            "active",
            AppState.notificationOpen
        );

    }


    if (AppState.notificationOpen) {

        closeUserMenu();

    }

}


function closeNotifications() {

    AppState.notificationOpen = false;

    if (notificationPanel) {

        notificationPanel.classList.remove(
            "active"
        );

    }

}


// ============================================================
// USER MENU
// ============================================================

function registerUserMenuEvents() {

    if (userMenuButton) {

        userMenuButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleUserMenu();

            }
        );

    }


    if (profileMenuButton) {

        profileMenuButton.addEventListener(
            "click",
            function () {

                toggleUserMenu();

            }
        );

    }


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                logoutUser();

            }
        );

    }

}


function toggleUserMenu() {

    AppState.userMenuOpen =
        !AppState.userMenuOpen;


    if (userMenu) {

        userMenu.classList.toggle(
            "active",
            AppState.userMenuOpen
        );

    }


    if (AppState.userMenuOpen) {

        closeNotifications();

    }

}


function closeUserMenu() {

    AppState.userMenuOpen = false;

    if (userMenu) {

        userMenu.classList.remove("active");

    }

}


function logoutUser() {

    showToast(
        "Logout system will be connected later.",
        "info"
    );

}


// ============================================================
// PROJECT SYSTEM
// ============================================================

function registerProjectEvents() {

    if (addProjectButton) {

        addProjectButton.addEventListener(
            "click",
            function () {

                openProjectModal();

            }
        );

    }


    if (closeAddProjectModal) {

        closeAddProjectModal.addEventListener(
            "click",
            function () {

                closeProjectModal();

            }
        );

    }


    if (cancelProjectButton) {

        cancelProjectButton.addEventListener(
            "click",
            function () {

                closeProjectModal();

            }
        );

    }


    if (addProjectForm) {

        addProjectForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                createProject();

            }
        );

    }

}


function openProjectModal() {

    AppState.addProjectOpen = true;

    if (addProjectModal) {

        addProjectModal.classList.add("active");

    }

}


function closeProjectModal() {

    AppState.addProjectOpen = false;

    if (addProjectModal) {

        addProjectModal.classList.remove("active");

    }

}


function createProject() {

    if (!addProjectForm) {
        return;
    }


    const formData =
        new FormData(addProjectForm);


    const projectName =
        formData.get("projectName") ||
        formData.get("name");


    if (!projectName) {

        showToast(
            "Please enter a project name.",
            "warning"
        );

        return;

    }


    const project = {

        id: createID("PROJECT"),

        name: projectName,

        description:
            formData.get("description") ||
            "New AI Command Center project.",

        createdAt:
            new Date().toISOString()

    };


    AppState.projects.unshift(project);

    renderProjects();

    addActivity(
        "Project created",
        project.name + " was added.",
        "project"
    );


    addProjectForm.reset();

    closeProjectModal();


    showToast(
        "Project created successfully.",
        "success"
    );

}


// ============================================================
// RENDER PROJECTS
// ============================================================

function renderProjects() {

    if (!projectsGrid) {
        return;
    }


    if (AppState.projects.length === 0) {

        projectsGrid.innerHTML =
            "<p>No projects available.</p>";

        return;

    }


    projectsGrid.innerHTML =
        AppState.projects.map(function (project) {

            return `

                <div class="project-card">

                    <div class="project-card-icon">

                        <span>●</span>

                    </div>


                    <div class="project-card-content">

                        <h3>
                            ${escapeHTML(project.name)}
                        </h3>

                        <p>
                            ${escapeHTML(project.description)}
                        </p>

                    </div>

                </div>

            `;

        }).join("");

}


// ============================================================
// HERO BUTTONS
// ============================================================

function registerHeroEvents() {

    if (heroStartButton) {

        heroStartButton.addEventListener(
            "click",
            function () {

                if (commandInput) {

                    commandInput.focus();

                }

                showToast(
                    "Command Center is ready.",
                    "success"
                );

            }
        );

    }


    if (heroProjectsButton) {

        heroProjectsButton.addEventListener(
            "click",
            function () {

                navigateToPage("projects");

            }
        );

    }

}


// ============================================================
// DEFAULT DATA
// ============================================================

function loadDefaultData() {

    AppState.projects = [

        {

            id: "PROJECT_001",

            name: "Sanaullah AI Command Center",

            description:
                "Personal AI agent management system.",

            createdAt:
                new Date().toISOString()

        },


        {

            id: "PROJECT_002",

            name: "ScaleFlow University",

            description:
                "AI-powered learning management system.",

            createdAt:
                new Date().toISOString()

        }

    ];


    AppState.tasks = [

        {

            id: "TASK_001",

            name: "Build AI Dashboard",

            status: "active",

            progress: 75

        },


        {

            id: "TASK_002",

            name: "Market Research",

            status: "active",

            progress: 43

        },


        {

            id: "TASK_003",

            name: "Website Optimization",

            status: "active",

            progress: 62

        }

    ];


    AppState.activity = [];

}


// ============================================================
// TASK STORAGE
// ============================================================

function saveTask(task) {

    AppState.tasks.unshift({

        id: task.id,

        name: task.command,

        status: "ready",

        progress: 0,

        agent: task.agent.name,

        createdAt: task.createdAt

    });


    if (AppState.tasks.length > 50) {

        AppState.tasks =
            AppState.tasks.slice(0, 50);

    }

}


// ============================================================
// ACTIVITY LOG
// ============================================================

function addActivity(title, description, type) {

    const activity = {

        id: createID("ACTIVITY"),

        title: title,

        description: description,

        type: type || "system",

        timestamp:
            new Date().toISOString()

    };


    AppState.activity.unshift(activity);


    if (AppState.activity.length > 100) {

        AppState.activity =
            AppState.activity.slice(0, 100);

    }

}


// ============================================================
// KEYBOARD EVENTS
// ============================================================

function registerKeyboardEvents() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeAllPanels();

            }


            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openSearchModal();

            }

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                userMenu &&
                AppState.userMenuOpen &&
                !userMenu.contains(event.target) &&
                !userMenuButton?.contains(event.target)
            ) {

                closeUserMenu();

            }

        }
    );

}


// ============================================================
// CLOSE ALL PANELS
// ============================================================

function closeAllPanels() {

    closeSidebar();

    closeSearch();

    closeNotifications();

    closeUserMenu();

    closeProjectModal();

}


// ============================================================
// TOAST SYSTEM
// ============================================================

function showToast(message, type) {

    if (!toastContainer) {
        return;
    }


    const toast = document.createElement("div");

    toast.className =
        "toast toast-" +
        (type || "info");


    toast.innerHTML = `
        <span>
            ${escapeHTML(message)}
        </span>
    `;


    toastContainer.appendChild(toast);


    setTimeout(function () {

        toast.classList.add("show");

    }, 10);


    setTimeout(function () {

        toast.classList.remove("show");

        setTimeout(function () {

            toast.remove();

        }, 300);

    }, 3500);

}


// ============================================================
// COMMAND NORMALIZATION
// ============================================================

function normalizeCommand(command) {

    return command
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

}


// ============================================================
// KEYWORD CHECK
// ============================================================

function containsAny(text, keywords) {

    return keywords.some(function (keyword) {

        return text.includes(keyword);

    });

}


// ============================================================
// ID GENERATOR
// ============================================================

function createID(prefix) {

    return (
        prefix +
        "_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase()
    );

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// ============================================================
// WINDOW RESIZE
// ============================================================

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 900 &&
            AppState.sidebarOpen
        ) {

            closeSidebar();

        }

    }
);


// ============================================================
// ERROR HANDLING
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
// PUBLIC API
// ============================================================

window.SanaullahAI = {

    state: AppState,

    navigate: navigateToPage,

    executeCommand: processUserCommand,

    clearCommand: clearCommand,

    commandEngine: commandEngine,

    understandTask: understandTask,

    createTaskPlan: createTaskPlan,

    selectAgent: selectAgent,

    showToast: showToast,

    getCurrentTask: function () {

        return AppState.currentTask;

    },

    getTasks: function () {

        return AppState.tasks;

    },

    getProjects: function () {

        return AppState.projects;

    },

    getActivity: function () {

        return AppState.activity;

    }

};


// ============================================================
// COMMAND ENGINE READY
// ============================================================

console.log(
    "Command Engine loaded successfully."
);

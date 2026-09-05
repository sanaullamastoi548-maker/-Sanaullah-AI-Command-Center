// ============================================================
// SANAULLAH AI COMMAND CENTER
// TASK UNDERSTANDING ENGINE — PART 1
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
// DOM REFERENCES
// ============================================================

const DOM = {};


// ============================================================
// APPLICATION INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    initializeDOM();
    initializeDefaultData();
    initializeApplication();
    initializeEvents();

});


// ============================================================
// INITIALIZE DOM
// ============================================================

function initializeDOM() {

    DOM.appLoader = document.getElementById("appLoader");
    DOM.app = document.getElementById("app");

    DOM.mainSidebar = document.getElementById("mainSidebar");
    DOM.sidebarOverlay = document.getElementById("sidebarOverlay");

    DOM.sidebarToggle = document.getElementById("sidebarToggle");
    DOM.sidebarClose = document.getElementById("sidebarClose");

    DOM.pageTitle = document.getElementById("pageTitle");

    DOM.commandInput = document.getElementById("commandInput");
    DOM.executeCommandButton = document.getElementById("executeCommandButton");
    DOM.clearCommandButton = document.getElementById("clearCommandButton");

    DOM.quickCommandButtons = document.querySelectorAll(
        ".quick-command, [data-command]"
    );

    DOM.globalSearchButton = document.getElementById("globalSearchButton");
    DOM.globalSearchInput = document.getElementById("globalSearchInput");

    DOM.searchModal = document.getElementById("searchModal");
    DOM.closeSearchModal = document.getElementById("closeSearchModal");
    DOM.searchResults = document.getElementById("searchResults");

    DOM.notificationButton = document.getElementById("notificationButton");
    DOM.notificationPanel = document.getElementById("notificationPanel");
    DOM.closeNotificationPanel = document.getElementById(
        "closeNotificationPanel"
    );

    DOM.userMenuButton = document.getElementById("userMenuButton");
    DOM.userMenu = document.getElementById("userMenu");
    DOM.profileMenuButton = document.getElementById("profileMenuButton");

    DOM.addProjectButton = document.getElementById("addProjectButton");
    DOM.addProjectModal = document.getElementById("addProjectModal");
    DOM.closeAddProjectModal = document.getElementById(
        "closeAddProjectModal"
    );
    DOM.cancelProjectButton = document.getElementById(
        "cancelProjectButton"
    );
    DOM.addProjectForm = document.getElementById("addProjectForm");

    DOM.projectsGrid = document.getElementById("projectsGrid");

    DOM.toastContainer = document.getElementById("toastContainer");

    DOM.logoutButton = document.getElementById("logoutButton");

    DOM.heroStartButton = document.getElementById("heroStartButton");
    DOM.heroProjectsButton = document.getElementById("heroProjectsButton");

}


// ============================================================
// APPLICATION START
// ============================================================

function initializeApplication() {

    setTimeout(function () {

        if (DOM.appLoader) {
            DOM.appLoader.classList.add("hidden");
        }

        if (DOM.app) {
            DOM.app.classList.add("ready");
        }

    }, 700);

    renderProjects();
    renderTasks();

}


// ============================================================
// EVENT INITIALIZATION
// ============================================================

function initializeEvents() {

    initializeNavigation();
    initializeSidebar();
    initializeCommandCenter();
    initializeSearch();
    initializeNotifications();
    initializeUserMenu();
    initializeProjects();
    initializeHeroActions();
    initializeKeyboardShortcuts();

}


// ============================================================
// NAVIGATION
// ============================================================

function initializeNavigation() {

    const navItems = document.querySelectorAll(
        ".nav-item, [data-page-target]"
    );

    navItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

            event.preventDefault();

            const targetPage =
                item.dataset.pageTarget ||
                item.getAttribute("href")?.replace("#", "");

            if (!targetPage) {
                return;
            }

            navigateToPage(targetPage);

        });

    });

}


// ============================================================
// NAVIGATE TO PAGE
// ============================================================

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

    updatePageTitle(pageName);
    closeAllPanels();

}


// ============================================================
// UPDATE PAGE TITLE
// ============================================================

function updatePageTitle(pageName) {

    if (!DOM.pageTitle) {
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

    DOM.pageTitle.textContent =
        titles[pageName] || "Sanaullah AI Command Center";

}


// ============================================================
// SIDEBAR
// ============================================================

function initializeSidebar() {

    if (DOM.sidebarToggle) {

        DOM.sidebarToggle.addEventListener("click", function () {
            openSidebar();
        });

    }

    if (DOM.sidebarClose) {

        DOM.sidebarClose.addEventListener("click", function () {
            closeSidebar();
        });

    }

    if (DOM.sidebarOverlay) {

        DOM.sidebarOverlay.addEventListener("click", function () {
            closeSidebar();
        });

    }

}


// ============================================================
// OPEN SIDEBAR
// ============================================================

function openSidebar() {

    AppState.sidebarOpen = true;

    if (DOM.mainSidebar) {
        DOM.mainSidebar.classList.add("open");
    }

    if (DOM.sidebarOverlay) {
        DOM.sidebarOverlay.classList.add("active");
    }

}


// ============================================================
// CLOSE SIDEBAR
// ============================================================

function closeSidebar() {

    AppState.sidebarOpen = false;

    if (DOM.mainSidebar) {
        DOM.mainSidebar.classList.remove("open");
    }

    if (DOM.sidebarOverlay) {
        DOM.sidebarOverlay.classList.remove("active");
    }

}


// ============================================================
// COMMAND CENTER
// ============================================================

function initializeCommandCenter() {

    if (DOM.executeCommandButton) {

        DOM.executeCommandButton.addEventListener(
            "click",
            processUserCommand
        );

    }

    if (DOM.clearCommandButton) {

        DOM.clearCommandButton.addEventListener("click", function () {

            if (DOM.commandInput) {
                DOM.commandInput.value = "";
                DOM.commandInput.focus();
            }

        });

    }

    if (DOM.commandInput) {

        DOM.commandInput.addEventListener("keydown", function (event) {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key === "Enter"
            ) {

                event.preventDefault();
                processUserCommand();

            }

        });

    }

    DOM.quickCommandButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const command =
                button.dataset.command ||
                button.textContent.trim();

            if (DOM.commandInput) {
                DOM.commandInput.value = command;
                DOM.commandInput.focus();
            }

        });

    });

}


// ============================================================
// PROCESS USER COMMAND
// ============================================================

function processUserCommand() {

    if (!DOM.commandInput) {
        return;
    }

    const command = DOM.commandInput.value.trim();

    if (!command) {

        showToast(
            "Please enter a command.",
            "warning"
        );

        return;
    }

    if (AppState.isProcessing) {
        return;
    }

    AppState.isProcessing = true;

    showToast(
        "Understanding your command...",
        "info"
    );

    setTimeout(function () {

        try {

            const result = commandEngine(command);

            showCommandResult(result);
            saveTask(result);
            addActivity(result);

        } catch (error) {

            console.error(
                "Command processing error:",
                error
            );

            showToast(
                "Unable to process command.",
                "error"
            );

        } finally {

            AppState.isProcessing = false;

        }

    }, 300);

}


// ============================================================
// COMMAND ENGINE
// ============================================================

function commandEngine(command) {

    const understanding =
        taskUnderstandingEngine(command);

    const taskPlan =
        createTaskPlan(
            understanding.taskType,
            understanding.action
        );

    const agent =
        selectAgent(
            understanding.taskType
        );

    const execution =
        prepareExecution(
            understanding
        );

    return createCommandResult(
        command,
        understanding,
        taskPlan,
        agent,
        execution
    );

}


// ============================================================
// TASK UNDERSTANDING ENGINE
// PART 1
// ============================================================

function taskUnderstandingEngine(command) {

    const normalizedCommand =
        normalizeCommand(command);

    const taskType =
        detectTaskType(normalizedCommand);

    const action =
        detectAction(normalizedCommand);

    const priority =
        detectPriority(normalizedCommand);

    const requirements =
        extractRequirements(
            command,
            taskType
        );

    const entities =
        extractBasicEntities(command);

    return {

        originalCommand: command,

        normalizedCommand: normalizedCommand,

        taskType: taskType,

        action: action,

        priority: priority,

        requirements: requirements,

        entities: entities,

        understandingVersion: "1.0",

        engine: "Task Understanding Engine"

    };

}


// ============================================================
// NORMALIZE COMMAND
// ============================================================

function normalizeCommand(command) {

    return command
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

}


// ============================================================
// DETECT TASK TYPE
// ============================================================

function detectTaskType(command) {

    const websiteKeywords = [
        "website",
        "web site",
        "webpage",
        "landing page",
        "html",
        "css",
        "frontend",
        "web app"
    ];

    const codingKeywords = [
        "code",
        "coding",
        "script",
        "javascript",
        "python",
        "google apps script",
        "api",
        "function",
        "program"
    ];

    const researchKeywords = [
        "research",
        "analyze",
        "analysis",
        "study",
        "investigate",
        "find information",
        "research trends"
    ];

    const socialKeywords = [
        "instagram",
        "facebook",
        "linkedin",
        "social media",
        "post",
        "caption",
        "reel",
        "social"
    ];

    if (containsKeyword(command, websiteKeywords)) {
        return "Website";
    }

    if (containsKeyword(command, codingKeywords)) {
        return "Coding";
    }

    if (containsKeyword(command, researchKeywords)) {
        return "Research";
    }

    if (containsKeyword(command, socialKeywords)) {
        return "Social";
    }

    return "General";

}


// ============================================================
// DETECT ACTION
// ============================================================

function detectAction(command) {

    const createKeywords = [
        "create",
        "build",
        "make",
        "develop",
        "write",
        "generate",
        "design"
    ];

    const fixKeywords = [
        "fix",
        "repair",
        "debug",
        "solve",
        "correct"
    ];

    const searchKeywords = [
        "search",
        "find",
        "research",
        "look up",
        "investigate"
    ];

    const analyzeKeywords = [
        "analyze",
        "analyse",
        "review",
        "check",
        "evaluate"
    ];

    if (containsKeyword(command, fixKeywords)) {
        return "Fix";
    }

    if (containsKeyword(command, searchKeywords)) {
        return "Search";
    }

    if (containsKeyword(command, analyzeKeywords)) {
        return "Analyze";
    }

    if (containsKeyword(command, createKeywords)) {
        return "Create";
    }

    return "Understand";

}


// ============================================================
// DETECT PRIORITY
// ============================================================

function detectPriority(command) {

    const urgentKeywords = [
        "urgent",
        "urgently",
        "asap",
        "immediately",
        "emergency",
        "high priority"
    ];

    if (containsKeyword(command, urgentKeywords)) {
        return "High";
    }

    return "Normal";

}


// ============================================================
// EXTRACT REQUIREMENTS
// ============================================================

function extractRequirements(command, taskType) {

    const requirements = [];

    const lowerCommand =
        command.toLowerCase();

    if (
        lowerCommand.includes("home page") ||
        lowerCommand.includes("homepage") ||
        lowerCommand.includes("home")
    ) {
        requirements.push("Home page");
    }

    if (
        lowerCommand.includes("about page") ||
        lowerCommand.includes("about")
    ) {
        requirements.push("About page");
    }

    if (
        lowerCommand.includes("services page") ||
        lowerCommand.includes("services")
    ) {
        requirements.push("Services page");
    }

    if (
        lowerCommand.includes("contact page") ||
        lowerCommand.includes("contact")
    ) {
        requirements.push("Contact page");
    }

    if (
        lowerCommand.includes("modern")
    ) {
        requirements.push("Modern design");
    }

    if (
        lowerCommand.includes("professional")
    ) {
        requirements.push("Professional design");
    }

    if (
        lowerCommand.includes("responsive")
    ) {
        requirements.push("Responsive design");
    }

    if (
        lowerCommand.includes("mobile")
    ) {
        requirements.push("Mobile support");
    }

    if (
        lowerCommand.includes("email automation")
    ) {
        requirements.push("Email automation");
    }

    if (
        lowerCommand.includes("google apps script")
    ) {
        requirements.push("Google Apps Script");
    }

    if (
        lowerCommand.includes("instagram")
    ) {
        requirements.push("Instagram");
    }

    if (
        lowerCommand.includes("facebook")
    ) {
        requirements.push("Facebook");
    }

    if (
        lowerCommand.includes("linkedin")
    ) {
        requirements.push("LinkedIn");
    }

    return uniqueArray(requirements);

}


// ============================================================
// EXTRACT BASIC ENTITIES
// ============================================================

function extractBasicEntities(command) {

    const entities = [];

    const platforms = [
        "Instagram",
        "Facebook",
        "LinkedIn",
        "Google",
        "GitHub",
        "WhatsApp",
        "Telegram"
    ];

    platforms.forEach(function (platform) {

        if (
            command
                .toLowerCase()
                .includes(platform.toLowerCase())
        ) {

            entities.push(platform);

        }

    });

    return uniqueArray(entities);

}


// ============================================================
// KEYWORD CHECK
// ============================================================

function containsKeyword(command, keywords) {

    return keywords.some(function (keyword) {

        return command.includes(
            keyword.toLowerCase()
        );

    });

}


// ============================================================
// UNIQUE ARRAY
// ============================================================

function uniqueArray(items) {

    return [...new Set(items)];

}


// ============================================================
// CREATE TASK PLAN
// ============================================================

function createTaskPlan(taskType, action) {

    if (taskType === "Website") {

        return [
            "Understand website requirements",
            "Define website structure",
            "Select Web Agent",
            "Prepare website implementation",
            "Test website",
            "Prepare final result"
        ];

    }

    if (taskType === "Coding") {

        return [
            "Understand coding requirements",
            "Define technical solution",
            "Select Coding Agent",
            "Prepare code",
            "Test and validate code",
            "Prepare final result"
        ];

    }

    if (taskType === "Research") {

        return [
            "Understand research question",
            "Define research scope",
            "Select Research Agent",
            "Collect relevant information",
            "Analyze findings",
            "Prepare research result"
        ];

    }

    if (taskType === "Social") {

        return [
            "Understand social media objective",
            "Identify platform and audience",
            "Select Social Media Agent",
            "Prepare content",
            "Review content"
        ];

    }

    return [
        "Understand user request",
        "Define required actions",
        "Select suitable agent",
        "Prepare execution",
        "Validate result",
        "Return final result"
    ];

}


// ============================================================
// SELECT AGENT
// ============================================================

function selectAgent(taskType) {

    if (taskType === "Website") {
        return "Web Agent";
    }

    if (taskType === "Coding") {
        return "Coding Agent";
    }

    if (taskType === "Research") {
        return "Research Agent";
    }

    if (taskType === "Social") {
        return "Social Media Agent";
    }

    return "General Assistant";

}


// ============================================================
// PREPARE EXECUTION
// ============================================================

function prepareExecution(understanding) {

    const approval =
        checkApprovalRequired(
            understanding.originalCommand
        );

    return {

        mode: "simulation",

        status: "READY",

        approvalRequired: approval.required,

        approvalReason: approval.reason,

        message:
            "Execution engine ready. Real tools will be connected in a later stage."

    };

}


// ============================================================
// CHECK APPROVAL
// ============================================================

function checkApprovalRequired(command) {

    const sensitiveKeywords = [
        "send",
        "delete",
        "publish",
        "payment",
        "purchase",
        "transfer",
        "remove"
    ];

    const normalizedCommand =
        normalizeCommand(command);

    const requiresApproval =
        containsKeyword(
            normalizedCommand,
            sensitiveKeywords
        );

    if (requiresApproval) {

        return {

            required: true,

            reason:
                "This action may affect an external system or irreversible data."

        };

    }

    return {

        required: false,

        reason: "No approval required for planning."

    };

}


// ============================================================
// CREATE COMMAND RESULT
// ============================================================

function createCommandResult(
    command,
    understanding,
    taskPlan,
    agent,
    execution
) {

    return {

        success: true,

        command: command,

        taskType: understanding.taskType,

        action: understanding.action,

        priority: understanding.priority,

        requirements: understanding.requirements,

        entities: understanding.entities,

        normalizedCommand:
            understanding.normalizedCommand,

        selectedAgent: agent,

        plan: taskPlan,

        execution: execution,

        timestamp:
            new Date().toISOString()

    };

}


// ============================================================
// SHOW COMMAND RESULT
// ============================================================

function showCommandResult(result) {

    let container =
        document.getElementById(
            "commandResult"
        );

    if (!container) {

        container =
            document.createElement("div");

        container.id = "commandResult";
        container.className = "command-result";

        if (DOM.commandInput) {

            DOM.commandInput
                .parentElement
                .appendChild(container);

        }

    }

    container.innerHTML =
        buildCommandResultHTML(result);

    container.classList.add("active");

}


// ============================================================
// BUILD COMMAND RESULT HTML
// ============================================================

function buildCommandResultHTML(result) {

    const requirements =
        result.requirements.length
            ? result.requirements
                .map(function (item) {
                    return "<li>" +
                        escapeHTML(item) +
                        "</li>";
                })
                .join("")
            : "<li>No specific requirements detected.</li>";

    const entities =
        result.entities.length
            ? result.entities
                .map(function (item) {
                    return "<li>" +
                        escapeHTML(item) +
                        "</li>";
                })
                .join("")
            : "<li>No specific entities detected.</li>";

    const plan =
    result.plan
        .map(function (step) {

            return "<li>" +
                escapeHTML(
                    step.replace(
                        /^\d+\.\s*/,
                        ""
                    )
                ) +
                "</li>";

        })
        .join("");

    return `

        <div class="command-result-header">

            <div>
                <strong>Task Understanding Complete</strong>
            </div>

            <div class="result-status">
                READY
            </div>

        </div>

        <div class="command-result-grid">

            <div>
                <strong>Task Type</strong>
                <span>${escapeHTML(result.taskType)}</span>
            </div>

            <div>
                <strong>Action</strong>
                <span>${escapeHTML(result.action)}</span>
            </div>

            <div>
                <strong>Priority</strong>
                <span>${escapeHTML(result.priority)}</span>
            </div>

            <div>
                <strong>Selected Agent</strong>
                <span>${escapeHTML(result.selectedAgent)}</span>
            </div>

        </div>

        <div class="command-result-section">

            <strong>Requirements</strong>

            <ul>
                ${requirements}
            </ul>

        </div>

        <div class="command-result-section">

            <strong>Entities</strong>

            <ul>
                ${entities}
            </ul>

        </div>

        <div class="command-result-section">

            <strong>Task Plan</strong>

            <ol>
                ${plan}
            </ol>

        </div>

        <div class="command-result-footer">

            <strong>Execution:</strong>

            ${escapeHTML(
                result.execution.message
            )}

            <br>

            <strong>Approval:</strong>

            ${
                result.execution.approvalRequired
                    ? "Required"
                    : "Not Required"
            }

        </div>

    `;

}


// ============================================================
// SAVE TASK
// ============================================================

function saveTask(result) {

    const task = {

        id:
            "TASK-" +
            Date.now(),

        command: result.command,

        type: result.taskType,

        action: result.action,

        priority: result.priority,

        agent: result.selectedAgent,

        status: "Ready",

        createdAt:
            result.timestamp

    };

    AppState.tasks.unshift(task);

    renderTasks();

}


// ============================================================
// RENDER TASKS
// ============================================================

function renderTasks() {

    const taskContainers =
        document.querySelectorAll(
            "[data-task-list]"
        );

    taskContainers.forEach(function (container) {

        container.innerHTML =
            AppState.tasks
                .slice(0, 5)
                .map(function (task) {

                    return `

                        <div class="task-item">

                            <strong>
                                ${escapeHTML(task.command)}
                            </strong>

                            <span>
                                ${escapeHTML(task.agent)}
                            </span>

                        </div>

                    `;

                })
                .join("");

    });

}


// ============================================================
// ACTIVITY LOG
// ============================================================

function addActivity(result) {

    const activity = {

        id:
            "ACT-" +
            Date.now(),

        message:
            "Command understood as " +
            result.taskType +
            " task.",

        timestamp:
            result.timestamp

    };

    AppState.activity.unshift(activity);

}


// ============================================================
// PROJECTS
// ============================================================

function initializeProjects() {

    if (DOM.addProjectButton) {

        DOM.addProjectButton.addEventListener(
            "click",
            openAddProjectModal
        );

    }

    if (DOM.closeAddProjectModal) {

        DOM.closeAddProjectModal.addEventListener(
            "click",
            closeAddProjectModal
        );

    }

    if (DOM.cancelProjectButton) {

        DOM.cancelProjectButton.addEventListener(
            "click",
            closeAddProjectModal
        );

    }

    if (DOM.addProjectForm) {

        DOM.addProjectForm.addEventListener(
            "submit",
            createProject
        );

    }

}


// ============================================================
// OPEN PROJECT MODAL
// ============================================================

function openAddProjectModal() {

    AppState.addProjectOpen = true;

    if (DOM.addProjectModal) {
        DOM.addProjectModal.classList.add("active");
    }

}


// ============================================================
// CLOSE PROJECT MODAL
// ============================================================

function closeAddProjectModal() {

    AppState.addProjectOpen = false;

    if (DOM.addProjectModal) {
        DOM.addProjectModal.classList.remove("active");
    }

}


// ============================================================
// CREATE PROJECT
// ============================================================

function createProject(event) {

    event.preventDefault();

    if (!DOM.addProjectForm) {
        return;
    }

    const formData =
        new FormData(DOM.addProjectForm);

    const name =
        formData.get("projectName") ||
        formData.get("name");

    if (!name) {

        showToast(
            "Project name is required.",
            "warning"
        );

        return;

    }

    AppState.projects.push({

        id:
            "PROJECT-" +
            Date.now(),

        name:
            name,

        status:
            "Active",

        createdAt:
            new Date().toISOString()

    });

    renderProjects();

    closeAddProjectModal();

    DOM.addProjectForm.reset();

    showToast(
        "Project created successfully.",
        "success"
    );

}


// ============================================================
// RENDER PROJECTS
// ============================================================

function renderProjects() {

    if (!DOM.projectsGrid) {
        return;
    }

    if (!AppState.projects.length) {
        return;
    }

    DOM.projectsGrid.innerHTML =
        AppState.projects
            .map(function (project) {

                return `

                    <div class="project-card">

                        <h3>
                            ${escapeHTML(project.name)}
                        </h3>

                        <span>
                            ${escapeHTML(project.status)}
                        </span>

                    </div>

                `;

            })
            .join("");

}


// ============================================================
// DEFAULT DATA
// ============================================================

function initializeDefaultData() {

    AppState.projects = [

        {
            id: "PROJECT-001",
            name: "Sanaullah AI Command Center",
            status: "Active",
            createdAt:
                new Date().toISOString()
        }

    ];

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

    if (DOM.globalSearchInput) {

        DOM.globalSearchInput.addEventListener(
            "input",
            performSearch
        );

    }

}


// ============================================================
// OPEN SEARCH
// ============================================================

function openSearch() {

    AppState.searchOpen = true;

    if (DOM.searchModal) {
        DOM.searchModal.classList.add("active");
    }

    if (DOM.globalSearchInput) {
        DOM.globalSearchInput.focus();
    }

}


// ============================================================
// CLOSE SEARCH
// ============================================================

function closeSearch() {

    AppState.searchOpen = false;

    if (DOM.searchModal) {
        DOM.searchModal.classList.remove("active");
    }

}


// ============================================================
// PERFORM SEARCH
// ============================================================

function performSearch() {

    if (!DOM.globalSearchInput) {
        return;
    }

    const query =
        DOM.globalSearchInput.value
            .trim()
            .toLowerCase();

    if (!DOM.searchResults) {
        return;
    }

    if (!query) {

        DOM.searchResults.innerHTML =
            "<p>Start typing to search.</p>";

        return;

    }

    const results = [

        "Dashboard",
        "AI Assistant",
        "My Tasks",
        "Projects",
        "Coding Agent",
        "Web Agent",
        "Social Media",
        "Research Agent",
        "AI Memory",
        "Integrations",
        "Activity",
        "Settings"

    ].filter(function (item) {

        return item
            .toLowerCase()
            .includes(query);

    });

    DOM.searchResults.innerHTML =
        results.length
            ? results
                .map(function (item) {

                    return `
                        <div class="search-result-item">
                            ${escapeHTML(item)}
                        </div>
                    `;

                })
                .join("")
            : "<p>No results found.</p>";

}


// ============================================================
// NOTIFICATIONS
// ============================================================

function initializeNotifications() {

    if (DOM.notificationButton) {

        DOM.notificationButton.addEventListener(
            "click",
            function () {

                AppState.notificationOpen =
                    !AppState.notificationOpen;

                if (DOM.notificationPanel) {

                    DOM.notificationPanel.classList.toggle(
                        "active",
                        AppState.notificationOpen
                    );

                }

            }
        );

    }

    if (DOM.closeNotificationPanel) {

        DOM.closeNotificationPanel.addEventListener(
            "click",
            function () {

                AppState.notificationOpen = false;

                DOM.notificationPanel.classList.remove(
                    "active"
                );

            }
        );

    }

}


// ============================================================
// USER MENU
// ============================================================

function initializeUserMenu() {

    if (DOM.userMenuButton) {

        DOM.userMenuButton.addEventListener(
            "click",
            function () {

                AppState.userMenuOpen =
                    !AppState.userMenuOpen;

                if (DOM.userMenu) {

                    DOM.userMenu.classList.toggle(
                        "active",
                        AppState.userMenuOpen
                    );

                }

            }
        );

    }

    if (DOM.profileMenuButton) {

        DOM.profileMenuButton.addEventListener(
            "click",
            function () {
                showToast(
                    "Profile section is ready for the next stage.",
                    "info"
                );
            }
        );

    }

    if (DOM.logoutButton) {

        DOM.logoutButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Logout system will be connected later.",
                    "info"
                );

            }
        );

    }

}


// ============================================================
// HERO ACTIONS
// ============================================================

function initializeHeroActions() {

    if (DOM.heroStartButton) {

        DOM.heroStartButton.addEventListener(
            "click",
            function () {

                navigateToPage("assistant");

                if (DOM.commandInput) {
                    DOM.commandInput.focus();
                }

            }
        );

    }

    if (DOM.heroProjectsButton) {

        DOM.heroProjectsButton.addEventListener(
            "click",
            function () {

                navigateToPage("projects");

            }
        );

    }

}


// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================

function initializeKeyboardShortcuts() {

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

                openSearch();

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
    closeAddProjectModal();

    AppState.notificationOpen = false;
    AppState.userMenuOpen = false;

    if (DOM.notificationPanel) {
        DOM.notificationPanel.classList.remove("active");
    }

    if (DOM.userMenu) {
        DOM.userMenu.classList.remove("active");
    }

}


// ============================================================
// TOAST SYSTEM
// ============================================================

function showToast(message, type) {

    if (!DOM.toastContainer) {
        return;
    }

    const toast =
        document.createElement("div");

    toast.className =
        "toast toast-" +
        (type || "info");

    toast.textContent = message;

    DOM.toastContainer.appendChild(toast);

    setTimeout(function () {

        toast.classList.add("hide");

        setTimeout(function () {

            toast.remove();

        }, 300);

    }, 3000);

}


// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHTML(value) {

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
// GLOBAL ERROR HANDLER
// ============================================================

window.addEventListener(
    "error",
    function (event) {

        console.error(
            "Application error:",
            event.error || event.message
        );

    }
);


// ============================================================
// PUBLIC API
// ============================================================

window.SanaullahAI = {

    version: "1.0.0",

    commandEngine:
        commandEngine,

    taskUnderstandingEngine:
        taskUnderstandingEngine,

    understandTask:
        taskUnderstandingEngine,

    navigateToPage:
        navigateToPage,

    getState:
        function () {
            return AppState;
        }

};


// ============================================================
// SYSTEM READY
// ============================================================

console.log(
    "Sanaullah AI Command Center — Task Understanding Engine Part 1 Ready"
);

console.log(
    "Command Engine + Task Understanding Engine initialized."
);

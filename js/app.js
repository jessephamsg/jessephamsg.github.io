//=============================
//DATA TO CONSTRUCT PAGE HTML
//=============================


class bodyElement {
    constructor(elementTagName, elementParentIdentifier, elementClass) {
        this.elementTagName = elementTagName;
        this.elementParentIdentifier = elementParentIdentifier;
        this.elementClass = elementClass;
    }
};

//TOP SECTION includes: Nav Bar, Logo and Page Title
let topSection = new bodyElement('div', 'container', 'top-section');
let navLogo = new bodyElement('div', 'top-section', 'nav-logo');
let navTitle = new bodyElement('h1', 'top-section', 'nav-title');
let navBar = new bodyElement('div', 'top-section', 'nav-bar');

//PROFILE SECTION is on the leftmost. This contains: Work Profile & other Stats
let bottomSection = new bodyElement('div', 'container', 'bottom-section');
let leftSection = new bodyElement('div', 'bottom-section', 'left-section');
let addJobButton = new bodyElement('button', 'left-section', 'add-job');

//CANVAS MIDDLE SECTION contains: Canvas for charting & several other stats
let middleSection = new bodyElement('div', 'bottom-section', 'middle-section');

//FORM RIGHT SECTION contains: Form fields relating to Work & Work Experience Descriptions
let rightSection = new bodyElement('div', 'bottom-section', 'right-section');
//Form Header
let formHeader = new bodyElement('div', 'right-section', 'form-header');
//Form Body Work Section
let formBody = new bodyElement('div', 'right-section', 'form-body');
let formLeft = new bodyElement('div', 'form-body', 'form-left');
let workTitle = new bodyElement('input', 'form-left', 'work-title');
let workDuration = new bodyElement('input', 'form-left', 'work-duration');
let teamSize = new bodyElement('input', 'form-left', 'team-size');
let workNatureInput = new bodyElement('select', 'form-left', 'work-nature-input');
let workIndustryInput = new bodyElement('select', 'form-left', 'work-industry-input');
//Form Body Task Section
let formRight = new bodyElement('div', 'form-body', 'form-right');
//Form Footer
let formFooter = new bodyElement('div', 'right-section', 'form-footer');

//MODAL TASK SECTION contains Form fields regarding Tasks & their Descriptions. One Work can have many Tasks.
let modalSection = new bodyElement('div', 'container', 'modal');
let modalContent = new bodyElement('div', 'modal', 'modal-content');
let taskTitle = new bodyElement('input', 'modal-content', 'task-title');
let taskEnjoyment = new bodyElement('input', 'modal-content', 'task-enjoyment');
let taskDescription = new bodyElement('input', 'modal-content', 'task-description');
let taskNature = new bodyElement('select', 'modal-content', 'task-nature');

//WELCOME MODAL SECTION
let welcomeModalWrapper = new bodyElement('div', 'container', 'modal-welcome');
let welcomeModalMainBody = new bodyElement('div', 'modal-welcome', 'modal-welcome-body');
let welcomeModalHead = new bodyElement('div', 'modal-welcome-body', 'modal-welcome-head');
let welcomeModalFooter = new bodyElement('div', 'modal-welcome-body', 'modal-welcome-footer');

const pageConstruct = {
    main: { topSection, bottomSection, modalSection },
    topSection: { navLogo, navTitle, navBar },
    bottomSection: { leftSection, middleSection, rightSection },
    modalSection: { modalContent },
    leftSection: { addJobButton },
    rightSection: { formHeader, formBody, formFooter },
    formBody: { formLeft, formRight },
};

const formStructure = {
    formRight: {
        parent: {
            formRight
        }
    },
    formLeft: {
        parent: {
            formLeft
        },
        inputChildren: { workTitle, workDuration, teamSize },
        selectChildren: { workNatureInput, workIndustryInput }
    },
    modalFields: {
        inputChildren: { taskTitle, taskDescription },
        selectChildren: { taskEnjoyment, taskNature }
    }
};

const instructions = {
    profilePage: {
        generalGuide: {
            pageTitle: 'UNIK',
            taskSectionTitle: 'Describe Your Task',
            profileSectionTitle: 'BATTLES YOU FOUGHT',
            formSectionTitle: 'PROFILE YOUR SUPERPOWERS',
            navTitleLineOne: 'READY',
            navTitleLineTwo: 'PLAYER ONE'
        },
        profileFieldLabel: {
            workTitle: 'Work Title',
            workDuration: 'Work Duration',
            teamSize: 'Team Size',
            workNature: 'Work Nature',
            workIndustry: 'Work Industry',
        },
        buttonText: {
            addJob: 'Add Job',
            saveJob: 'Save As New Job',
            addTask: '+',
            saveTask: 'Save Task',
            closeModal: 'Close',
            saveEdits: 'Save Edits'
        }
    },
    modalPage: {
        generalGuide: 'Add Experience',
        fieldLabel: {
            taskTitle: 'Your Task',
            taskDescription: 'Description'
        },
        dropdownLabel: {
            taskType: 'Task Nature',
            feelingDescription: 'Your Enjoyment',
        }
    },
    tooltip: {
        workDuration: 'This is the number of YEARS you work for a certain job. Only integer input accepted',
        teamSize: 'Team refers to those working closely with you (i.e. not company size unless you work closely with the whole company!)',
        taskEnjoyment: 'This is for you to indicate how much you enjoy doing a specific task: 1 is the lowest level of enjoyment, 5 is the highest',
        taskNature: `Create: tasks categorised as Create involve establishing something new (e.g. Setting, Establishing) \nOrganise: tasks that involve managing the existing processes (e.g. Manage, Run) \nInfluence: tasks that involve changing a stakeholder's point of view (e.g. Leading, Selling, Initiating) \nResearch: tasks that involve analysis of the existing situation (e.g. analyse, research etc)`
    },
    welcomeMsg: {
        header: 'ABOUT UNIK',
        paragraphOne: 'Unik is a Skill Profiler platform. Simply put in your work (and hobbies too!) details, and get an overview of where you are in your work and life experience - things that spark joy, tasks you do, and how they contribute to your job match.\nAnd what if you don\'t like your match and prefer charting a path of your own based on your own interests? Explore learning experience out there from within the Unik platform. Basically, have fun, stay foolish, and be authentically you! \nBefore you start, note the following details for best experience with the platform',
        paragraphTwo: 'DISPLAY: the platform on Google Chrome. No Safari please!',
        paragraphThree: 'DISPLAY: on full Desktop screen',
        paragraphFour: 'INSTALL: Moesif CORS Plugin',
        paragraphFive: 'REZIZE: the browser to smaller size, when the chart suddenly disppears. The chart feature is not stable yet so this is a quick fix!',
        paragraphSix: 'You\'re now ready!',
    }
};

const imageAssets = {

}


//=============================
//DATA TO RELATED TO WORK
//=============================


const formIds = {
    workIds: ['#work-title', '#work-duration', '#team-size', '#work-nature-input', '#work-industry-input'],
    taskIds: ['#task-title', '#task-enjoyment', '#task-description', '#task-nature'],
    workKeys: ['workTitle', 'workDuration', 'teamSize', 'workNature', 'industry'],
    taskKeys: ['taskTitle', 'taskEnjoyment', 'taskDescription', 'taskNature'],
}

let workIndustryOptions = [];

const workNatureOptions = ['Voluntary', 'Full-time', 'Part-time', 'Freelance'];

const taskNatureOptions = ['Create', 'Organise', 'Influence', 'Research'];

const taskEnjoymentOptions = ['1', '2', '3', '4', '5'];

class Work {
    constructor(workTitle, workDuration, teamSize, workNature, industry, taskTitle, taskEnjoyment, taskDescription, taskNature) {
        this.workTitle = workTitle;
        this.workDuration = workDuration;
        this.teamSize = teamSize;
        this.workNature = workNature;
        this.industry = industry;
        this.taskTitle = taskTitle;
        this.taskEnjoyment = taskEnjoyment;
        this.taskDescription = taskDescription;
        this.taskNature = taskNature;
    }
}

const workProfile = [new Work('', '', '', '', '', [], [], [], [])];

const profileInstance = {
    taskNature: {},
};

const errorMessage = {
    workTitle: 'Numbers not allowed',
    workDuration: 'Letters and space not allowed',
    teamSize: 'Letters and space not allowed',
    form: 'Empty field detected. Make sure this field is filled'
}

let buttonText = instructions.profilePage.buttonText;


//=========================================
//DATA TO CONSTRUCT 'GAIN EXPERIENCE' MODAL
//=========================================


class Point {
    constructor(createPoint, organisePoint, influencePoint, researchPoint) {
        this.createPoint = createPoint;
        this.organisePoint = organisePoint;
        this.influencePoint = influencePoint;
        this.researchPoint = researchPoint;
    }
}

const links = {
    taskTitle: ['Challenge 1', 'Challenge 2', 'Challenge 3', 'Challenge 4', 'Challenge 5', 'Challenge 6'],
    taskNature: [
        new Point(12, 24, 10, 5),
        new Point(10, 12, 13, 25),
        new Point(20, 11, 2, 26),
        new Point(12, 24, 10, 5),
        new Point(10, 12, 13, 25),
        new Point(20, 11, 2, 26),
    ],
    taskContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

let expModalButton = new bodyElement('div', 'middle-section', 'explore-opportunities');
let expModalWrapper = new bodyElement('div', 'container', 'modal-exp');
let expModalMainBody = new bodyElement('div', 'modal-exp', 'modal-exp-body');
let expModalHead = new bodyElement('div', 'modal-exp-body', 'modal-exp-head');
let expModalFooter = new bodyElement('div', 'modal-exp-body', 'modal-footer');

const expModalElements = { expModalButton, expModalWrapper, expModalMainBody, expModalHead, expModalFooter };

const expInstructions = {
    modalHead: 'Gain Experience',
    modalButton: 'Close',
}


//==========================
//DATA TO GENERATE STATS
//==========================


const radarChartData = {
    data: [],
    options: [],
}

const statsComponentIds = {
    teamSizeStats: { parent: 'average-team-size', child: 'size-stats' },
    enjoymentStats: { parent: 'average-enjoyment', child: 'best-task' },
    taskNatureStats: { parent: 'myChart', child: 'chart-label' },
    industryStats: { parent: 'industrial-experience' }
}

const componentLabels = {
    teamSizeStats: 'Average Team Size',
    enjoymentStats: 'Average Enjoyment',
    bestTask: 'Task Most Enjoyed',
    taskNatureLabelLineOne: 'YOUR SKILL MAP',
    taskNatureLabelLineTwo: 'BY TASK NATURE',
}



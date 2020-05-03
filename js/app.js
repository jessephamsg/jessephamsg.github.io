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
        taskNature: `Create: tasks categorised as Create involve establishing something new \nOrganise: tasks that involve \nInfluence: \nResearch:`
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
//BUILD PAGE MAIN FUNCTION
//=============================


const buildPage = () => {
    pageBuilder.buildMainFrame();
    pageBuilder.buildNavContent();
    pageBuilder.buildProfileContent();
    pageBuilder.buildFormContent();
    pageBuilder.buildModalContent();
    pageBuilder.buildTooltip();
}


//=============================
//BUILD PAGE COMPONENTS
//=============================


const pageBuilder = {

    buildMainFrame() {
        for (let key in pageConstruct) {
            for (let elementKey in pageConstruct[key]) {
                elementFormatter.formatElement(pageConstruct[key][elementKey].elementTagName, pageConstruct[key][elementKey].elementParentIdentifier, '', pageConstruct[key][elementKey].elementClass)
            }
        }
        buildStatsComponents();
        buildMatchComponents();
        buildGainExpComponent();
    },

    buildNavContent() {

        //Access Page Construct Data
        let generalGuide = instructions.profilePage.generalGuide;

        //Generate Top Panel
        $(`.${navLogo.elementClass}`).append($('<img>').attr('src', 'https://www.pngkit.com/png/full/13-131505_white-infinity-symbol-png-white-infinity-logo-png.png'));
        $(`.${navTitle.elementClass}`).text(generalGuide.pageTitle);
        $(`.${navBar.elementClass}`).append($('<div>').text(generalGuide.navTitleLineOne));
        $(`.${navBar.elementClass}`).append($('<div>').text(generalGuide.navTitleLineTwo));
        $(`.${middleSection.elementClass}`).prepend($('<div>').attr('id', 'top-trapezoid'));
    },

    buildProfileContent() {

        //Generate Header
        $(`.${leftSection.elementClas}`).prepend($('<h2>').text(instructions.profilePage.generalGuide.profileSectionTitle).attr('id', 'all-jobs'));

        //Generate Buttons to Add Job
        $(`.${addJobButton.elementClass}`).text(instructions.profilePage.buttonText.addJob);
        $(`.${addJobButton.elementClass}`).on('click', navigationalController.launchForm);
    },

    buildFormContent() {

        //Access Page Construct Data
        let buttonText = instructions.profilePage.buttonText;

        //Generate Form Instructions
        $(`.${rightSection.elementClass}`).prepend($('<h2>').text(instructions.profilePage.generalGuide.formSectionTitle));

        //Generate Buttons to Save Edits and Save New Jobs
        const buttons = {
            saveNewJob: { text: buttonText.saveJob, callback: navigationalController.saveForm },
            editJobDetails: { text: buttonText.saveEdits, callback: navigationalController.saveEditedForm }
        };
        for (let key in buttons) {
            elementFormatter.formatButton(formFooter.elementClass, buttons[key].text, buttons[key].callback);
        }

        //Hide buttons
        $(`button:contains(${buttonText.saveJob})`).css('display', 'none');
        $(`button:contains(${buttonText.saveEdits})`).css('display', 'none');

        //Generate Form Content
        this.createFormLeftSide();
        this.createFormRightSide();
    },

    createFormLeftSide() {

        //Access Page Construct Data
        let inputChildren = formStructure.formLeft.inputChildren;
        let selectChildren = formStructure.formLeft.selectChildren;
        let profileFieldLabel = instructions.profilePage.profileFieldLabel;

        //Generate Text Input Fields
        let inputFieldLabel = [profileFieldLabel.workTitle, profileFieldLabel.workDuration, profileFieldLabel.teamSize];
        let index = 0;
        for (let key in inputChildren) {
            elementFormatter.formatPlaceHolder(inputChildren[key].elementParentIdentifier, inputFieldLabel[index], inputChildren[key].elementClass);
            index++;
        }

        //Generate Dropdown Options 
        getIndustryData();
        const dropdownLists = {
            workNatureInput: { dataSource: workNatureOptions, text: profileFieldLabel.workNature },
            workIndustryInput: { dataSource: workIndustryOptions, text: profileFieldLabel.workIndustry },
        }
        for (let key in dropdownLists) {
            elementFormatter.formatSelection(dropdownLists[key].dataSource, selectChildren[key].elementParentIdentifier, dropdownLists[key].text, selectChildren[key].elementClass);
        }
    },

    createFormRightSide() {

        //Access Page Construct Data
        let generalGuide = instructions.profilePage.generalGuide;

        //Generate Header 
        const formComponents = {
            header: { element: new bodyElement('div', formRight.elementClass, 'form-right-header'), text: '' },
            body: { element: new bodyElement('div', formRight.elementClass, 'form-right-body'), text: '' },
            instructions: { element: new bodyElement('p', 'form-right-header', ''), text: generalGuide.taskSectionTitle },
        };
        for (let key in formComponents) {
            let element = formComponents[key].element;
            elementFormatter.formatElement(element.elementTagName, element.elementParentIdentifier, formComponents[key].text, element.elementClass);
        }

        //Generate Button to Add Task
        elementFormatter.formatButton('form-right-header', '+', navigationalController.launchModal)
    },

    buildModalContent() {

        //Access Page Construct Data
        let inputChildren = formStructure.modalFields.inputChildren;
        let selectChildren = formStructure.modalFields.selectChildren;
        let buttonText = instructions.profilePage.buttonText;
        let modalParentClass = modalContent.elementClass;
        let modalLabel = instructions.modalPage.dropdownLabel;

        //Generate Header
        elementFormatter.formatElement('h3', pageConstruct.modalSection.modalContent.elementClass, instructions.modalPage.generalGuide, '')

        //Generate Input Fields
        let inputFieldLabel = [];
        let index = 0;
        for (key in instructions.modalPage.fieldLabel) {
            inputFieldLabel.push(instructions.modalPage.fieldLabel[key]);
        }
        for (let key in inputChildren) {
            elementFormatter.formatPlaceHolder(inputChildren[key].elementParentIdentifier, inputFieldLabel[index], inputChildren[key].elementClass);
            index++;
        }

        //Generate Dropdown Options
        elementFormatter.formatSelection(taskEnjoymentOptions, selectChildren.taskEnjoyment.elementParentIdentifier, instructions.modalPage.dropdownLabel.feelingDescription, selectChildren.taskEnjoyment.elementClass);
        elementFormatter.formatSelection(taskNatureOptions, selectChildren.taskNature.elementParentIdentifier, instructions.modalPage.dropdownLabel.taskType, selectChildren.taskNature.elementClass);

        //Generate Modal Buttons
        const buttons = {
            saveButton: { text: buttonText.saveTask, callback: navigationalController.saveNewTask },
            closeButton: { text: buttonText.closeModal, callback: navigationalController.hideModal }
        }
        for (let key in buttons) {
            elementFormatter.formatButton(modalParentClass, buttons[key].text, buttons[key].callback);
        }
        $(`.${modalSection.elementClass}`).css('display', 'none');
    },

    buildTooltip() {

        //Access Page Construct Data
        let profileFieldLabel = instructions.profilePage.profileFieldLabel;
        let modalLabel = instructions.modalPage.dropdownLabel;
        let tooltipText = instructions.tooltip;

        //Generate Tooltips
        let labelArr = [profileFieldLabel.workDuration, profileFieldLabel.teamSize, modalLabel.feelingDescription, modalLabel.taskType];
        let tooltipIdArr = ['work-duration-tooltip', 'team-size-tooltip', 'task-enjoyment-tooltip', 'task-nature-tooltip'];
        let tooltipTextArr = [tooltipText.workDuration, tooltipText.teamSize, tooltipText.taskEnjoyment, tooltipText.taskNature];

        for (let i = 0; i < labelArr.length; i++) {
            elementFormatter.formatTooltip(labelArr[i], tooltipIdArr[i], tooltipTextArr[i]);
        }
        $('#task-nature-tooltip-text').html($('#task-nature-tooltip-text').html().replace(/\n/g, '<br/>'));
    },

    buildWelcomeMsg() {

        //Build Main Elements
        let welcomeModalElements = { welcomeModalWrapper, welcomeModalMainBody, welcomeModalHead, welcomeModalFooter };
        for (key in welcomeModalElements) {
            elementFormatter.formatElement(welcomeModalElements[key].elementTagName, welcomeModalElements[key].elementParentIdentifier, '', welcomeModalElements[key].elementClass);
        }
        elementFormatter.formatButton(welcomeModalFooter.elementClass, instructions.profilePage.buttonText.closeModal, pageBuilder.closeWelcomeModal);

        //Build Body Content
        let messageTagComponents = ['h3', 'p', 'div', 'div', 'div', 'div', 'p'];
        let welcomeMsgKeys = Object.keys(instructions.welcomeMsg);
        for (let i = 0; i < messageTagComponents.length; i++) {
            elementFormatter.formatElement(messageTagComponents[i], welcomeModalHead.elementClass, instructions.welcomeMsg[welcomeMsgKeys[i]], `welcome-msg-${welcomeMsgKeys[i]}`);
        }
        $(`.${welcomeModalHead.elementClass}`).html($(`.${welcomeModalHead.elementClass}`).html().replace(/\n/g, '<br/>'));
    },

    closeWelcomeModal() {
        $(`.modal-welcome`).css('display', 'none');
    }
}


$(() => {
    pageBuilder.buildWelcomeMsg();
    buildPage();
})
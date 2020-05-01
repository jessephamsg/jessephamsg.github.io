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
    }
};


//=============================
//BUILD PAGE MAIN FUNCTION
//=============================


const buildPage = () => {
    pageBuilder.buildMainFrame();
    pageBuilder.buildNavContent();
    pageBuilder.buildProfileContent();
    pageBuilder.buildFormContent();
    pageBuilder.buildModalContent();
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
        elementFormatter.formatElement('div', 'middle-section', '', 'explore-opportunities');
        $('.explore-opportunities').append($('<img>').attr('src', 'https://pngimage.net/wp-content/uploads/2018/05/experience-png-6.png'));
        $('.explore-opportunities').on('click', buildGainExpModal);
    },

    buildNavContent() {

        //Access Page Construct Data
        let topSection = pageConstruct.topSection;
        let generalGuide = instructions.profilePage.generalGuide;

        //Generate Top Panel
        $(`.${topSection.navLogo.elementClass}`).append($('<img>').attr('src', 'https://www.pngkit.com/png/full/13-131505_white-infinity-symbol-png-white-infinity-logo-png.png'));
        $(`.${topSection.navTitle.elementClass}`).text(generalGuide.pageTitle);
        $(`.${topSection.navBar.elementClass}`).append($('<div>').text(generalGuide.navTitleLineOne));
        $(`.${topSection.navBar.elementClass}`).append($('<div>').text(generalGuide.navTitleLineTwo));
        $(`.${pageConstruct.bottomSection.middleSection.elementClass}`).prepend($('<div>').attr('id', 'top-trapezoid'));
    },

    buildProfileContent() {

        //Access Page Construct Data
        let addJobButton = pageConstruct.leftSection.addJobButton.elementClass;
        let profileSectionClass = pageConstruct.bottomSection.leftSection.elementClass;

        //Generate Header
        $(`.${profileSectionClass}`).prepend($('<h2>').text(instructions.profilePage.generalGuide.profileSectionTitle).attr('id', 'all-jobs'));

        //Generate Buttons to Add Job
        $(`.${addJobButton}`).text(instructions.profilePage.buttonText.addJob);
        $(`.${addJobButton}`).on('click', navigationalController.launchForm);
    },

    buildFormContent() {

        //Access Page Construct Data
        let buttonText = instructions.profilePage.buttonText;
        let formFooter = pageConstruct.rightSection.formFooter.elementClass;
        let formSectionClass = pageConstruct.bottomSection.rightSection.elementClass;

        //Generate Form Instructions
        $(`.${formSectionClass}`).prepend($('<h2>').text(instructions.profilePage.generalGuide.formSectionTitle));

        //Generate Buttons to Save Edits and Save New Jobs
        const buttons = {
            saveNewJob: { text: buttonText.saveJob, callback: navigationalController.saveForm },
            editJobDetails: { text: buttonText.saveEdits, callback: navigationalController.saveEditedForm }
        };
        for (let key in buttons) {
            elementFormatter.formatButton(formFooter, buttons[key].text, buttons[key].callback);
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

        $(`label:contains(${profileFieldLabel.workDuration})`).append($('<div>').text('i').attr('id', 'work-duration-tooltip'));
        $('#work-duration-tooltip').append($('<span>').text(instructions.tooltip.workDuration).attr('id', 'work-duration-tooltip-text'));
        $(`label:contains(${profileFieldLabel.teamSize})`).append($('<div>').text('i').attr('id', 'team-size-tooltip'));
        $('#team-size-tooltip').append($('<span>').text(instructions.tooltip.teamSize).attr('id', 'team-size-tooltip-text'));
    },

    createFormRightSide() {

        //Access Page Construct Data
        let generalGuide = instructions.profilePage.generalGuide;
        let formRight = formStructure.formRight.parent.formRight.elementClass;

        //Generate Header 
        const formComponents = {
            header: { element: new bodyElement('div', formRight, 'form-right-header'), text: '' },
            body: { element: new bodyElement('div', formRight, 'form-right-body'), text: '' },
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
        let modalParentClass = pageConstruct.modalSection.modalContent.elementClass;
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

        $(`label:contains(${modalLabel.feelingDescription})`).append($('<div>').text('i').attr('id', 'task-enjoyment-tooltip'));
        $('#task-enjoyment-tooltip').append($('<span>').text(instructions.tooltip.taskEnjoyment).attr('id', 'task-enjoyment-tooltip-text'));
        $(`label:contains(${modalLabel.taskType})`).append($('<div>').text('i').attr('id', 'task-nature-tooltip'));
        $('#task-nature-tooltip').append($('<span>').text(instructions.tooltip.taskNature).attr('id', 'task-nature-tooltip-text'));
        $('#task-nature-tooltip-text').html($('#task-nature-tooltip-text').html().replace(/\n/g,'<br/>'));
    },
}


//=================================
//HELPER FUNCTIONS TO BUILD PAGE 
//=================================


const elementFormatter = {

    formatElement(elementTagName, elementParentIdentifier, elementText, elementClass) {

        let element = $(`<${elementTagName}>`);
        $(`.${elementParentIdentifier}`).append(element.text(`${elementText}`).addClass(`${elementClass}`));
        return element;
    },

    formatElementById(elementTagName, elementParentIdentifier, elementText, elementClass) {

        let element = $(`<${elementTagName}>`);
        $(`#${elementParentIdentifier}`).append(element.text(`${elementText}`).addClass(`${elementClass}`));
        return element;
    },

    formatInput(inputType, inputParentClassName, labelText, inputId) {

        let label = elementFormatter.formatElement('label', `${inputParentClassName}`, `${labelText}`, '').attr('for', `${inputId}`);
        label.after($('<br>'));
        let input = elementFormatter.formatElement(`${inputType}`, `${inputParentClassName}`, '', '').attr('id', `${inputId}`);
        input.after($('<br>'));
        return input;
    },

    formatPlaceHolder(inputParentClassName, labelText, inputId) {

        this.formatInput('input', inputParentClassName, labelText, inputId);
    },

    formatSelection(arrayOfOptions, inputParentClassName, labelText, inputId) {

        let input = this.formatInput('select', inputParentClassName, labelText, inputId);
        input.attr('name', `${inputId}`);
        arrayOfOptions.forEach((option) => {
            let options = $('<option>')
            $(`#${inputId}`).append(options.text(`${option}`).attr('value', `${option}`));
        });
    },
    
    formatButton(inputParentClassName, labelText, callback) {
        
        let button = this.formatElement('button', inputParentClassName, labelText, '');
        button.on('click', callback)
    },
}


$(() => {
    buildPage();
})
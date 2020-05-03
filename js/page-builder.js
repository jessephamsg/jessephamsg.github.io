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
        $(`.${leftSection.elementClass}`).prepend($('<h2>').text(instructions.profilePage.generalGuide.profileSectionTitle).attr('id', 'all-jobs'));

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
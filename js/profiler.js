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


//===================================
//FUNCTIONS TO DISPLAY DATA
//===================================


const renderInput = {

    createJobButton(workTitle) {

        //Add Job Button to the Profile Section// (1) A Job Button is added after a user saves a new job (2) Use this Job Button to access details of the job previously added
        let button = $('<button>');
        $(`.${pageConstruct.bottomSection.leftSection.elementClass}`).append(button.text(workTitle));
        button.on('click', this.showJobDetails);
    },

    showJobDetails() {

        //Retrieve Data from the Correct Job Object// (1) Matching text on the clicked Job Button with the Work Titles in the workProfile Oject (2) Loop through the workProfile object to find the match 
        let workTitle = $(event.currentTarget).text();
        let index = 0;
        for (let i = 0; i < workProfile.length; i++) {
            if (workProfile[i].workTitle === workTitle) index = i;
        }

        //Make All Inputs Editable Except Work Title// (1) Currently, Work Title can't be changed because of Work Title Matching mechanism
        $('input').prop('readonly', false);
        $('option').prop("disabled", false);
        $('#work-title').prop("readonly", true);

        //Restore Form to Its Full Color// (1) Form fades when it is disabled (2) Form restores color when it is enabled
        $('.right-section').css('opacity', '1');

        //Retrieve Values from the Identified workProfile Object// (1) Assign these values to the form fields (2) Area containing task cards is emptied (3) Add relevant task cards in its place
        for (let i = 0; i < formIds.workIds.length; i++) {
            $(`${formIds.workIds[i]}`).val(workProfile[index][formIds.workKeys[i]]);
        }
        $('.form-right-body').empty();
        for (i = 0; i < workProfile[index].taskTitle.length; i++) {
            renderInput.showHistoricalTasks(workProfile[index].taskEnjoyment[i], workProfile[index].taskTitle[i], workProfile[index].taskNature[i], workProfile[index].taskDescription[i], i)
        }

        //Enable Save Edits button, Hide Save Jobs button
        $(`button:contains(${instructions.profilePage.buttonText.saveEdits})`).css('display', 'block');
        $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'none');

        //Highlight Clicked Button// (1) Clicked button's background turns Cyan Green to help user easily remember which button was clicked (2) Other buttons remain the same
        $(`button`).css('background-color', 'rgba(0, 0, 0, 0)').css('color', 'white');
        $(`button:contains(${workTitle})`).css('background-color', 'rgba(94, 205, 191)').css('color', 'white');
    },

    showHistoricalTasks(taskEnjoyment, taskTitle, taskNature, taskDescription, index) {

        //Show All Tasks Added Previously// (1) Function Function is triggered when user clicks on one of the Job button to view their job details 
        workObjectFormatter.showTask('form-right-body', taskEnjoyment, taskTitle, taskNature, taskDescription, 'card', index);
    },

    updateTask(taskEnjoyment, taskTitle, taskNature, taskDescription) {

        //Identify Work Object to be Updated// (1) Match Work Title currently shown in the Work Title Text field with the records in workProfile Object (2) Loop through the workProfile object to find the match
        let workTitle = $('#work-title').val();
        let j = 0;
        for (let i = 0; i < workProfile.length; i++) {
            if (workProfile[i].workTitle === workTitle) j = i;
        }

        //Add a New Task Card to The Identified Work Object// (1) Get index to pass into showTask function (2) This ensures that each card can be identified by their unique index (3) Index is the length of Task Title
        let index = workProfile[j].taskTitle.length - 1;
        workObjectFormatter.showTask('form-right-body', taskEnjoyment, taskTitle, taskNature, taskDescription, 'card', index);
    },
}

const workObjectFormatter = {

    showTask(taskParentClass, taskEnjoyment, taskTitle, taskNature, taskDescription, id, index) {

        //Create Card Wrapper
        let cardWrapper = $('<div>').attr('id', `${id}-wrapper-${index}`).addClass('card-wrapper');

        //Create Card Header
        let cardHeader = $('<div>').attr('id', `${id}-header-${index}`).addClass('card-header');
        let cardIcon = $('<div>').attr('id', `${id}-icon-${index}`).addClass('card-icon').text(taskEnjoyment);
        let cardTitle = $('<div>').attr('id', `${id}-title-${index}`).addClass('card-title').text(taskTitle);
        let cardLabel = $('<div>').attr('id', `${id}-label-${index}`).addClass('card-label').text(taskNature);

        //Create Card Body
        let cardBody = $('<div>').attr('id', `${id}-body-${index}`).addClass('card-body').text(taskDescription.substring(0, 100));
        let cardHyperlink = $('<a>').attr('id', `${id}-hyperlink-${index}`).addClass('card-hyperlink').text('See More');

        //Append All Components Together
        $(`.${taskParentClass}`).append(cardWrapper);
        cardWrapper.append(cardHeader.append(cardIcon, cardTitle, cardLabel));
        cardWrapper.append(cardBody.append(cardHyperlink));
    },

    clearInputs(arrayOfInputs) {

        for (let input of arrayOfInputs) {
            $(`${input}`).val('');
        }
    },
}

const entryChecker = {

    hasNumberInput(inputId, errorText) {

        let entry = $(`${inputId}`).val();
        $(`${inputId}+div`).remove();
        let instruction = $('<div>').text(errorText);
        $(`${inputId}`).after(instruction);
        let stringArr = entry.split('');
        (stringArr.some((item) => parseInt(item))) ? instruction.css('display', 'block') : instruction.css('display', 'none');
    },

    hasTextInput(inputId, errorText) {

        let entry = $(`${inputId}`).val();
        $(`${inputId}+div`).remove();
        let instruction = $('<div>').text(errorText);
        $(`${inputId}`).after(instruction);
        let stringArr = entry.split('');
        for(let i = 0; i < stringArr.length; i++) {
            stringArr[i] === '0' ? stringArr[i] = '1' : stringArr[i];
        }
        (stringArr.every((item) => parseInt(item))) ? instruction.css('display', 'none') : instruction.css('display', 'block');
    },

    hasEmptyField (inputId, errorText) {

        let entry = $(`${inputId}`).val();
        $(`${inputId}+div`).remove();
        let instruction = $('<div>').text(errorText);
        $(`${inputId}`).after(instruction);
        entry === '' || entry === null ? instruction.css('display', 'block') : instruction.css('display', 'none');
    },

    checkWorkTitle() {

        $(`${formIds.workIds[0]}`).change(() => {
            this.hasNumberInput(formIds.workIds[0], errorMessage[Object.keys(errorMessage)[0]]);
        });
    },

    checkWorkDuration() {

        $(`${formIds.workIds[1]}`).change(() => {
            this.hasTextInput(formIds.workIds[1], errorMessage[Object.keys(errorMessage)[1]]);
        });
    },

    checkTeamSize() {

        $(`${formIds.workIds[2]}`).change(() => {
            this.hasTextInput(formIds.workIds[2], errorMessage[Object.keys(errorMessage)[2]]);
        });
    },

    checkWorkNature() {

        $(`${formIds.workIds[3]}`).change(() => {
            this.hasEmptyField(formIds.workIds[3], errorMessage[Object.keys(errorMessage)[3]]);
        });
    },

    checkWorkIndustry() {

        $(`${formIds.workIds[4]}`).change(() => {
            this.hasEmptyField(formIds.workIds[4], errorMessage[Object.keys(errorMessage)[3]]);
        });
    }
}


//===================================
//FUNCTIONS TO PROCESS INPUTS & DATA
//===================================


const navigationalController = {

    launchForm() {

        //Show New Form// (1) Clear all previous inputs (2) Make all inputs editable (3) Restore form's full color
        workObjectFormatter.clearInputs(['input', 'select']);
        $('.form-right-body').empty();
        $('input').prop("readonly", false);
        $('option').prop("disabled", false);
        $('.right-section').css('opacity', '1');

        //Hide and Disable All Buttons// (1) Hide Save Jobs button until user inputs data into the form (2) This is to prevent users from saving multiple empty objects into the workProfile (3) Hide Save Edits button (4) All Disabled Buttons fade in color 
        $(`button:contains(${instructions.profilePage.buttonText.saveEdits})`).css('display', 'none');
        $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'none');
        $(`button`).css('background-color', 'rgba(0, 0, 0, 0)').css('color', 'white');
        $(`button:contains(${instructions.profilePage.buttonText.addJob})`).css('background-color', 'rgba(94, 205, 191)').css('color', 'white');
        $('button').attr('disabled', true);
        $('button').css('opacity', '0.2');

        //Enable Add Task button Only
        $(`button:contains(${instructions.profilePage.buttonText.addTask})`).attr('disabled', false);
        $(`button:contains(${instructions.profilePage.buttonText.addTask})`).css('opacity', '1');

        //Create a New Work Object
        const workItem = new Work('', '', '', '', '', [], [], [], []);
        workProfile.push(workItem);
    },

    saveForm() {

        //Update Work Object// (1) Update Work Title, Work Duration, Team Size, Work Nature, and Work Industry into the object properties (2) Get user's inputs for those fields (3) Assign the values on those fields into the object
        let index = 0;
        for (let key in workProfile[workProfile.length - 1]) {
            if (key === formIds.workKeys[index]) {
                workProfile[workProfile.length - 1][key] = $(`${formIds.workIds[index]}`).val();
                index++
            }
        }

        //Create A New Job Button in Profile Section// (1) This button allows user to see the full details of job entries 
        renderInput.createJobButton(workProfile[workProfile.length - 1].workTitle);

        //Diable Form// (1) Disallow users to change the form input once submitted (2) Disallow users to click Save Job once the form is submitted (3) Form fades to signal Disabled mode (4) Enable all other buttons not relating to Form
        $('input').prop("readonly", true);
        $('option').prop("disabled", true);
        $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'none');
        $('button').attr('disabled', false);
        $('button').css('opacity', '1');

        //Clear All Form Inputs & Update All Stats// (1) Clear all form inputs once a job is saved
        workObjectFormatter.clearInputs(['input', 'select']);
        $('.form-right-body').empty();
        $('.right-section').css('opacity', '0.4');
        updateAllStats();
    },

    hideModal() {

        //All Buttons Enabled, Modal Closed
        $('button').attr('disabled', false);
        $('.modal').css('display', 'none');
        $('button').css('opacity', '1');
    },

    launchModal() {

        //All Buttons Enabled
        $('button').attr('disabled', false);
        $('button').css('opacity', '1');

        //Check for Empty Fields// (1) for Work Title, Work Duration, Team Size, Work Nature, Work Industry
        for (let i = 0; i< formIds.workIds.length; i ++) {
            entryChecker.hasEmptyField(formIds.workIds[i], errorMessage[Object.keys(errorMessage)[3]]);
        };

        //Modal Launched, Save Job Button Displayed
        $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'block');
        $('.modal').css('display', 'block');
    },

    saveNewTask() {

        //All Buttons Enabled
        $('button').attr('disabled', false);
        $('button').css('opacity', '1');

        //Identify the Correct Task Array// (1) Identify the Work Object by Work Title Name Matching (2) If no match is found, the Tasks created belong to a new Work Object. They will be simply pushed to an empty Task array of the last Work Object in workProfile array (3) If found, the Tasks created belong to one of the existing work objects. Get index of that work object 
        let workTitle = $('#work-title').val();
        let j = 0;
        let test = false;
        let result = 0;
        for (let i = 0; i < workProfile.length; i++) {
            if (workProfile[i].workTitle === workTitle) {
                result = i;
                test = true;
            }
        }
        (result === 0 && test === false) ? j = workProfile.length - 1 : j = result;

        //Update The Identified Task Array// (1) Using the correct task Ids
        let index = 0;
        for (let key in workProfile[j]) {
            if (key === formIds.taskKeys[index]) {
                workProfile[j][key].push($(`${formIds.taskIds[index]}`).val());
                index++
            }
        }

        //Create Task Cards// (1) For every new task update, create a task card and attach it to the form body (2) Empty the form body before attaching
        renderInput.updateTask(workProfile[j].taskEnjoyment.slice(-1)[0], workProfile[j].taskTitle.slice(-1)[0], workProfile[j].taskNature.slice(-1)[0], workProfile[j].taskDescription.slice(-1)[0]);
        workObjectFormatter.clearInputs(formIds.taskIds);

        //Enable or Disable Save As New Job Button// (1) If a task is added to a new work object, display Save Job Button (2) If a task is added to one of the existing work objects, hide Save Job button, display Save Edits button  
        let buttonWithTheSameTitle = $(`button:contains(${workTitle})`).length;
        if (buttonWithTheSameTitle > 0 && workTitle !== "") {
            $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'none');
        } else {
            $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'block');
        };
    },

    saveEditedForm () {

        //All Buttons Enabled
        $('button').attr('disabled', false);
        $('button').css('opacity', '1');

        //Identify Work Object to be Updated// (1) Match names of the Work Title on the form shown with the Work Title in the workProfile array
        let workTitle = $('#work-title').val();
        let index = 0;
        for (let i = 0; i < workProfile.length; i++) {
            if (workProfile[i].workTitle === workTitle) index = i;
        }

        //Update Values of the Identified Work Object, Update Stats & Alert// (1) Set work object properties to the new values received on the form
        for (let i = 0; i < formIds.workIds.length; i++) {
            workProfile[index][formIds.workKeys[i]] = $(`${formIds.workIds[i]}`).val();
        }
        updateAllStats();
        alert('Edits saved');
    }
}

const getIndustryData = () => {
    $.ajax({
        url: 'https://data.gov.sg/api/action/datastore_search',
        data: {
            resource_id: '243896d0-1974-4fee-a4d8-613641b230ad',
            limit: 500,
            q: '2019'
        },
        success: (data) => {
            let industryArr = [];
            for (let i = 0; i < data.result.records.length; i++) {
                industryArr.push(data.result.records[i].industry3);
            }
            let filteredArr = industryArr.reduce((acc, initial) => {
                if (acc[acc.length - 1] !== initial) {
                    acc.push(initial);
                } else { acc }
                return acc;
            }, [])
            workIndustryOptions = [...filteredArr];
            workIndustryOptions.forEach((workOption) => {
                let options = $('<option>')
                $('#work-industry-input').append(options.text(`${workOption}`).attr('value', `${workOption}`));
            })
        }
    });
}

$(() => {
    entryChecker.checkWorkTitle();
    entryChecker.checkWorkDuration();
    entryChecker.checkTeamSize();
    entryChecker.checkWorkNature();
    entryChecker.checkWorkIndustry();
})
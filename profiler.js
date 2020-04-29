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

const taskNatureOptions = ['Create', 'Organise', 'Influence', 'Research']

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


//===================================
//FUNCTIONS TO DISPLAY DATA
//===================================


const renderInput = {

    showTask(taskEnjoyment, taskTitle, taskNature, taskDescription, index) {

        //Create Card Wrapper
        let cardWrapper = $('<div>').attr('id', `card-wrapper-${index}`).addClass('card-wrapper');

        //Create Card Header
        let cardHeader = $('<div>').attr('id', `card-header-${index}`).addClass('card-header');
        let cardIcon = $('<div>').attr('id', `card-icon-${index}`).addClass('card-icon').text(taskEnjoyment);
        let cardTitle = $('<div>').attr('id', `card-title-${index}`).addClass('card-title').text(taskTitle);
        let cardLabel = $('<div>').attr('id', `card-label-${index}`).addClass('card-label').text(taskNature);

        //Create Card Body
        let cardBody = $('<div>').attr('id', `card-body-${index}`).addClass('card-body').text(taskDescription.substring(0, 100));
        let cardHyperlink = $('<a>').attr('id', `card-hyperlink-${index}`).addClass('card-hyperlink').text('See More');

        //Append All Components Together
        $('.form-right-body').append(cardWrapper);
        cardWrapper.append(cardHeader.append(cardIcon, cardTitle, cardLabel));
        cardWrapper.append(cardBody.append(cardHyperlink));
    },

    updateTask(taskEnjoyment, taskTitle, taskNature, taskDescription) {

        let workTitle = $('#work-title').val();
        let j = 0;
        for (let i = 0; i < workProfile.length; i++) {
            if (workProfile[i].workTitle === workTitle) j = i;
        }

        //Get New Index to Add Another Card to the Existing Job
        let index = workProfile[j].taskTitle.length - 1;
        this.showTask(taskEnjoyment, taskTitle, taskNature, taskDescription, index);
    },

    showHistoricalTasks(taskEnjoyment, taskTitle, taskNature, taskDescription, index) {

        //Run Through the Existing Array of Tasks to show all Tasks previously added
        this.showTask(taskEnjoyment, taskTitle, taskNature, taskDescription, index);
    },

    showJob(workTitle) {

        //Add Job to the Profile Section on the left
        let button = $('<button>');
        $(`.${pageConstruct.bottomSection.leftSection.elementClass}`).append(button.text(workTitle));
        button.on('click', this.showJobDetails);
    },

    showJobDetails() {

        //Identify Job Object to be shown by Matching text on button with the existing Work Titles in the workProfile Oject
        let workTitle = $(event.currentTarget).text();
        let index = 0;
        for (let i = 0; i < workProfile.length; i++) {
            if (workProfile[i].workTitle === workTitle) index = i;
        }
        $('.right-section').css('display', 'block');

        //Currently, Work Title can't be changed because of this Matching mechanism
        $('input').prop('readonly', false);
        $('#work-title').prop("readonly", true);

        //Enable Form
        $('option').prop("disabled", false);
        $('.right-section').css('opacity', '1');

        //Assign values from the workProfile Object to the existing fields
        for (let i = 0; i < formIds.workIds.length; i++) {
            $(`${formIds.workIds[i]}`).val(workProfile[index][formIds.workKeys[i]]);
        }
        $('.form-right-body').empty();
        for (i = 0; i < workProfile[index].taskTitle.length; i++) {
            renderInput.showHistoricalTasks(workProfile[index].taskEnjoyment[i], workProfile[index].taskTitle[i], workProfile[index].taskNature[i], workProfile[index].taskDescription[i], i)
        }

        //Enable Save Edits button
        $(`button:contains(${instructions.profilePage.buttonText.saveEdits})`).css('display', 'block');
        $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'none');
        $(`button`).css('background-color', 'rgba(0, 0, 0, 0)').css('color', 'white');
        $(`button:contains(${workTitle})`).css('background-color', 'rgba(94, 205, 191)').css('color', 'white');
    },

    clearInputs(arrayOfInputs) {
        for (let input of arrayOfInputs) {
            $(`${input}`).val('');
        }
    }
}


//===================================
//FUNCTIONS TO PROCESS INPUTS & DATA
//===================================


const navigationalController = {

    launchForm() {

        //After Add Job button is clicked, display Form with all previous inputs cleared
        $('.right-section').css('display', 'block');
        renderInput.clearInputs(['input', 'select']);
        $('.form-right-body').empty();
        $('input').prop("readonly", false);
        $('option').prop("disabled", false);
        $('.right-section').css('opacity', '1');
        $(`button:contains(${instructions.profilePage.buttonText.saveEdits})`).css('display', 'none');
        $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'none');
        $(`button`).css('background-color', 'rgba(0, 0, 0, 0)').css('color', 'white');
        $(`button:contains(${instructions.profilePage.buttonText.addJob})`).css('background-color', 'rgba(94, 205, 191)').css('color', 'white');

        //Create a new work object, ready to receive user's input and push it to the existing workProfile array
        const workItem = new Work('', '', '', '', '', [], [], [], []);
        workProfile.push(workItem);
        console.log(workProfile);
    },

    hideForm() {

        //Update the work object created with the user's inputs relating to Job (not tasks)
        let index = 0;
        for (let key in workProfile[workProfile.length - 1]) {
            if (key === formIds.workKeys[index]) {
                workProfile[workProfile.length - 1][key] = $(`${formIds.workIds[index]}`).val();
                index++
            }
        }

        //Create a button of the job that user just created. Clicking on this button allows user to see the historical job entries
        console.log(workProfile);
        renderInput.showJob(workProfile[workProfile.length - 1].workTitle);

        //Disallow users to change the form input once submitted
        $('input').prop("readonly", true);
        $('option').prop("disabled", true);
        $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'none');

        //Once a new job object is saved, clear all inputs in the form
        renderInput.clearInputs(['input', 'select']);
        $('.form-right-body').empty();
        $('.right-section').css('opacity', '0.4');

        //Update all stats on the screen to reflect the new job
        updateAllStats();
    },

    hideModal() {

        $('.modal').css('display', 'none');
    },

    launchModal() {

        $('.modal').css('display', 'block');
    },

    saveInput() {

        //Identify the task array within the work object created with the user's inputs relating to tasks 
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

        //Update the task array within the work object created with the user's inputs relating to tasks 
        let index = 0;
        for (let key in workProfile[j]) {
            if (key === formIds.taskKeys[index]) {
                workProfile[j][key].push($(`${formIds.taskIds[index]}`).val()); 
                index++
            }
        }

        //For every new task update, create a card of that task and attach it on the form body
        console.log(workProfile);
        renderInput.updateTask(workProfile[j].taskEnjoyment.slice(-1)[0], workProfile[j].taskTitle.slice(-1)[0], workProfile[j].taskNature.slice(-1)[0], workProfile[j].taskDescription.slice(-1)[0]);
        renderInput.clearInputs(formIds.taskIds);

        //Enable Save As New Job Button
        let currentFormTitle = $('#work-title').val();
        let buttonWithTheSameTitle = $(`button:contains(${currentFormTitle})`).length;
        if (buttonWithTheSameTitle > 0) {
            $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'none');
            updateAllStats();
        } else {
            $(`button:contains(${instructions.profilePage.buttonText.saveJob})`).css('display', 'block');
        }
    },

    saveEdits() {

        //Identify work object to be updated by matching names of the Work Title on the form currently shown with the Work Title in the workProfile array
        let workTitle = $('#work-title').val();
        let index = 0;
        for (let i = 0; i < workProfile.length; i++) {
            if (workProfile[i].workTitle === workTitle) index = i;
        }

        //Update values of that work object according to the new inputs
        for (let i = 0; i < formIds.workIds.length; i++) {
            workProfile[index][formIds.workKeys[i]] = $(`${formIds.workIds[i]}`).val();
        }

        //Clear all inputs
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
    $('input').focus(() => {
        console.log('say stuff');
    })
})
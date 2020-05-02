//=========================================
//DATA TO CONSTRUCT 'GAIN EXPERIENCE' MODAL
//=========================================

class Point {
    constructor(createPoint, organisePoint, influencePoint,researchPoint ) {
        this.createPoint = createPoint;
        this.organisePoint = organisePoint;
        this.influencePoint = influencePoint;
        this.researchPoint = researchPoint;
    }
}

const links = {
    taskTitle: ['Title 1', 'Title 2', 'Title 3'],
    taskNature: [
        new Point (12, 24, 10, 5),
        new Point (10, 12, 13, 25),
        new Point (20, 11, 2, 26)
    ],
    taskContent: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ]
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


//=============================
//BUILD COMPONENTS
//=============================


const buildGainExpComponent = () => {

    for (key in expModalElements) {
        elementFormatter.formatElement(expModalElements[key].elementTagName, expModalElements[key].elementParentIdentifier, '', expModalElements[key].elementClass);
    }
    $(`.${expModalWrapper.elementClass}`).css('display', 'none');
    $(`.${expModalButton.elementClass}`).append($('<img>').attr('src', 'https://pngimage.net/wp-content/uploads/2018/05/experience-png-6.png'));
    $(`.${expModalButton.elementClass}`).on('click', buildGainExpModal);
}


const buildGainExpModal = () => {

    $(`.${expModalWrapper.elementClass}`).css('display', 'block');
    elementFormatter.formatElement('h3', expModalHead.elementClass, expInstructions.modalHead, '');
    for (let i = 0; i < links.taskTitle.length; i++) {
        let labelContent = [];
        let index = 0;
        for (key in links.taskNature[i]) {
            labelContent.push(`${taskNatureOptions[index]}: ${links.taskNature[i][key]}`);
            index++;
        }
        workObjectFormatter.showTask(expModalHead.elementClass, '', links.taskTitle[i], labelContent.join(' | '), links.taskContent[i], 'exp', i);
    }
    elementFormatter.formatButton(expModalFooter.elementClass, expInstructions.modalButton, closeExpModal);
}

const closeExpModal = () => {
    $(`.${expModalWrapper.elementClass}`).css('display', 'none');
}


$(() => {
    $.get('https://www.channelnewsasia.com/', (data) => {
        console.log(data);
        $(data).filter('meta[name=adescription]').attr("content");
        console.log($(data).filter('meta[name=adescription]').attr("content"));
    });
})
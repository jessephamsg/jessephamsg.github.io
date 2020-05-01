const links = {
    taskTitle: ['Title 1', 'Title 2', 'Title 3'],
    taskNature: [
        {createPoint: 12, influencePoint: 24, researchPoint: 10, organisePoint: 5},
        {createPoint: 12, influencePoint: 24, researchPoint: 10, organisePoint: 5},
        {createPoint: 12, influencePoint: 24, researchPoint: 10, organisePoint: 5}
    ],
    taskContent: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ]
}

const buildGainExpModal = () => {
    $('.modal-exp').css('display', 'block');
    elementFormatter.formatElement('div', 'container', '', 'modal-exp');
    elementFormatter.formatElement('div', 'modal-exp', '', 'modal-exp-body' );
    elementFormatter.formatElement('h3', 'modal-exp-body', 'Gain Experience', '' );
    for (let i =0; i< links.taskTitle.length; i++) {
        let labelContent = [];
        let labels = ['Create', 'Influence', 'Research', 'Organise'];
        let index = 0;
            for (key in links.taskNature[i]) {
                labelContent.push(`${labels[index]}: ${links.taskNature[i][key]}`);
                index++;
        }
        console.log(labelContent);
        createModalCards('', links.taskTitle[i], labelContent.join(' | '), links.taskContent[i], i);
    }
    elementFormatter.formatElement('div', 'modal-exp-body', '', 'modal-footer' );
    elementFormatter.formatButton('modal-footer', 'Close', closeExpModal);
}

const createModalCards = (taskEnjoyment, taskTitle, taskNature, taskDescription, index) => {

    //Create Card Wrapper
    let cardWrapper = $('<div>').attr('id', `exp-wrapper-${index}`).addClass('card-wrapper');

    //Create Card Header
    let cardHeader = $('<div>').attr('id', `exp-header-${index}`).addClass('card-header');
    let cardIcon = $('<div>').attr('id', `exp-icon-${index}`).addClass('card-icon').text(taskEnjoyment);
    let cardTitle = $('<div>').attr('id', `exp-title-${index}`).addClass('card-title').text(taskTitle);
    let cardLabel = $('<div>').attr('id', `exp-label-${index}`).addClass('card-label').text(taskNature);

    //Create Card Body
    let cardBody = $('<div>').attr('id', `exp-body-${index}`).addClass('card-body').text(taskDescription.substring(0, 100));
    let cardHyperlink = $('<a>').attr('id', `exp-hyperlink-${index}`).addClass('card-hyperlink').text('See More');

    //Append All Components Together
    $('.modal-exp-body').append(cardWrapper);
    cardWrapper.append(cardHeader.append(cardIcon, cardTitle, cardLabel));
    cardWrapper.append(cardBody.append(cardHyperlink));
}

const closeExpModal = () => {
    $('.modal-exp').css('display', 'none');
}
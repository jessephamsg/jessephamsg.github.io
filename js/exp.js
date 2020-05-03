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
    $(`.${expModalHead.elementClass}`).empty();
    $(`.${expModalFooter.elementClass}`).empty();
    elementFormatter.formatElement('h3', expModalHead.elementClass, expInstructions.modalHead, '');
    for (let i = 0; i < links.taskTitle.length; i++) {
        let labelContent = [];
        let index = 0;
        for (key in links.taskNature[i]) {
            labelContent.push(`${taskNatureOptions[index]}: ${links.taskNature[i][key]}`);
            index++;
        }
        workObjectFormatter.showTask(expModalHead.elementClass, '', links.taskTitle[i], labelContent.join(' | '), links.taskContent, 'exp', i);
    }
    elementFormatter.formatButton(expModalFooter.elementClass, expInstructions.modalButton, closeExpModal);
}

const closeExpModal = () => {
    $(`.${expModalWrapper.elementClass}`).css('display', 'none');
}


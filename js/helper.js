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

    formatTooltip(labelText, tooltipId, tooltipText) {

        $(`label:contains(${labelText})`).append($('<div>').text('i').attr('id', `${tooltipId}`));
        $(`#${tooltipId}`).append($('<span>').text(tooltipText).attr('id', `${tooltipId}-text`));
    }
}


//=====================================================
//HELPER FUNCTIONS TO MANAGE CARDS CREATION & UPDATES 
//=====================================================


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


//=================================
//HELPER FUNCTIONS TO CHECK INPUTS 
//=================================


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
        for (let i = 0; i < stringArr.length; i++) {
            stringArr[i] === '0' ? stringArr[i] = '1' : stringArr[i];
        }
        (stringArr.every((item) => parseInt(item))) ? instruction.css('display', 'none') : instruction.css('display', 'block');
    },

    hasEmptyField(inputId, errorText) {

        let entry = $(`${inputId}`).val();
        $(`${inputId}+div`).remove();
        let instruction = $('<div>').text(errorText);
        $(`${inputId}`).after(instruction);
        entry === '' || entry === null ? instruction.css('display', 'block') : instruction.css('display', 'none');
    }
}


//=================================================
//HELPER FUNCTIONS TO MANAGE UI & USER INTERACTION 
//=================================================


const uiManagement = {

    changeProperties(targetIdentifierArr, propertiesArr) {

        for (let i = 0; i < targetIdentifierArr.length; i++) {
            for (let key in propertiesArr[i]) {
                $(`${targetIdentifierArr[i]}`).prop(`${key}`, propertiesArr[i][key]);
            }
        }
    },

    changeStyle(targetIdentifierArr, propertiesArr) {

        for (let i = 0; i < targetIdentifierArr.length; i++) {
            for (let key in propertiesArr[i]) {
                $(`${targetIdentifierArr[i]}`).css(`${key}`, propertiesArr[i][key]);
            }
        }
    },
}


//=================================================
//HELPER FUNCTIONS TO MANAGE OBJECT & ARRAY DATA
//=================================================


let objectStatsService = {

    groupedByProperty(objArr, objKeyforGrouping) {
        return objArr.reduce((acc, obj) => {
            let key = obj[`${objKeyforGrouping}`];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }
}

let arrayStatsService = {

    getSum(array) {
        return array.reduce((sum, item) => sum + parseInt(item), 0);
    }
}
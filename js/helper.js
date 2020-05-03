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
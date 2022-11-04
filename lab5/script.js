'use strict';
const colorPicker = document.getElementById('color-picker');
const functionalCell = document.getElementById('cell3');
const inputDataResultDiv = document.querySelector('div#input-data-result');
const submitBtn = document.getElementById('submit-btn');


const fillingMainDiagonal = (tableRows, color) => {
  let i = 0;
  for (const row of tableRows) {
    const cells = row.cells;
    const cell = cells[i];
    cell.style.backgroundColor = color;
    i++;
  }
};

functionalCell.addEventListener('dblclick', () => {
  const tableRows = document.querySelectorAll('#table tr');
  const color = colorPicker.value;
  fillingMainDiagonal(tableRows, color);
});

functionalCell.addEventListener('mouseover', e => {
  const randomColorHex = '#' + Math.floor(Math.random() * 16777216).toString(16);
  e.target.style.backgroundColor = randomColorHex;
});

functionalCell.addEventListener('click', e => {
  e.target.style.backgroundColor = colorPicker.value;
});

const validationRules = {
  'full-name': {
    regexp: /^[Є-ЯҐ][а-їґ]* [Є-ЯҐ]\.[Є-ЯҐ]\.$/,
    alert: 'Введіть ПІБ в форматі "Ониськів Д.Є."',
  },
  'phone': {
    regexp: /^\([0-9]{3}\)-[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
    alert: 'Введіть номер телефону в форматі "(XXX)-XXX-XX-XX"',
  },
  'id-card': {
    regexp: /^[А-ЯІЇЄ|A-Z]{1,2}\s[№][0-9]{1,6}$/,
    alert: 'Введіть номер ID-карти "ТТ №000000"',
  },
  'faculty': {
    regexp: /^[Є-ЯҐ]+$/,
    alert: 'Введіть назву факультету в форматі "ФІОТ"',
  },
  'date-of-birth': {
    regexp: /^(\d{2}\.){2}\d{4}$/,
    alert: 'Введіть дату народження в форматі "01.01.2003"',
  },
};

const addWarningAlert = elem => {
  const nextElemId = elem.nextSibling.id;
  if (nextElemId === `${elem.id}-warning`) {
    return;
  }
  const alertElem = document.createElement('div');
  alertElem.id = elem.id + '-warning';
  alertElem.textContent = validationRules[`${elem.id}`].alert;
  alertElem.classList.add('validation-warning');
  elem.after(alertElem);
};

const inputFields = document.querySelectorAll('form#form fieldset input');
for (const field of inputFields) {
  field.addEventListener('focusin', e => {
    e.target.classList.remove('field-warning');
    const warningAlertElem = document.getElementById(`${e.target.id}-warning`);
    if (warningAlertElem) {
      warningAlertElem.remove();
    }
    inputDataResultDiv.classList.add('hidden');
  });
}

const dataFieldsDescriptions = {
  'full-name': 'ПІБ',
  'phone': 'Номер телефону',
  'id-card': 'ID-карта',
  'faculty': 'Факультет',
  'date-of-birth': 'Дата народження'
};

const displayFormData = inputFieldsNodes => {
  for (const field of inputFieldsNodes) {
    const fieldId = field.id;
    const resultDiv = document.querySelector(`div#input-data-result > div#${fieldId}`);
    inputDataResultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `<strong>${dataFieldsDescriptions[fieldId]}:</strong> ${field.value}`;
  }
};

submitBtn.addEventListener('click', () => {
  let isDataValid = true;
  const inputFields = document.querySelectorAll('form#form fieldset input');
  for (const field of inputFields) {
    const input = field.value;
    const { regexp } = validationRules[field.id];
    if (!regexp.test(input)) {
      isDataValid = false;
      field.classList.add('field-warning');
      addWarningAlert(field);
    }
  }
  if (!isDataValid) {
    inputDataResultDiv.classList.add('hidden');
    return;
  }
  displayFormData(inputFields);
});
const variableMap = new Map();
const dictionary  = new Map();

const city = ['Москва', 'Санкт-Петербург', 'Челябинск'];
variableMap.set("city", city);
dictionary.set("city", "город");

const workshop = {
    "Москва": ["Цех 1", "Цех 2"],
    "Санкт-Петербург": ["Цех 3", "Цех 4"],
    "Челябинск": ["Цех 5"]
};
variableMap.set("workshop", workshop);
dictionary.set("workshop", "цех");

const employee = {
    "Цех 1": ["Сотрудник 1", "Сотрудник 2"],
    "Цех 2": ["Сотрудник 3"],
    "Цех 3": ["Сотрудник 4", "Сотрудник 5"],
    "Цех 4": ["Сотрудник 6"],
    "Цех 5": ["Сотрудник 7", "Сотрудник 8"]
};
variableMap.set("employee", employee);
dictionary.set("employee", "сотрудника");

const brigade = {
    "Сотрудник 1": ["Бригада 1", "Бригада 2"],
    "Сотрудник 2": ["Бригада 3"],
    "Сотрудник 3": ["Бригада 4"],
    "Сотрудник 4": ["Бригада 5"],
    "Сотрудник 5": ["Бригада 6"],
    "Сотрудник 6": ["Бригада 7"],
    "Сотрудник 7": ["Бригада 8"],
    "Сотрудник 8": ["Бригада 9"]
};
variableMap.set("brigade", brigade);
dictionary.set("brigade", "бригаду");

const shift = ['День', 'Ночь'];
variableMap.set("shift", shift);
dictionary.set("shift", "смену");

const formData = [];

(() => {
    const form = document.getElementById('selectionForm')

    for (let element of form.elements) {
        if (element.id) {
            if (element.tagName === 'SELECT') {
                formData.push(element.id);
            }
        }
    }

    formData.forEach(key => {
        const select = document.getElementById(key)
        select.addEventListener('change', (e) => update(e.target.id))
    })

    const first = formData[0]

    const firstSelect = document.getElementById(first);

    variableMap.get(first).forEach(name => {
        firstSelect.innerHTML += `<option value="${name}">${name}</option>`;
    });
})();

function update(id) {
    const value = document.getElementById(id).value;
    const index = formData.indexOf(id);

    const last = formData.length-1 === index

    if (value) {
        document.getElementById(id).options[0].disabled = true;
    }

    if (last) {
        checkFormCompletion();
        return;
    }

    const select = document.getElementById(formData[index+1]);
    const text = `Выберите ${dictionary.get(id)}`;
    select.innerHTML = `<option value="default">${text}</option>`;
    select.disabled = false;

    if (formData.length -2 === index) {
        variableMap.get(formData.at(-1)).forEach(name => {
            select.innerHTML += `<option value="${name}">${name}</option>`;
        });
        return;
    }

    if (variableMap.has(formData[index+1])) {
        Array.from(variableMap.get(formData[index+1])[value]).forEach(name => {
            select.innerHTML += `<option value="${name}">${name}</option>`;
        });
    }
    checkFormCompletion();
}

function checkFormCompletion() {
    const saveButton = document.getElementById('saveButton');
    saveButton.disabled = formData.some(id => document.getElementById(id).value === 'default');
}

function saveToCookie() {
    const data = formData.reduce((acc, cur) => {
        acc[cur] = document.getElementById(cur).value;
        return acc;
    }, {});

    const jsonData = JSON.stringify(data);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();

    document.cookie = `saveData=${jsonData}; expires=${expires}; path=/`;
    showMessage();
    resetForm();
}

function showMessage() {
    const message = document.getElementById('message');
    message.textContent = "Данные сохранены";
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
}

function resetSelect(id) {
    const select = document.getElementById(id);
    select.value = 'default';
    if (id !== 'city') {
        select.disabled = true;
    }
}

function resetForm() {
    formData.forEach(id => resetSelect(id));
    document.getElementById('saveButton').disabled = true;
}
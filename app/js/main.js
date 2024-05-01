
var CountryInfo = document.querySelector('.country-value')
var CountryList = CountryInfo.querySelectorAll('optgroup');
var optionList = [];
CountryList.forEach((item, index) => {
    var options = item.querySelectorAll('option');
    optionList.push(options);
})



flatpickr('#calendar1', {
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "j M",
    minDate: "today",
    maxDate: new Date().fp_incr(30),
    "disable": [
        function (date) {
            return (date.getDay() === 0);
        }
    ],
    "locale": "ru",
})

flatpickr('#calendar2', {
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "j M",
    minDate: "today",
    maxDate: new Date().fp_incr(60),
    "disable": [
        function (date) {
            return (date.getDay() === 0);
        }
    ],
    "locale": "ru",
})

document.addEventListener("DOMContentLoaded", function () {
    const SelectTown = document.querySelectorAll('.routes__form-town');
    const ReplaceBtn = document.querySelector('.routes__form-replace');
    const choicesInstances = [];
    const choices1 = new Choices(SelectTown[0], {
        itemSelectText: '',
        position: 'bottom',
        maxItemCount: 1,
        editItems: true,
        searchPlaceholderValue: '',
        placeholderValue: 'Москва',
        noResultsText: 'Ничего не найдено',
        position: 'auto',
        classNames: {
            containerOuter: 'townfrom',
            listItems: 'townfrom__list--multiple',
            listDropdown: 'townfrom__list--dropdown',
        },
        maxItemText: (maxItemCount) => {
            return `<a href='#search' class='choice-link' onclick="SearchCountryFrom(this)">Искать на карте<a>`;
        },

    })

    const choices2 = new Choices(SelectTown[1], {
        itemSelectText: '',
        position: 'bottom',
        maxItemCount: 1,
        editItems: true,
        searchPlaceholderValue: '',
        placeholderValue: 'Париж',
        noResultsText: 'Ничего не найдено',
        position: 'auto',
        classNames: {
            containerOuter: 'townfrom',
            listItems: 'townfrom__list--multiple',
            listDropdown: 'townfrom__list--dropdown',
        },
        maxItemText: (maxItemCount) => {
            return `<a href='#search' class='choice-link' onclick="SearchCountryTo(this)">Искать на карте<a>`;
        },

    })
    choicesInstances.push(choices1);
    choicesInstances.push(choices2);


    const ReplaceItems = document.querySelectorAll('.townfrom__list--multiple');
    ReplaceBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (ReplaceItems[0].childElementCount > 0 && ReplaceItems[1].childElementCount > 0) {
            var Text = choicesInstances[0].getValue(true);
            choicesInstances[0].removeActiveItems();
            choicesInstances[0].setChoiceByValue(choicesInstances[1].getValue(true));
            choicesInstances[1].removeActiveItems();
            choicesInstances[1].setChoiceByValue(Text);
        }
    })
    SelectTown.forEach((item, index) => {
        item.addEventListener("addItem", function (event) {
            const Input = document.querySelectorAll('.choices__input--cloned');
            Input[index].setAttribute('placeholder', ' ');
            Input[index].setAttribute('readonly', 'readonly');
        })
    })
    SelectTown.forEach((item, index) => {
        item.addEventListener("removeItem", function (event) {
            const Input = document.querySelectorAll('.choices__input--cloned');
            Input[index].setAttribute('placeholder', 'Москва');
            choicesInstances[index].enable();
            Input[index].removeAttribute('readonly');
        })
    })



})



function SearchCountryFrom(node) {
    const ChoicesSelectFrom = document.querySelectorAll('.choices__item--selectable');
    const SearchInput = document.querySelector('.search__input');
    const SearchBtn = document.querySelector('.search__btn');
    CountryList.forEach((item, x) => {
        optionList[x].forEach((node, y) => {
            if (node.innerHTML == ChoicesSelectFrom[0].innerHTML) {
                SearchInput.value = item.getAttribute('label');
                SearchBtn.click();
            }
        })
    })
}
function SearchCountryTo(node) {
    const ChoicesSelectTo = document.querySelectorAll('.choices__item--selectable');
    const SearchInput = document.querySelector('.search__input');
    const SearchBtn = document.querySelector('.search__btn');
    CountryList.forEach((item, x) => {
        optionList[x].forEach((node, y) => {
            if (node.innerHTML == ChoicesSelectTo[1].innerHTML) {
                SearchInput.value = item.getAttribute('label');
                SearchBtn.click();
            }
        })
    })
}



document.addEventListener("DOMContentLoaded", function () {
    const UserBtn = document.querySelector('.routes__form-output');
    const UserWindow = document.querySelector('.routes__form-window');
    UserBtn.addEventListener('click', function () {
        UserWindow.classList.toggle('routes__form-window--active');
        this.classList.toggle('routes__form-output--active');
    })
    document.addEventListener('click', function (event) {
        if (!UserWindow.contains(event.target) && !UserBtn.contains(event.target)) {
            UserWindow.classList.remove('routes__form-window--active');
            UserBtn.classList.remove('routes__form-output--active');
        }
    });
})

document.addEventListener("DOMContentLoaded", function () {
    const Minus = document.querySelectorAll('.minus');
    const Plus = document.querySelectorAll('.plus');
    const Counter = document.querySelectorAll('.counter__number');
    const OutputPassenger = document.querySelector('.output__passenger');
    const count = Array.from(Counter).map(item => item.innerHTML);
    let Sum = 0;
    count.forEach(item => {
        Sum += Number(item);
    })
    CheckForm(Sum);

    function CheckForm(counter) {
        if (counter == 1) {
            return OutputPassenger.innerHTML = `${counter} пассажир`;
        }
        if (1 < counter && counter < 5) {
            return OutputPassenger.innerHTML = `${counter} пассажира`;
        }
        if (counter > 4) {
            return OutputPassenger.innerHTML = `${counter} пассажиров`;
        }
    }

    Minus.forEach((item, index) => {
        item.addEventListener('click', function () {
            if (index == 0) {
                if (count[index] <= 2) {
                    Minus[index].classList.add('minus--disabled');
                }
                if (count[index] > 1) {
                    --count[index];
                    Counter[index].innerHTML = count[index];
                    --Sum;
                    CheckForm(Sum);
                    Plus.forEach(item => {
                        item.classList.remove('plus--disabled');
                    })
                    if (count[2] >= count[0]) {
                        Plus[2].classList.add('plus--disabled');
                    }
                }
                if (count[index] < count[2]) {
                    --count[2];
                    Counter[2].innerHTML = count[2];
                    --Sum;
                    CheckForm(Sum);
                }
                if (count[index] == count[2]) {
                    Plus[2].classList.add('plus--active');
                }
            }
            else {
                if (count[index] <= 1) {
                    Minus[index].classList.add('minus--disabled');
                }
                if (count[index] > 0) {
                    --count[index];
                    Counter[index].innerHTML = count[index];
                    --Sum;
                    CheckForm(Sum);
                    Plus.forEach(item => {
                        item.classList.remove('plus--disabled');
                    })
                    if (count[2] >= count[0]) {
                        Plus[2].classList.add('plus--disabled');
                    }
                    if (index == 2) {
                        Plus[2].classList.remove('plus--active');
                    }
                }
            }
        })
    })
    Plus.forEach((item, index) => {
        item.addEventListener('click', function () {
            if (index == 2) {
                if (Sum == 9) {
                    Plus.forEach(item => {
                        item.classList.add('plus--disabled');
                    })
                }
                if (count[index] <= (count[0] - 1) && Sum <= 9) {
                    ++count[index];
                    Counter[index].innerHTML = count[index];
                    ++Sum;
                    CheckForm(Sum);
                    Minus[index].classList.remove('minus--disabled');
                }
                if (count[index] >= (count[0])) {
                    Plus[index].classList.add('plus--active');
                    Plus[index].classList.add('plus--disabled');
                }
            }
            else {

                if (Sum <= 9) {
                    ++count[index];
                    Counter[index].innerHTML = count[index];
                    ++Sum;
                    CheckForm(Sum);
                    Minus[index].classList.remove('minus--disabled');
                    if (index == 0) {
                        Plus[2].classList.remove('plus--active');
                        Plus[2].classList.remove('plus--disabled');
                    }
                }
                if (Sum == 10) {
                    Plus.forEach(item => {
                        item.classList.add('plus--disabled');
                    })
                }
            }

        })
    })

})


const OutputClass = document.querySelector('.output__class');
function CheckValue() {
    document.querySelectorAll('.choice__radio').forEach(item => {
        if (item.checked) {
            OutputClass.innerHTML = item.value;
        }
    })
}
CheckValue();
function CheckType(node) {
    OutputClass.innerHTML = node.value;
}

document.addEventListener("DOMContentLoaded", function () {
    const Search = document.querySelector('.search');
    Search.addEventListener('mousemove', e => {
        Object.assign(document.documentElement, {
            style: `
                --move-x: ${e.pageX - Search.offsetLeft}px;
                --move-y: ${e.pageY - Search.offsetTop}px;
            `
        })
    })
    function Map() {
        const Path = document.querySelectorAll('path');
        const Cursor = document.querySelector('.search__cursor');
        const SearchTitle = document.querySelector('.search__left-title');
        const SearchText = document.querySelector('.search__left-text');
        const Capital = document.querySelector('.search__wrapper-capital');
        const Population = document.querySelector('.search__wrapper-population');
        const SearchLink = document.querySelector('.search__left-link');
        const SearchLocation = document.querySelector('.search__location');
        const SearchBtn = document.querySelector('.search__btn');
        Path.forEach(item => {
            var CountryTitle = item.getAttribute('value');
            var CountryNumber = item.getAttribute('country');
            var CoutryInfo = document.querySelector(`.country-${CountryNumber}`);
            item.addEventListener('mouseover', function () {
                if (CountryTitle) {
                    Cursor.style.display = 'block';
                    Cursor.innerHTML = CountryTitle;
                }
            })
            item.addEventListener('mouseout', function () {
                Cursor.style.display = 'none';
            })
            item.addEventListener('click', function (e) {
                Path.forEach(node => {
                    node.style.fill = '#A2A3A5';
                })
                item.style.fill = '#F5D152';
                SearchTitle.innerHTML = CountryTitle;
                SearchText.innerHTML = CoutryInfo.querySelector('.text').innerHTML;
                Capital.innerHTML = CoutryInfo.querySelector('.capital').innerHTML;
                Population.innerHTML = CoutryInfo.querySelector('.population').innerHTML;
                SearchLocation.style.display = 'block';
                SearchLocation.style.left = `${e.pageX - Search.offsetLeft - 7}px`;
                SearchLocation.style.top = `${e.pageY - Search.offsetTop - 15}px`;
                document.querySelector('.search__input').value = CountryTitle;
            })
            SearchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const SearchInput = document.querySelector('.search__input').value;
                if (SearchInput == CountryTitle) {
                    Path.forEach(node => {
                        node.style.fill = '#A2A3A5';
                    })
                    item.style.fill = '#F5D152';
                    SearchTitle.innerHTML = CountryTitle;
                    SearchText.innerHTML = CoutryInfo.querySelector('.text').innerHTML;
                    Capital.innerHTML = CoutryInfo.querySelector('.capital').innerHTML;
                    Population.innerHTML = CoutryInfo.querySelector('.population').innerHTML;
                    SearchLocation.style.display = 'none';
                }
            })
        })
        SearchLink.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('search__left-link--active');
            this.innerHTML = 'Читать еще';
            if (this.classList.contains('search__left-link--active')) {
                this.innerHTML = 'Скрыть';
            }
            SearchText.classList.toggle('search__left-text--active');
        })

    }
    Map();
})

document.addEventListener("DOMContentLoaded", function () {
    const ListTitle = document.querySelectorAll('.answer__list-title');
    const ListText = document.querySelectorAll('.answer__list-text');
    ListTitle.forEach((item, index) => {
        item.addEventListener('click', function (e) {
            ListTitle.forEach((item, i) => {
                if(i !== index){
                    ListTitle[i].classList.remove('answer__list-title--active');
                    ListText[i].classList.remove('answer__list-text--active');
                }
            })
            item.classList.toggle('answer__list-title--active');
            ListText[index].classList.toggle('answer__list-text--active');
        })
    })
})

document.addEventListener("DOMContentLoaded", function () {
    const MenuBtn = document.querySelector('.burger');
    const Menu = document.querySelector('.menu');
    MenuBtn.addEventListener('click', function(e){
        e.preventDefault();
        MenuBtn.classList.toggle('burger--active');
        Menu.classList.toggle('menu--active');
    })
})



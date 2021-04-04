// here we need to get a list of journal names, can be done before page is fully loaded.
// the list needs to be sorted alphabetically
const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

// on page load
document.addEventListener('DOMContentLoaded', (event) => {
    let text_input_element = document.getElementById("searchInput")
    // we start the functionality of autocomplete
    autocomplete(text_input_element, countries)
})

/**
    creating autocomplete functionality for search.
    @param input - input of type text element (the search input is entered there)
    @param list - list of journal names
 */
function autocomplete(input, list) {
    // variable to help keep track of the item in focus
    let currFocus = -1;

    // event for changing the content in the input element
    input.addEventListener('input', (event) => {
        currFocus = -1
        createAutocompleteList()
    })

    // event for clicking the input element
    input.addEventListener('click', (event) => {
        currFocus = -1
        createAutocompleteList()
    })

    // when clicking on screen we close the autocomplete list, unless we clicked the input field.
    document.addEventListener('click', (event) => {
        if (event.target !== input)
            closeList()
    })

    // event for pressing the keyboard
    input.addEventListener('keydown', (event) => {
        let x = document.getElementById('autocomplete-list')
        // checks first if list exists
        if (x) {
            // DOWN or UP
            if (event.keyCode === 40 || event.keyCode === 38) {
                // first time we use keyboards on list
                if (currFocus !== -1)
                    // remove active class from prev focus
                    removeActiveClass(x, currFocus)
                // DOWN key was pressed
                if (event.keyCode === 40)
                    currFocus++
                // UP key was pressed
                if (event.keyCode === 38)
                    currFocus--
                // fixes the currFocus value (mod x.length)
                if (currFocus >= x.childNodes.length)
                    currFocus = 0
                else if (currFocus < 0)
                    currFocus = x.childNodes.length - 1
                // add active class to curr focus
                addActiveClass(x, currFocus)
                input.focus()
            } else if (event.keyCode === 13) {
                // prevents default action of the enter keyCode
                event.preventDefault()
                if (currFocus > -1 && currFocus < x.childNodes.length)
                    // simulates a click on list's option
                    x.childNodes[currFocus].click()
            }
        }
    })

    /**
     * createAutocompleteList function.
     * responsible for creating the div which will contain the items.
     */
    function createAutocompleteList() {
        // first we close a list if one is open
        closeList()
        let val = input.value
        // checks for value
        if (!val) return false

        let divItems = document.createElement('div')
        divItems.setAttribute('id', 'autocomplete-list')
        document.getElementById('autocomplete').appendChild(divItems)

        // goes over the list to check which names need to be added
        for (let i = 0; i < list.length; i++) {
            // prefix of journal name is the same as the user's input
            if (list[i].substr(0,val.length).toLowerCase() === val.toLowerCase()) {
                divItems.appendChild(addItemToList(list[i], val))
            }
        }
    }

    /**
     * addItemToList function.
     * creates journal name item.
     * @param item - name of journal we want to add to list
     * @param val - the value the user entered in the search field
     * @returns {HTMLDivElement} - div element of the item
     */
    function addItemToList(item, val) {
        let divItem = document.createElement('div')
        // enables to focus an element programmatically
        divItem.setAttribute('tabindex', '-1')
        divItem.innerHTML = "<strong>" + item.substr(0, val.length) + "</strong>" +item.substr(val.length)
        // we add this input field so we can know the value of the user's choice. user won't see it.
        divItem.innerHTML += "<input type='hidden' value='" + item + "'>"
        divItem.addEventListener('click', (event) => {
            input.value = divItem.getElementsByTagName('input')[0].value
            closeList()
        })
        return divItem
    }

    /**
     * addActiveClass function.
     * @param autocompleteItems - div element that contains the items' list
     * @param currentFocus - index of item in focus
     */
    function addActiveClass(autocompleteItems, currentFocus) {
        autocompleteItems.childNodes[currentFocus].classList.add('autocomplete-active')
        autocompleteItems.childNodes[currentFocus].focus()
    }

    /**
     * removeActiveClass function.
     * @param autocompleteItems - div element that contains the items' list
     * @param currentFocus - index of item in focus
     */
    function removeActiveClass(autocompleteItems, currentFocus) {
        autocompleteItems.childNodes[currentFocus].classList.remove('autocomplete-active')
    }

    /**
     * closeList function.
     * if list exists:
     * removes all items from list of items.
     * at last deletes the list itself.
     */
    function closeList() {
        let x = document.getElementById('autocomplete-list')
        if (x) {
            for (let i = 0; i < x.childNodes.length; i++) {
                x.removeChild(x.childNodes[i])
                i--
            }
            document.getElementById('autocomplete').removeChild(x)
        }
    }
}

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
/**
 creating autocomplete functionality for search.
 @param input - input of type text element (the search input is entered there)
 @param list - list of journal names
 */
function autocomplete(input, list) {
    // variable to help keep track of the item in focus
    let currFocus = -1;

    input.on('input', function() {
        currFocus = -1
        createAutocompleteList()
    })

    input.click(function () {
        currFocus = -1
        createAutocompleteList()
    });

    $(document).on('click', function (event) {
        console.log(event.target)
        console.log(input)
        if (event.target !== input[0])
            closeList()
    })

    // event for pressing the keyboard
    input.on('keydown', function(event) {
        let x = $('#autocomplete-list')[0]
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
                if (currFocus >= x.children.length)
                    currFocus = 0
                else if (currFocus < 0)
                    currFocus = x.children.length - 1
                // add active class to curr focus
                addActiveClass(x, currFocus)
                input.focus()
            } else if (event.keyCode === 13) {
                // prevents default action of the enter keyCode
                event.preventDefault()
                if (currFocus > -1 && currFocus < x.children.length)
                    // simulates a click on list's option
                    x.children[currFocus].click()
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
        let val = input.val()
        // checks for value
        if (!val) return false

        let divItems = $('<div></div>').attr('id','autocomplete-list')
        // goes over the list to check which names need to be added
        for (let i = 0; i < list.length; i++) {
            // prefix of journal name is the same as the user's input
            if (list[i].substr(0,val.length).toLowerCase() === val.toLowerCase()) {
                divItems.append(addItemToList(list[i], val))
            }
        }
        $('#autocomplete').append(divItems)
        console.log(divItems[0])
    }

    /**
     * addItemToList function.
     * creates journal name item.
     * @param item - name of journal we want to add to list
     * @param val - the value the user entered in the search field
     * @returns {HTMLDivElement} - div element of the item
     */
    function addItemToList(item, val) {
        // enables to focus an element programmatically
        let divItem = $('<div></div>').attr('tabindex', '-1').addClass('list-item')
        // we add this input field so we can know the value of the user's choice. user won't see it.
        divItem.html("<strong>" + item.substr(0, val.length) + "</strong>" +item.substr(val.length) + "<input type='hidden' value='" + item + "'>")
        divItem.on('click', function() {
            input.val(divItem.children('input')[0].value)
            closeList()
        })
        // returns a div
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
        $('.list-item').remove()
        $('#autocomplete-list').remove()
    }
}
// the list needs to be sorted alphabetically
let journal_names = [];

/**
 * getJournalNamesList function.
 * function that needs to be executed only ones to get the list.
 */
$.ajax({
    type: 'GET',
    url: "../journals_names",
    success: function (result) {
        journal_names = result.sort()
        $(document).ready(()=> {
            // we start the functionality of autocomplete
            autocomplete($('#searchInput'), journal_names)
        });
    },
    error: function (XMLHttpRequest, textStatus) {
        console.log(textStatus)
    }
});
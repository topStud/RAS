// creates immutable object
const searchOptions = Object.freeze({
    JOURNAL_NAME: 'journalName',
    SUBJECT_AREA: 'subjectArea',
    ISSN: 'issn'
})

let currentSearchOption = searchOptions.JOURNAL_NAME

// getting the list of journal names for autocomplete
sendGetRequest("../journals_names", function (result) {
    $(document).ready(()=> {
        // we start the functionality of autocomplete
        autocomplete($('#searchInput'), result.sort())
    });
}, ajaxError)

// on page load
$(document).ready(() => {
    $('#searchButton').on('click', onSearchClick)
    $('#journalName').addClass('chosenSearchOption')
    $('.search-option').on('click', onClickSearchOption)
})

function onClickSearchOption(event) {
    $('#' + currentSearchOption).removeClass('chosenSearchOption')
    currentSearchOption = event.target.id
    $('#' + event.target.id).addClass('chosenSearchOption')
    switch (currentSearchOption) {
        case searchOptions.JOURNAL_NAME:
            console.log(searchOptions.JOURNAL_NAME)
            break
        case searchOptions.SUBJECT_AREA:
            console.log(searchOptions.SUBJECT_AREA)
            break
        case searchOptions.ISSN:
            console.log(searchOptions.ISSN)
            break
    }
}

function onSearchClick() {
    let input = $('#searchInput')
    if (input.val() !== '') {
        // clear input field
        input.val('')
        // request data of the journal
        sendGetRequest('../journals_info', addDataToTable, ajaxError)
    }
}

function addDataToTable(result) {
    // let tbody = $('#journals-output')
    // for (let i = 0; i < result.length; i++) {
    //     let newRow = $('<tr></tr>')
    //     // i need to add here columns
    //     tbody.append(newRow)
    // }
    console.log('in success')
}

function sendGetRequest(url, sucFunc, errFunc) {
    $.ajax({
        type: 'GET',
        url: url,
        success: sucFunc,
        error: errFunc
    })
}

function ajaxError(XMLHttpRequest, textStatus) {
    console.log(textStatus)
}
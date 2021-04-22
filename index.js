//list.entries[x] = {
//     "API": "Cat Facts",
//     "Description": "Daily cat facts",
//     "Auth": "",
//     "HTTPS": true,
//     "Cors": "no",
//     "Link": "https://alexwohlbruck.github.io/cat-facts/",
//     "Category": "Animals"
// }

let pageNumber = 1
let fullApiList = []
let workingApiList = []
let pagedApiList = []
let currentFilter = ``
const tbody = document.getElementById(`api-table-body`)
const noAuthBtn = document.getElementById('no-auth-button')
const apiKeyBtn = document.getElementById('apikey-button')
const oAuthBtn = document.getElementById('oauth-button')
const otherAuthBtn = document.getElementById('other-auth-button')
const showAllBtn = document.getElementById('show-all-button')
const searchBox = document.getElementById('search-bar')

showAllBtn.style.backgroundColor = "rgb(100, 100, 100)"


const getApiList = () => {
    return fetch(`https://api.publicapis.org/entries`)
    .then(r => r.json())
}

const revertPageState = (e) => {
    pageNumber=1
    const buttons = [noAuthBtn, apiKeyBtn, oAuthBtn, otherAuthBtn, showAllBtn]
    buttons.forEach((button) => {
        button.style.backgroundColor = "rgb(170, 170, 170)"
    })
}


const addApiToTbody = (api) => {
    tbody.innerHTML += `<tr><td class="nameTd"><a href="${api.Link}">${api.API}</a></td><td class="descTd">${api.Description}</td><td>${api.Category}</td><td>${api.Auth}</td><td>${api.Cors}</td><td>${api.HTTPS}</td></tr>`
}

const filterList = (arr) => {
    workingApiList = []
    const searchTerm = searchBox.value.toLowerCase()
    arr.forEach((api) => {
        if (
            api.Auth === currentFilter 
            && (
                searchTerm==="" 
                || api.API.toLowerCase().includes(searchTerm)
                || api.Description.toLowerCase().includes(searchTerm)
            )
        ) {
            workingApiList.push(api)
        }
    })
    appendNewPageToTable()
}

const filterByOther = (arr) => {
    workingApiList = []
    const searchTerm = searchBox.value.toLowerCase()
    arr.forEach ((api) => {
        if (
            (
                api.Auth === `X-Mashape-Key` 
                || api.Auth === `User-Agent`
            ) && (
                searchTerm==="" 
                || api.API.toLowerCase().includes(searchTerm)
                || api.Description.toLowerCase().includes(searchTerm)
            )
        ) {
            workingApiList.push(api)
        }
    })
    workingApiList.forEach(api => addApiToTbody(api))
}

const appendNewPageToTable = () => {
    pagedApiList = workingApiList.slice((pageNumber-1)*20, pageNumber*20)
    tbody.innerHTML=""
    pagedApiList.forEach(api => addApiToTbody(api))
}

noAuthBtn.addEventListener("click", () => {
    revertPageState()
    currentFilter = ``
    noAuthBtn.style.backgroundColor="rgb(100, 100, 100)"
    filterList(fullApiList)
})

apiKeyBtn.addEventListener("click", () => {
    revertPageState()
    currentFilter = `apiKey`
    apiKeyBtn.style.backgroundColor="rgb(100, 100, 100)"
    filterList(fullApiList)
})

oAuthBtn.addEventListener("click", () => {
    revertPageState()
    currentFilter = `OAuth`
    oAuthBtn.style.backgroundColor="rgb(100, 100, 100)"
    filterList(fullApiList)
})

otherAuthBtn.addEventListener("click", () => {
    revertPageState()
    tbody.innerHTML=""
    currentFilter = ``
    otherAuthBtn.style.backgroundColor="rgb(100, 100, 100)"
    filterByOther(fullApiList)
})

showAllBtn.addEventListener("click", () => {
    revertPageState()
    tbody.innerHTML=""
    showAllBtn.style.backgroundColor="rgb(100, 100, 100)"
    workingApiList = fullApiList
    pagedApiList = workingApiList.slice((pageNumber-1)*20, pageNumber*20)
    pagedApiList.forEach(api => addApiToTbody(api))
})


document.getElementById(`next-page-button`).addEventListener("click", () => {
    if (workingApiList.slice(pageNumber*20, (pageNumber+1)*20).length > 0) {
        pageNumber++
        appendNewPageToTable()
    }
})

document.getElementById(`prev-page-button`).addEventListener("click", () => {
    if (pageNumber >= 2) {
        pageNumber--
        appendNewPageToTable()
    }
})

getApiList().then(list => {
    list.entries.forEach(api => fullApiList.push(api))
    workingApiList = fullApiList
    pagedApiList = fullApiList.slice((pageNumber-1)*20, pageNumber*20)
    pagedApiList.forEach(api => addApiToTbody(api))
    // console.log(fullApiList)
})


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

showAllBtn.style.backgroundColor = "rgb(100, 100, 100)"


const getApiList = () => {
    return fetch(`https://api.publicapis.org/entries`)
    .then(r => r.json())
}

const revertPageState = (e) => {
    tbody.innerHTML = ""
    pageNumber=1
    const buttons = [noAuthBtn, apiKeyBtn, oAuthBtn, otherAuthBtn, showAllBtn]
    buttons.forEach((button) => {
        button.style.backgroundColor = "rgb(170, 170, 170)"
    })
}


const addApiToTbody = (api) => {
    tbody.innerHTML += `<tr><td><a href="${api.Link}">${api.API}</a></td><td>${api.Description}</td><td>${api.Category}</td><td>${api.Auth}</td><td>${api.Cors}</td><td>${api.HTTPS}</td></tr>`
}

const filterList = (arr) => {
    workingApiList = []
    arr.forEach((api) => {
        if (api.Auth === currentFilter) {
            workingApiList.push(api)
        }
    })
    pagedApiList = workingApiList.slice((pageNumber-1)*20, pageNumber*20)
    pagedApiList.forEach(api => addApiToTbody(api))
}

const filterByOther = (arr) => {
    workingApiList = []
    arr.forEach ((api) => {
        if (api.Auth === `X-Mashape-Key` || api.Auth === `User-Agent`) {
            workingApiList.push(api)
        }
    })
    workingApiList.forEach(api => addApiToTbody(api))
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
    otherAuthBtn.style.backgroundColor="rgb(100, 100, 100)"
    filterByOther(fullApiList)
})

showAllBtn.addEventListener("click", () => {
    revertPageState()
    showAllBtn.style.backgroundColor="rgb(100, 100, 100)"
    pagedApiList = fullApiList.slice((pageNumber-1)*20, pageNumber*20)
    pagedApiList.forEach(api => addApiToTbody(api))
})

getApiList().then(list => {
    list.entries.forEach(api => fullApiList.push(api))
    pagedApiList = fullApiList.slice((pageNumber-1)*20, pageNumber*20)
    pagedApiList.forEach(api => addApiToTbody(api))
    // console.log(fullApiList)
})


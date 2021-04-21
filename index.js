//list.entries[x] = {
//     "API": "Cat Facts",
//     "Description": "Daily cat facts",
//     "Auth": "",
//     "HTTPS": true,
//     "Cors": "no",
//     "Link": "https://alexwohlbruck.github.io/cat-facts/",
//     "Category": "Animals"
// }

let fullApiList = []
let workingApiList = []
const tbody = document.getElementById(`api-table-body`)
const noAuthBtn = document.getElementById('no-auth-button')
const apiKeyBtn = document.getElementById('apikey-button')
const oAuthBtn = document.getElementById('oauth-button')
const otherAuthBtn = document.getElementById('other-auth-button')
const showAllBtn = document.getElementById('show-all-button')

showAllBtn.style.backgroundColor = "rgb(100, 100, 100)"

const revertBtnClr = () => {
    const buttons = [noAuthBtn, apiKeyBtn, oAuthBtn, otherAuthBtn, showAllBtn]
    buttons.forEach((button) => {
        button.style.backgroundColor = "rgb(170, 170, 170)"
    })
}

const getApiList = () => {
    return fetch(`https://api.publicapis.org/entries`)
    .then(r => r.json())
}



const addApiToTbody = (api) => {
    tbody.innerHTML += `<tr><td><a href="${api.Link}">${api.API}</a></td><td>${api.Description}</td><td>${api.Category}</td><td>${api.Auth}</td><td>${api.Cors}</td><td>${api.HTTPS}</td></tr>`
}

const filterByNoAuth = (arr) => {
    workingApiList = []
    arr.forEach((api) => {
        if (api.Auth === "") {
            workingApiList.push(api)
        }
    })
    workingApiList.forEach(api => addApiToTbody(api))
}

const filterByKey = (arr) => {
    workingApiList = []
    arr.forEach((api) => {
        if (api.Auth === "apiKey") {
            workingApiList.push(api)
        }
    })
    workingApiList.forEach(api => addApiToTbody(api))
}

const filterByOAuth = (arr) => {
    workingApiList = []
    arr.forEach((api) => {
        if (api.Auth === "OAuth") {
            workingApiList.push(api)
        }
    })
    workingApiList.forEach(api => addApiToTbody(api))
}

const filterByOther = (arr) => {
    workingApiList = []
    arr.forEach ((api) => {
        if (api.Auth === "X-Mashape-Key" || api.Auth === "User-Agent") {
            workingApiList.push(api)
        }
    })
    workingApiList.forEach(api => addApiToTbody(api))
}

noAuthBtn.addEventListener("click", () => {
    tbody.innerHTML = ""
    revertBtnClr()
    noAuthBtn.style.backgroundColor="rgb(100, 100, 100)"
    filterByNoAuth(fullApiList)
})

apiKeyBtn.addEventListener("click", () => {
    tbody.innerHTML=""
    revertBtnClr()
    apiKeyBtn.style.backgroundColor="rgb(100, 100, 100)"
    filterByKey(fullApiList)
})

oAuthBtn.addEventListener("click", () => {
    tbody.innerHTML=""
    revertBtnClr()
    oAuthBtn.style.backgroundColor="rgb(100, 100, 100)"
    filterByOAuth(fullApiList)
})

otherAuthBtn.addEventListener("click", () => {
    tbody.innerHTML=""
    revertBtnClr()
    otherAuthBtn.style.backgroundColor="rgb(100, 100, 100)"
    filterByOther(fullApiList)
})

showAllBtn.addEventListener("click", () => {
    tbody.innerHTML=""
    revertBtnClr()
    showAllBtn.style.backgroundColor="rgb(100, 100, 100)"
    fullApiList.forEach(api => addApiToTbody(api))
})

getApiList().then(list => {
    list.entries.forEach(api => addApiToTbody(api))
    list.entries.forEach(api => fullApiList.push(api))
    // console.log(fullApiList)
})


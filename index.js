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

const getApiList = () => {
    return fetch(`https://api.publicapis.org/entries`)
    .then(r => r.json())
}



const addApiToTbody = (api) => {
    tbody.innerHTML += `<tr><td><a href="${api.Link}">${api.API}</a></td><td>${api.Description}</td><td>${api.Category}</td><td>${api.Auth}</td><td>${api.Cors}</td><td>${api.HTTPS}</td></tr>`
}

const filterByNoAuth = (arr) => {
    arr.forEach((api) => {
        if (api.Auth === "") {
            workingApiList.push(api)
        }
    })
    workingApiList.forEach(api => addApiToTbody(api))
}

noAuthBtn.addEventListener("click", (e) => {
    tbody.innerHTML = ""
    filterByNoAuth(fullApiList)
})


getApiList().then(list => {
    list.entries.forEach(api => addApiToTbody(api))
    list.entries.forEach(api => fullApiList.push(api))
    // console.log(fullApiList)
})


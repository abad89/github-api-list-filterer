const getApiList = () => {
    return fetch(`https://api.publicapis.org/entries`)
    .then(r => r.json())
}

const addApiToTbody = (api) => {
    const tbody = document.getElementById(`api-table-body`)
    tbody.innerHTML += `<tr><td><a href="${api.Link}">${api.API}</a></td><td>${api.Description}</td><td>${api.Category}</td><td>${api.Auth}</td><td>${api.Cors}</td><td>${api.HTTPS}</td></tr>`
}

getApiList().then(list => {
    list.entries.forEach(api => addApiToTbody(api))
    // console.log(list.entries)
})
//list.entries[x] = {
//     "API": "Cat Facts",
//     "Description": "Daily cat facts",
//     "Auth": "",
//     "HTTPS": true,
//     "Cors": "no",
//     "Link": "https://alexwohlbruck.github.io/cat-facts/",
//     "Category": "Animals"
// }

// console.log(getApiList())
/* Desenvolva sua lógica aqui...*/

const baseUrl = "https://api.github.com/users"

let recentUsers = []

function inputValidation() {

    const inputSearchUser = document.querySelector(".input-search-user")
    const buttonSubmit = document.querySelector(".button-submit")
    const userNotFound = document.querySelector(".user-not-found")

    inputSearchUser.addEventListener("keyup", () => {
        userNotFound.classList.remove("flex")
        if(inputSearchUser.value.length > 0) {
            buttonSubmit.id = "button-allowed"
            buttonSubmit.type = "submit"
        } else {
            buttonSubmit.id = ""
            buttonSubmit.type = ""
        }
    })
}

inputValidation()

function formSubmit() {

    const inputSearchUser = document.querySelector(".input-search-user")
    const formUserSearch = document.querySelector(".form-user")
    const userNotFound = document.querySelector(".user-not-found")

    formUserSearch.addEventListener("submit", (event) => {
        getData(inputSearchUser, userNotFound)   
        event.preventDefault()
    })
}

formSubmit()

async function getData(inputValue, userNotFound) {

    const buttonSubmit = document.querySelector(".button-submit")
    let imageLoading = document.createElement("img")

    buttonSubmit.id = ""
    imageLoading.classList.add("image-loading")

    buttonSubmit.innerHTML = ""
    imageLoading.src = "./assets/img/loading.gif"
    imageLoading.alt = "Carregando"

    buttonSubmit.appendChild(imageLoading)

    const data = await fetch(`${baseUrl}/${inputValue.value}`)
    const dataJson = await data.json()
    .catch(error => console.log(error))
    if(dataJson.message) {
        buttonSubmit.id = "button-allowed"
        buttonSubmit.type = "submit"
        buttonSubmit.innerHTML = ""
        buttonSubmit.innerText = "Ver perfil do github"
        return userNotFound.classList.add("flex")
    }

    const dataRepo = await fetch(`${baseUrl}/${inputValue.value}/repos`)
    const dataRepoJson = await dataRepo.json()
    .catch(error => console.log(error))

    let userObject = {
        name: dataJson.name,
        image: dataJson.avatar_url,
        bio: dataJson.bio,
        email: dataJson.email,
        repositories: dataRepoJson
    }
        
    if(recentUsers.length >= 3) {
        recentUsers.pop()
        recentUsers.unshift(userObject)
    } else {
        recentUsers.unshift(userObject)
    }

    saveRecentUsers()
    renderRecentUsers()

    buttonSubmit.id = "button-allowed"
    buttonSubmit.type = "submit"
    buttonSubmit.innerHTML = ""
    buttonSubmit.innerText = "Ver perfil do github"

    const userObjectJson = JSON.stringify(userObject)
    const userSelected = localStorage.setItem("user-selected", userObjectJson)

    window.location.assign("./pages/profile/index.html")
}

function renderRecentUsers() {

    const ulUsersRecent = document.querySelector(".users-found")

    ulUsersRecent.innerHTML = ""

    recentUsers.forEach(element => {
        let li = document.createElement("li")
        let anchor = document.createElement("a")
        let imageUser = document.createElement("img")

        imageUser.classList.add("user-image")

        anchor.href = "../pages/profile/index.html"
        imageUser.id  = element.name
        imageUser.src = element.image

        ulUsersRecent.appendChild(li)
        li.appendChild(anchor)
        anchor.appendChild(imageUser)

        imageUser.addEventListener("click", (event) => {
            if(event.target.id == element.name) {
                const userObjectJson = JSON.stringify(element)
                const userSelected = localStorage.setItem("user-selected", userObjectJson)
            }
        })
    })
}

function saveRecentUsers() {
    const recentUsersStringfy = JSON.stringify(recentUsers)
    const recentUsersSave = localStorage.setItem("save-recent-users", recentUsersStringfy)
}

function loadRecentUsers() {
    const recentUsersLoad = localStorage.getItem("save-recent-users")
    if(recentUsersLoad == null) {
        return false
    } else {
        const recentUsersLoaded = JSON.parse(recentUsersLoad)
        recentUsers = recentUsersLoaded
        renderRecentUsers()
    }
}

loadRecentUsers()
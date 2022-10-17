/* Desenvolva sua lógica aqui...*/

function renderUser() {
    const getUserObject = localStorage.getItem("user-selected")
    const userSelectedJson = JSON.parse(getUserObject)

    const imageProfile = document.querySelector(".image-profile")
    const userName = document.querySelector(".user-name")
    const userBio = document.querySelector(".user-bio")

    imageProfile.src = userSelectedJson.image
    userName.innerHTML = userSelectedJson.name
    userBio.innerHTML = userSelectedJson.bio
    
    const ul = document.querySelector(".repo-lists")

    ul.innerHTML = ""

    const repositories = Array.from(userSelectedJson.repositories)

    const filterRepositories = repositories.filter((data) => {
        let li = document.createElement("li")
        let projectTitle = document.createElement("h2")
        let projectDescription = document.createElement("span")
        let divButtons = document.createElement("div")
        let repoAnchor = document.createElement("a")
        let repoButton = document.createElement("button")
        let demoAnchor = document.createElement("a")
        let demoButton = document.createElement("button")

        li.classList.add("repo-list", "flex", "flex-column")
        projectTitle.classList.add("project-title")
        projectDescription.classList.add("project-description")
        divButtons.classList.add("div-buttons-repo", "flex")
        repoButton.classList.add("repo-button")
        demoButton.classList.add("demo-button")

        projectTitle.innerText = data.name
        projectDescription.innerText = data.description
        repoAnchor.href = data.html_url
        repoAnchor.target = "_blank"
        repoButton.innerText = "Repositório"
        demoAnchor.href = 
        demoAnchor.target = "_blank"
        demoButton.innerText = "Demo"

        ul.appendChild(li)
        li.append(projectTitle, projectDescription, divButtons)
        divButtons.append(repoAnchor, demoAnchor)
        repoAnchor.appendChild(repoButton)
        demoAnchor.appendChild(demoButton)
    })
}

renderUser()
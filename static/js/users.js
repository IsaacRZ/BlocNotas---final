let usersData = []
var users = document.getElementById('users')
 

function eliminar(id){
    fetch('/api/users/'+id,{
        method:'DELETE'
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        filterUser(id)
        renderUsers()
    })
}
function filterUser(id){
    let newUsers = []

    for (let user of usersData){
        if(user.id!==id){
            newUsers.push(user)
        }
    }
    //console.log(newUsers)
    usersData = newUsers
    return newUsers
}
function renderUsers(){
    users.innerHTML= ""
    for(var user of usersData){
        users.innerHTML = users.innerHTML + `
            <div class="user">
                <p class = "name">${user.name}</p>
                <p class = "text">${user.texto}</p>
                <button class = "button" onClick="eliminar(${user.id})">Eliminar</button>
                <a class = "edit" href="/editUser/${user.id}">Editar</a>
            </div>`
    }
}
fetch("/api/users")
        .then(function (res){
            //console.log(res)
            return res.json()
        })
        .then(function(data){
            usersData = data
            renderUsers()
        })

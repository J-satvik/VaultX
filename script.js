function maskPass(pass){
    let str ="";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
}

function copyText(txt){
    navigator.clipboard.writeText(txt).then(
        ()=> {
            document.getElementById("alert").style.display = "inline";
            setTimeout(()=>{
                document.getElementById("alert").style.display = "none";
            },2000);
        },
        ()=>{
            alert("Copy failed");
        },
    );
}


const deletePassword = (uri) => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e)=>{
        return e.uri != uri
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert("Deleted successfully");
    showPasswords()
}
const showPasswords = () => {

    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No data found"
    }
    else {
        tb.innerHTML = `<tr>
        <th>URI</th>
        <th>Username</th>
        <th>Password</th>
        <th>Remove</th>
            </tr>`
        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
    <td>${element.uri} <img src="copy.svg" alt="Copy Button" width="20" height="20" onclick="copyText('${element.uri}')"></td>
    <td>${element.username} <img src="copy.svg" alt="Copy Button" width="20" height="20" onclick="copyText('${element.username}')"></td>
    <td>${maskPass(element.password)} <img src="copy.svg" alt="Copy Button" width="20" height="20" onclick="copyText('${element.password}')"></td>
    <td align="center"><img src="delete.svg" alt="delete" onclick="deletePassword('${element.uri}')"> </td>
        </tr>`
        }
        tb.innerHTML = tb.innerHTML + str
    }
    uri.value=""
    username.value=""
    pass.value=""
}
showPasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Clicked");
    console.log(uri.value, uri.value, pass.value)
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {
        let json = []
        json.push({ uri: uri.value, username: username.value, password: pass.value })
        console.log("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ uri: uri.value, username: username.value, password: pass.value })
        console.log("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords()
})
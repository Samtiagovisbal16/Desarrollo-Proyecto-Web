
function iniciarsesion(event){
    event.preventDefault(); // Prevenir el envío del formulario

    var usuario = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (usuario == "usuario" && password == "123") {
        window.location.href = "html/menuprincipal.html"
    } else if (usuario == "administrador" && password == "123") {
        window.location.href = "html/menuadmin.html";
    } else {
        alert("usuario o password errado");
        nuevo();
    }
}

function nuevo() {
    var usuario = document.getElementById("username");
    var password = document.getElementById("password");

    usuario.value = "";
    password.value = "";
    usuario.focus();
}
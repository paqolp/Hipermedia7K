function loginUser() {
    $('#frmLogin').submit((e) => {
        e.preventDefault();
        if (e.target.checkValidity()) {
            const dataArray = $("#frmLogin").serializeArray();
            const dataObject = serializedArrayToObject(dataArray);
            login(dataObject);
        }
    });
}

function login(dataObject) {
    $.post(`${localStorage.apiUrl}sesiones`, dataObject)
        .done((result) => {
            sessionStorage.nombreUsuario = `${result.nombre} ${result.apPaterno} ${result.apMaterno}`;
            sessionStorage.idEquipo = result.equipo;
            sessionStorage.token = result.token;
            sessionStorage.rol = 'lideres';
            sessionStorage.idUsuario = result.id;
            localLogin(dataObject);
        })
        .fail((error) => {
            alert(error.responseJSON.message)
        });
}

function localLogin(dataObject) {
    $.post(`${localStorage.baseUrl}/lideres/iniciarSesion`, dataObject)
        .done((result) => {
            location.href = result.targetUrl;
        })
        .fail((error) => {
            console.log(error)
        });
}

$(document).ready(function() {
    loginUser();
})

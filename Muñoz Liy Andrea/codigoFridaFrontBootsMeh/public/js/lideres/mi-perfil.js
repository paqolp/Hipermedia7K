var user = null;

function getProfile() {
	const paramsObj = {
		url: `${localStorage.apiUrl}usuarios/${sessionStorage.idUsuario}`,
		method: 'GET'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
        user = data;
        showProfile();
    })
    .fail((error) => {
        console.log(error)
        alert({texto: 'No se pudo cargar la información del módulo, inténtalo más tarde por favor.'});
    });
}

function showProfile() {
	const { id, nombre, apPaterno, apMaterno, fechaNacimiento, telefono, correo, fotografia, escuela, disciplina } = user;
	$('#inputNombre').val(nombre).prop('readonly', true)
	$('#inputApPaterno').val(apPaterno).prop('readonly', true)
	$('#inputApMaterno').val(apMaterno).prop('readonly', true)
	$('#inputFechaNacimiento').val(moment(fechaNacimiento).format('YYYY-MM-DD')).prop('readonly', true)
	$('#inputTelefono').val(telefono).prop('readonly', true)
	$('#inputCorreo').val(correo).prop('readonly', true)
	$('#inputEscuela').val(escuela).prop('readonly', true)
	$('#inputAreaConocimiento').val(disciplina).prop('readonly', true)
	$('.imgPerfil').attr("src", setProfileImage(fotografia));
}

function setProfileImage(imageUrl) {
	if (imageUrl.length > 5)
			return `${localStorage.publicUrl}img/${imageUrl}.jpg`;
	else
			return "/img/image.jpeg";
}

$(document).ready(function() {
    getProfile();
});
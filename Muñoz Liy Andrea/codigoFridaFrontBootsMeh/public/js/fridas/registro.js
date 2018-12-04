function imageUpload() {
    var $imageEditor;
    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.upload-demo').addClass('ready');
                $imageEditor.croppie('bind', {
                    url: e.target.result
                }).then(function () {
                    console.log('jQuery bind complete');
                });
            }
            reader.readAsDataURL(input.files[0]);
        } else {
            alert({
                tipo: 'info',
                texto: "Lo sentimos, tu navegador no soporta nuestro cortador de imágenes."
            });
        }
    }
    $imageEditor = $('#editorImagen').croppie({
        viewport: {
            width: 150,
            height: 150,
            type: 'square'
        },
        enableExif: true
    });
    $('#inputFotoPerfil').on('change', function () {
        readFile(this);
        $('#editorImagen').slideDown();
        $('#editorImagen').croppie('bind');
    });
}

function validatePasswords() {
    $('#inputContrasena1, #inputContrasena2').keyup(function(e) {
        e.preventDefault();
        const password1 = $('#inputContrasena1');
        const password2 = $('#inputContrasena2');
        if (e.target.value.length < 1) {
            setPasswordsInputsValidity(' ');
        }
        if (password1.val() !== password2.val()) {
            setPasswordsInputsValidity('Las contraseñas no coinciden');
        } else {
            setPasswordsInputsValidity();
        }
    });
}

function setPasswordsInputsValidity(message = '') {
    const password1 = $('#inputContrasena1');
    const password2 = $('#inputContrasena2');
    if (message) {
        password1[0].setCustomValidity('Error');
        password2[0].setCustomValidity('Error');
        password2.addClass('border border-danger');
        password2.next('.invalid-feedback').show();
    } else {
        password1[0].setCustomValidity('');
        password2[0].setCustomValidity('');
        password2.removeClass('border border-danger');
        password2.next('.invalid-feedback').hide();
    }
    $('.mensajeContrasena').text(message);
}

function validateTeamInfo() {
    const cbTeamCode = $('#inputCheckboxEquipoClave');
    const cbTeamName = $('#inputCheckboxEquipoNombre');
    const teamCode = $('#divInputEquipoClave');
    const teamName = $('#divInputEquipoNombre');
    cbTeamCode.change((e) => {
        teamCode.slideDown().find('input').prop('required', true);
        teamName.slideUp().find('input').prop('required', false);
    });
    cbTeamName.change((e) => {
        teamName.slideDown().find('input').prop('required', true);
        teamCode.slideUp().find('input').prop('required', false);
    });
    
}

function getProfileImage() {
    return new Promise((res, rej) => {
        $('#editorImagen').croppie('result', 'base64')
            .then((image) => {
                const commaPosition = image.indexOf(',') + 1;
                const newImage = image.substring(commaPosition, image.length - 1);
                if(newImage.length < 5)
                    res(null);
                else
                    res(newImage);
            })
            .catch((error) => {
                console.log(error)
                rej(error);
            })
    })
}

function registerUser() {
    $('#frmRegistro').submit((e) => {
        e.preventDefault();
        if (e.target.checkValidity()) {
            const dataArray = $("#frmRegistro").serializeArray();
            const dataObject = serializedArrayToObject(dataArray);
            setDataObject(dataObject).then((finalDataObject) => {
                console.log('frmRegistrosubmit', finalDataObject)
                postUser(finalDataObject);
            }).catch(()=>{});
        }
    });
}

function setDataObject(dataObject) {
    const { nombre, apPaterno, apMaterno, fechaNacimiento, telefono, escuela, correo, contrasena, equipo, claveEquipo, nombreEquipo } = dataObject;
    let equipoObj;
    if (equipo == 'clave') {
        equipoObj = {clave: claveEquipo}
    } else {
        equipoObj = {nombre: nombreEquipo}
    }
    return new Promise((res, rej) => {
        getProfileImage().then((image) => {
            const finalDataObject = {
                nombre,
                apPaterno,
                apMaterno,
                fechaNacimiento,
                telefono,
                escuela,
                correo,
                contrasena,
                fotografia: image,
                idRol: 1,
                equipo: equipoObj
            }
            res(finalDataObject);
        }).catch(()=>{});
    });
}

function postUser(dataObject) {
    const paramsObj = {
        url: `${localStorage.apiUrl}usuarios`,
        dataObject: dataObject,
		method: 'POST'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
        alert({
            tipo: 'success',
            texto: 'Te has registrado con éxito.',
            onClose: () => { location.href = `${localStorage.baseUrl}/fridas/inicio-sesion` }
        });
    })
    .fail((error) => {
        console.log(error)
        alert({texto: 'No se pudo subir el archivo, inténtalo más tarde por favor.'});
    });
}

$(document).ready(function() {
    validatePasswords();
    validateTeamInfo();
    registerUser();
    imageUpload();
})


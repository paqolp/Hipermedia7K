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
    const cbTeamCode = $('#inputRadioEquipoClave');
    const cbTeamName = $('#inputRadioEquipoNombre');
    const cbTeamNull = $('#inputRadioSinEquipo');
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
    cbTeamNull.change((e) => {
        teamName.slideUp().find('input').prop('required', false);
        teamCode.slideUp().find('input').prop('required', false);
    });
}

function getFormData() {
    $()
}

function registerUser() {
    $('#frmRegistro').submit((e) => {
        e.preventDefault();
        console.log(e.target.checkValidity())
        console.log(e.target)
    });
}

$(document).ready(function() {
    validatePasswords();
    validateTeamInfo();
    registerUser();
})


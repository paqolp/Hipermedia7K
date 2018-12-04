function setRequestParams(paramsObj) {
    const { url, dataObject, method } = paramsObj;
    return {
        url: url, 
        data: dataObject || {},
        method: method || 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', sessionStorage.token);
        }
    };
}

function setActiveNavbarOption(actualPage) {
    $(`li[data-section="${actualPage}"]`).addClass('active');
}

function initFileStyle() {
    $(":file").filestyle({
        text: 'Examinar'
    });
}

function validateForm() {
    const forms = document.getElementsByClassName('needs-validation');
    const validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
        }, false);
    });
}

function serializedArrayToObject(serializedArray) {
    // Create an object without prototype.
    let dataObject = Object.create(null, {});
    serializedArray.map(({name, value}) => {
        dataObject[name] = value;
    })
    return dataObject;
}

function logout() {
    const targetUrl = `${localStorage.baseUrl}/${sessionStorage.rol}`;
    $.ajax({
        method: 'POST',
        url: `${targetUrl}/cerrarSesion`
    }).done((result) => {
        console.log(result)
        location.href = result.targetUrl;
    });
}

$(document).ready(() => {
    setActiveNavbarOption(actualPage);
    validateForm();
});
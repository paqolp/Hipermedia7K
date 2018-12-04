var module = null;

function getModule() {
	const paramsObj = {
		url: `${localStorage.apiUrl}modulos/${idModulo}`,
		method: 'GET'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
        module = data;
        showModule();
        showContent(module.contenidos);
    })
    .fail((error) => {
        console.log(error)
        $('button, a').prop('disabled', true);
        alert({texto: 'No se pudo cargar la información del módulo, inténtalo más tarde por favor.'});
    });
}

function showModule() {
    const { numero, nombreModulo, descripcion } = module;
    $('#idModulo').text(numero)
    $('#nombre').text(nombreModulo)
	$('#descripcion').text(descripcion);
}

function showContent(contents, $template = $('#plantillaContenido')) {
    const $contentTemplate = $($template.html());
    const $contents = contents.map(({id, descripcion, material, ejercicio}, index) => {
        const $clonedTemplate = $contentTemplate.clone();
        $clonedTemplate.find('.numeroContenido').html(index + 1);
        $clonedTemplate.find('.descripcion').html(descripcion);
        $clonedTemplate.find('.contenedorBtns').append(setMaterialsBtn(material));
        $clonedTemplate.find('.frmArchivo').attr('data-idContenido', id);
        $clonedTemplate.find('.contenedorEjercicio')
            .append(cloneExerciseTemplate({idContenido: id, posContenido: index, ...ejercicio}));
        return $clonedTemplate;
    });
    $('#divContenedorModulo').append($contents);
    initFileStyle();
    submitFileEvent();
}


function setMaterialsBtn(materials) {
    return materials.map(({ nombre, archivo }) => {
      const material = {
        urlDescarga: `${localStorage.publicUrl}materiales/${archivo}`,
        nombreArchivo: nombre
      }
      return cloneMaterialBtn(material);
    });
}

function cloneMaterialBtn(material, $template = $('#plantillaBtnMaterial')) {
    const { urlDescarga, nombreArchivo } = material;
    const $materialTemplate = $($template.html());
    const $clonedTemplate = $materialTemplate.clone();
    $clonedTemplate.find('a')
        .attr('href', urlDescarga)
        .attr('download', nombreArchivo)
    $clonedTemplate.find('.nombreArchivo').html(nombreArchivo);
    return $clonedTemplate;
}

function cloneExerciseTemplate(exercise, $template = $('#plantillaEjercicio')) {
    const $exerciseTemplate = $($template.html());
    const $clonedTemplate = $exerciseTemplate.clone();
    const { descripcion, archivoSubido, idContenido, posContenido } = exercise;
    const nombreArchivo = `Ejercicio ${idContenido}`;
    $clonedTemplate.find('.descripcion').html(descripcion);
    return $clonedTemplate;
}

function getSelectedFile(idContenido, callback) {
    const inputTarget = $(`.frmArchivo[data-idContenido="${idContenido}"] input[type=file]`)[0];
    const file = inputTarget.files[0];
    try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(event) {  
            let fileData = event.target.result;
            const commaPosition = fileData.indexOf(',') + 1;
            fileData = fileData.substring(commaPosition, fileData.length - 1);
            fileObject = {
                filename: file.name,
                data: fileData
            };
            callback(fileObject);
        };  
    } catch(err) {
        alert({tipo: 'info', texto: 'Selecciona un archivo, por favor.'});
    }
}

function submitFileEvent() {
    $(".frmArchivo").submit(function(e) {
        e.preventDefault();
        const idContenido = $(this).attr('data-idContenido');
        getSelectedFile(idContenido, ({filename, data}) => {
            const fileObj = {
                nombre: filename,
                archivo: data
            }
            postExerciseFile(idContenido, fileObj);
        })
    });
}

function postExerciseFile(idContenido, fileObject) {
	const paramsObj = {
        url: `${localStorage.apiUrl}modulos/${idModulo}/contenido/${idContenido}/material`,
        dataObject: fileObject,
		method: 'POST'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
        alert({
            tipo: 'success',
            texto: 'El archivo se subió con éxito.',
            onClose: () => {
                location.reload()
            }
        });
    })
    .fail((error) => {
        console.log(error)
        alert({texto: 'No se pudo subir el archivo, inténtalo más tarde por favor.'});
    });
}

function submitContentEvent() {
    $("#frmAgregarContenido").submit(function(e) {
        e.preventDefault();
        if (e.target.checkValidity()) {
            const dataArray = $("#frmAgregarContenido").serializeArray();
            const dataObject = serializedArrayToObject(dataArray);
            postContent(dataObject);
        }
    });
}

function postContent(dataObject) {
	const paramsObj = {
        url: `${localStorage.apiUrl}modulos/${idModulo}/contenido`,
        dataObject: dataObject,
		method: 'POST'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
        alert({
            tipo: 'success',
            texto: 'El contenido se creó con éxito.',
            onClose: () => {
                location.reload()
            }
        });
    })
    .fail((error) => {
        console.log(error)
        alert({texto: 'No se pudo crear el contenido, inténtalo más tarde por favor.'});
    });
}

$(document).ready(function() {
    getModule();
    submitContentEvent();
});
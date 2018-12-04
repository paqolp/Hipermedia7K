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
        alert({texto: 'No se pudo cargar la información del módulo, inténtalo más tarde por favor.'});
    });
}

function showModule() {
    const { id, nombreModulo, descripcion } = module;
    $('#idModulo').text(id)
    $('#nombre').text(nombreModulo)
	$('#descripcion').text(descripcion);
}

function showContent(contents, $template = $('#plantillaContenido')) {
    const $contentTemplate = $($template.html());
    const $contents = contents.map(({id, descripcion, material, ejercicio, comentarios}, index) => {
        const $clonedTemplate = $contentTemplate.clone();
        $clonedTemplate.find('.numeroContenido').html(index + 1);
        $clonedTemplate.find('.descripcion').html(descripcion);
        $clonedTemplate.find('.contenedorBtns').append(setMaterialsBtn(material));
        $clonedTemplate.find('.contenedorEjercicio')
            .append(cloneExerciseTemplate({idContenido: id, posContenido: index, comentarios, ...ejercicio}));
        return $clonedTemplate;
    });
    $('#divContenedorModulo').append($contents);
    initFileStyle();
    submitFileEvent();
}

function setMaterialsBtn(materials) {
    return materials.map(({urlDescarga, nombreArchivo}) => {
        const material = {
            urlDescarga: `${localStorage.publicUrl}materiales/${nombreArchivo}`,
            nombreArchivo
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
    if (archivoSubido) {
        const urlDescarga = `${localStorage.publicUrl}ejercicios/${archivoSubido}`;
        $clonedTemplate.find('.contenedorBtnsEjercicio')
            .append(cloneMaterialBtn({urlDescarga, nombreArchivo}))
            .append(cloneCommentsBtn({idContent: idContenido, posContent: posContenido}));        
    } else {
        $clonedTemplate.append(cloneExerciseInputTemplate(idContenido));
    }
    return $clonedTemplate;
}

function cloneCommentsBtn({idContent, posContent}, $template = $('#plantillaBtnComentarios')) {
    const $exerciseInputTemplate = $($template.html());
    const $clonedTemplate = $exerciseInputTemplate.clone();
    $clonedTemplate.find('.btnVerComentarios')
        .attr('data-idContenido', idContent)
        .attr('data-posContenido', posContent);
    return $clonedTemplate;
}

function showCommentsEvent() {
    $('#modalComentarios').on('show.bs.modal', function (e) {
        const $btnTriggered = $(e.relatedTarget);
        const idContent = $btnTriggered.attr('data-idContenido');
        const posContent = $btnTriggered.attr('data-posContenido');
        const comments = module.contenidos[posContent].comentarios || [];
        $('#numeroContenido').html(Number(posContent) + 1)
        $('#frmComentario').attr('data-idContenido', idContent)
        $('#frmComentario').attr('data-posContenido', posContent)
        showComments(comments);
    });
    submitCommentEvent();
}

function showComments(comments, $template = $('#plantillaComentario')) {
    const $exerciseInputTemplate = $($template.html());
        const commentsArray = comments.map(({nombreAutor, fecha, comentario}) => {
        const $clonedTemplate = $exerciseInputTemplate.clone();
        $clonedTemplate.find('.autor').html(nombreAutor);
        $clonedTemplate.find('.fecha').html(moment(fecha).format('YYYY-MM-DD'));
        $clonedTemplate.find('.texto').html(comentario);
        return $clonedTemplate;
    });
    if (commentsArray.length)
        $('#contenedorComentarios').html(commentsArray);
    else
        $('#contenedorComentarios').html('<h6>Aún no hay comentarios para este ejercicio.</h6>');
}

function cloneExerciseInputTemplate(exerciseId, $template = $('#plantillaInputEjercicio')) {
    const $exerciseInputTemplate = $($template.html());
    const $clonedTemplate = $exerciseInputTemplate.clone();
    $clonedTemplate.find('.frmArchivo').attr('data-idContenido', exerciseId);
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
                idEquipo: sessionStorage.idEquipo,
                idUsuario: sessionStorage.idUsuario,
                nombreArchivo: filename,
                archivo: data
            }
            postExerciseFile(idContenido, fileObj);
        })
    });
}

function postExerciseFile(idContenido, fileObject) {
	const paramsObj = {
        url: `${localStorage.apiUrl}modulos/${idModulo}/contenido/${idContenido}/ejercicio`,
        dataObject: fileObject,
		method: 'POST'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
        alert({
            tipo: 'success',
            texto: 'El archivo se subió con éxito.'
        });
    })
    .fail((error) => {
        console.log(error)
        alert({texto: 'No se pudo subir el archivo, inténtalo más tarde por favor.'});
    });
}

function submitCommentEvent() {
    $("#frmComentario").submit(function(e) {
        e.preventDefault();
        const idContent = $(this).attr('data-idContenido');
        const posContent = $(this).attr('data-posContenido');
        const comentario = $('#comentarioEjercicio').val();
        const dataObject = {
            idUsuario: sessionStorage.idUsuario,
            comentario
        }
        postComment(idContent, dataObject, posContent);
    });
}

function postComment(idContenido, dataObject, posContent) {
	const paramsObj = {
        url: `${localStorage.apiUrl}modulos/${idModulo}/contenido/${idContenido}/comentario`,
        dataObject: dataObject,
		method: 'POST'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
        const comment = {
            nombreAutor: sessionStorage.nombreUsuario,
            fecha: moment().format('YYYY-MM-DD'),
            comentario: dataObject.comentario
        }
        const moduleComments = module.contenidos[posContent].comentarios;
        moduleComments.push(comment);
        showComments(moduleComments);
        alert({
            tipo: 'success',
            texto: 'El comentario se guardó con éxito.'
        });
    })
    .fail((error) => {
        console.log(error)
        alert({texto: 'No se pudo guardar el comentario, inténtalo más tarde por favor.'});
    });
}

$(document).ready(function() {
    getModule();
    showCommentsEvent();
});
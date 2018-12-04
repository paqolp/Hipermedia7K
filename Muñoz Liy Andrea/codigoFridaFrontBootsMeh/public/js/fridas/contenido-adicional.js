var aditionalContent = null;

function getAditionalContent() {
	const paramsObj = {
		url: `${localStorage.apiUrl}contenidoAdicional`,
		method: 'GET'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
				aditionalContent = data;
        showContent(aditionalContent);
    })
    .fail((error) => {
        console.log(error)
        alert({texto: 'No se pudo cargar la información del módulo, inténtalo más tarde por favor.'});
    });
}

function showContent(contents, $template = $('#plantillaContenido')) {
	const $contentTemplate = $($template.html());
	const $contents = contents.map(({descripcion, material}, index) => {
			const $clonedTemplate = $contentTemplate.clone();
			$clonedTemplate.find('.numeroContenido').html(index + 1);
			$clonedTemplate.find('.descripcion').html(descripcion);
			$clonedTemplate.find('.contenedorBtns').append(setMaterialsBtn(material));
			return $clonedTemplate;
	});
	$('#contenedorContenidos').append($contents);
}

function setMaterialsBtn(materials) {
  return materials.map(({ nombre, archivo }) => {
    const material = {
      urlDescarga: `${localStorage.publicUrl}materialesAdicionales/${archivo}`,
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

$(document).ready(function() {
	getAditionalContent();
});
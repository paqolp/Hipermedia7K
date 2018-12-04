function getModules() {
	const paramsObj = {
		url: `${localStorage.apiUrl}modulos`,
		method: 'GET'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
  		const modulesHtml = getModulesHtml(data);
  		$('#divModulos').html(modulesHtml);
	})
	.fail((error) => {
		console.log(error)
	});
}

function getModulesHtml(modules) {
	const modulesHtml = modules.map((module) => {
		const { id, nombreModulo, numero, fechaLimite, descripcion } = module;
		return `<div class="col-md-6 col-lg-4 mb-4">
						<div class="card bg-light">
							<div class="card-body">
    						<h4 class="card-title">Módulo ${numero}</h4>
								<h6 class="card-subtitle mb-2">${nombreModulo}</h6>
								<small class="mb-2">${descripcion}</small>
    						<p class="mt-2">Fecha límite: ${fechaLimite.substring(0,10)}</p>
    						<a href="${localStorage.baseUrl}/lideres/modulos/${id}" class="btn btn-primary btn-sm btn-block">Ver módulo</a>
    					</div>
    				</div>
    			</div>`;
	});
	return modulesHtml.join('');
}

$(document).ready(function() {
	getModules();
});

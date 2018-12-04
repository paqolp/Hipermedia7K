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
		const { id, nombreModulo, numero, fechaLimite, progreso } = module;
		const validModule = validateModule(fechaLimite, progreso);
		const cardDangerTitle = (validModule) ? '' : '<small class="text-center p-2 bg-danger-light">No has terminado, ¡recuerda no atrasarte!</small>';
		return `<div class="col-md-6 col-lg-4 mb-4">
						<div class="card bg-light">
							${cardDangerTitle}
							<div class="card-body">
    						<h4 class="card-title">Módulo ${numero}</h4>
    						<h6 class="card-subtitle mb-3">${nombreModulo}</h6>
    						<p>Fecha límite: ${fechaLimite.substring(0,10)}</p>
							<h6 class="card-subtitle mb-3">Avance:</h6>
							<div class="progress mb-3">
								<div class="progress-bar bg-success progress-bar-striped font-weight-bold" role="progressbar" style="width: ${progreso}%;" aria-valuenow="${progreso}" aria-valuemin="0" aria-valuemax="100">${progreso}%</div>
							</div>
    						<a href="${localStorage.baseUrl}/fridas/modulos/${id}" class="btn btn-primary btn-sm btn-block">Ver módulo</a>
    					</div>
    				</div>
    			</div>`;
	});
	return modulesHtml.join('');
}

function validateModule(limitDate, progress) {
	if (moment().isAfter(limitDate) && progress < 100)
		return false;
	return true;
}

$(document).ready(function() {
	getModules();
});
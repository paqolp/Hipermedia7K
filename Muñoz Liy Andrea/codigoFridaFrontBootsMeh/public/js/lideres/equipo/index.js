function getModules() {
	console.log(localStorage.apiUrl+'modulos')
	$.get(`${localStorage.apiUrl}modulos`)
  	.done(function(data) {
  		const modulesHtml = getModulesHtml(data);
  		$('#divModulos').html(modulesHtml);
	    console.log(data);
	});
}

function getModulesHtml(modules) {
	console.log(modules);


	const modulesHtml = modules.map((module) => {
		const { id, numero, nombreModulo, fechaLimite } = module;
		return `<div class="col-md-6 col-lg-4 mb-4">
    				<div class="card">
    					<div class="card-body">
    						<h4 class="card-title">Módulo ${numero}</h4>
    						<h6 class="card-subtitle mb-3">${nombreModulo}</h6>
    						<p>Fecha límite: ${fechaLimite}</p>
    						<a href="${localStorage.baseUrl}/lideres/equipos/${ID_EQUIPO}/modulos/${id}" class="btn btn-info btn-sm btn-block">Ver módulo</a>
    					</div>
    				</div>
    			</div>`;
	});
	console.log(modulesHtml);
	return modulesHtml.join('');
}

$(document).ready(function() {
	getModules();
});

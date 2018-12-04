var team = null;
const idEquipo = ID_EQUIPO;

function getTeam() {
	const paramsObj = {
		url: `${localStorage.apiUrl}equipos/${idEquipo}`,
		method: 'GET'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
        team = data;
				console.log(data);
        showTeam();
        showMentors(team.mentores[0]);
        showTeamMembers(team.integrantes[0]);
        showAchievements(team.insignias[0]);
				getModules();
    })
    .fail((error) => {
        console.log(error)
				getModules();
				alert({texto: 'No se pudo obtener información del equipo, inténtelo más tarde por favor'});
    });
}
function setProfileImage(imageUrl) {
    if (imageUrl.length > 5)
        return `${localStorage.publicUrl}img/${imageUrl}.jpg`;
    else
        return "/img/image.jpeg";
}

function showTeam() {
    const { id, nombre, codigo } = team;
    $('#idModulo').text(id)
    $('#nombreEquipo').text(nombre)
    $('#codigoEquipo').text(codigo)
}

function showMentors(contents, $template = $('#plantillaMentor')) {
    const $mentorTemplate = $($template.html());
    const $mentors = contents.map(({nombre, apPaterno, apMaterno, correo, fotografia}, index) => {
        const $clonedTemplate = $mentorTemplate.clone();

        $clonedTemplate.find('.imgPerfil').attr("src", setProfileImage(fotografia));
        $clonedTemplate.find('.nombre').append(`${nombre} ${apPaterno} ${apMaterno}`);
        $clonedTemplate.find('.correo').append(correo);
        return $clonedTemplate;
    });
		if ($.isEmptyObject($mentors)) {
			$('#divMentores').html(`<div class="col text-center">
				 <p>No hay Mentores registradas</p>
			 </div>`);
		}
		else
		{
        $('#divMentores').append($mentors);
	   }
    initFileStyle();
   }

function showTeamMembers(contents, $template = $('#plantillaIntegrante')) {
    const $teamMemberTemplate = $($template.html());
    const member = contents.map(({nombre, apPaterno, apMaterno, correo, fotografia, fechaNacimiento}, index) => {
        const $clonedTemplate = $teamMemberTemplate.clone();

        $clonedTemplate.find('.imgPerfil').attr("src",setProfileImage(fotografia));
        $clonedTemplate.find('.nombre').append(`${nombre} ${apPaterno} ${apMaterno}`);
        $clonedTemplate.find('.correo').append(correo);
        $clonedTemplate.find('.edad').append(calcAge(fechaNacimiento));
        return $clonedTemplate;
    });
		console.log(member);
		if ($.isEmptyObject(member)) {
			$('#divIntegrantes').html(
				`<div class="col text-center">
				   <p>No hay Fridas registradas</p>
				 </div>`
			);
		}
		else
		{
				$('#divIntegrantes').append(member);
		 }

    initFileStyle();
}

function calcAge(fechaNacimiento) {
    return moment().diff(fechaNacimiento, 'years');
}

function showAchievements(contents, $template = $('#plantillaInsignia')) {
    const $achievementTemplate = $($template.html());
    const achievement = contents.map(({nombre, descripcion, idInsignia}, index) => {
        const $clonedTemplate = $achievementTemplate.clone();

        $clonedTemplate.find('.imgPerfil').attr("src",`/img/insignias/modulo${idInsignia}.jpeg`);
        $clonedTemplate.find('.nombre').append(nombre);
        $clonedTemplate.find('.descripcion').append(descripcion);
        return $clonedTemplate;
    });
    $('#divInsignias').append(achievement);
    initFileStyle();
}

function getModules() {
	const paramsObj = {
		url: `${localStorage.apiUrl}modulos?idEquipo=${ID_EQUIPO}`,
		method: 'GET'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
  		const modulesHtml = getModulesHtml(data);
			console.log(data);
  		$('#divModulos').html(modulesHtml);
	})
	.fail((error) => {
		alert({texto: 'No se pudo obtener información de los módulos del equipo, inténtelo más tarde por favor'});
		console.log(error)
	});
}

function getModulesHtml(modules) {
	const modulesHtml = modules.map((module) => {
		const { id, nombreModulo, numero, fechaLimite, progreso } = module;
		return `<div class="col-md-6 col-lg-4 mb-4">
						<div class="card bg-light">
							<div class="card-body">
    						<h4 class="card-title">Módulo ${numero}</h4>
    						<h6 class="card-subtitle mb-3">${nombreModulo}</h6>
    						<p>Fecha límite: ${fechaLimite.substring(0,10)}</p>
							<h6 class="card-subtitle mb-3">Avance:</h6>
							<div class="progress mb-3">
								<div class="progress-bar bg-success progress-bar-striped font-weight-bold" role="progressbar" style="width: ${progreso}%;" aria-valuenow="${progreso}" aria-valuemin="0" aria-valuemax="100">${progreso}%</div>
							</div>
    						<a href="${localStorage.baseUrl}/lideres/equipos/${ID_EQUIPO}/modulos/${id}" class="btn btn-primary btn-sm btn-block">Ver módulo</a>
    					</div>
    				</div>
    			</div>`;
	});
	return modulesHtml.join('');
}

$(document).ready(function() {
	getTeam();
});

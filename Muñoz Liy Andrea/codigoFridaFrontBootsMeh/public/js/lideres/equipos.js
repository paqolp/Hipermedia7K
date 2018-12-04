function getTeams() {
	return new Promise((res, rej) => {
		console.log(localStorage.apiUrl+'equipos')
		const paramsObj = {
			url: `${localStorage.apiUrl}equipos`,
			dataObject: {}
		}
		$.ajax(setRequestParams(paramsObj))
	  	.done((data) => {
				res(data);
			})
			.fail((error) => {
				console.log(error)
				rej(error);
			});
	})
}

function setTeamsHtml(teams) {
	const teamsHtml = getTeamsHtml(teams);
	$('#divEquipos').html(teamsHtml);
	removeMemberEvent();
}

function getTeamsHtml(teams){
  const teamsHtml = teams.map((team) =>{
    const { id, nombre, integrantes, mentores, progreso} = team;
    const membersHtml = getTeamsMembersHtml(integrantes);
    const mentorsHtml = getTeamsMentorsHtml(mentores);
    return `<div class="col-md-6 mb-4">
    	    				<div class="card">
    	    					<div class="card-body">
    	    						<h4 class="card-title">Equipo: ${nombre}</h4>
                       <p class="font-weight-bold">Integrantes:</p>
    	    					   ${membersHtml}
                       <p class="font-weight-bold">Mentores:</p>
                       ${mentorsHtml}
											 <h6 class="card-subtitle mb-3">Avance:</h6>
											 <div class="progress mb-3">
												 <div class="progress-bar bg-success progress-bar-striped font-weight-bold" role="progressbar" style="width: ${progreso}%;" aria-valuenow="${progreso}" aria-valuemin="0" aria-valuemax="100">${progreso}%</div>
											 </div>
                      <br>
                      <a href="${localStorage.baseUrl}/lideres/equipos/${id}" class="btn btn-info btn-sm btn-block">Ver equipo</a>
    	    					</div>
    	    				</div>
    	    			</div>`;
  });


	return teamsHtml.join('');
}

function getTeamsMembersHtml(members)
{
  const teamsMembersHtml = members.map((member) =>
  {
    const {id, idEquipo, nombre} = member;
		return `<p>
							<button data-idUsuario="${id}" data-idEquipo="${idEquipo}" class="borrarFrida btn btn-link text-danger pt-0">
								<i class="fas fa-user-minus"></i>
							</button>
							${nombre}
						</p>`;
  });
  return teamsMembersHtml.join('');
}

function getTeamsMentorsHtml(mentors)
{
  const teamsMentorsHtml = mentors.map((mentor) =>
  {
    const {nombre} = mentor;
    return `<p>${nombre}</P>`;
  });
  return teamsMentorsHtml.join('');
}

function removeMemberEvent() {
	$('.borrarFrida').click(function(e) {
		e.preventDefault();
		const idUsuario = $(this).attr('data-idUsuario');
		const idEquipo = $(this).attr('data-idEquipo');
		alert({
						tipo: 'warning', 
						titulo: 'Eliminar Frida', 
						texto: '¿Está seguro que desea eliminar a Frida del equipo?',
						onClose: () => {
							deleteMemberTeam(idUsuario, idEquipo);
						}
					})
	})
}

function deleteMemberTeam(idUsuario, idEquipo) {
	const paramsObj = {
		url: `${localStorage.apiUrl}equipo/${idEquipo}/usuario/${idUsuario}`,
		method: 'DELETE'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
			alert({
				tipo: 'success',
				texto: 'Frida retirada del equipo satisfactoriamente.',
				onClose: () => {
					location.reload();
				}
			});

    })
    .fail((error) => {
        console.log(error)
        alert({
					texto: 'Hubo un error al retirar la Frida del equipo, inténtalo más tarde por favor.'
				});
    });
}

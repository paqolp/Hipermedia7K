function callFridas() {
  getFridas().then(fridas => {
    setFridasHtml(fridas);
    console.log(' entra fridas then')
  }).catch(error => {
    console.log(' entra fridas error', error)
    alert({texto: 'No se pudo obtener información de Fridas, inténtelo más tarde por favor'});
  });
}

$(document).ready(function() {
	getTeams().then(teams => {
    setTeamsHtml(teams);
    console.log(' entra then')
    callFridas();
  }).catch(error => {
    alert({texto: 'No se pudo obtener información de los equipos, inténtelo más tarde por favor'});
    console.log(' entra error', error)
    callFridas();
  });
});

function getFridas() {
	return new Promise((res, rej) => {
		console.log(localStorage.apiUrl+'usuarios')
		const paramsObj = {
			url: `${localStorage.apiUrl}usuarios?rol=1&equipo=0`,
			dataObject: {}
		}
		$.ajax(setRequestParams(paramsObj))
			.done((data) => {
				// data = variableTemporal2;
				res(data);
			})
			.fail((error) => {
				console.log(error)
				rej(error);
			});
	})
}

function setFridasHtml(fridas) {
	const fridasHtml = getFridasHtml(fridas);
	$('#divFridas').html(fridasHtml);
}

function setProfileImage(imageUrl) {
    if (imageUrl.length > 5)
        return `${localStorage.publicUrl}img/${imageUrl}.jpg`;
    else
        return "/img/image.jpeg";
}


function getFridasHtml(fridas) {
	const fridasHtml = fridas.map((frida) => {
		const { id, nombre, apPaterno, apMaterno, createdAt, correo, fotografia } = frida;
    const fotografiaHtml = setProfileImage(fotografia);
    console.log(fotografiaHtml);
		return `<div class="col-md-6 mb-3">
      <div class="media">
        <img class="mr-3 imgPerfil" src="${fotografiaHtml}" alt="Mentor">
        <div class="media-body">
          <p>${nombre} ${apPaterno} ${apMaterno}</p>

          <p>${correo}</p>
          <p>Fecha de registro: </p>
          <p>${createdAt}</p>
        </div>
      </div>
    </div>`;
	});
	return fridasHtml.join('');
}

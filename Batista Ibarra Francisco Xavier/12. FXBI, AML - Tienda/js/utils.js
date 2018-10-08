function loadJSON(fileName, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', `../js/${fileName}.json`, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
}

function truncateText(limit, text) {
    const arrayWords = text.trim().split(' ');
    const arraySelectedWords = arrayWords.slice(0, limit);
    return arraySelectedWords.join(' ').concat('...');
}

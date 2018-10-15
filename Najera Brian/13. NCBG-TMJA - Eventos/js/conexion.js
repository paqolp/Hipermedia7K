$(function(){
    var table;
    $.getJSON('json/eventos.json',function(data){
        table = data.table;
        iniciando(0);
    });
    function iniciando(){
        jQuery.each(table.rows,function(i,row){
            var r = "";
            var name="";
            var n=0;
            $.each(row,function(index,valor){
                if (index == "nombre")
                {
                    name=valor;
                    r = r + "<tr><td><div class="+"event_place"+"><h5>Nombre</h5><h6 id="+"name"+i+">"+ valor+"<h6></div></td>";
                }
                if (index == "lugar")
                {
                    r = r + "<td><div class="+"event_place"+"><p id="+"place"+i+" value="+valor+">"+ valor+"<p></div></td>";
                }
                if (index == "dia")
                {
                    r = r + "<td class="+"event_date"+" ><p value="+valor+" id="+"day"+i+">"+ valor+"</p>";
                }
                if (index == "mes")
                {
                    r = r + "<span id="+"month"+i+" value="+valor+">"+ valor+"</span></td>";
                }
                if (index == "actividades")
                {
                    r = r + "<td class="+"buy_link event_place"+"><h6 id="+"activity"+i+">"+valor+"</h6><a value="+name+" href="+"Evento.html"+" target="+"blank"+">Actividades</a></td>";
                }
                if (index == "asistentes")
                {
                    r = r + "<td class="+"buy_link event_place"+"><h6 id="+"asist"+i+">"+valor+"</h6><a value="+name+" href="+"Evento.html"+" target="+"blank"+">Asistentes</a></td>";
                }
                if (index == "descripcion")
                {
                  r = r + "<td hidden><div class="+"event_place"+" ><p id="+"descripcion"+i+">"+ valor+"<p></div></td>";
                }
            });
            n=n+1;
            r +="<td><button id="+"event"+i+" value="+name+" onclick="+"obtenerValor("+i+");"+" class="+"btn"+" btn-primary"+" btn-rounded"+">Read More</button></td>"

            r += "</tr>";
            $("#tabla").append(r);

        });

    }

});

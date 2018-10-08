$(function(){
    var table;
    
    $.getJSON('Json/tabla.json',function(data){
        table = data.table;
        
        iniciando(0);
        
    });
    
    function iniciando(){
        $("#mi_tabla").empty();
        
        jQuery.each(table.rows,function(i,row){
            var r = "";
            
            $.each(row,function(index,valor){
                
                
              // r = r + "<tr><td>" + valor + "</td>";
                
                if (index == "id"){
                    r = r + "<tr><td>" + valor + "</td>";
                }
                else{
                    r = r + "<td>" + valor + "</td>";
                }
            });
            r += "</tr>";
            
            $("#mi_tabla").append(r);
            
        });
        
    }
    
});
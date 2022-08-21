function mainArrayEachCycle(j) {

    var a = 0;
    var arr = [];
    
    try {
        for(var key in j) {
            arr[a++] = j[key];
        }
    } catch(e) {
        return false;
    }

    return arr;
}


function getXhrType() {

    var xhr;

    try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xhr = false;
        }
    }

    if(!xhr && typeof XMLHttpRequest != 'undefined') xhr = new XMLHttpRequest();

    return xhr;
}

function search() {

    if(document.getElementsByClassName("search_field")[0].value != 0) {

        if(getXhrType() != false) {
            var x = getXhrType();
        } else {
            alert("Fatal error");
            return;
        }
    
        x.onreadystatechange = function() {
     
            if(x.readyState != 4) return;
     
            if(this.status == 200) {
            	if(x.responseText == false) {
            		alert("Нет совпадений!");
            	} else {

            		var cont = document.getElementsByClassName("container")[0];

            		cont.innerHTML = "";

            		var resp = JSON.parse(x.responseText);

                    var respLength = mainArrayEachCycle(resp).length;
                    
                    if(respLength != false) {
                        for(var i = 1;i <= respLength;i++) {
                        	$(cont).append("<div id='"+resp[i]["id"]+"' class='books' onclick='del("+resp[i]["id"]+")' onmouseover='hover("+resp[i]["id"]+")' onmouseout='out("+resp[i]["id"]+")'>"+resp[i]["n"]+"<div class='clean'></div></div>");
                        	//$(cont).append("<p class='books' onmouseover='hover("+resp[i]["id"]+")' onmouseout='out("+resp[i]["id"]+")'>"+resp[i]["n"]+"<div id='"+resp[i]["id"]+"' class='clean' onclick='del("+resp[i]["id"]+")'></div></p>");
                            //$(cont).append("<p id='"+resp[i]["id"]+"' class='books' onmouseover='hover()'>"+resp[i]["n"]+"<div class='clean'></div></p>");
                            //$(cont).append("<p id='"+resp[i]["id"]+"' class='books'>"+resp[i]["n"]+"</p>");
                        }
                    } else {
                    	alert("Error!");
                    }

            	}
            } else {
                alert(x.status + ': ' + x.statusText);
                //alert("Unable to connect to server! Try again later...");
            }
                    
            return;
        };
    
        x.open("POST","php/request.php",true);
        
        x.setRequestHeader("Cache-Control", "no-cache");
     
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        x.send('text=' + encodeURIComponent(document.getElementsByClassName("search_field")[0].value));
    } else {
    	return;
    }
}

function del(id) {
    
    /*for(var i = 0;i < document.getElementById(id).childNodes.length;i++) {
    	alert(document.getElementById(id).childNodes[i]);
    }*/

	res = confirm("Удалить?");

	if(res == true) {

	    if(getXhrType() != false) {
            var x = getXhrType();
        } else {
            alert("Fatal error");
            return;
        }
        
        x.onreadystatechange = function() {
        
            if(x.readyState != 4) return;
        
            if(this.status == 200) {
            	if(x.responseText == false) {
            		alert("Что то пошло не так!");
            	} else {
            		//document.getElementById(id).style.visibility='hidden';
            		//document.getElementById(id).style.transition='0.3s';
    
            		var elem = document.getElementById(id);
            		var elemChild = elem.childNodes[1];

            		//alert(elemChild);
    
            		//window.setTimeout(function () {
	                elem.removeChild(elemChild);
	                elem.parentNode.removeChild(elem);
	                //}, 1000);
                    
            	}
            } else {
                alert(x.status + ': ' + x.statusText);
                //alert("Unable to connect to server! Try again later...");
            }
                    
            return;
        };
        
        x.open("POST","php/delete.php",true);
        
        x.setRequestHeader("Cache-Control", "no-cache");
        
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        x.send('id=' + encodeURIComponent(id));
    } else {
    	return;
    }
}

function hover(id) {
	//document.getElementById(id).childNodes[1].style.opacity=1;
	document.getElementById(id).childNodes[1].style.visibility='visible';
	//document.getElementById(id).style.visibility='visible';
	//document.getElementById(id).style.cursor = "pointer";
}

function out(id) {
	document.getElementById(id).childNodes[1].style.visibility='hidden';
	//document.getElementById(id).style.visibility='hidden';
	//document.getElementById(id).childNodes[1].style.opacity=0.5;
}
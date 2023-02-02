const page_refresh = document.getElementById("refresh");

function refreshPage(){
    window.location.reload(); 
}

page_refresh.addEventListener('click' , refreshPage);

window.onload = function(){
    openNav();
    closeNav();
};
function openNav() {
        if (document.getElementById("mySidenav").style.width === '0px') {
            document.getElementById("mySidenav").style.width = "250px";
        } else {
            document.getElementById("mySidenav").style.width = "0px"; 
        }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


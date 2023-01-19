// JavaScript Document

//NAVIGATION
//document.getElementById("Logo").onclick = function () {location.href = "index.html";}
//document.getElementById("Home").onclick = function () {location.href = "index.html";}
//document.getElementById("About").onclick = function () {location.href = "about.html";}
//document.getElementById("Projects").onclick = function () {location.href = "projects.html";}
//document.getElementById("Services").onclick = function () {location.href = "services.html";}
//document.getElementById("Contact").onclick = function () {location.href = "contact.html";}

document.getElementById("aboutImg").src = "./content/images/Tim.jpg";;

function cover(x){	
	document.getElementById("ImgProject").src = "./content/images/cover1.png";
	x.style.height = "100%";
	x.style.width = "100%";
}
function uncover(x){
	document.getElementById("ImgProject").src = "./content/images/Project1.png";
}
function cover2(x){	
	document.getElementById("ImgProject2").src = "./content/images/cover2.png";
	x.style.height = "100%";
	x.style.width = "100%";
}
function uncover2(x){
	document.getElementById("ImgProject2").src = "./content/images/Project2.png";
}
function cover3(x){	
	document.getElementById("ImgProject3").src = "./content/images/cover3.png";
	x.style.height = "100%";
	x.style.width = "100%";
}
function uncover3(x){
	document.getElementById("ImgProject3").src = "./content/images/Project3.png";
}

function formSubmit() {
	var inputName = document.getElementById("inputName").value;
	var inputEmail = document.getElementsByClassName("inputEmail").value;
	var inputSubject = document.getElementsByClassName(inputSubject).value;
	var inputMessage = document.getElementsByClassName(inputMessage).value;
	if (inputName == "" || inputEmail == "" || inputSubject == "" || inputMessage == "") {
        alert("Please fill out the form correctly, and then re-submit.");	
	}
	else {
		alert("Thank you, your message has been recieved! We will get back to you ASAP.");
	}
}
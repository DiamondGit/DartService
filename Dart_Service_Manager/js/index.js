"use strict"

let html = document.documentElement,
    body = document.body,
    progress = document.querySelector('.progress'),
    navbar = document.querySelector(".navbar"),
    logo = document.querySelector("#logo"),
    lastScroll = 0, savedHeight = 0;

document.addEventListener('scroll', function() {
    let hst = html["scrollTop"];
    let scroll = ( hst || body["scrollTop"] ) / ( (html["scrollHeight"] || body["scrollHeight"] ) - html.clientHeight) * 100;
    progress.style.setProperty('--scroll', scroll + '%');

    if (hst > 100){
        navbar.style.height = "50px";
        progress.style.top = "45px";
        html.style.setProperty("--navbarAfter", "45px");
        logo.style.height = "30px";

        if (lastScroll < hst){
            lastScroll = hst;
        } 
        
        if (lastScroll - hst >= 20){ //up
            navbar.style.height = "100px";
            progress.style.top = "100px";
            html.style.setProperty("--navbarAfter", "100px");
            logo.style.height = '40px';
            if ((savedHeight == 0) || (savedHeight > hst)) savedHeight = hst;
        }
        if ( (hst - savedHeight >= 20) && (savedHeight != 0)){ //down
            navbar.style.height = "50px";
            progress.style.top = "50px";
            html.style.setProperty("--navbarAfter", "50px");
            logo.style.height = "30px";
            lastScroll = hst;
            savedHeight = 0;
        }

    } else {
        navbar.style.height = "100px";
        progress.style.top = "95px";
        html.style.setProperty("--navbarAfter", "95px");
        logo.style.height = '40px';
    }
});

let slides = Array.from(document.getElementsByClassName("slide"));

$(".slide-content").hide();

$(document).ready(function(){
    $(".slide").children(".slide-header").click(function() {
        $(".slide").children(".slide-content").slideUp("1000");
        $(".slide").children(".slide-header").css("background-color", "rgb(236, 236, 236)");
        parent = $(this.parentNode);
        if (parent.children(".slide-content").is(":visible")){
            parent.children(".slide-content").slideUp("1000");
            $(this).css("background-color", "rgb(236, 236, 236)");
        }
        else{
            parent.children(".slide-content").slideToggle("1000");
            $(this).css("background-color", "rgb(255, 255, 255)");
        }
            
    });
});

slides.forEach(slide => {
    let slideHeader = Array.from(slide.getElementsByClassName("slide-header"))[0];
    let line = slide.querySelector("span");
    let slideTitle = Array.from(slide.getElementsByClassName("slide-title"))[0];
    let arrow = Array.from(slide.getElementsByClassName("fas"))[1];
    arrow.style.transform = arrow.style.transform? `rotate(${Number.parseInt(arrow.style.transform.slice(7))+180}deg)`: "rotate(0deg)";
    changeColorService(slideHeader)

    slideHeader.addEventListener("click", () => {
        changeColorService(slideHeader);
        line.style.opacity = line.style.opacity == "1"? "0": "1";
        slideTitle.style.transform = slideTitle.style.transform == "translateX(0px)"? "translateX(-200px)": "translateX(0px)";
        slideTitle.style.opacity = slideTitle.style.opacity == "1"? "0": "1";
        arrow.style.transform = arrow.style.transform? `rotate(${Number.parseInt(arrow.style.transform.slice(7))+180}deg)`: "rotate(0deg)";
    })
});

function changeColorService(slideHeader){
    slideHeader.style.backgroundColor = slideHeader.style.backgroundColor == "rgb(236, 236, 236)" ? "rgb(255, 255, 255)" : "rgb(236, 236, 236)";
}

document.getElementById("customersUp").addEventListener("click", (event) => {
    event.preventDefault();
    scrollCustomers(true);
});
document.getElementById("customersDown").addEventListener("click", (event) => {
    event.preventDefault();
    scrollCustomers(false);
});

let comments = Array.from(document.getElementsByClassName("comment"));
comments.forEach( (comment, index) => {
    comment.dataset.commentIndex = index;
    comment.style.transform = "translateY(0px)";
});

function scrollCustomers(direction){
    let comments = Array.from(document.getElementsByClassName("comment"));

    for (let i=0; i<comments.length; i++){
        let comment = comments[i];
        let answer = `translateY(${calculatePosition(getPosition(comment.style.transform), comment.dataset.commentIndex, comments.length-1, direction)}px)`;
        comment.style.transform = answer;
    }
}
function getPosition(string){
    return Number.parseInt(string.slice(11));
}
function calculatePosition(position, index, maxIndex, isUp){
    let unit = 195;
    if (isUp){
        let newPosition = position - unit;
        if ((newPosition + unit * index) < 0) 
            return unit * (maxIndex - index);
        else return newPosition;
    
    } else {
        let newPosition = position + unit;
        if ((newPosition - unit * (maxIndex - index)) > 0)
            return -unit * index;
        else return newPosition;
        
    }
}

let membersList = document.querySelector(".teamMembers");
let teamMembers = Array.from(membersList.querySelectorAll("img"));

let nameLabel = document.querySelector("#memberName");

teamMembers.forEach((teamMember, index) => {
    teamMember.addEventListener("click", () => {
        let newTeamMembers = Array.from(document.querySelectorAll(" .teamMembers img"));
        nameLabel.textContent = teamMember.dataset.name;
        if (+teamMember.dataset.index == 0){
            membersList.insertAdjacentElement("afterbegin", newTeamMembers[1]);
            newTeamMembers[1].style.width = "100px";
            newTeamMembers[1].style.opacity = ".5";
            newTeamMembers[1].dataset.index = 0;

            newTeamMembers[0].style.width = "150px";
            newTeamMembers[0].style.opacity = "1"; 
            newTeamMembers[0].dataset.index = 1;
        } else if (+teamMember.dataset.index == 2){
            membersList.insertAdjacentElement("beforeend", newTeamMembers[1]);
            newTeamMembers[1].style.width = "100px";
            newTeamMembers[1].style.opacity = ".5";
            newTeamMembers[1].dataset.index = 2;

            newTeamMembers[2].style.width = "150px";
            newTeamMembers[2].style.opacity = "1"; 
            newTeamMembers[2].dataset.index = 1;
        }
    });
    if (index == 1){
        nameLabel.textContent = teamMember.dataset.name;
    } else {
        teamMember.style.width = "100px";
        teamMember.style.opacity = ".5";
    }
});


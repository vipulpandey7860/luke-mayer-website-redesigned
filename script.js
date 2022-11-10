function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);


    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        getDirection: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    locoScroll.on('scroll', function (dets) {

        if (dets.direction === "up") {
            document.querySelector('#nav').style.top = "0";
        }

        else {
            document.querySelector('#nav').style.top = "-100%";

        }

    })

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}


function CircleMoving() {

    var circle = document.querySelector("#moving-circle");

    document.body.addEventListener("mousemove", function (dets) {

        circle.style.left = `${dets.pageX}px`;
        circle.style.top = `${dets.pageY}px`;

    })


}


function PageColorChange() {

    var container = document.querySelectorAll(".img-txt-container");
    var main = document.querySelector("#main");
    var circleTxt = document.querySelectorAll(".round-txt");
    var circle = document.querySelector('#moving-circle');


    for (let i = 0; i < container.length; i++) {
        container[i].addEventListener("mouseenter", function (dets) {

            const color = dets.path[0].dataset.color;
            main.style.backgroundColor = color;

            circleTxt[i].style.display = 'initial';
            circle.style.display = 'none';


        });
        container[i].addEventListener("mouseleave", function (dets) {

            main.style.backgroundColor = "white";
            circleTxt[i].style.display = 'none';

            circle.style.display = 'initial';



        });

    }

    // arrow and round text movement

    for (let i = 0; i < container.length; i++) {
        container[i].addEventListener("mousemove", function (e) {


            var bndrectvals = container[i].getBoundingClientRect()
            var xVal = Math.abs(e.clientX - bndrectvals.x);
            var yVal = Math.abs(e.clientY - bndrectvals.y);

            circleTxt[i].style.left = xVal + "px";
            circleTxt[i].style.top = yVal + "px";

        })


    }

}

function circleBigSolidBG() {

    var ReqElem = document.querySelectorAll(".reqElem")
    var circle = document.querySelector('#moving-circle');


    for (let i = 0; i < ReqElem.length; i++) {

        ReqElem[i].addEventListener('mousemove', function (info) {

            circle.style.transform = 'scale(4)';
            circle.style.backgroundColor = 'white';

        })

        ReqElem[i].addEventListener('mouseleave', function (info) {


            circle.style.transform = 'scale(1)';
            circle.style.backgroundColor = 'transparent';
            circle.style.border = ' 2px solid #fff';



        })

    }
}

function EmailCircle() {
    var emailCircle = document.querySelector("#email-circle");


    emailCircle.addEventListener("mousemove", function (ek) {

        emailCircle.style.transform = 'scale(1.5)';
        emailCircle.style.transform = `translate(${ek.clientX * .2}px,${ek.clientY * .1}px)`;


    })

    emailCircle.addEventListener('mouseleave', function (mnt) {

        emailCircle.style.transform = `translate(0px,0px)`;

    })


}


function OpenCloseButton() {

    var menu = document.querySelector("#menu");
    var full = document.querySelector(".menubar");
    var line1 = document.querySelector("#line1");
    var line2 = document.querySelector("#line2");

    var clickCounter = 1;

    menu.addEventListener("click", function () {
        if (clickCounter === 1) {

            full.style.width = '20vw';
            line1.style.transform = `rotate(45deg) translate(-1px, 10px)`;
            line2.style.transform = `rotate(-45deg) translate(-1px, -10px)`;

            line1.style.marginLeft = '15px';
            line2.style.marginLeft = '15px';


            clickCounter = 0;
        } else {
            full.style.width = '0vw';

            line1.style.transform = ``;
            line2.style.transform = ``;

            clickCounter = 1;
        }

    })

}

function MOpenCloseButton() {

    var menu = document.querySelector("#menu");
    var full = document.querySelector(".menubar");
    var line1 = document.querySelector("#line1");
    var line2 = document.querySelector("#line2");

    var clickCounter = 1;

    menu.addEventListener("click", function () {
        if (clickCounter === 1) {

            full.style.width = '45vw';
            line1.style.transform = `rotate(45deg) translate(3px, 12px)`;
            line2.style.transform = `rotate(-45deg) translate(-7px, -3px)`;

            line1.style.marginLeft = '15px';
            line2.style.marginLeft = '15px';


            clickCounter = 0;
        } else {
            full.style.width = '0vw';

            line1.style.transform = ``;
            line2.style.transform = ``;

            clickCounter = 1;
        }

    })

}

function emailCopy() {

    let copytxt = document.querySelector('#copy');
    let copiedtxt = document.querySelector('#copied');

    let emailTxt = document.querySelector('#email')

    emailTxt.addEventListener('mouseenter', function () {
        copytxt.style.opacity = '1';

    })

    document.querySelector('#email').addEventListener('mouseleave', function () {
        copytxt.style.opacity = '0';
        copiedtxt.style.opacity = '0';


    })


    emailTxt.addEventListener('click',function(){
        copytxt.style.opacity = '0';
        copiedtxt.style.opacity = '1';

    })

}


if (window.innerWidth<600) {
    MOpenCloseButton();
    locoScroll();
    PageColorChange();
    CircleMoving();
    EmailCircle();
    circleBigSolidBG();
    emailCopy();
}

else{
    locoScroll();
    PageColorChange();
    CircleMoving();
    EmailCircle();
    circleBigSolidBG();
    OpenCloseButton();
    emailCopy();
}


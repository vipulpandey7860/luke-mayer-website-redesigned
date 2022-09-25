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
        circle.style.mixBlendMode = 'difference';
        circle.style.display = 'initial';

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

            circle.style.transform = 'scale(5)';
            circle.style.backgroundColor = 'white';
            circle.style.border = `2px solid black`;


        })

        ReqElem[i].addEventListener('mouseleave', function (info) {


            circle.style.transform = 'scale(1)';

        })

    }
}

function EmailCircle() {
    var emailCircle = document.querySelector("#email-circle");

    emailCircle.addEventListener('mousemove', function (mnt) {

        emailCircle.style.transform = 'scale(1.2)'

    })

    emailCircle.addEventListener('mouseleave', function (mnt) {


        emailCircle.style.transform = 'scale(1)'

    })


}



locoScroll();
PageColorChange();
CircleMoving();
EmailCircle();
circleBigSolidBG();
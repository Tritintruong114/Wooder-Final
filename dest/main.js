const headerHeight = document.querySelector(".header");
const backToTop = document.querySelector(".footer__totopbtn");
const triggerButton = document.querySelector(".schero");
const languageSelected = document.querySelector(".current__text");
const listMenuDropDown = document.querySelector(".select");
const slideCount = document.querySelector(".index");
const titleSlider = document.querySelector(".--title-slider");

//Header background change
window.addEventListener("scroll", () => {
  let y = window.scrollY;
  let heightOfHero = triggerButton.offsetHeight; //Height of sc Hero
  if (y !== 0 && y > heightOfHero) {
    headerHeight.classList.add("bgBlack");
    backToTop.classList.add("showButton");
  } else {
    headerHeight.classList.remove("bgBlack");
    backToTop.classList.remove("showButton");
  }
});

window.addEventListener("scroll", () => {
  const scroll = document.body.scrollTop || document.documentElement.scrollTop;
  const progress =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scroll / progress) * 100;
  document.querySelector(".progressbar").style.height = scrolled + "%";
});
//Loading screen

//Slick
let i = 0;
window.onload = function () {
  if (i == 0) {
    i = 1;
    let progress = document.querySelector(".loading__bar-inside");
    let percent = document.querySelector(".loading__percent");
    let width = 10;
    const frame = () => {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        document.querySelector(".loading").classList.add("--hiden");
        $(".scbottomlist__slider").slick({
          infinite: true,
          speed: 150,
          slidesToShow: 1,
          variableWidth: true,
          autoplay: true,
          dots: false,
          arrows: false,
        });
        $(".scbottomlist").on(
          "init reInit afterChange",
          function (event, slick, currentSlide) {
            const exChangeToPercent =
              (slick.currentSlide / slick.slideCount) * 100 + 10;
            const numSlides = `${exChangeToPercent}%`;
            document.querySelector(".scbottomlist__progress-bar").style.width =
              numSlides;
          }
        );

        //Slider on SC Hero
        $(".slider__item-background").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 1500,
          autoplay: true,
          dots: true,
          appendDots: $(".slick-slider-dots"),
          prevArrow: true,
          nextArrow: true,

          //asNavFor to Sync 2 slider
          asNavFor: ".--title-slider",
        });
        $(".--title-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 1500,
          autoplay: true,
          dots: false,
          arrows: false,

          //asNavFor to Sync 2 slider
          asNavFor: ".slider__item-background",
        });
        $(".slick-next").click(function (e) {
          //e.preventDefault();
          $(".slider__item-background").slick("slickPrev");
        });

        $(".slick-prev").click(function (e) {
          //e.preventDefault();
          $(".slider__item-background").slick("slickNext");
        });

        $(".slider__item-background").on(
          "init reInit afterChange",
          function (event, slick, currentSlide, nextSlide) {
            if (!slick.$dots) {
              return;
            }
            let i = (currentSlide ? currentSlide : 0) + 1;

            slideCount.innerHTML = "";
            slideCount.innerHTML = `0${i}/0${slick.$dots[0].children.length}`;
          }
        );
      } else {
        width++;
        progress.style.width = width + "%";
        percent.textContent = width + "%";
      }
    };
    let id = setInterval(frame, 20);
  }
  // document.querySelector(".loading").classList.add("--hiden");

  //Slider on Gallery Bottom
};

//Back to top button
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

//Change Language
const getList = document.querySelectorAll(".select li");
const dropDown = document.querySelector(".select");
const lang = document.getElementById("#lang");
const turnOff = document.querySelector(".header__lang-current");
const arrow = document.querySelector(".current__arrow");

turnOff.addEventListener("click", (e) => {
  e.stopPropagation();
  arrow.classList.toggle("--toggle");
  dropDown.classList.toggle("--hiden");
});

document.addEventListener("click", () => {
  if (dropDown.classList.contains("--hiden")) {
    dropDown.classList.add("--hiden");
  } else {
    dropDown.classList.add("--hiden");
  }
  // dropDown.classList.remove("--hiden");
});

const myFunction = (item, index) => {
  item.addEventListener("click", () => {
    languageSelected.innerHTML = item.innerHTML;
  });
};
getList.forEach(myFunction);

//Toggle Video with X button

const xButton = document.querySelector(".x-icon");
const popUpVideo = document.querySelector(".popup");
const showVideo = document.querySelectorAll(".playicon");
const watchButton = document.querySelector(".btnwacth");
const videoContainer = document.querySelector(".video__cointainer");

xButton.addEventListener("click", () => {
  popUpVideo.classList.remove("--showPopup");
  videoContainer.innerHTML = ``;
});

watchButton.addEventListener("click", () => {
  popUpVideo.classList.add("--showPopup");
  videoContainer.innerHTML = `
             <iframe
                src="https://www.youtube.com/embed/6_0FgEvNz08?&autoplay=1"
                title="YouTube video player"
                frameborder="0"
                style="overflow: hidden; height: 100%; width: 100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
    `;
});
showVideo.forEach(function (item) {
  let idYoutube = item.getAttribute("data-video-id");

  item.addEventListener("click", () => {
    popUpVideo.classList.add("--showPopup");
    videoContainer.innerHTML = `
             <iframe
                src="https://www.youtube.com/embed/${idYoutube}?&autoplay=1"
                title="YouTube video player"
                frameborder="0"
                style="overflow: hidden; height: 100%; width: 100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
    `;
  });
});

// LOading screen

//Scroll to section
let menus = document.querySelectorAll(".header .header__menu li a");
let heightHeader = document.querySelector(".header").offsetHeight;

const removeActive = () => {
  menus.forEach((menu_element, menu_index) => {
    menu_element.classList.remove("--active-menu");
  });
};
menus.forEach((element, index) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    let className = element.getAttribute("href").replace("#", "");
    let section = document.querySelector("." + className);
    let positionSection = section.offsetTop - heightHeader;
    window.scrollTo({ top: positionSection, behavior: "smooth" });
    menus.forEach((menu_element, menu_index) => {
      menu_element.classList.remove("--active-menu");
    });
    element.classList.add("--active-menu");
  });
});

// Fancybox.bind('[data-fancybox="gallery"]', {
//   // Your custom options

//   loop: true,
// });

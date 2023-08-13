const headerHeight = document.querySelector(".header");
const backToTop = document.querySelector(".footer__totopbtn");
const triggerButton = document.querySelector(".schero");
const languageSelected = document.querySelector(".current__text");
const listMenuDropDown = document.querySelector(".select");
const slideCount = document.querySelector(".index");
const titleSlider = document.querySelector(".--title-slider");

//Header background change

let loadedCount = 0;

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
  document.querySelector(".progress").style.width = scrolled + "%";
});
//Loading screen

//Slick
imagesLoaded(document.querySelector("body"), function (instance) {
  if (instance) {
    let i = 0;
    let width = 0;
    let progress = document.querySelector(".loading__bar-inside");
    let percent = document.querySelector(".loading__percent");

    if (i == 0) {
      const frame = () => {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
          document.querySelector(".loading").classList.add("--hiden");
          $(".scbottomlist__slider").flickity({
            cellAlign: "left",
            freeScroll: true,
            prevNextButtons: false,
            pageDots: false,
            wrapAround: true,
          });
          let flkty = new Flickity(".scbottomlist__slider");
          flkty.on("scroll", (event) => {
            progress = Math.max(0, Math.min(1, event));
            document.querySelector(
              ".scbottomlist__progress-bar"
            ).style.width = `${progress * 100}%`;
          });
          //Slider on SC Hero
          $(".slider__item-background").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 1500,
            // autoplay: true,
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
      let id = setInterval(frame, 3);
    }
  }
});

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
  console.log("toggle");
});

document.addEventListener("click", () => {
  if (dropDown.classList.contains("--hiden")) {
    dropDown.classList.add("--hiden");
  } else {
    dropDown.classList.add("--hiden");
  }
});
const myFunction = (item, index) => {
  item.addEventListener("click", () => {
    languageSelected.innerHTML = item.innerHTML;
  });
};
getList.forEach(myFunction);

window.onresize = function (event) {
  window.innerWidth > 991.98
    ? document.querySelector(".nav").classList.add("--hiden")
    : document.querySelector(".nav").classList.remove("--hiden");
};

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
                class="iframe"
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

const handleTabsNews = () => {
  let tabs = document.querySelectorAll(".tab");
  let news = document.querySelectorAll(".scnews__posts");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((tab) => {
        tab.classList.remove("--active");
      });
      tab.classList.add("--active");

      news.forEach(function (newlist) {
        newlist.classList.remove("active");
      });

      let id = tab.dataset.tab;

      document.querySelector(`.scnews__posts${id}`).classList.add("active");
    });
  });
};

handleTabsNews();

//Accordion
let accElements = document.querySelectorAll(".acc");

accElements.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (element.classList.contains("--active")) {
      element.classList.toggle("--active");
    } else {
      accElements.forEach((el) => {
        if (el.classList.contains("--active")) {
          el.classList.remove("--active");
        }
      });
      element.classList.add("--active");
    }
    //   accElements.forEach((element) => {
    //     element.classList.remove("--active");
    //   });
    //   console.log(1);
    //   if (element.classList.contains("--active")) {
    //     element.classList.toggle("--active");
    //     console.log(2);
    //   } else {
    //     element.classList.toggle("--active");
    //     console.log(3);
    //   }
    // });
  });
});

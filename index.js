$(() => {
    $('#main-frame').css({"display":"block"});
    $('#loading').css({"display":"none"})
    disableAll()
    animateCSS('left','slideInLeft');
    animateCSS('right', 'slideInRight')
})
//

var frames = ['#contact-frame', '#profile-frame', '#about-frame', '#askus-frame']
var clickables = ['#contact','#profile','#about','#askus']
clickables.forEach(item => {
    $(item).on('click', event => {
        event.preventDefault()
        enableFrame(item.concat("-frame"))
    })
})
const disableAll = () => {
    frames.forEach(item => {
        $(item).css({"display":"none", "z-index":"-1"})
        $(item.concat("-exit")).on("click", event => {
            event.preventDefault()
            closeDoors().then(() => {
                $(item).css({"display":"none","z-index":"-1"})
            })
        })
    })
}
const enableFrame = frame => {
    $(frame).css({"display":"block"})
    openDoors().then((resolve) => { 
                         
                    $('#main-frame').css({"display":"none"})
                    $(frame).css({"z-index":"1", "display":"block"})
                }
            )
}
const openDoors = () => {
    return new Promise((resolve, reject) => {
        animateCSS("left", "slideOutLeft")
        animateCSS("right", "slideOutRight")
        $("#left").on('animationend', event => {
            event.stopPropagation()
            resolve(true)
        })
        
    })
}
const closeDoors = () => {
    return new Promise((resolve, reject) => {
        $("#main-frame").css({"display":"block"})
        animateCSS("left", "slideInLeft")
        animateCSS("right", "slideInRight")
        $("#left").on('animationend', event => {
            event.stopPropagation()
            resolve(true)
        })
    })
}
const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.getElementById(element);
    node.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }
    node.addEventListener('animationend', handleAnimationEnd, {once: false});
});
function copyEmail() {
    console.log("Here")
    var copyText = document.getElementById("email");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}
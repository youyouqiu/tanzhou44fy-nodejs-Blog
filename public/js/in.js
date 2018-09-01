function fixPagesHeight() {
    $('.swiper-slide,.swiper-container').css({
        height: $(window).height(),
    });
}

$(window).on('resize', function () {
    fixPagesHeight();
});
fixPagesHeight();

var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',

    mousewheelControl: true,

    watchSlidesProgress: true,

    onInit: function (swiper) {
        swiper.myactive = 0;
        console.log(swiper.activeIndex);

    },
    onProgress: function (swiper) {
        for (var i = 0; i < swiper.slides.length; i++) {
            var slide = swiper.slides[i];
            var progress = slide.progress;
            var translate, boxShadow;
            translate = progress * swiper.height * 0.8;
            scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
            boxShadowOpacity = 0;
            slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';
            if (i == swiper.myactive) {
                es = slide.style;
                es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
                es.zIndex = 0;
            } else {
                es = slide.style;
                es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = '';
                es.zIndex = 1;
            }
        }
    },
    onTransitionEnd: function (swiper, speed) {
        for (var i = 0; i < swiper.slides.length; i++) {
        }
        swiper.myactive = swiper.activeIndex;
    },
    onSetTransition: function (swiper, speed) {
        for (var i = 0; i < swiper.slides.length; i++) {
            es = swiper.slides[i].style;
            es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
        }
    }
});
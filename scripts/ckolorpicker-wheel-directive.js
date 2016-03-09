(function(aCKolor) {
    /* MARKUP
     * <a-ckolor-wheel></a-ckolor-wheel>
     */
    aCKolor.directive('aCkolorWheel', function($timeout, $document, CKolorFactory){
        return {
            restrict: 'E',
            templateUrl: '../html/ackolor-wheel.html',
            link: function(scope,elm,attrs){
                scope.CKolorFactory = CKolorFactory;

                /* DOM Definitions */
                var body = $document[0].body;
                var input = elm[0].querySelector('.c-ckolor__input');
                var wheel = elm[0].querySelector('.c-ckolor__wheel-value');
                var scoop = elm[0].querySelector('.c-ckolor__wheel-scoop');
                var closeBtn = elm[0].querySelector('.c-ckolor__close-btn');
                var saveBtn = elm[0].querySelector('.c-ckolor__save-btn');
                var saturation = elm[0].querySelector('.c-ckolor__saturation');
                var saturationHandle = elm[0].querySelector('.c-ckolor__saturation-handle');
                var alpha = elm[0].querySelector('.c-ckolor__alpha');
                var alphaHandle = elm[0].querySelector('.c-ckolor__alpha-handle');
                var rect = null;
                var srect = null;
                var arect = null;
                /* End DOM Definitions */


                /* DOM Manipulations */
                /* Mouse movement on color wheel, update hue and lightness */
                var wheelMove = function(e){
                    $timeout(function(){CKolorFactory.hueLightFromRadial(e);});
                };

                /* Mouse movement on saturation slider, update saturation */
                var saturationMove = function(e){
                    var x = e.pageX - (srect.left);
                    CKolorFactory.hsl.s = Math.round((x / srect.width) * 100);
                    $timeout(function(){
                        CKolorFactory.updateHSL();
                    });
                };

                /* Mouse movement on saturation slider, update alpha */
                var alphaMove = function(e){
                    var x = e.pageX - (arect.left);
                    CKolorFactory.alpha = Math.round((x / arect.width) * 100);
                    $timeout(function(){
                        CKolorFactory.updateHSL();
                    });
                };

                /* On body-> mouseup, clear out mousemove event listeners */
                var mouseUpped = function(e){
                    wheel.removeEventListener('mousemove', wheelMove, true);
                    // wheel.removeEventListener('touchmove', wheelMove, true);
                    saturation.removeEventListener('mousemove', saturationMove, true);
                    alpha.removeEventListener('mousemove', alphaMove, true);
                    // saturation.removeEventListener('touchmove', saturationMove, true);
                    body.removeEventListener('mouseup', mouseUpped, true);
                    // body.removeEventListener('touchend', mouseUpped, true);
                };

                /* On mouse down, add mouse move and up listeners to detect dragging start/end */
                var wheelDown = function(e){
                    /* Color wheel dimensions */
                    rect = wheel.getBoundingClientRect();
                    /* Called to update colors if only a click */
                    wheelMove(e);
                    /* Add mouse move/up event listeners */
                    wheel.addEventListener('mousemove', wheelMove, true);
                    // wheel.addEventListener('touchmove', wheelMove, true);
                    body.addEventListener('mouseup', mouseUpped, true);
                    // body.addEventListener('touchend', mouseUpped, true);
                };

                /* On mouse down, add mouse move and up listeners to detect dragging start/end */
                var saturationDown = function(e){
                    /* Saturation slider dimensions */
                    srect = saturation.getBoundingClientRect();
                    /* Called to update colors if only a click */
                    saturationMove(e);
                    /* Add mouse move/up event listeners */
                    saturation.addEventListener('mousemove', saturationMove, true);
                    // saturation.addEventListener('touchmove', saturationMove, true);
                    body.addEventListener('mouseup', mouseUpped, true);
                    // body.addEventListener('touchend', mouseUpped, true);
                };

                /* On mouse down, add mouse move and up listeners to detect dragging start/end */
                var alphaDown = function(e){
                    /* Alpha slider dimensions */
                    arect = alpha.getBoundingClientRect();
                    /* Called to update colors if only a click */
                    alphaMove(e);
                    /* Add mouse move/up event listeners */
                    alpha.addEventListener('mousemove', alphaMove, true);
                    // saturation.addEventListener('touchmove', saturationMove, true);
                    body.addEventListener('mouseup', mouseUpped, true);
                    // body.addEventListener('touchend', mouseUpped, true);
                };

                wheel.addEventListener('mousedown', wheelDown, true);
                // wheel.addEventListener('touchstart', wheelDown, true);
                saturation.addEventListener('mousedown', saturationDown, true);
                // saturation.addEventListener('touchstart', saturationDown, true);
                alpha.addEventListener('mousedown', alphaDown, true);
                /* End DOM Manipulations */

                /* The width of the color wheel */
                CKolorFactory.circleWidth = wheel.offsetWidth;

                /* If HSL is updated and valid, trigeer the other color formats to be updated */
                scope.$watchCollection(function(){return CKolorFactory.hls;}, function(newVal, oldVal){
                    if(
                        newVal !== oldVal &&
                        !isNaN(newVal.h) && !isNaN(newVal.l) && !isNaN(newVal.s) &&
                        newVal.h >= 0 && newVal.h <= 360 &&
                        newVal.l >= 0 && newVal.l <= 255 &&
                        newVal.s >= 0 && newVal.s <= 255
                    ){
                        CKolorFactory.updateHSL();
                    }
                });
            }
        };
    });
})(angular.module('aCKolor'));

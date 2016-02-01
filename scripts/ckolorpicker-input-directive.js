(function(aCKolor) {
    /* MARKUP
     * <a-ckolor element-id="'an_id'" input-id="'inputs'" model="app.color" name="'color-input'" type="'hidden'"></a-ckolor>
     */

    aCKolor.directive('aCkolor', function($document, CKolorFactory){
        return {
            restrict: 'E',
            scope: {
                elementId: '=', // OPTIONAL: The id of container element
                inputId: '=',   // OPTIONAL: the id of the input
                model:'=',      // The model to watch
                name: '=',      // OPTIONAL: input name
                type: '='       // Type of input
            },
            templateUrl: '../html/ackolor.html',
            link: function(scope,elm,attrs){
                var makeid = function(){
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for(var i=0;i<35;i++){text+=possible.charAt(Math.floor(Math.random()*possible.length));}
                    return text;
                };

                /* DOM Definitions */
                var body = $document[0].body;
                /* End DOM Definitions */



                /* DOM Manipulations */
                var clearBlurs = function(e){
                    /* Clear everything that has the blurring class */
                    angular.element($document[0].querySelectorAll('.c-ckolor__overlay-blur')).removeClass('c-ckolor__overlay-blur');
                };

                /* Starting from the elm, go up the dom tree and add the blurring classes to the siblings, blurring everything except the elements leading to the elm */
                var cycleUp = function(el) {
                    var parent = el.parentNode;
                    var children = parent.children;
                    var childLength = children.length;
                    /* Add class to all siblings */
                    while(childLength--){ children[childLength].className = (children[childLength] !== el)? children[childLength].className + ' c-ckolor__overlay-blur' : children[childLength].className; }
                    /* if the next parent is not body tag, keep going */
                    return (parent.parentNode && parent.parentNode !== body)? cycleUp(parent) : false;
                };
                /* END DOM Manipulations */


                /* Make a random id */
                var modelId = makeid();
                scope.CKolorFactory = CKolorFactory;

                if(!scope.type){
                    scope.type = 'hidden';
                }

                /* Toggles the color wheel */
                scope.toggleCKoloring = function(is){
                    /* Clear any existing blur classes and apply to the proper elements */
                    clearBlurs();
                    cycleUp(elm[0]);

                    /* Init color wheel */
                    CKolorFactory.init({
                        model: scope.model,
                        modelId: modelId
                    });

                    /* Open color wheel */
                    CKolorFactory.ckoloring = true;
                };

                /* When CKolorFactory.save() is called and the model is updated */
                scope.$watch(function(){return CKolorFactory.model;}, function(newVal, oldVal){

                    /* If model update and is this directive's model */
                    if(newVal !== oldVal && CKolorFactory.modelId === modelId && newVal !== scope.model){
                        /* Clear blurring classes */
                        clearBlurs();

                        /* Validate the colors, update only if valid */
                        switch(CKolorFactory.originalFormat){
                            case 'hex':
                                var valid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(CKolorFactory.model);
                                if(valid){ scope.model = CKolorFactory.model; }
                                break;
                            case 'rgb':
                                try{
                                    var colors = CKolorFactory.model.split('(')[1].split(')')[0].split(',');
                                    var valid = true;
                                    for (var i=0;i<colors.length;i++) {
                                        colors[i] = parseInt(colors[i]);
                                        if (isNaN(colors[i]) || colors[i] > 255 || colors[i] < 0) {
                                            valid = false;
                                        }
                                    }
                                    if(valid){ scope.model = CKolorFactory.model; }
                                }catch(e){}
                                break;
                            case 'hsl':
                                try{
                                    var colors = CKolorFactory.model.split('(')[1].split(')')[0].split(',');
                                    var valid = true;
                                    for (var i=0;i<colors.length;i++) {
                                        colors[i] = parseInt(colors[i]);
                                        if(i === 0){
                                            if (isNaN(colors[i]) || colors[i] > 360 || colors[i] < 0) {
                                                valid = false;
                                            }
                                        }else{
                                            if (isNaN(colors[i]) || colors[i] > 100 || colors[i] < 0) {
                                                valid = false;
                                            }
                                        }
                                    }
                                    if(valid){ scope.model = CKolorFactory.model; }
                                }catch(e){}
                                break;
                        }

                    }
                });

                /* On color wheel closing, clear the blurring classes */
                scope.$watch(function(){return CKolorFactory.ckoloring;}, function(newVal, oldVal){
                    if(CKolorFactory.ckoloring === false && CKolorFactory.modelId === modelId){
                        clearBlurs();
                    }
                });
            }
        };
    });
})(angular.module('aCKolor'));

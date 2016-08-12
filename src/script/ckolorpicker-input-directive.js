(function(aCKolor) {
    /* MARKUP
     * <a-ckolor element-id="'an_id'" input-id="'inputs'" model="app.color" name="'color-input'" type="'hidden'"></a-ckolor>
     */

    aCKolor.directive('aCkolor', function($document, CKolorFactory, $compile, $timeout){
        return {
            restrict: 'E',
            scope: {
                elementId: '=',     // OPTIONAL: The id of container element
                inputId: '=',       // OPTIONAL: the id of the input
                model:'=',          // The model to watch
                name: '=',          // OPTIONAL: input name
                type: '=',          // Type of input
                defaultColor: '=',  // OPTIONAL: If the model is an invalid color string, use this instead
				blur: '='   		// OPTIONAL: Enable or disable the css blur filter behind the overlay. Enabled by default
            },
            templateUrl: '../html/ackolor.html',
            link: function(scope,elm){

                var makeid = function(){
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for(var i=0;i<35;i++){text+=possible.charAt(Math.floor(Math.random()*possible.length));}
                    return text;
                };

                /* DOM Definitions */
                var body = $document[0].body;
				var $body = angular.element(body);
				var wheel = body.querySelector('.c-ckolor__wheel');
                /* End DOM Definitions */


                function clearBlurs(){
					if(scope.blur === true || scope.blur === undefined){
						$body.removeClass('c-ckolor__overlay-blur');
					}
                }

				function setCircleWidth(){
					if(wheel && wheel.offsetWidth){
						CKolorFactory.circleWidth = wheel.offsetWidth;
					}else{
						$timeout(function(){
							setCircleWidth();
						}, 200);
					}
				}


                /* Make a random id */
                var modelId = makeid();
                scope.CKolorFactory = CKolorFactory;

                if(!scope.type){
                    scope.type = 'hidden';
                }

                /* Toggles the color wheel */
                scope.toggleCKoloring = function(){
					var existing = body.querySelector('a-ckolor-wheel');
					if(!existing){
						var template = '<a-ckolor-wheel></a-ckolor-wheel>';
						var content = $compile(template)(scope);
						$body.append(content);
						wheel = body.querySelector('.c-ckolor__wheel');
					}

					if(scope.blur === true || scope.blur === undefined){
						$body.addClass('c-ckolor__overlay-blur');
					}

                    /* Init color wheel */
                    CKolorFactory.init({
                        model: scope.model,
                        modelId: modelId,
                        defaultColor: scope.defaultColor
                    });

                    /* Open color wheel */
                    CKolorFactory.ckoloring = true;
					setCircleWidth();
                };

                /* When CKolorFactory.save() is called and the model is updated */
                scope.$watch(function(){return CKolorFactory.model;}, function(newVal, oldVal){

                    /* If model update and is this directive's model */
                    if(newVal !== oldVal && CKolorFactory.modelId === modelId && newVal !== scope.model){
                        /* Clear blurring classes */
                        clearBlurs();

						var valid, colors, i;

                        /* Validate the colors, update only if valid */
                        switch(CKolorFactory.originalFormat){
                            case 'hex':
                                valid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(CKolorFactory.model);
                                if(valid){ scope.model = CKolorFactory.model; }
                                break;
                            case 'rgb':
                                try{
                                    colors = CKolorFactory.model.split('(')[1].split(')')[0].split(',');
                                    valid = true;
                                    for (i=0;i<colors.length;i++) {
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
                                    colors = CKolorFactory.model.split('(')[1].split(')')[0].split(',');
                                    valid = true;
                                    for (i=0;i<colors.length;i++) {
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

(function(demo){
	'use strict';
	demo.config(function ($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: "./demo/demo.html",
			controller: 'AppCtlr',
		})
		.when('/readme', {
			templateUrl: "./demo/readme.html",
			controller: 'AppCtlr',
		})
		.otherwise({ redirectTo: '/' });
		$locationProvider.html5Mode(true);
	});

	demo.controller('AppCtlr', function(){
		var self = this;

		this.demoOptions = [{
			name: 'None',
			fn: undefined
		},{
			name: 'Update model',
			fn: function(arg){
				var temp = null;
				self.documentation['item'].properties['scope']['property'].value = temp;
			}
		}];

		this.updateChange = function(dir, propName){
			if(dir.meta.properties.scope[propName].optionModel == null){
				dir.meta.properties.scope[propName].optionModel = dir.meta.properties.scope[propName].defaultOption;
			}

			var optionModel = dir.meta.properties.scope[propName].optionModel;
			dir.meta.properties.scope[propName].value = dir.meta.properties.scope[propName].options[optionModel].fn;
		};

		this.documentation = {
			title: 'aCKolor',
			description: 'Angular color picker that accepts/stores rgb, rgba, hex, hsl, and transparent color values.',

			"aCkolor": {
				description: 'The a-ckolor directive creates an input that will be bound to the color string(via ngModel). By default, it\'s a hidden input, but can be defined using the `type` attribute. The input is wrapped in an element (`.c-ckolor__input-wrapper`) that when clicked, opens up the color wheel.',
				markup: '<a-ckolor model="" element-id="" input-id="" name="" type="" blur="" default-color=""></a-ckolor>',
				properties: {
					scope: {
						"blur": {
							type: 'boolean',
							description: 'Optional. Enable or disable the css blur filter behind the overlay. Enabled by default.',
							value: true
						},
						"default-color": {
							type: 'string',
							description: 'Optional. If the initial value is not a valid color string(transparent, inherit, null, etc), this can be used to set a default when the color wheel is opened. Be sure to wrap in single quotes, i.e. `default-color="\'#a10005\'"`.',
							value: '#ccc'
						},
						"element-id": {
							type: 'string',
							description: 'Optional. Sets the input\'s wrapper, .c-ckolor__input-wrapper, id. This is useful if you plan on targeting the whole element with css or javascript.',
							value: 'element_id'
						},
						"input-id": {
							type: 'string',
							description: 'Optional. An id to give the input.',
							value: 'input_id'
						},
						"model": {
							type: 'string',
							description: 'Required. The scope model.',
							value: '#a10005'
						},
						"name": {
							type: 'string',
							description: 'Optional. Set the directive\'s input name attribute.',
							value: 'input_name'
						},
						"type": {
							type: 'string',
							description: 'Optional. Set the directive\'s input type attribute. If omitted, it defaults to hidden.',
							value: 'hidden'
						}
					}
				}
			},

			"aCkolorHexInput": {
				description: "Parses/validates hex values",
				markup: '<input ng-model="" type="text" a-ckolor-hex-input>',
				preMarkup: '<div style="width: 100%; max-width: 300px;">',
				postMarkup: '</div>',
				properties: {
					scope: {
						"ng-model": {
							type: 'string',
							description: 'Required. Scope model.',
							value: '#a10005'
						},
					}
				}
			},

			"aCkolorWheel": {
				description: "Contains the color wheel markup and is automatically compiled in the body element when an input is clicked.",
				markup: '',
				properties: {}
			},

			"CKolorFactory": {
				description: null,
				properties: {
					"alpha": {
						description: "Number - The alpha value of RGB and HSL colors.",
					},
					"ckoloring": {
						description: "Boolean - Flag that determines if the color wheel is open or not.",
					},
					"defaultColor": {
						description: "String - If no valid color is given, defaults to the is value.",
					},
					"display": {
						description: "String - Color mode that is displayed, auto selected by model’s color mode and changed by the dropdown selection.",
					},
					"inputHsl": {
						description: "Object {h:float s:float l:float} - HSL number input values - hue, saturation, lightness",
					},
					"hex": {
						description: "String - Hex input value",
					},
					"hsl": {
						description: "Object {h:float, s:float, l:float} - HSL values. The factory converts the model to HSL then sets the other types. Used on the color wheel and saturation slider.",
					},
					"hues": {
						description: "Array - 36 values of hue degrees used on the color wheel background.",
					},
					"model": {
						description: "String - The given color value.",
					},
					"modelId": {
						description: "String - The id of the given model. When there are multiple color pickers, this is used by the directives to determine which model is currently being worked on so they aren’t all updated.",
					},
					"originalFormat": {
						description: "String - The original format of the model. HSL, Hex, or RGB.",
					},
					"previousColors": {
						description: "Array - Previously selected colors. Stored in localStorage.",
					},
					"rgb": {
						description: "Object {r:integer, g:integer, b:integer} - RGB input value. Red, Green, Blue.",
					},
					"circleWidth": {
						description: "Number - The width of the color wheel",
					},
					"init()": {
						description: "Called from the input directive to initialize the color wheel with it’s values.",
						arguments: {
							model: {
								type: "Scope",
								description: null
							},
							modelId: {
								type: "String",
								description: null
							}
						}
					},
					"save()": {
						description: "Updates the model and turns the color wheel off."
					},
					"toggleCKoloring()": {
						description: "Toggles the color wheel off."
					},
					"updateColorDisplay()": {
						description: "Updates the color wheel display to the given parameter.",
						arguments: {
							display: {
								type: "String",
								description: "Either 'hex', 'hsl', 'rgb'"
							},
						}
					},
					"updateHSL()": {
						description: "Convert other color models from the hsl property when this is called."
					},
					"updateRGB()": {
						description: "Convert other color models from the rgb property when this is called."
					},
					"updateHEX()": {
						description: "Convert other color models from the hex property when this is called."
					},
					"validHex": {
						description: "Formats/validates a hex string",
						arguments: {
							hex: {
								type: "String",
								description: "Hex color"
							},
						},
						returns: {
							type: "String",
							description: "The formatted hex value"
						}
					},
					"hueLightFromRadial()": {
						description: "Get HSL from a point on color wheel.",
						arguments: {
							ev: {
								type: "Mouse event"
							}
						},
						returns: {
							type: "Object",
							description: "{h:number, l:number} - Hue and lightnes values"
						}
					},
					"radialXY()": {
						description: "Set scoop position based on HSL values.",
						returns: {
							type: "Object",
							description: "{x:number, y:number}"
						}
					},
					"convertTo()": {
						description: "Convert any color string to HSL and sets the originalFormat property.",
						returns: {
							type: "Object || String",
							description: "Converted color value"
						}
					},
					"hexToRgb()": {
						description: "Convert hex to rgb.",
						returns: {
							type: "Object",
							description: "{r:number, g:number, b:number}"
						}
					},
					"rgbToHsl()": {
						description: "Convert rgb to hsl.",
						returns: {
							type: "Object",
							description: "{h:number, s:number, l:number}"
						}
					},
					"hslToRgb()": {
						description: "Convert hsl to rgb.",
						returns: {
							type: "Object",
							description: "{r:number, g:number, b:number}"
						}
					},
					"intToHex()": {
						description: "Convert a rgb integer to a hex value.",
						returns: {
							type: "String",
							description: "Hex color value"
						}
					},
					"rgbToHex()": {
						description: "Convert rgb to hex.",
						returns: {
							type: "String",
							description: "Hex color value"
						}
					},
					"previousColorClick()": {
						description: "Sets the color to a previously stored color."
					}
				}
			}


			// Service
			/*
			CKronos: {
				description: null,
				properties: {
					"propertyOrMethod": {
						description: null,
						arguments: {
							arg: {
								type: null,
								description: null
							}
						},
						returns: {
							type: null,
							description: null
						}
					}
				}
			}
			*/
		}
	});
})(angular.module('app', [
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'aCKolor'
]));

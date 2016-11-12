(function(demo){
	demo.directive('doCks', function($anchorScroll){
		return {
			restrict: 'E',
			templateUrl: 'demo/docks.html',
			scope: {},
			controller: 'AppCtlr',
			controllerAs: 'ctlr',
			link: function(scope, elm, attrs, ctlr){
				function hasMetaScope(data){
					return (data.meta && data.meta.hasOwnProperty('properties') && data.meta.properties && data.meta.properties.hasOwnProperty('scope') && data.meta.properties.scope);
				}

				if(attrs.readme){
					scope.readme = true;
				}

				scope.module = attrs.module;

				if(scope.module){
					scope.description = ctlr.documentation.description;
					scope.directives = [];
					scope.services = [];

					this.anchorScroll = function(){
						var old = $location.hash();
						$location.hash(id);
						$anchorScroll();
						$location.hash(old);
					};

					scope.createElement = function(directive){
						if(directive.meta && directive.meta.markup){
							var html = (directive.meta.preMarkup || '') + directive.meta.markup;

							for(var p in directive.meta.properties.attributes){
								html = html.replace(p +'="', p +'="'+ directive.meta.properties.attributes[p].value);
							}

							for(var s in directive.meta.properties.scope){
								html = html.replace(s +'="', s +'="ctlr.documentation[\''+ directive.name +'\'].properties.scope[\''+ s +'\'].value');
							}

							html = html + (directive.meta.postMarkup || '');

							return html;
						}

						return '';
					};

					angular.module(scope.module)['_invokeQueue'].forEach(function(value){
						var name = value[2][0],
						docksmeta = ctlr.documentation[name],
						restrict,
						scopeProperties,
						requires,
						arg,
						fn,
						temp,
						data;

						if(value[1] === 'directive'){
							args = value[2][1];
							fn = args[args.length - 1] || args;

							if(fn){
								temp = fn();
								restrict = temp.restrict;
								scopeProperties = temp.scope;
								requires = temp.requires;
							}

							data = {
								name: name,
								restrict: restrict,
								scope: scopeProperties,
								require: requires,
								meta: docksmeta
							};

							var tempKeyArr = [];
							var tempKey = '';
							var t = 1;

							if(hasMetaScope(data)){
								for(var k in data.meta.properties.scope){
									if(k !== 'ng-model'){
										if(data.scope){
											tempKeyArr = k.split('-');
											tempKey = '';
											for(t=1; t<tempKeyArr.length; t=t+1){
												if(tempKeyArr[t].length){
													var newString = tempKeyArr[t].split('');
													newString[0] = newString[0].toUpperCase();
													tempKeyArr[t] = newString.join('');
												}
											}

											tempKey = tempKeyArr.join('');

											if(!data.scope.hasOwnProperty(tempKey)){
												data.meta.properties.scope[k].invalid = 'This scope property is not defined in directive';
											}
										}else{
											data.meta.properties.scope[k].invalid = 'This scope property is not defined in directive';
										}
									}
								}
							}

							if(data.scope){
								var tempScope = {
									type: null,
									description: null,
									value: null,
									invalid: 'This scope property is not defined in the documentation'
								};

								for(var s in data.scope){
									if(hasMetaScope(data)){
										tempKeyArr = s.match(/[A-Z][a-z]+/g);;
										tempKey = s;
										if(tempKeyArr){
											for(t=0; t<tempKeyArr.length; t=t+1){
												tempKey = tempKey.replace(tempKeyArr[t], '-' + tempKeyArr[t].toLowerCase());
											}
										}

										if(!data.meta.properties.scope.hasOwnProperty(tempKey)){
											data.meta.properties.scope[tempKey] = tempScope;
										}
									}else if(data.meta && !data.meta.hasOwnProperty('properties')){
										data.meta.properties = {scope: {}};
										data.meta.properties.scope[tempKey] = tempScope;
									}else if(!data.meta){
										data.meta = {properties: {scope: {}}};
										data.meta.properties.scope[tempKey] = tempScope;
									}
								}
							}

							scope.directives.push(data);
						}else if(value[1] === 'service' || value[1] === 'factory'){
							args = value[2][1];
							fn = args[args.length - 1] || args;
							scopeProperties = [];

							if(fn){
								temp = fn();
								for(var s in temp){
									if(s && temp[s]){
										scopeProperties.push(s);
									}
								}
							}

							data = {
								name: name,
								properties: scopeProperties,
								meta: docksmeta
							};

							/* TODO: do check up on services */
							if(data.properties.length){
								if(data.meta){

								}
							}

							scope.services.push(data);
						}
					});
				}

			}
		}
	});
})(angular.module('app'));

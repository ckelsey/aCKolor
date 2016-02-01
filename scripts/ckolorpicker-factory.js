// Touch
// Cross browser

// ngAnnotate
// ngHtmljs


(function(aCKolor) {
    aCKolor.factory('CKolorFactory', function(){
        var self = {
            ckoloring: false,   // Flag that determines if the color wheel is open or not
            display: 'hex',     // Color mode that is displayed, auto selected by model's color mode and changed by the dropdown selection
            inputHsl: {         // HSL number input values - hue, saturation, lightness
                h: null,
                s: null,
                l: null
            },
            hex: null,          // Hex input value
            hsl: {              // HSL values. The factory converts the model to HSL then sets the other types. Used on the color wheel and saturation slider.
                h: null,
                s: null,
                l: null
            },
            hues: [ 105, 135, 165, 195, 225, 255, 285, 315, 345, 15, 45, 75 ], // 12 values of hue degrees used on the color wheel background
            model: null,        // The given color value
            modelId: null,      // The id of the given model. When there are multiple colorpickers, this is used by the directives to determine which model is currently being worked on so they aren't all updated
            originalFormat: null, // The original format of the model. HSL, Hex, or RGB
            rgb: {              // RGB input value. Red, Green, Blue
                r: null,
                g: null,
                b: null
            },
            circleWidth: 0,     // The width of the color wheel

            /* Called from the input directive to initialize the color wheel with it's values */
            init: function(data){
                /* Given model info */
                self.model = data.model;
                self.modelId = data.modelId;

                /* Convert the color data */
                var current = self.convertTo(); /* To HSL */
                if(current){
                    self.hsl.h = self.inputHsl.h = current.h;
                    self.hsl.s = self.inputHsl.s = current.s;
                    self.hsl.l = self.inputHsl.l = current.l;
                    self.rgb = self.hslToRgb(current);
                    self.hex = self.rgbToHex(self.rgb);

                    /* Set the display to be original format, ie hex->hex */
                    self.display = self.originalFormat;
                }
            },

            /* Updates the model and toggles the ckoloring flag off */
            save: function(){
                /* convert back to original format */
                switch(self.originalFormat){
                    case 'hex': self.model = self.hex; break;
                    case 'hsl': self.model = 'hsl(' + self.hsl.h + ',' + self.hsl.s + '%,' + self.hsl.l + '%)'; break;
                    case 'rgb': self.model = 'rgb(' + self.rgb.r + ',' + self.rgb.g + ',' + self.rgb.b + ')'; break;
                };
                self.toggleCKoloring();
            },

            /* Toggles ckoloring off */
            toggleCKoloring: function(){
                self.ckoloring = false;
            },

            /* Updates the display to the given parameter */
            updateColorDisplay: function(display){
                return self.display = display;
            },

            /* Convert other color models when this is called */
            updateHSL: function(){
                self.hex = self.rgbToHex(self.hslToRgb(self.hsl));
                self.rgb = self.hslToRgb(self.hsl);
                self.inputHsl = self.hsl;
            },

            /* Convert other color models when this is called */
            updateRGB: function(){
                self.hex = self.rgbToHex(self.rgb);
                self.hsl = self.rgbToHsl(self.rgb);
            },

            /* Convert other color models when this is called */
            updateHEX: function(){
                /* Make sure it's a valid hex string */
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(self.hex);
                if(self.hex && self.hex.length == 7 && result){
                    self.rgb = self.hexToRgb(self.hex);
                    self.hsl = self.rgbToHsl(self.rgb);
                }
            },

            /* Conversion Utilities */

            /* Get HSL from a point on color wheel */
            hueLightFromRadial: function(e){
                /* Get color wheel dimensions */
                var rect = e.target.getBoundingClientRect();
                var radius = rect.width / 2;
                var left = rect.left;
                var top = rect.top;

                /* Color wheel center points */
                var cx = radius + left;
                var cy = radius + top;

                /* Mouse position distance from color wheel center */
                var dx = e.pageX - cx;
                var dy = e.pageY - cy;

                /* Hue degrees */
                var angle = Math.atan2(dy, dx) * (180 / Math.PI);
                var degrees = angle;
                if(degrees < 0){
                    degrees = degrees + 360;
                }

                /* Lightness */
                var possibleDistance = Math.sqrt((radius * radius) + (radius * radius)) - 18;
                var ratio = radius / possibleDistance;
                var distance = Math.round(Math.sqrt((dx * dx) + (dy * dy)) * ratio);

                /* Set Hue and Lightnes, update other values and scoop positions */
                self.hsl.l = (Math.round(100 - distance) > -1)? Math.round(100 - distance) : 0;
                self.hsl.h = (Math.round(degrees) > -1 || Math.round(degrees) < 360)? Math.round(degrees) : 0 ;
                self.updateHSL();
                self.radialXY();

                return {
                    h: self.hsl.h,
                    l: self.hsl.l
                };
            },

            /* Set scoop position based on HSL values */
            radialXY: function(){
                var outerRadius = self.circleWidth / 2;
                var radius = outerRadius * ((100 - self.hsl.l) / 100);
                var degrees = self.hsl.h;
                var x = outerRadius + (radius * Math.cos(degrees * Math.PI / 180));
                var y = (outerRadius * 2) - (outerRadius + -(radius * Math.sin(degrees * Math.PI / 180)));

                return {
                    x: x,
                    y: y
                }
            },

            /* Convert color string to HSL */
            convertTo: function(str){
                /* If not supplied, use the given model */
                str = (!str) ? self.model : str;

                /* If hex */
                if(str.indexOf('#') > -1){
                    var rgb = self.hexToRgb(str);
                    self.originalFormat = 'hex';
                    return self.rgbToHsl(rgb);

                }

                /* If HSL */
                else if(str.indexOf('hsl') > -1){
                    str = str.split('(')[1];
                    str = str.substring(0, str.length - 1);
                    str = str.split(',');
                    self.originalFormat = 'hsl';
                    return {
                        h: parseInt(str[0]),
                        s: parseInt(str[1]),
                        l: parseInt(str[2])
                    }

                }

                /* If RGB */
                else if(str.indexOf('rgb') > -1){
                    str = str.split('(')[1];
                    str = str.substring(0, str.length - 1);
                    str = str.split(',');
                    self.originalFormat = 'rgb';
                    return self.rgbToHsl({
                        r: parseInt(str[0]),
                        g: parseInt(str[1]),
                        b: parseInt(str[2])
                    });

                }else{
                    return false;
                }
            },

            /* Sourced from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
            hexToRgb: function(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            },

            /* Sourced from http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion */
            rgbToHsl: function(rgb){
                var r = rgb.r;
                var g = rgb.g;
                var b = rgb.b;

                r /= 255,
                g /= 255,
                b /= 255;
                var max = Math.max(r, g, b), min = Math.min(r, g, b);
                var h, s, l = (max + min) / 2;

                if(max == min){
                    h = s = 0; // achromatic
                }else{
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch(max){
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }

                if(h == 0 || isNaN(h)){
                    h = self.hsl.h;
                }

                return {
                    h: (Math.round((h * 360) * 100)) / 100,
                    s: (Math.round((s * 100) * 100)) / 100,
                    l: (Math.round((l * 100) * 100)) / 100
                };
            },

            /* Source from http://hsl2rgb.nichabi.com/javascript-function.php */
            hslToRgb: function(hsl){
                var h = hsl.h;
                var s = hsl.s;
                var l = hsl.l;
                var r, g, b, m, c, x;

                    if (!isFinite(h)) h = 0;
                    if (!isFinite(s)) s = 0;
                    if (!isFinite(l)) l = 0;

                    h /= 60;
                    if (h < 0) h = 6 - (-h % 6);
                    h %= 6;

                    s = Math.max(0, Math.min(1, s / 100));
                    l = Math.max(0, Math.min(1, l / 100));

                    c = (1 - Math.abs((2 * l) - 1)) * s;
                    x = c * (1 - Math.abs((h % 2) - 1));

                    if (h < 1) {
                        r = c;
                        g = x;
                        b = 0;
                    } else if (h < 2) {
                        r = x;
                        g = c;
                        b = 0;
                    } else if (h < 3) {
                        r = 0;
                        g = c;
                        b = x;
                    } else if (h < 4) {
                        r = 0;
                        g = x;
                        b = c;
                    } else if (h < 5) {
                        r = x;
                        g = 0;
                        b = c;
                    } else {
                        r = c;
                        g = 0;
                        b = x;
                    }

                    m = l - c / 2;
                    r = Math.round((r + m) * 255);
                    g = Math.round((g + m) * 255);
                    b = Math.round((b + m) * 255);

                    return { r: r, g: g, b: b };
            },

            intToHex: function(i) {
                var hex = parseInt(i).toString(16);
                return (hex.length < 2) ? "0" + hex : hex;
            },

            rgbToHex: function(rgb){
                return '#' + self.intToHex(rgb.r) + self.intToHex(rgb.g) + self.intToHex(rgb.b);
            }

        };
        return self;
    })
    ;
})(angular.module('aCKolor',[]));

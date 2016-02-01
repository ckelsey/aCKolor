# aCKolor
Color picker for angular.

``bower install ackolor``

**Add to your app**  

angular.module('app', ['aCKolor'])

[Live demo](http://cklsylabs.com/#/ackolor)

<br />
## Directives

### Input
Contains an input element that binds, via ngModel, a scope model. It is wrapped in an element ('.c-ckolor__input-wrapper') that when clicked, opens up the color wheel.

**Markup:**
```html
<a-ckolor model="app.color" element-id="'an_id'" input-id="'an_input_id'" name="'an-input-name'" type="'hidden'"></a-ckolor>
```
**Attributes**  

  ``model`` - Required. The scope model.  

  ``type`` - Optional. Set the directive's input type attribute. If omitted, it defaults to hidden.  

  ``element-id`` - Optional. Set the directive's id.  

  ``input-id`` - Optional. Set the directive's input id.  

  ``name`` - Optional. Set the directive's input name attribute.


___

### Color wheel
  Contains the color wheel markup.

**Markup:**
  ```html
  <a-ckolor-wheel></a-ckolor-wheel>
  ```

<br />
## Factory
####Properties:  

  ``ckoloring : BOOL`` - Flag that determines if the color wheel is open or not.

  ``display : STRING`` - Color mode that is displayed, auto selected by model's color mode and changed by the dropdown selection.

  ``inputHsl : {h:FLOAT, s:FLOAT, l:FLOAT}`` - HSL number input values - hue, saturation, lightness.

  ``hex : STRING`` - Hex input value.

  ``hsl : {h:FLOAT, s:FLOAT, l:FLOAT}`` - HSL values. The factory converts the model to HSL then sets the other types. Used on the color wheel and saturation slider.

  ``hues : [INT]`` - 12 values of hue degrees used on the color wheel background.

  ``model : SCOPE`` - The given color value.

  ``modelId : STRING`` - The id of the given model. When there are multiple color pickers, this is used by the directives to determine which model is currently being worked on so they aren't all updated.

  ``originalFormat : STRING`` - The original format of the model. HSL, Hex, or RGB.

  ``rgb : {r:INT, g:INT, b:INT}`` - RGB input value. Red, Green, Blue.

  ``circleWidth : INT`` - The width of the color wheel


####Methods:  

  ``init ({"model":SCOPE, "modelId":STRING})`` - Called from the input directive to initialize the color wheel with it's values.

  ``save`` - Updates the model and turns the color wheel off.

  ``toggleCKoloring`` - Toggles the color wheel off.

  ``updateColorDisplay (STRING | 'hex', 'hsl', 'rgb')`` - Updates the color wheel display to the given parameter.

  ``updateHSL`` - Convert other color models from the hsl property when this is called.

  ``updateRGB`` - Convert other color models from the rgb property when this is called.

  ``updateHEX`` - Convert other color models from the hex property when this is called.

  ``hueLightFromRadial (MOUSE EVENT)`` - Get HSL from a point on color wheel.

  ``radialXY`` - Set scoop position based on HSL values.

  ``convertTo`` - Convert any color string to HSL and sets the originalFormat property.

  ``hexToRgb`` - Convert hex to rgb.

  ``rgbToHsl`` - Convert rgb to hsl.

  ``hslToRgb`` - Convert hsl to rgb.

  ``intToHex`` - Convert a rgb integer to a hex value.

  ``rgbToHex`` - Convert rgb to hex.

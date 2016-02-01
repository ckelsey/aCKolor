# aCKolor
Color picker for angular.

**Add to your app**  

angular.module('app', ['aCKolor'])

<br />
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

<br />
___
<br />
### Color wheel
  Contains the color wheel markup.

**Markup:**
  ```html
  <a-ckolor-wheel></a-ckolor-wheel>
  ```
<br />
<br />
## Factory
####Properties:  

  ``ckoloring : BOOL`` - Flag that determines if the color wheel is open or not.

  ``display : STRING`` - Color mode that is displayed, auto selected by model's color mode and changed by the dropdown selection.
  
  ``inputHsl : {h:FLOAT, s:FLOAT, l:FLOAT}`` - HSL number input values - hue, saturation, lightness.
  <br />
  <br />
  <br />
  ``hex : STRING``
  <br />
  <br />
  - Hex input value.
  <br />
  <br />
  <br />
  ``hsl : {h:FLOAT, s:FLOAT, l:FLOAT}``
  <br />
  <br />
  - HSL values. The factory converts the model to HSL then sets the other types. Used on the color wheel and saturation slider.
  <br />
  <br />
  <br />
  ``hues : [INT]``
  <br />
  <br />
  - 12 values of hue degrees used on the color wheel background.
  <br />
  <br />
  <br />
  ``model : SCOPE``
  <br />
  <br />
  - The given color value.
  <br />
  <br />
  <br />
  ``modelId : STRING``
  <br />
  <br />
  - The id of the given model. When there are multiple color pickers, this is used by the directives to determine which model is currently being worked on so they aren't all updated.
  <br />
  <br />
  <br />
  ``originalFormat : STRING``
  <br />
  <br />
  - The original format of the model. HSL, Hex, or RGB.
  <br />
  <br />
  <br />
  ``rgb : {r:INT, g:INT, b:INT}``
  <br />
  <br />
  - RGB input value. Red, Green, Blue.
  <br />
  <br />
  <br />
  ``circleWidth : INT``
  <br />
  <br />
  - The width of the color wheel
  <br />
  <br />
  <br />
<br />
###Methods:###  

  ``init ({"model":SCOPE, "modelId":STRING})``
  <br />
  <br />
  - Called from the input directive to initialize the color wheel with it's values.
  <br />
  <br />
  <br />
  ``save``
  <br />
  <br />
  - Updates the model and turns the color wheel off.
  <br />
  <br />
  <br />
  ``toggleCKoloring``
  <br />
  <br />
  - Toggles the color wheel off.
  <br />
  <br />
  <br />
  ``updateColorDisplay (STRING | 'hex', 'hsl', 'rgb')``
  <br />
  <br />
  - Updates the color wheel display to the given parameter.
  <br />
  <br />
  <br />
  ``updateHSL``
  <br />
  <br />
  - Convert other color models from the hsl property when this is called.
  <br />
  <br />
  <br />
  ``updateRGB``
  <br />
  <br />
  - Convert other color models from the rgb property when this is called.
  <br />
  <br />
  <br />
  ``updateHEX``
  <br />
  <br />
  - Convert other color models from the hex property when this is called.
  <br />
  <br />
  <br />
  ``hueLightFromRadial (MOUSE EVENT)``
  <br />
  <br />
  - Get HSL from a point on color wheel.
  <br />
  <br />
  <br />
  ``radialXY``
  <br />
  <br />
  - Set scoop position based on HSL values.
  <br />
  <br />
  <br />
  ``convertTo``
  <br />
  <br />
  - Convert any color string to HSL and sets the originalFormat property.
  <br />
  <br />
  <br />
  ``hexToRgb``
  <br />
  <br />
  - Convert hex to rgb.
  <br />
  <br />
  <br />
  ``rgbToHsl``
  <br />
  <br />
  - Convert rgb to hsl.
  <br />
  <br />
  <br />
  ``hslToRgb``
  <br />
  <br />
  - Convert hsl to rgb.
  <br />
  <br />
  <br />
  ``intToHex``
  <br />
  <br />
  - Convert a rgb integer to a hex value.
  <br />
  <br />
  <br />
  ``rgbToHex``
  <br />
  <br />
  - Convert rgb to hex.
  <br />
  <br />
  <br />

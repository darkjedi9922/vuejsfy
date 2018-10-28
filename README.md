# VueJSfy

Simple compiler of .vue file components into simple classic .js vue components. The styles are extracted into separated .css files.

The module can be used **as an application** and **as a module**.

## Installation

`npm install vuejsfy`

## Usage **as an application**

`node vuejsfy '<vuefile>' [<flags>]`

### Base

* `vuefile` - pattern or strict path to .vue file components. Example: `'path/**/dir/*.vue'` or `'path/to/dir/MyComponent.vue'`

### Flags

* `--htmlformat` - Transform *ComponentName* style of the filename and the component name to *component-name*. Without this flags the style will be not applied. By default it is false.

* `--dest <dir>` - Destination directory of the compiled js and css files. By default there are created in the same directory where .vue file is.

* `--destJs <dir>` - Destination directory of the compiled js file. By default it equals *--dest* flag value.

* `--destCss <dir>` - Destination directory of the compiled css file. By default it equals *--dest* flag value.

## Example

```html
<!-- HelloVueJsfy.vue -->

<template>
    <div>
        <p class="hello">Hello, '{{ who }}'</p>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            who: 'VueJSfy'
        }
    }
}
</script>

<style>
.hello {
    font-weight: bold;
}
</style>
```

After **`nodejs vuejsfy HelloVueJsfy.vue`** in the same directory where the .vue file is will be created **HelloVuejsfy.vue.js** and **HelloVuejsfy.vue.css** files:

```js
// HelloVueJsfy.vue.js

Vue.component('HelloVueJsfy', {
    template: '<div> <p class="hello">Hello, \'{{ who }}\'</p> </div>',
    data: function() {
        return {
            who: 'VueJSfy'
        }
    }
});
```

```css
/* HelloVueJsfy.vue.css */

.hello {
    font-weight: bold;
}
```

## Usage **as a module**

Basically the usage is the same as the usage as an application but module is required and all of the flags get in as options.

### Example

```js
var vuejsfy = require('vuejsfy');

// without options
vuejsfy('components/my-component.vue');

// with options
vuejsfy('components/ExampleWithOptions.vue', {
    htmlformat: true,
    dest: 'scripts/components'
});
```
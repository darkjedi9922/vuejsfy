Simple compiler of .vue file components into simple classic .js vue components. The styles are extracted into separated .css files.

## Usage

`node vuejsfy <vuefile> [--case=param]`

### Base

- **vuefile** - .vue file component

### Flags

- **--case** - Case style of the component name. There are only *param* (example: component-name) value yet. Without this flags the style will be not applied.

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
// HelloVueJsfy.vue.js <-- nodejs vuejsfy HelloVueJsfy.vue
//      OR
// hello-vue-jsfy.vue.js <-- nodejs vuejsfy HelloVueJsfy.vue --case=param

Vue.component('HelloVueJsfy' /* or hello-vue-jsfy */, {
    template: '<div> <p class="hello">Hello, \'{{ who }}\'</p> </div>',
    data: function() {
        return {
            who: 'VueJSfy'
        }
    }
});
```

```css
/* HelloVueJsfy.vue.css <-- nodejs vuejsfy HelloVueJsfy.vue */
/*      OR       */
/* hello-vue-jsfy.vue.css <-- nodejs vuejsfy HelloVueJsfy.vue --case=param */

.hello {
    font-weight: bold;
}
```
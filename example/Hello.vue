<template>
    <p class="hello">Hello, '{{ who }}'</p>
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
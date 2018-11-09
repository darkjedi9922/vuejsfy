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

<style lang="scss">
.hello {
    color: green;
}
</style>
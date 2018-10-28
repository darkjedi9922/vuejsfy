Vue.component('HelloComponent', {
    template: '<div> <p class="hello">Hello, \'{{ who }}\'</p> </div>',
    data: function() {
        return {
            who: 'VueJSfy'
        }
    }
});
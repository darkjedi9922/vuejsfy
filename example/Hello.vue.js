Vue.component('Hello', {
    template: '<p class="hello">Hello, \'{{ who }}\'</p>',
        data: function() {
            return {
                who: 'VueJSfy'
            }
        }
    });
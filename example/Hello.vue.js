Vue.component('Hello', {
    template: '<div> <p class="hello">Hello, \'{{ who }}\'</p> </div>',
        data: function() {
            return {
                who: 'VueJSfy'
            }
        }
    });
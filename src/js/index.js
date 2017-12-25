(function($) {
    var _this = {
        init: function() {
            this.eventFun();
        },

        eventFun: function() {
            var index = 0;
            $(".public-nav .nav-item").click(function() {
                $(".public-nav .nav-item").removeClass("active");
                $(this).addClass("active");

                index = $(this).index();
            })
        }
    }
    _this.init();

})(jQuery)
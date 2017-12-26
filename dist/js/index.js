(function($) {
    var _this = {
        init: function() {
            this.eventFun();
        },

        eventFun: function() {
            $(".public-nav .nav-item").click(function() {
                $(".public-nav .nav-item").removeClass("active");
                $(this).addClass("active");
                $(".public-nav .nav-item").not(':last-child').find("a").css("border-right", "1px solid #ccc");
                $(this).find("a").css("border-right", "0");
                $(this).prev().find("a").css("border-right", "0");
            })
        }
    }
    _this.init();

})(jQuery)
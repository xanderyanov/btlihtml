$(function () {

    initVars();

    if ($window.width() <= 768) {
        $(".tab > a").removeClass("active");
        $(".tab > section").removeClass("openSection").slideUp();
        $(".tabs").children("li").first().children("a").addClass("active").next().show();
    } else {
        $(".tabs").children("li").first().children("a").addClass("active").next().addClass("openSection").show();
    }

    // function eShopCabTabDesktop() {
    $(".tabs").on("click", "li > a", function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
            if ($window.width() <= 768) {
                $(this).next().removeClass("openSection").slideUp();
                $(this).removeClass("active");
            } else {
                // $(this).next().removeClass("openSection").hide();
            }
        } else {
            $(".tab > a").removeClass("active");
            $(this).addClass("active");
            if ($window.width() <= 768) {
                $(".tab > section").removeClass("openSection").slideUp();
                $(this).next().addClass("openSection").slideDown();
            } else {
                $(".tab > section").removeClass("openSection").hide();
                $(this).next().addClass("openSection").show();
            }
        }
    });

    $(".mobileTabs").on("change", function () {
        var id = $(this).find(":selected").data("tab_mb"); // 1
        content = $('.tabTitle[data-tab_dt="' + id + '"]'); // 2
        content.trigger("click");
    });
    // }
    // eShopCabTabDesktop();
});
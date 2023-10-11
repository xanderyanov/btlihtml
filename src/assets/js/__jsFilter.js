$(function () {
	$(".filterTagMenuLink").on("click", function (e) {
		e.preventDefault();
		$(".filterTagMenuLink").removeClass("active");
		var $this = $(this);
		var IdToFind = $this.data("id");

		//Устанавливаем в мобильном селекте то-же значение
		$(".filterTagMenuMobile")
			.find('.filterTagMenuLink_mb[data-mb-id="' + IdToFind + '"]')
			.attr("selected", "selected");
		/**/

		var specs = $(".jsFilterResultItem");
		$.each(specs, function (index, o) {
			var $o = $(o);
			$o.removeClass("visible");
			$o.addClass("hidden");
			var sid = $o.data("sid");
			var sp = typeof sid === "number" ? [sid.toString()] : sid.split(",");
			$.each(sp, function (index, z) {
				if (z.indexOf(IdToFind) != -1) {
					$o.removeClass("hidden");
					$o.addClass("visible");
				}
			});
		});
		$this.addClass("active");
	});
	$(".filterTagMenuLink__all").on("click", function (e) {
		e.preventDefault();

		$(".jsFilterResultItem").removeClass("hidden");
		$(".jsFilterResultItem").addClass("visible");
		$(this).addClass("active");
	});

	$(".filterTagMenuMobile").on("change", function () {
		var id = $(this).find(":selected").data("mb-id"); // 1
		content = $('.filterTagMenuLink[data-id="' + id + '"]'); // 2
		content.trigger("click");
	});
});

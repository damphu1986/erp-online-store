function guid() {
    function t() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }
    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
}

function loadContactForm(t) {
    var e = $(".order-contact-form"),
        n = e.attr("data-url");
    e.length && (e.show(), $.ajax({
        url: n,
        data: {
            contact_id: t
        }
    }).done(function(t) {
        e.html(t), e.find(".ajax-content-control").trigger("change"), e.find(".contact_form").validate({
            errorPlacement: function(t, e) {
                var n = $(e);
                n.hasClass("select2-hidden-accessible") ? t.insertAfter(n.parent().find(".select2-container")[0]) : t.insertAfter(e), $(".select2-selection").click(function() {
                    document.getElementById("select-city-error").style.display = "none"
                }), $("#select2-input-payment-zone-container").click(function() {
                    document.getElementById("input-payment-zone-error").style.display = "none"
                })
            }
        }), e.find("select").select2({
            language: "vi"
        })
    }))
}

function countDown(t, e, n, i, a, o) {
    var r = new Date(e, n -= 1, i, a, o);
    t.countdown(r, function(t) {
        $(this).html(t.strftime('<div class="time-item time-day"><div class="num-time">%D</div><div class="name-time">Ngày </div></div><div class="time-item time-hour"><div class="num-time">%H</div><div class="name-time">Giờ </div></div><div class="time-item time-min"><div class="num-time">%M</div><div class="name-time">Phút </div></div><div class="time-item time-sec"><div class="num-time">%S</div><div class="name-time">Giây </div></div>'))
    })
}

function toogleFixedNav() {
    if (!$(".sticky-services").length) {
        var t = $(window).scrollTop(),
            e = $(".header-fixed-top").offset().top;
        t > 165 && e > 265 && $(window).width() > 992 ? $(".header-fixed-top").show() : $(".header-fixed-top").hide()
    }
}

function toogleServicesNav() {
    if ($(".sticky-services").length) {
        var t = $(window).scrollTop();
        $(".sticky-services").offset().top, t > 690 && $(window).width() > 992 ? ($(".sticky-services").addClass("fixed_nav"), $(".service-nav-placeholder").length || $(".sticky-services").after('<div class="service-nav-placeholder"></div>')) : ($(".sticky-services").removeClass("fixed_nav"), $(".service-nav-placeholder").remove()), $(document).height() - $(window).height() - $(window).scrollTop() < 50 ? $(".sticky-services").hide() : $(".sticky-services").show()
    }
}

function loadTopRightMenu(t) {
    var e = $(".top-right-menu"),
        n = $(".top-right-menu").attr("data-url");
    $.ajax({
        url: n
    }).done(function(n) {
        if (e.html(n), void 0 !== t && t(), $(".type_1 .compare a span").length) {
            var i = $(".type_1 .compare a span").html().split("(")[1].split(")")[0];
            $(".type_7 .compare a span").html(i)
        }
    })
}

function loadTopCart(t) {
    var e = $(".block-cart"),
        n = $(".block-cart").attr("data-url");
    $.ajax({
        url: n
    }).done(function(n) {
        e.html(n), void 0 !== t && t()
    })
}

function showNotice(t, e, n) {
    var i = "<h3>" + n + "</h3>";
    $.jGrowl(i, {
        life: 4e3,
        header: e,
        speed: "slow",
        theme: t
    })
}

function homeCategoryBox(t) {
    var e = t.attr("data-url");
    t.addClass("loading"), $.ajax({
        url: e
    }).done(function(e) {
        t.html(e), t.removeClass("loading"), t.find(".ajax-link").fancybox({
            closeClickOutside: !0
        })
    })
}

function autoSearchMoveUp(t) {
    var e, n = t.find("li.current");
    e = n.length ? n.prev() : t.find("li").last(), t.find("li").removeClass("current"), e.length ? e.addClass("current") : n.parents("ul").find("li").last().addClass("current")
}

function autoSearchMoveDown(t) {
    var e, n = t.find("li.current");
    e = n.length ? n.next() : t.find("li").first(), t.find("li").removeClass("current"), e.length ? e.addClass("current") : e.parents("ul").find("li").eq(0).addClass("current")
}
var autosearch_xhr;

function autoSearch(t) {
    var e = t.find(".autosearch-input").val(),
        n = t.attr("data-url"),
        i = t.find(".autosearch-result-box ul"),
        a = t.find("select").val();
    "" != e.trim() ? (t.find(".autosearch-result-box").length || (t.append('<div class="autosearch-result-box"><ul></ul></div>'), i = t.find(".autosearch-result-box ul")), autosearch_xhr && 4 != autosearch_xhr.readyState && autosearch_xhr.abort(), autosearch_xhr = $.ajax({
        url: n,
        data: {
            keyword: e,
            menu_id: a
        }
    }).done(function(t) {
        i.html(""), i.parent().show(), t.forEach(function(t) {
            i.append('<li><a title="' + t.name + '" href="' + t.link + '"><img src="' + t.image + '" /><span class="title">' + t.name + '</span><span class="price sold_out_' + t.is_sold_out + " is_call_" + t.is_call + '">' + ("<span style='font-family:sans-serif;'>0₫</span>" == t.price || t.is_sold_out || t.is_call ? "Liên Hệ: (028) 3984 7690" : t.price) + '</span> <span class="old_price old_price_' + t.old_price + '"><span class="num">' + t.old_price + "</span> (giảm " + t.deal_percent + "%)</span></a></li>")
        }), t.length || i.append('<li class="autosearch-empty-line">Không tìm thấy sản phẩm phù hợp...</li>')
    })) : i.parent().hide()
}
var category_xhr, online_search_xhr, AUTH_TOKEN = $("meta[name=csrf-token]").attr("content");

function getHeightMenuFixed() {
    return $(".vertical").hasClass("open") ? 560 : 265
}

function btnMenuFixed() {
    $(window).scrollTop() > getHeightMenuFixed() && $(window).width() > 992 ? $(".btn-menu-fixed").show() : $(".btn-menu-fixed").hide()
}

function showHideMenuFixed() {
    var t = getHeightMenuFixed();
    $(window).scrollTop() > 165 && $(window).scrollTop() > t && $(window).width() > 992 ? $(".vertical-wrapper").addClass("active-content-menu") : ($(".vertical-wrapper").removeClass("active-content-menu"), $(".vertical-wrapper").hasClass("transition") && $(".vertical-wrapper").removeClass("transition"))
}

function tabContent() {
    var t = $("#header").height() + $(".breadcrumb").height() + 68 + $(".account-address-book .title").height() + $(".dashboard-address").height() + $(".add-address").height();
    $("body,html").animate({
        scrollTop: t
    }, 400)
}
$(document).ready(function() {
    $(document).on("click", "a.link-method[data-method]", function(t) {
        if (!$(this).parents(".datalist-list-action").length) {
            t.preventDefault();
            var e = $(this).attr("data-method"),
                n = $(this).attr("href"),
                i = jQuery("<form>", {
                    action: n,
                    method: "POST",
                    target: "_top"
                });
            i.append(jQuery("<input>", {
                name: "authenticity_token",
                value: AUTH_TOKEN,
                type: "hidden"
            })), i.append(jQuery("<input>", {
                name: "_method",
                value: e,
                type: "hidden"
            })), $(document.body).append(i), i.submit()
        }
    }), $(document).on("keyup", ".autosearch-input", function(t) {
        var e = $(this).parents(".autosearch"),
            n = $(this).parents("form"),
            i = t.keyCode ? t.keyCode : t.which;
        if (38 !== i)
            if (40 !== i) {
                if (13 === i) {
                    if (e.find("li.current a").length) {
                        var a = e.find("li.current a").attr("href");
                        return void(window.location = a)
                    }
                    n.submit()
                }
                autoSearch(e)
            } else autoSearchMoveDown(e);
        else autoSearchMoveUp(e)
    }), $(document).on("change", ".autosearch select", function(t) {
        autoSearch($(this).parents(".autosearch"))
    }), $(document).on("focusout", ".autosearch-input", function() {
        var t = $(this).parents(".autosearch");
        setTimeout(function() {
            t.find(".autosearch-result-box").hide()
        }, 500)
    }), $(document).on("focusin", ".autosearch-input", function() {
        $(this).parents(".autosearch").find(".autosearch-result-box").show()
    }), $(".category_box").each(function() {
        homeCategoryBox($(this))
    }), $(document).on("click", ".category_box a.ajax_link", function(t) {
        t.preventDefault();
        var e = $(this).parents(".category_box");
        e.attr("data-url", $(this).attr("href")), homeCategoryBox(e)
    }), $(document).on("submit", "#new_newsletter", function(t) {
        t.preventDefault();
        var e = $(this),
            n = e.attr("action"),
            i = e.find("input[type=text]");
        "" != i.val().trim() ? $.ajax({
            url: n,
            data: e.serialize()
        }).done(function(t) {
            var e = "<h3>" + t.message + "</h3>";
            $.jGrowl(e, {
                life: 4e3,
                header: "Thông báo",
                speed: "slow",
                theme: t.status
            }), i.val(""), i.removeClass("error")
        }) : (i.focus(), i.addClass("error"), $.jGrowl("<h3>Bạn phải nhập email đăng ký</h3>", {
            life: 4e3,
            header: "Thông báo",
            speed: "fast",
            theme: "warning"
        }))
    }), $(document).on("mousedown", ".ajax-link", function() {
        void 0 !== $(this).attr("dont-close") && "true" == $(this).attr("dont-close") || $.fancybox.close("all")
    }), $(".ajax-link").fancybox({
        closeClickOutside: !0
    }), $(document).on("submit", ".ajax-form", function(t) {
        t.preventDefault();
        var e = $(this),
            n = e.attr("action"),
            i = e.attr("method");
        e.find(".notice").hide(), $.ajax({
            url: n,
            method: i,
            data: e.serialize(),
            dataType: "text"
        }).done(function(t) {
            location.reload()
        }).fail(function(t, n, i) {
            e.find(".notice").html("<span class='flash_error alert alert-danger'> " + t.responseText + "</span>"), e.find(".notice").fadeIn()
        })
    }), $(document).on("submit", ".register-form", function(t) {
        t.preventDefault();
        var e = $(this),
            n = e.attr("action"),
            i = e.attr("method");
        e.find(".notice").hide(), e.find("input[type=submit]").after('<div class="btn-loading text-center">Đang xử lý...</div>'), e.find("input[type=submit]").hide(), $.ajax({
            url: n,
            method: i,
            data: e.serialize(),
            dataType: "text"
        }).done(function(t) {
            $("<div>").html(t).find("form").length ? e.find(".form-content").html($("<div>").html(t).find(".form-content").html()) : e.find(".form-content").html(t)
        })
    }), $(".btn-pref .btn").click(function() {
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default"), $(this).removeClass("btn-default").addClass("btn-primary")
    }), $(document).on("click", ".product-item-container .right-block", function() {
        var t = $(this).find("a").attr("href");
        document.location.href = t
    }), $(document).on("submit", ".add-cart-form", function(t) {
        t.preventDefault();
        var e = $(this),
            n = e.attr("action");
        e.addClass("loading"), $.ajax({
            url: n,
            method: "POST",
            data: e.serialize()
        }).done(function(t) {
            showNotice("success", "Thành công", t), loadTopCart(), e.removeClass("loading"), e.find("input[name=quantity]").val(1)
        })
    }), $(document).on("submit", ".add-compare-form", function(t) {
        t.preventDefault();
        var e = $(this),
            n = e.attr("action");
        e.addClass("loading"), $.ajax({
            url: n,
            method: "POST",
            data: e.serialize()
        }).done(function(t) {
            showNotice(t.type, t.title, t.message), loadTopRightMenu(), e.removeClass("loading")
        })
    }), $(document).on("submit", ".add-wishlist-form", function(t) {
        t.preventDefault();
        var e = $(this),
            n = e.attr("action");
        e.addClass("loading"), $.ajax({
            url: n,
            method: "POST",
            data: e.serialize()
        }).done(function(t) {
            showNotice(t.type, t.title, t.message), loadTopRightMenu(), e.removeClass("loading")
        })
    }), $(document).on("submit", ".reset-password", function(t) {
        t.preventDefault();
        var e = $(this),
            n = e.attr("action"),
            i = e.attr("method");
        e.find(".notice").hide(), e.find("input[type=submit]").after('<div class="btn-loading text-right">Đang xử lý...</div>'), e.find("input[type=submit]").hide(), $.ajax({
            url: n,
            method: i,
            data: e.serialize(),
            dataType: "text"
        }).done(function(t) {
            $("<div>").html(t).find("form").length ? e.find(".form-content").html($("<div>").html(t).find(".form-content").html()) : e.find(".form-content").html(t)
        })
    }), $(document).on("click", "#close-preview", function() {
        $(".image-preview").popover("hide"), $(".image-preview").hover(function() {
            $(".image-preview").popover("show")
        }, function() {
            $(".image-preview").popover("hide")
        })
    }), $(function() {
        var t = $("<button/>", {
            type: "button",
            text: "x",
            id: "close-preview",
            style: "font-size: initial;"
        });
        t.attr("class", "close pull-right"), $(".image-preview").popover({
            trigger: "manual",
            html: !0,
            title: "<strong>Xem trước</strong>" + $(t)[0].outerHTML,
            content: "There's no image",
            placement: "bottom"
        }), $(".image-preview-clear").click(function() {
            $(".image-preview").attr("data-content", "").popover("hide"), $(".image-preview-filename").val(""), $(".image-preview-clear").hide(), $(".image-preview-input input:file").val(""), $(".image-preview-input-title").text("Chọn ảnh")
        }), $(".image-preview-input input:file").change(function() {
            var t = $("<img/>", {
                    id: "dynamic",
                    width: 250,
                    height: 200
                }),
                e = this.files[0],
                n = new FileReader;
            n.onload = function(n) {
                $(".image-preview-input-title").text("Thay đổi"), $(".image-preview-clear").show(), $(".image-preview-filename").val(e.name), t.attr("src", n.target.result), $(".image-preview").attr("data-content", $(t)[0].outerHTML).popover("show")
            }, n.readAsDataURL(e)
        }), setInterval(function() {
            toogleFixedNav(), btnMenuFixed()
        }, 200), $(".contact_form").validate(), $(".comment_form").validate(), $(".rating_form").validate({
            rules: {
                "rating[content]": {
                    required: !0,
                    minlength: 50
                }
            }
        }), $(".password_form").validate(), $(".account_form").validate(), $(".checkout_form").validate(), $(".count-down").each(function() {
            var t = $(this).attr("rel").split(",");
            countDown($(this), t[0], t[1], t[2], t[3], t[4])
        }), $(".layout-subpage .top-link li").hover(function() {
            $(this).find("ul").slideDown(200)
        }, function() {
            $(this).find("ul").hide()
        })
    }), $(".autosearch select").select2({
        minimumResultsForSearch: 10,
        dropdownAutoWidth: "true",
        language: "vi"
    }), $(document).on("click", ".header-top-right .tabBlockTitle", function() {
        $(this).parents(".header-top-right").find(".tabBlock.top-right-menu").toggle()
    }), $(".container-megamenu.vertical").hover(function() {
        $(this).find(".vertical-wrapper").slideDown()
    }, function() {
        $(this).find(".vertical-wrapper").hide()
    }), $("select").each(function() {
        var t = $(this).attr("placeholder");
        void 0 === t && (t = !1), $(this).select2({
            minimumResultsForSearch: 10,
            dropdownAutoWidth: "true",
            language: "vi",
            placeholder: t
        })
    }), $(document).on("change", ".ajax-content-control", function() {
        var t = $($(this).attr("data-content-selector")),
            e = $(this).attr("data-url"),
            n = $(this).val();
        t.html(""), $.ajax({
            url: e,
            data: {
                state_id: n
            }
        }).done(function(e) {
            t.html(e), t.parents(".fancybox-inner").length || t.find("select").select2({
                minimumResultsForSearch: 10,
                dropdownAutoWidth: "true",
                language: "vi"
            })
        })
    }), $(".ajax-content-control").trigger("change"), setTimeout(function() {
        $(".contacts-create-hide").hide()
    }, 2e3), $(document).on("click", ".fancybox-slide--current", function(t) {
        $(t.target).parents(".product-box-desc").length || $(t.target).parents(".fancybox-content-no, .fancybox-slide").length || $(t.target).parents(".row").length || $.fancybox.close("all")
    }), $(document).on("change", ".category-filter-box input, .category-filter-box select, .category-filter-top input, .category-filter-top select", function() {
        var t = $(this).parents("form"),
            e = t.attr("action"),
            n = t.parent().find(".main-products-list");
        0 === n.length && (n = $(".main-products-list")), n.prepend('<div class="category-loading"></div>'), n.find(".products-list").css("opacity", "0.6");
        var i = t.attr("id");
        void 0 === i && (i = guid(), t.attr("id", i)), $.ajax({
            url: e,
            data: $(".category-filter-box, #" + i).serialize()
        }).done(function(t) {
            n.html($("<div>").html(t).find(".main-products-list").html()), setTimeout(function() {
                n.find(".product-image-container").addClass("lazy-loaded"), n.find(".product-image-container").removeClass("lazy"), n.find(".products-list").removeClass("list").addClass("grid")
            }, 500), n.find(".ajax-link").fancybox({
                closeClickOutside: !0
            })
        })
    }), $(document).on("click", ".box-pagination .pagination a", function(t) {
        t.preventDefault();
        var e = $(this).attr("href"),
            n = $(this).parents(".main-products-list"),
            i = n.find("form"),
            a = i.attr("id");
        void 0 === a && (a = guid(), i.attr("id", a)), n.prepend('<div class="category-loading"></div>'), n.find(".products-list").css("opacity", "0.6"), $(window).scrollTop($("#content").offset().top - 100), $.ajax({
            url: e,
            data: $(".category-filter-box, #" + a).serialize()
        }).done(function(t) {
            n.html($("<div>").html(t).find(".main-products-list").html()), setTimeout(function() {
                n.find(".product-image-container").addClass("lazy-loaded"), n.find(".product-image-container").removeClass("lazy"), n.find(".products-list").removeClass("list").addClass("grid")
            }, 500), n.find(".ajax-link").fancybox({
                closeClickOutside: !0
            })
        })
    }), $(".products-category").each(function() {
        $(this).find(".category-filter-top.auto-load input, .category-filter-top.auto-load select").eq(0).trigger("change")
    }), $(document).on("click", "[link-method]", function(t) {
        t.preventDefault();
        var e = $(this).attr("link-method"),
            n = $(this).attr("href"),
            i = $(this).attr("link-confirm");
        if (confirm(i)) {
            var a = jQuery("<form>", {
                action: n,
                method: "POST",
                target: "_top"
            });
            a.append(jQuery("<input>", {
                name: "authenticity_token",
                value: AUTH_TOKEN,
                type: "hidden"
            })), a.append(jQuery("<input>", {
                name: "_method",
                value: e,
                type: "hidden"
            })), $(document.body).append(a), a.submit()
        }
    }), $(document).on("submit", ".autosearch-form", function(t) {
        return "" !== $(this).find("input[name=keyword]").val().trim() || (t.preventDefault(), !1)
    }), $(".product-compare tr").each(function() {
        if ($(this).find(".property-value").length) {
            var t = !0,
                e = $(this).find(".property-value").first().html();
            $(this).find(".property-value").each(function() {
                $(this).html() == e || (t = !1)
            }), t || $(this).find(".property-value").addClass("diff")
        }
    }), $(document).on("click", ".quick-view.btn_compare", function(t) {
        t.preventDefault();
        var e = $(this).attr("data-url"),
            n = $(this).attr("product_id");
        $.ajax({
            url: e,
            method: "POST",
            data: {
                authenticity_token: AUTH_TOKEN,
                product_id: n
            }
        }).done(function(t) {
            showNotice(t.type, t.title, t.message), loadTopRightMenu()
        })
    }), $(".select-ajax").each(function() {
        var t = $(this).attr("data-url"),
            e = $(this).attr("data-placeholder");
        void 0 === e && (e = ""), $(this).select2({
            ajax: {
                url: t,
                dataType: "json",
                delay: 250,
                data: function(t) {
                    return {
                        q: t.term,
                        page: t.page
                    }
                },
                processResults: function(t) {
                    return {
                        results: $.map(t.items, function(t) {
                            return {
                                text: t.text,
                                id: t.value
                            }
                        })
                    }
                },
                cache: !0
            },
            escapeMarkup: function(t) {
                return t
            },
            minimumInputLength: 0,
            language: "vi",
            allowClear: !0,
            placeholder: e
        })
    }), $(document).on("submit", ".online_search_form", function(t) {
        t.preventDefault();
        var e = $(this),
            n = e.attr("action"),
            i = e.attr("method"),
            a = e.find("input[name=keywords]").val(),
            o = $(".online_search_result_container");
        "" !== a.trim() && (o.html('<div class="category-loading"></div>'), online_search_xhr && 4 != online_search_xhr.readyState && online_search_xhr.abort(), online_search_xhr = $.ajax({
            url: n,
            method: i,
            data: e.serialize()
        }).done(function(t) {
            o.html(t), setTimeout(function() {
                o.find(".product-image-container").addClass("lazy-loaded"), o.find(".product-image-container").removeClass("lazy"), o.find(".products-list").removeClass("list").addClass("grid")
            }, 500)
        }))
    }), $(document).on("click", ".service_box_list .pagination a", function(t) {
        t.preventDefault();
        var e = $(this).attr("href"),
            n = $(".online_search_result_container");
        n.html('<div class="category-loading"></div>'), online_search_xhr && 4 != online_search_xhr.readyState && online_search_xhr.abort(), online_search_xhr = $.ajax({
            url: e,
            method: "GET"
        }).done(function(t) {
            n.html(t), setTimeout(function() {
                n.find(".product-image-container").addClass("lazy-loaded"), n.find(".product-image-container").removeClass("lazy"), n.find(".products-list").removeClass("list").addClass("grid")
            }, 500), $(window).scrollTop()
        })
    }), $(document).on("submit", ".checkout_form", function(t) {
        return $(this).valid()
    }), $(document).on("submit", ".quick-view-form", function(t) {
        t.preventDefault();
        var e = $(this),
            n = e.attr("action"),
            i = e.attr("method");
        return $.ajax({
            url: n,
            method: i,
            data: e.serialize()
        }).error(function() {
            var t = $(".shopping-cart").attr("data-url");
            $.ajax({
                url: t
            }).done(function(t) {
                showNotice("success", "Thành công", "Giỏ hàng đã được cập nhật"), $(".shopping-cart .table-responsive.form-group").html($("<div>").html(t).find(".shopping-cart .table-responsive.form-group").html()), loadTopCart()
            })
        }), !1
    }), $(document).on("click", ".cart-item-delete", function(t) {
        t.preventDefault();
        var e = $(this).attr("href");
        return $.ajax({
            url: e
        }).done(function() {
            var t = $(".shopping-cart").attr("data-url");
            $.ajax({
                url: t
            }).done(function(t) {
                showNotice("success", "Thành công", "Giỏ hàng đã được cập nhật"), $(".shopping-cart .table-responsive.form-group").html($("<div>").html(t).find(".shopping-cart .table-responsive.form-group").html()), $("<div>").html(t).find(".shopping-cart .table-responsive.form-group").length || $.fancybox.close(), loadTopCart()
            })
        }), !1
    }), $(document).on("click", ".product-layout", function() {
        $(window).width() < 767 && (window.location = $(this).find(".right-block a").attr("href"))
    })
}), $(window).scroll(function() {
    toogleFixedNav(), toogleServicesNav(), btnMenuFixed(), showHideMenuFixed()
}), $(window).resize(function() {}), $(window).resize(function() {
    var t = $(window).scrollTop(),
        e = getHeightMenuFixed();
    $(window).width() > 992 && t > e ? $(".btn-menu-fixed").show() : $(".btn-menu-fixed").hide()
}), $(".edit-customer-address").click(function() {
    tabContent()
}), $(".add-address").click(function() {
    tabContent()
});
var flag = 0;
$(".megamenu").hover(function() {
    flag = 1
}, function() {
    flag = 0
}), $(".item-vertical").hover(function() {
    0 === flag && $(this).addClass("active1")
}, function() {
    $(this).removeClass("active1")
}), $(document).ready(function() {
    if ($(window).resize(function() {}), $(window).width() < 560) {
        var t = $(".header-bottom-inner").width();
        document.getElementById("shoppingcart-box").style.width = t + "px"
    }
    $(window).scroll(function() {
        $(window).width() >= 1010 && $(window).scrollTop() > $("#header").height() + $("#yt_header_right").height() ? $("#btn-menu-fixed-title").hasClass("active-btn") ? $(".megamenu").removeClass("display_none") : $(".megamenu").addClass("display_none") : $(".megamenu").removeClass("display_none"), $("#btn-menu-fixed").hover(function() {
            $(".megamenu").removeClass("display_none")
        }, function() {})
    }), $(".shopping_cart_form").on("keypress", function(t) {
        return 13 != t.keyCode
    }), $("#btn-menu-fixed").hover(function() {
        $("#btn-menu-fixed-title").addClass("active-btn"), $(".vertical-wrapper").addClass("active-sub-menu")
    }, function() {}), $(".vertical-wrapper").hover(function() {}, function() {
        $("#btn-menu-fixed-title").removeClass("active-btn"), $(".vertical-wrapper").addClass("transition"), $(".vertical-wrapper").removeClass("active-sub-menu")
    })
});
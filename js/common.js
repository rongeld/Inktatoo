
$(function () {
    var pContainerHeight = $('#about').height();

    function addCol() {
        if (window.innerWidth <= 768) {
            $('#gallery .addColl').addClass('col-4');
            $('#gallery .addColl6').addClass('col-6');
            $('#gallery .addColl12').addClass('col-12');
        } else {
            $('#gallery .addColl').removeClass('col-4');
            $('#gallery .addColl6').removeClass('col-6');
            $('#gallery .addColl12').removeClass('col-12');
        }
    }

    if (window.innerWidth <= 768) {
        $('#mainNav').append("<li class='nav-item remove-item'><a href='#gallery' class='nav-link '>gallery</a></li><li class='nav-item remove-item'><a href='#contact' class='nav-link active-class'>find us</a></li><li class='nav-item remove-item'><a href='#map' class='nav-link active-class'>map</a></li>");
    } else {
        $('#mainNav').remove("#mainNav .remove-item");
    }

    window.onresize = function () {
        addCol();

        if (window.innerWidth <= 768) {
            if ($('#mainNav .remove-item').length == 0) {
                $('#mainNav').append("<li class='nav-item remove-item'><a href='#gallery' class='nav-link '>gallery</a></li><li class='nav-item remove-item'><a href='#contact' class='nav-link active-class'>find us</a></li><li class='nav-item remove-item'><a href='#map' class='nav-link active-class'>map</a></li>");
            }
        } else {
            $('#mainNav .remove-item').remove();
        }
    };

    if (window.innerWidth <= 768) {
        addCol();
    }

    // Float-elements

    function FloatElements() {
        var wScroll = $(this).scrollTop();
        if (wScroll > $('#works').offset().top - $(window).height() / 1.3) {
            $('#works .col-md-2').each(function (i) {
                setTimeout(function () {
                    $('#works .col-md-2').eq(i).addClass('is-shown');
                }, 150 * (i + 1));
            });
        }
    };

    $(window).scroll(function () {
        FloatElements();
        var wScroll = $(this).scrollTop();
        if (wScroll >= pContainerHeight - 56) {
            $('#desktop-nav').addClass('small-menu');
            $('#desktop-nav').css('top', '0');
        } else {
            $('#desktop-nav').removeClass('small-menu');
            $('#desktop-nav').css('top', '50px');
        }
    });
    FloatElements();

    var lastId;
    var topMenu = $("#desktop-nav");
    var topMenuHeight = topMenu.outerHeight();
    var menuItems = topMenu.find("a");

    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

    menuItems.click(function (e) {
        var href = $(this).attr("href");
        var offsetTop = href === "#" ? 0 : $(href).offset().top - 56;

        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 800);
        e.preventDefault();
    });

    $(window).scroll(function () {

        var fromTop = $(this).scrollTop() + topMenuHeight;

        var current = scrollItems.map(function () {
            if ($(this).offset().top <= fromTop) return this;
        });

        current = current[current.length - 1];
        var id = current && current.length ? current[0].id : "";
        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });
});

function initMap() {
    // Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.674, lng: -73.945 },
        zoom: 12,
        styles: [{ elementType: 'geometry', stylers: [{ color: '#242f3e' }] }, { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] }, {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
        }, {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
        }, {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
        }, {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
        }, {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
        }, {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
        }, {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
        }, {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
        }, {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
        }, {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
        }, {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
        }]
    });
}
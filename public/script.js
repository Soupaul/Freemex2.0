// console.log("hi")
function updateStockPrices() {
    $.ajax({
        url: "api/stocks/",
        dataType: 'json',
        success: function(data) {
            $('.stock-card').each(function() {
                var stock = $(this).attr('data-name');
                var price = data[stock]['price'];
                var diff = data[stock]['diff'];
                var elem = $(this).find('#diff');
                if (diff >= 0) {
                    var diff_html = diff + " <i class=\"fa fa-arrow-up\" aria-hidden=\"true\">";
                    elem.html(diff_html);
                    if (elem.hasClass('down')) {
                        elem.removeClass('down');
                        elem.addClass('up');
                    }
                } else {
                    var diff_html = diff + " <i class=\"fa fa-arrow-down\" aria-hidden=\"true\">";
                    elem.html(diff_html);
                    if (elem.hasClass('up')) {
                        elem.removeClass('up');
                        elem.addClass('down');
                    }
                }
                $(this).find('#price').html(price);
            });
            var last_updated = new Date(data['last_updated']);
            var now_time = new Date(Date.now());
            time = now_time - last_updated;
            var options = {"month": "short", "day": "2-digit", "year": "numeric", "hour": "2-digit", "minute": "2-digit"};
            var current_time = now_time.toLocaleDateString("en-US", options);
            current_time = current_time.slice(0,3) + "." + current_time.slice(3);
            current_time = current_time.replace("PM", "p.m.");
            current_time = current_time.replace("AM", "a.m.");
            $('#last-updated').html(current_time);
        }
    });
}

$(document).ready(function() {
    var source = new EventSource('/events');
    source.onmessage = function(event) {
        const stocks=JSON.parse(event.data)
        console.log(stocks)
        updateStockPrices();
        // dataName=document.getElementsByClassName('stock-card').getAttribute('data-name')
    };
})
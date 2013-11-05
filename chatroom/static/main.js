require.config({
    baseUrl: '/static',
    paths: {
        'x-tag-core': 'x-tag-core/dist/x-tag-core',
        'x-tag-toggle': 'x-tag-toggle/src/toggle',
        'jquery': 'jquery/jquery',
        'jquery-cookie': 'jquery.cookie/jquery.cookie',
    }
});

define(['chat', 'jquery', 'jquery-cookie'], function (chat, cookie) {
    chat;cookie;
    $.getJSON('/c/one/')
        .done(function (data) {
            data.messages.forEach(function (message) {
                var e = new CustomEvent('new-chat-room-message');
                e.message = message;
                document.dispatchEvent(e);
            });
        });

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
        }
    });

    document.addEventListener('send-chat-room-message', function (e) {
        e.preventDefault();
        console.log('send: ', e.message);
    });
});

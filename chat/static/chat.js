define(['x-tag-core', 'x-tag-toggle'], function (xtag) {
    var ChatRoom, ChatRoomMessage;

    var ChatRoomPrototype = Object.create(HTMLElement.prototype);
    ChatRoomPrototype.render = function () {
    };
    ChatRoomPrototype.createdCallback = function () {
        this.innerHTML = "<h1>I'm chat room " + this.getAttribute('name') + "!</h1>"
                       + '<div class="messages"></div>';
        this.headerEl = this.querySelector('h1');
        this.messagesEl = this.querySelector('.messages');
        JSON.parse(this.getAttribute('messages')).forEach((message) => {
            this.addMessage(message);
        });
        $.getJSON(this.getAttribute('url'))
            .done((data) => {
                data.messages.forEach((message) => {
                    this.addMessage(message);
                });
            });
    };
    ChatRoomPrototype.addMessage = function (message) {
        var messageEl = document.createElement('chat-room-message');
        messageEl.setAttribute('sender', message.sender);
        messageEl.setAttribute('text', message.text);
        this.messagesEl.appendChild(messageEl);
    };
    ChatRoomPrototype.attributeChangedCallback = function () {
        console.log(arguments);
    };

    var ChatRoomMessagePrototype = Object.create(HTMLElement.prototype);
    ChatRoomMessagePrototype.render = function () {
        var attr = this.getAttribute.bind(this);
        this.innerHTML = '<div class="message">'
                       + attr('sender') + ': ' + attr('text')
                       + '</div>';
    };
    ChatRoomMessagePrototype.createdCallback = ChatRoomMessagePrototype.render;
    ChatRoomMessagePrototype.attributeChangedCallback = ChatRoomMessagePrototype.render;

    document.addEventListener('WebComponentsReady', function () {
        ChatRoom = document.register('chat-room', {
            prototype: ChatRoomPrototype
        });
        ChatRoomMessage = document.register('chat-room-message', {
            prototype: ChatRoomMessagePrototype
        });
        setTimeout(function () {
            document.querySelector('chat-room').setAttribute('name', 'what');
        }, 1000);
    });
});

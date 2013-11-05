define(['x-tag-core', 'x-tag-toggle'], function (xtag) {
    var ChatRoomPrototype = Object.create(HTMLElement.prototype);
    ChatRoomPrototype.render = function () {
    };
    ChatRoomPrototype.createdCallback = function () {
        this.innerHTML = "<h1>I'm chat room " + this.getAttribute('name') + "!</h1>"
                       + '<div class="messages"></div>';
        this.headerEl = this.querySelector('h1');
        this.messagesEl = this.querySelector('.messages');
        var self = this;
        JSON.parse(this.getAttribute('messages')).forEach(function (message) {
            self.addMessage(message);
        });
        var inputs = document.createElement('chat-room-inputs');
        inputs.setAttribute('url', this.getAttribute('url'));
        this.appendChild(inputs);
        document.addEventListener('new-chat-room-message', function (e) {
            self.addMessage(e.message);
        });
    };
    ChatRoomPrototype.addMessage = function (message) {
        var messageEl = document.createElement('chat-room-message');
        messageEl.setAttribute('sender', message.sender);
        messageEl.setAttribute('text', message.text);
        this.messagesEl.appendChild(messageEl);
    };
    ChatRoomPrototype.nameChanged = function () {
        this.headerEl.textContent = this.getAttribute('name');
    };
    ChatRoomPrototype.attributeChangedCallback = function (attribute, oldValue) {
        var updater = this[attribute + 'Changed'];
        if (updater) updater.call(this);
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

    ChatRoomInputsPrototype = Object.create(HTMLElement.prototype);
    ChatRoomInputsPrototype.createdCallback = function () {
        this.innerHTML = '<form action="' + this.getAttribute('url') + 'messages/" method="post">'
                       +    '<input type="text" name="sender" placeholder="Your name">'
                       +    '<input type="text" name="text" placeholder="Type your message">'
                       +    '<button type="submit">Send</button>'
                       + '</form>';
        this.formEl = this.querySelector('form');
        this.senderEl = this.querySelector('input[name="sender"]');
        this.textEl = this.querySelector('input[name="text"]');
        var self = this;
        this.formEl.addEventListener('submit', function (e) {
            e.preventDefault();
            $.post(e.target.action, JSON.stringify({
                sender: self.senderEl.value,
                text: self.textEl.value,
            }), function () {}, 'json');
            self.textEl.value = '';
        });
    };

    document.addEventListener('WebComponentsReady', function () {
        document.register('chat-room', {
            prototype: ChatRoomPrototype
        });
        document.register('chat-room-message', {
            prototype: ChatRoomMessagePrototype
        });
        document.register('chat-room-inputs', {
            prototype: ChatRoomInputsPrototype
        });
        setTimeout(function () {
            document.querySelector('chat-room').setAttribute('name', 'what');
        }, 1000);
    });
});

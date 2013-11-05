require.config({
    baseUrl: '/static',
    paths: {
        'x-tag-core': 'x-tag-core/dist/x-tag-core',
        'x-tag-toggle': 'x-tag-toggle/src/toggle',
    }
});

define(['chat'], function (chat) {
    chat;
});

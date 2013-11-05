from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
        url(r'^(?P<room_slug>[\w-]+)/$', 'chat.views.room_detail'),
        url(r'^(?P<room_slug>[\w-]+)/messages/$', 'chat.views.room_messages'),
)

from django.http import HttpResponse
from django.shortcuts import render
from django.core import serializers

import json

from chat.models import ChatRoom

def room_detail(request, room_slug):
    room = ChatRoom.objects.get(slug=room_slug)
    print(request.META)
    if 'application/json' in request.META.get('HTTP_ACCEPT'):
        return HttpResponse(json.dumps({
                'slug': room.slug,
                'name': room.name,
                'messages': [{'sender': m.sender, 'text': m.text}
                            for m in room.message_set.all()],
            }), content_type="application/json")
        # return HttpResponse(serializers.serialize('json', [room]))
    else:
        return render(request, 'room_detail.html', dict(room=room))

def room_messages(request, room_slug):
    print('hi')
    room = ChatRoom.objects.get(slug=room_slug)
    print(request.body.decode('utf-8'))
    message_attrs = json.loads(request.body.decode('utf-8'))
    print(message_attrs)
    message = room.message_set.create(**message_attrs)
    return HttpResponse(json.dumps({
            'sender': message.sender,
            'text': message.text,
        }), content_type='application/json')

from django.db import models

class ChatRoom(models.Model):
    slug = models.SlugField(max_length=50)
    name = models.CharField(max_length=100)

class Message(models.Model):
    chat_room = models.ForeignKey('ChatRoom')
    sender = models.CharField(max_length=25)
    text = models.TextField()

from django.shortcuts import render
from core.models import Post, Event
from api.serializers import PostSerializer, EventSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def post_list(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

def event_list(request):
    events = Event.objects.all()
    serializer = EventSerializer(events)
    return Response(serializer.data)
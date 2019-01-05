from rest_framework import serializers
from core.models import Post, Response, Event

class ResponseSerializer(serializers.ModelSerializer):
    author=serializers.StringRelatedField()

    class Meta:
        model = Response
        fields = (
                    'id', 
                    'author', 
                    'text', 
                    'created_at')

class PostSerializer(serializers.ModelSerializer):
    post = serializers.StringRelatedField()
    responses = ResponseSerializer(many=True)
    author = serializers.StringRelatedField()

    class Meta:
        model = Post
        fields = (
                    'id', 
                    'author', 
                    'title', 
                    'post', 
                    'text', 
                    'created_at', 
                    'responses')

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = (
                    'organization',
                    'organizer',
                    'email',
                    'title',
                    'description',
                    'location',
                    'time',
                    'link')
                
from rest_framework import serializers
from core.models import (
    # Post, 
    # Response, 
    Goal, 
    Task,
    Note, 
    Event, 
    # Resource, 
)

# class ResponseSerializer(serializers.ModelSerializer):
#     author = serializers.StringRelatedField(read_only=True)

#     class Meta:
#         model = Response
#         fields = (
#                     'id', 
#                     'author', 
#                     'text', 
#                     'created_at')

# class PostSerializer(serializers.ModelSerializer):
#     post = serializers.StringRelatedField()
#     responses = ResponseSerializer(many=True, required=False)
#     author = serializers.SlugRelatedField(slug_field="username", read_only=True)

#     class Meta:
#         model = Post
#         fields = (
#                     'id', 
#                     'author', 
#                     'title', 
#                     'post', 
#                     'text', 
#                     'created_at', 
#                     'responses')

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = (
                    'id',
                    'text')

class GoalSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    tasks = TaskSerializer(many=True, required=True)

    class Meta:
        model = Goal
        fields = (
                    'id', 
                    'author', 
                    'title',
                    'tasks', 
                    'created_at')

class NoteSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    goals = GoalSerializer(many=True, required=False)

    class Meta:
        model = Note
        fields = (
                    'id', 
                    'author', 
                    'goals',
                    'text',
                    'created_at')

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = (
                    'id', 
                    'organization',
                    'organizer',
                    'email',
                    'title',
                    'description',
                    'location',
                    'date',
                    'time',
                    'link',
                    'created_at')

# class ResourceSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Resource
#         fields = (
#                     'id', 
#                     'business_name',
#                     'business_location',
#                     'description',
#                     'phone',
#                     'email',
#                     'website',
#                     'created_at')
from rest_framework import serializers
from core.models import ( 
    Goal, 
    Task,
    Note, 
    Event, 
    # Resource, 
)

class TaskSerializer(serializers.ModelSerializer):
    task_detail_link = serializers.HyperlinkedIdentityField(
        view_name='task-detail')

    class Meta:
        model = Task
        fields = (
                    'id',
                    'text',
                    'task_detail_link')

class GoalSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)
    goal_detail_link = serializers.HyperlinkedIdentityField(
        view_name='goal-detail')

    class Meta:
        model = Goal
        fields = (
                    'id', 
                    'author', 
                    'title',
                    'tasks', 
                    'created_at',
                    'goal_detail_link')

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
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
                    'status',
                    'task_detail_link')

class GoalSerializer(serializers.ModelSerializer):
    # author = serializers.StringRelatedField(read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)
    goal_detail_link = serializers.HyperlinkedIdentityField(
        view_name='goal-detail')

    class Meta:
        model = Goal
        fields = (
                    'id', 
                    'author', 
                    'title',
                    'goal_detail_link',
                    'created_at',
                    'tasks',)

class TaskSerializer(serializers.ModelSerializer):
    # goal = GoalSerializer(many=False, required=False, read_only=True)
    task_detail_link = serializers.HyperlinkedIdentityField(
        view_name='task-detail')

    class Meta:
        model = Task
        fields = (
                    'id',
                    'author',
                    'goal',
                    'text',
                    'task_detail_link')


class NoteSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    goals = GoalSerializer(many=True, required=False)
    note_detail_link = serializers.HyperlinkedIdentityField(
        view_name='note-detail')

    class Meta:
        model = Note
        fields = (
                    'id', 
                    'author', 
                    'goals',
                    'text',
                    'note_detail_link',
                    'created_at')

class EventSerializer(serializers.ModelSerializer):
    event_detail_link = serializers.HyperlinkedIdentityField(
        view_name='event-detail')

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
                    'event_detail_link',
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
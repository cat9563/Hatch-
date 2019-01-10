# from django.shortcuts import render
from core.models import (
    # Post, 
    Goal, 
    Note, 
    Event, 
    # Resource, 
    Task
)
from api.serializers import (
    # PostSerializer,
    GoalSerializer, 
    TaskSerializer,
    NoteSerializer, 
    EventSerializer, 
    # ResourceSerializer
)
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        # 'users': reverse('user-list', request=request, format=format),
        # 'posts': reverse('post-list', request=request, format=format),
        'goals': reverse('goal-list', request=request, format=format),
        'tasks': reverse('task-list', request=request, format=format),
        'notes': reverse('note-list', request=request, format=format),
        'events': reverse('event-list', request=request, format=format),
        # 'resources': reverse('resource-list', request=request, format=format),
    })

# class PostListView(generics.ListCreateAPIView):
#     """
#     Retrieves list of posts
#     Allows users to submit new posts
#     """
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)

# class GoalListView(generics.ListCreateAPIView):
#     """
#     Retrieves list of goals
#     Allows users to submit new goals
#     """
#     queryset = Goal.objects.all()
#     serializer_class = GoalSerializer

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)

class GoalListCreateView(APIView):
    def get(self, request):
        goals = Goal.objects.filter(author=request.user)
        serializer = GoalSerializer(goals, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

class TaskListView(generics.ListCreateAPIView):
    """
    Retrieves list of tasks
    Allows users to submit new tasks
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class NoteListView(generics.ListCreateAPIView):
    """
    Retrieves list of notes
    Allows users to submit new notes
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class EventListView(generics.ListCreateAPIView):
    """
    Retrieves list of events
    Allows users to submit new events
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# class ResourceListView(generics.ListCreateAPIView):
#     """
#     Retrieves list of resources
#     Allows users to submit new resources
#     """
#     queryset = Resource.objects.all()
#     serializer_class = ResourceSerializer

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)
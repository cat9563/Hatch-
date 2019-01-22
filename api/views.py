# from django.shortcuts import render
from core.models import (
    Goal, 
    Note, 
    Event, 
    # Resource, 
    Task
)
from api.serializers import (
    GoalSerializer, 
    TaskSerializer,
    NoteSerializer, 
    EventSerializer, 
    # ResourceSerializer
)

from rest_framework import generics
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import (IsAuthenticatedOrReadOnly, IsAuthenticated)
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.permissions import (
    BasePermission,
    IsAuthenticatedOrReadOnly,
    IsAuthenticated
)
import math


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        # 'users': reverse('user-list', request=request, format=format),
        'goals': reverse('goal-list', request=request, format=format),
        'tasks': reverse('task-list', request=request, format=format),
        'notes': reverse('note-list', request=request, format=format),
        'events': reverse('event-list', request=request, format=format),
        # 'resources': reverse('resource-list', request=request, format=format),
    })

class CompletePercentage(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        task_count = request.user.tasks.count()
        complete_count = request.user.tasks.filter(status=True).count()

        if task_count:
            return Response({
                "percent_complete": math.floor(complete_count / task_count * 100),
                "complete": complete_count,
                "incomplete": task_count - complete_count
            })
        return Response({"percent_complete": None, "complete": 0, "incomplete": 0})



class GoalListCreateView(generics.ListCreateAPIView):
    """
    Retrieves list of only the user's goals
    Allows user to create goals
    """
    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.request.user.goals

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class GoalDetailView(generics.RetrieveDestroyAPIView):
    """
    Retrieves details of one goal
    Allows only users to destroy their goals
    """

    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.request.user.goals

class TaskListView(generics.ListCreateAPIView):
    """
    Retrieves list of all tasks
    Allows logged in user to submit new task
    """
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        return self.request.user.tasks

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieves details of one task
    Allows only users to destroy their tasks
    """    
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.request.user.tasks

class NoteListView(generics.ListCreateAPIView):
    """
    Retrieves list of all notes
    Allows logged in user to submit new note
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class NoteDetailView(generics.RetrieveDestroyAPIView):
    """
    Retrieves details of one note
    Allows only users to destroy their notes
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,)

class EventListView(generics.ListCreateAPIView):
    """
    Retrieves list of all events
    Allows logged in user to submit new event
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class EventDetailView(generics.RetrieveDestroyAPIView):
    """
    Retrieves details of one event
    Allows only users to destroy their events
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated,)

# class ResourceListView(generics.ListCreateAPIView):
#     """
#     Retrieves list of resources
#     Allows users to submit new resources
#     """
#     queryset = Resource.objects.all()
#     serializer_class = ResourceSerializer

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)
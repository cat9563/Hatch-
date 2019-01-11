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
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import (IsAuthenticatedOrReadOnly, IsAuthenticated)
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics
from rest_framework.views import APIView


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


class GoalListCreateView(generics.ListCreateAPIView):
    serializer_class = GoalSerializer

    def get_queryset(self):
        return self.request.user.goals

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class GoalDetailView(generics.RetrieveDestroyAPIView):
    """
    Retrieves details of one goal
    Allows users to destroy their goals
    """
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class TaskListView(generics.ListCreateAPIView):
    """
    Retrieves list of tasks
    Allows users to submit new tasks
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class TaskDetailView(generics.RetrieveDestroyAPIView):
    """
    Retrieves details of one task
    Allows users to destroy their tasks
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

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
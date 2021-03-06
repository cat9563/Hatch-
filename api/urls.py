from django.urls import path, include
from api import views as api_views

urlpatterns = [
    path('', api_views.api_root),
    path('api-auth/', include('rest_framework.urls')),
    path('goals/',
         api_views.GoalListCreateView.as_view(),
         name='goal-list'),
     path('goals/<pk>/',
         api_views.GoalDetailView.as_view(),
         name='goal-detail'),
     path('tasks/',
         api_views.TaskListView.as_view(),
         name='task-list'),
     path('tasks/<pk>/',
         api_views.TaskDetailView.as_view(),
         name='task-detail'),
    path('notes/',
         api_views.NoteListView.as_view(),
         name='note-list'),
    path('notes/<pk>/',
         api_views.NoteDetailView.as_view(),
         name='note-detail'),
    path('events/',
         api_views.EventListView.as_view(),
         name='event-list'),
    path('events/<pk>/',
         api_views.EventDetailView.as_view(),
         name='event-detail'),
     path('percent_complete/', api_views.CompletePercentage.as_view(), name='percent-complete')

#     path('resources/',
#          api_views.ResourceListView.as_view(),
#          name='resource-list'),
]
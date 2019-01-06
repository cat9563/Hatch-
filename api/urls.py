from django.urls import path, include
from api import views as api_views

urlpatterns = [
    path('', api_views.api_root),
    path('api-auth/', include('rest_framework.urls')),
    path('posts/',
         api_views.PostListView.as_view(),
         name='post-list'),
    path('goals/',
         api_views.GoalListView.as_view(),
         name='goal-list'),
    path('notes/',
         api_views.NoteListView.as_view(),
         name='note-list'),
    path('events/',
         api_views.EventListView.as_view(),
         name='event-list'),
    path('resources/',
         api_views.ResourceListView.as_view(),
         name='resource-list'),
]
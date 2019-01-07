from django.contrib import admin
from core.models import (Post, Response, Event, User, Profile)
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.views import (PasswordResetCompleteView, PasswordResetConfirmView, PasswordResetDoneView, PasswordResetForm, PasswordResetView)



class PostAdmin(admin.ModelAdmin):
    model = Post
    list_display = ['author', 'title', 'text', 'created_at']

class ResponseAdmin(admin.ModelAdmin):
    model = Response
    list_display = ['author', 'text', 'created_at']

class EventAdmin(admin.ModelAdmin):
    model = Event
    list_display = ['organization',
                    'organizer',
                    'email',
                    'title',
                    'description',
                    'location',
                    'time',
                    'link', 
                    'created_at']

class UserAdmin(admin.ModelAdmin):
    fields = ("username", "email")


admin.site.register(Post, PostAdmin)
admin.site.register(Response, ResponseAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(User, UserAdmin)

from django.contrib import admin
from core.models import (Post, Response)
from django.contrib.auth.admin import UserAdmin

class PostAdmin(admin.ModelAdmin):
    model = Post
    list_display = ['author', 'title', 'text', 'created_at']

class ResponseAdmin(admin.ModelAdmin):
    model = Response
    list_display = ['author', 'text', 'created_at']

# Register your models here.
admin.site.register(Post, PostAdmin)
admin.site.register(Response, ResponseAdmin)
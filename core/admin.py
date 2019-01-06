from django.contrib import admin
from core.models import (User)
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.views import (PasswordResetCompleteView, PasswordResetConfirmView, PasswordResetDoneView, PasswordResetForm, PasswordResetView)


admin.site.register(User, UserAdmin)

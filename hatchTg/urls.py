"""hatchTg URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings 
from api import views as api_views
from django.conf.urls.static import static 
from django.views.generic import TemplateView
from core import views


urlpatterns = [
    path('',views.index, name='home'),
    path('about/', TemplateView.as_view(template_name='about.html'),
        name='about'),
    path('contact/', TemplateView.as_view(template_name='contact.html'),
        name='contact'),
    path('lgbtFriendlyBusiness/', TemplateView.as_view(template_name='lgbtFriendlyBusiness.html'),
        name='lgbtFriendlyBusiness'),
    path('localAllies/', TemplateView.as_view(template_name='localAllies.html'),
        name='localAllies'),
    path('localEvents/', TemplateView.as_view(template_name='localEvents.html'),
        name='localEvents'),
    path('dashboard/', TemplateView.as_view(template_name='dashboard.html'),
        name='dashboard'),
    path('messageBoard/', TemplateView.as_view(template_name='messageBoard.html'),
        name='messageBoard'),
    path('admin/', admin.site.urls),
    # API
    path ('api/posts/', api_views.post_list, name='api_post_list'),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),

        # For django versions before 2.0:
        # url(r'^__debug__/', include(debug_toolbar.urls)),

    ] + urlpatterns
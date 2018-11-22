
"""forest_snake URL Configuration

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
from django.urls import path, include
from rest_users import views

urlpatterns = [
    path(r'change-data/', views.ChangeData.as_view(), name='ChangeData'), #
    path(r'change-password/',
         views.ChangePassword.as_view(),
         name='changePassword'), ######### username, password, newPassword
    path(r'create-user/',
         views.CreateUser.as_view(), name='createUser'), # username, password, email,
    path(r'create-guest/',
         views.CreateGuest.as_view(), name='createGuest'),
    path(r'validate-token/', views.ValidateToken.as_view(), name='validateToken'), #
    path(r'recover-password/', views.RecoverPassword.as_view(), name='recoverPassword'), #
    path(r'delete-user/', views.DeleteUser.as_view(), name='deleteUser'), #
    path(r'delete-guest/', views.DeleteGuest.as_view(), name='deleteGuest'), #
    path(r'validate-email/', views.ValidateEmail.as_view(), name='validateEmail'), #
    path(r'login/', views.Login.as_view(), name='login'), #
    path(r'logout/', views.Logout.as_view(), name='logout'), #
]

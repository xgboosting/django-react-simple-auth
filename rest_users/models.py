"""
The models for my user app!!
"""
import uuid
from django.db import models
from knox.models import AuthToken
from django.contrib.auth.models import User
from django.utils.html import format_html

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = models.CharField(max_length=255, default='')
    created = models.DateTimeField(auto_now_add=True)
    email_validated = models.BooleanField(default=False)
    is_guest = models.BooleanField(default=True)
    payment_verified = models.BooleanField(default=False)
    payment_late = models.BooleanField(default=False)
    outstanding_balance = models.FloatField()



class ValidationToken(models.Model):
    token = models.CharField(max_length=255, default='')
    expires = models.DateTimeField()
    user_uuid = models.UUIDField()

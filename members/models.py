from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


# Extend Django's user for agents, buyers, etc.
class User(AbstractUser):
    ROLE_CHOICES = (
        ('buyer', 'Buyer'),
        ('owner', 'Owner'),
        ('agent', 'Agent'),
        ('developer', 'Developer'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='buyer')
    phone = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    agency_name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.username

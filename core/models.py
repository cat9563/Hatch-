from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator
from PIL import Image


class User(AbstractUser):
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'


class Timestamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        default='default.jpg', upload_to='profile_pictures')
    MALE_TO_FEMALE = 'MTF'
    FEMALE_TO_MALE = 'FTM'
    GENDER_NONCONFORMING = 'GN'
    JOURNEY_CHOICES = (
        (MALE_TO_FEMALE, 'Male to Female'),
        (FEMALE_TO_MALE, 'Female to Male'),
        (GENDER_NONCONFORMING, 'Gender Nonconforming'),
    )

    journey = models.CharField(
        max_length = 20,
        choices = JOURNEY_CHOICES, 
        default = None,
    )
        
    def __str__(self):
        return f'{self.user.username} Profile'


class Post(Timestamp):
    author = models.ForeignKey("User", on_delete=models.CASCADE, related_name='post')
    title = models.CharField(max_length=255, blank=False)
    text = models.TextField(blank=False, null=True)

    def __str__(self):
        return self.title


class Response(Timestamp):
    author = models.ForeignKey("User", on_delete=models.CASCADE)
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="responses")
    text = models.TextField(blank=False, null=True)


class Goal(Timestamp):
    author = models.ForeignKey("User", on_delete=models.CASCADE, related_name="goals")
    title = models.CharField(max_length = 255, null=True)


class Task(models.Model):
    goal = models.ForeignKey("Goal", on_delete=models.CASCADE, related_name="tasks")
    text = models.CharField(max_length=255, blank=False)


class Note(Timestamp):
    author = models.ForeignKey("User", on_delete=models.CASCADE)
    text = models.TextField(blank=False, null=True)

class Event(Timestamp):
    organization = models.CharField(max_length=100, blank=False)
    organizer = models.CharField(max_length=75, blank=False)
    email = models.EmailField(max_length=75, blank=False, null=True)
    title = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=1000, blank=False)
    location = models.CharField(max_length=255, blank=False)
    date = models.DateField(blank=False, null=True)
    time = models.TimeField(blank=False,  null=True)
    link = models.URLField(blank=True, null=True)

class Resource(models.Model):
    business_name = models.CharField(max_length=255, blank=False)
    business_location = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=500, blank=True)
    phone = models.IntegerField(blank=True, null=True)
    email = models.EmailField(max_length=75, blank=True)
    website = models.URLField(blank=True, null=True)      
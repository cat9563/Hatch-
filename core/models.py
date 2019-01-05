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
    title = models.CharField(max_length=255)
    text = models.TextField(null=True)

    def __str__(self):
        return self.title


class Response(Timestamp):
    author = models.ForeignKey("User", on_delete=models.CASCADE)
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="responses")
    text = models.TextField(null=True)


class Goal(Timestamp):
    author = models.ForeignKey("User", on_delete=models.CASCADE)
    subgoal = models.CharField(max_length=255)


class Note(Timestamp):
    author = models.ForeignKey("User", on_delete=models.CASCADE)
    goal = models.ForeignKey("Goal", on_delete=models.CASCADE)
    text = models.TextField(null=True)

class Event(Timestamp):
    organization = models.CharField(max_length=100)
    organizer = models.CharField(max_length=75)
    email = models.EmailField(max_length=75, null=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=1000)
    location = models.CharField(max_length=255)
    time = models.TimeField(null=True)
    link = models.URLField(null=True)

class Resource(models.Model):
    business_name = models.CharField(max_length=255)
    business_location = models.CharField(max_length=255)
    description = models.CharField(max_length=500, blank=True)
    phone = models.IntegerField(null=True)
    email = models.EmailField(max_length=75, blank=True)
    website = models.URLField(null=True)      
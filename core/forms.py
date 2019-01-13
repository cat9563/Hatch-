from django import forms
from core.models import User, Goal
from django.contrib.auth.forms import UserCreationForm, UserChangeForm


class EditProfileForm(UserChangeForm):
    email = forms.EmailField()

    def __init__(self, *args, **kwargs):
        super(EditProfileForm, self).__init__(*args, **kwargs)

        for fieldname in ['password']:
            self.fields[fieldname].help_text = ''

    class Meta:
        model = User
        fields = [
            'username',
            'email',
        ]


# class CreateGoalForm(forms.Form):
#     title = forms.CharField(label="What's your Goal", max_length=255)


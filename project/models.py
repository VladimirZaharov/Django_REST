from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    repo_link = models.URLField(max_length=200)
    working_users = models.ManyToManyField(User)

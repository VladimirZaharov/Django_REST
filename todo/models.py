from django.db import models

from users.models import User


class ToDo(models.Model):
    name = models.CharField(max_length=64)
    note_text = models.TextField(max_length=254)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)


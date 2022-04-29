import random

from django.core.management.base import BaseCommand
from users.models import User
from faker import Faker
from todo.models import ToDo


fake = Faker()


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = User.objects.all()
        todo = ToDo.objects.all()
        todo.delete()
        todo_number = 15
        for i in range(todo_number):
            todo = ToDo.objects.create(
                name=fake.sentence(nb_words=5, variable_nb_words=True),
                note_text=fake.text(max_nb_chars=200),
                is_active=fake.boolean(chance_of_getting_true=80),
                username=random.choice(users)
            )
            todo.save()

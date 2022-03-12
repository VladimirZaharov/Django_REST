import random

from django.core.management.base import BaseCommand
from users.models import User
from faker import Faker
from project.models import Project


fake = Faker()


class Command(BaseCommand):
    def handle(self, *args, **options):
        project = Project.objects.all()
        users = User.objects.all()
        project.delete()
        projects_number = int(input(': '))
        for i in range(projects_number):
            users_list = [random.choice(users).uid for i in range(random.randint(1,5))]
            project = Project.objects.create(
                name=fake.sentence(nb_words=5, variable_nb_words=True),
                repo_link=fake.url()
            )
            project.save()
            project.working_users.set(users_list)

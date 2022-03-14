from django.core.management.base import BaseCommand
from users.models import User
from faker import Faker


fake = Faker()


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = User.objects.all()
        users.delete()
        users_number = int(input(': '))
        for i in range(users_number):
            user = User.objects.create(
                username=fake.name(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email()
            )
            user.save()
        superuser = User.objects.create(
            username='root',
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email()
        )
        superuser.is_superuser = True
        superuser.password = '2612'
        superuser.save()

from django.core.management.base import BaseCommand

from service.users.models import User


class Command(BaseCommand):
    pass
    # def handle(self, *args, **options):
    #     users = User.objects.all()
    #     for user in users:
    #         user_profile = User.objects.create()
    #         user_profile.save()
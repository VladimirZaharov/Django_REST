import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserModelViewSet
from .models import User


class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user(self):
        user = User.objects.create(username='byden', first_name='bunny', last_name='rabit', email='fjsl@lskd.fld')
        client = APIClient()
        response = client.get(f'/api/users/{user.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestBookViewSet(APITestCase):
    def test_edit_admin(self):
        user = User.objects.create(username='byden', first_name='bunny', last_name='rabit', email='fjsl@lskd.fld')
        admin = User.objects.create(username='admin',
                                    first_name='admin',
                                    last_name='admin',
                                    email='admin@admin.adm')
        admin.is_superuser = True
        admin.password = 'admin123456'
        admin.save()
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/users/{user.uid}/', {'first_name': 'lucifer', 'last_name': 'morningstar'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


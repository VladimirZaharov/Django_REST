from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet
from .models import ToDo
from .serializers import ToDoModelSerializer


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_fields = ['name', 'create_time', 'update_time', 'username', 'is_active']

    def perform_destroy(self, instance):
        print(instance.is_active)
        instance.is_active = False
        instance.save()

from rest_framework.viewsets import ModelViewSet
from .models import ToDo
from .serializers import ToDoModelSerializer


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
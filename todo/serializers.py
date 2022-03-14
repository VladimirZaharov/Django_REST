from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField
from .models import ToDo


class ToDoModelSerializer(HyperlinkedModelSerializer):
    username = StringRelatedField()
    class Meta:
        model = ToDo
        fields = ('__all__')
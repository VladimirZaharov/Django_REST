from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField
from .models import Project
from users.models import User


class UserProjectModelSerializator(ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class ProjectModelSerializer(ModelSerializer):
    working_users = UserProjectModelSerializator(many=True)

    class Meta:
        model = Project
        fields = ('__all__')

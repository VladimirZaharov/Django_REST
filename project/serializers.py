from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField
from .models import Project


class ProjectModelSerializer(ModelSerializer):
    working_users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ('__all__')

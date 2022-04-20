from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, Serializer
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class UserModelIsSuperUserSerializer(Serializer):
    is_super_user = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'

    def get_is_super_user(self, obj):
        print(obj)
        print(obj.is_superuser())
        object = obj.is_superuser()
        return object


class UserModelIsStaffUserSerializer(Serializer):
    is_staff_user = serializers.SerializerMethodField()

    class Meta:
        model = User

    def get_is_staff(self, obj):
        queryset = obj.is_staff()
        return queryset


class UserFullModelSerializer(ModelSerializer):
    is_super_user = UserModelIsSuperUserSerializer()
    is_staff_user = UserModelIsStaffUserSerializer()

    class Meta:
        model = User
        fields = ('__all__')

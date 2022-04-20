from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from .models import User
from .serializers import UserModelSerializer, UserFullModelSerializer, UserModelIsSuperUserSerializer


class UserModelViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelIsSuperUserSerializer
        return UserModelSerializer
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.views import UserModelViewSet
from project.views import ProjectModelViewSet
from todo.views import ToDoModelViewSet


router = DefaultRouter()
router.register('projects', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)


schema_view = get_schema_view(openapi.Info(title="Library", default_version='0.1',
                                           description="Documentation to out project",
                                           contact=openapi.Contact(email="admin@admin.local"),
                                           license=openapi.License(name="MIT License"),
                                           ), public=True,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    re_path(r'^api/(?P<version>\d\.\d)/users/$', UserModelViewSet.as_view({'get': 'list'})),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]


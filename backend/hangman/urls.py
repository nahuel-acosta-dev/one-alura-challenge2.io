from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework import routers
from rest_framework_extensions.routers import ExtendedSimpleRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import TaskViewSet, Login, Logout, UserViewSet
router: ExtendedSimpleRouter = ExtendedSimpleRouter()

router = routers.DefaultRouter()
router.register(r'task', TaskViewSet)
router.register(r'users', UserViewSet, basename='users')


app_name = "hangman_api"

urlpatterns = [
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger/',
         SpectacularSwaggerView.as_view(url_name='hangman_api:schema'), name="swagger"),
    path('schema/redoc/',
         SpectacularRedocView.as_view(url_name='hangman_api:schema'), name='redoc'),
    path('auth/logout/', Logout.as_view(), name='logout'),
    path('auth/login/', Login.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('token/verify/', TokenVerifyView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]

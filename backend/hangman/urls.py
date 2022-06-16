from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework import routers
from rest_framework_extensions.routers import ExtendedSimpleRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import TaskViewSet, Login, Logout, UserViewSet, LoginView
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
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    #path('login/', LoginView.as_view(), name='loginview'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls)),
]
# una vez logueados con django-rest-auth enviar en el cuerpo de la solitud(o header no estoy seguro)
# {withCredentials: true} para poder enviar los permisos y que el backend registre la cookies
# No estoy seguro si con eso basta o es necesario configurar o inteceptar las cookies en el frontend
# estoy mas seguro que hay que configurar el frontend, de todas maneras con esto el backend auth
# ya quedaria echo en un gran porcentaje faltaria si deseamos personalizar serizalizers o vistas en el caso que queranos
# a continuacion dejo documentacion y videos que puede servir si olvidamos algunas cosas
# https://www.youtube.com/watch?v=KYPRfmQnhn8, https://www.rootstrap.com/blog/registration-and-authentication-in-django-apps-with-dj-rest-auth/
# https://dj-rest-auth.readthedocs.io/en/latest/installation.html#, https://www.procoding.org/jwt-token-as-httponly-cookie-in-django/
# https://www.reddit.com/r/django/comments/ju0t0m/httponly_cookie_with_drfsimplejwt/

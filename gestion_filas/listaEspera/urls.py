# listaEspera/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.PaginaPrincipal.as_view(), name='pagina_principal'),
    path('solicitar_numero', views.solicitar_numero, name='solicitar_numero'),
    path('ver_listaEspera/', views.ver_listaEspera, name='ver_listaEspera'),
    path('atender/<int:pk>/', views.atender, name='atender'),
    # Puedes agregar más rutas según sea necesario
]

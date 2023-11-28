# listaEspera/views.py
from django.shortcuts import render, redirect
from django.views import View
from .models import Paciente, TomaEspera
from .services import generar_numero_atencion, agregar_paciente

class PaginaPrincipal(View):
    template_name = 'pagina_principal.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

def solicitar_numero(request):
    
    if request.method == 'POST':
        
        numero_telefono = request.POST.get('numero_telefono')
        if not numero_telefono:
            numero_telefono = 'Sin numero de telefono'
        
        paciente_toma = agregar_paciente(numero_telefono)
            
        paciente_espera = generar_numero_atencion(paciente_toma)

        # ya agregado ese paciene a la lista, lo devuelve
        if paciente_espera:
            return render(request, 'listaEspera/ingresar_rut.html', {'paciente_espera': paciente_espera})
        
    return render(request, 'listaEspera/ingresar_rut.html')


def ver_listaEspera(request):
    # Obtener todas las TomaEspera ordenadas por fecha de toma
    tomas_espera = TomaEspera.objects.filter(atendido=False).order_by('fecha_toma')
    
    return render(request, 'listaEspera/ver_lista_espera.html', {'tomas_espera': tomas_espera})

def atender(request, pk):
    if request.method == 'POST':
        toma_espera = TomaEspera.objects.filter(pk=pk, atendido=False).first()
        
        if toma_espera:
            # Marcar la TomaEspera como atendida
            toma_espera.atendido = True
            toma_espera.save()
    return redirect('ver_listaEspera')
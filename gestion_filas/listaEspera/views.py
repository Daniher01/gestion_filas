# listaEspera/views.py
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.serializers import serialize
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
        
        paciente_toma = agregar_paciente(numero_telefono)
            
        ticket_espera = generar_numero_atencion(paciente_toma)
        
                # aqui decidor si se envia por wsp o no
        if not numero_telefono:
            pass

        # ya agregado ese paciene a la lista, lo devuelve
        if ticket_espera:
            # Convertir el objeto a JSON usando serialize
            ticket_json = serialize('json', [ticket_espera])
            return JsonResponse({'ticket_espera': ticket_json})
        
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
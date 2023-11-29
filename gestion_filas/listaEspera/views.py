# listaEspera/views.py
from django.shortcuts import render, redirect
from django.http import JsonResponse
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
            return JsonResponse({'ticket_espera': ticket_espera.to_dict()})
        else:
            return JsonResponse({'ticket_espera': None})
        
    return render(request, 'listaEspera/ingresar_rut.html')


def ver_listaEspera(request):
    
    return render(request, 'listaEspera/ver_lista_espera.html')

def obtener_listaEspera(request):
    # Obtener todas las TomaEspera ordenadas por fecha de toma
    lista_espera = TomaEspera.objects.filter(atendido=False).order_by('fecha_toma')
    
    print(lista_espera)
    
    # Convertir cada instancia a un diccionario usando model_to_dict
    lista_espera_data = [item.to_dict() for item in lista_espera]
    
    return JsonResponse({'lista_espera': lista_espera_data})

        

def atender(request, pk):
    if request.method == 'POST' or request.method == 'GET':
        toma_espera = TomaEspera.objects.filter(pk=pk, atendido=False).first()
        
        if toma_espera:
            # Marcar la TomaEspera como atendida
            toma_espera.atendido = True
            toma_espera.save()
    return redirect('ver_listaEspera')
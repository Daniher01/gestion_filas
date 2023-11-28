# listaEspera/views.py
from django.shortcuts import render, redirect
from django.views import View
from .models import Paciente, TomaEspera
from .forms import Atencion_con_numero_telefonico_form, Atencion_sin_numero_telefonico_form

class PaginaPrincipal(View):
    template_name = 'pagina_principal.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

def ingresar_rut(request):
    
    form_atencion_con_numero = Atencion_con_numero_telefonico_form()
    
    if request.method == 'POST':
        numero_telefono = request.POST.get('numero_telefono')
        
        # Verificar si ya existe un paciente con el mismo rut
        paciente_toma = Paciente.objects.filter(numero_telefono=numero_telefono).first()
        if not paciente_toma:
            # Si no existe, crear el paciente
            paciente_toma = Paciente.objects.create(numero_telefono=numero_telefono)
            
        # Verificar si hay una TomaEspera pendiente para ese paciente
        toma_espera_existente = TomaEspera.objects.filter(paciente=paciente_toma, atendido=False).first()
        
        if not toma_espera_existente:
            
            # Obtener el último número de espera y sumar 1
            ultimo_numero_espera = TomaEspera.objects.order_by('-numero_espera').first()
            nuevo_numero_espera = 1 if ultimo_numero_espera is None else ultimo_numero_espera.numero_espera + 1
        
            # Crear la TomaEspera asociada al nuevo paciente
            paciente_espera = TomaEspera.objects.create(paciente=paciente_toma, numero_espera=nuevo_numero_espera)
            # ya agregado ese paciene a la lista, lo devuelve
            if paciente_espera:
                return render(request, 'listaEspera/ingresar_rut.html', {'paciente_espera': paciente_espera, 'form_atencion_con_numero': form_atencion_con_numero})
        
    return render(request, 'listaEspera/ingresar_rut.html', {'form_atencion_con_numero': form_atencion_con_numero})

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
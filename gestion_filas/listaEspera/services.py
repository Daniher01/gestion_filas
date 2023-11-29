from django.utils import timezone
from .models import Paciente, TomaEspera

def generar_numero_atencion(paciente_toma):
    
    # Verificar si hay una TomaEspera pendiente para ese paciente
    toma_espera_existente = TomaEspera.objects.filter(paciente=paciente_toma, atendido=False).first()
        
    if not toma_espera_existente:

        nuevo_numero_espera = generar_ticket()

        # Crear la TomaEspera asociada al nuevo paciente
        paciente_espera = TomaEspera.objects.create(paciente=paciente_toma, numero_espera=nuevo_numero_espera)
        return paciente_espera
    
    return None

def generar_ticket():
    ultimo_registro = TomaEspera.objects.order_by('-fecha_toma').first()
    
    if ultimo_registro:
        # Verificar si el registro es de hoy
        hoy = timezone.now().date()
        if ultimo_registro.fecha_toma.date() == hoy:
            # Si es el mismo día, sumar uno al número existente
            nuevo_numero = ultimo_registro.numero_espera + 1
        else:
            # Si es un día diferente, reiniciar el número
            nuevo_numero = 1   
    else:
        # Si no hay registros, empezar desde el número 1
        nuevo_numero = 1
        
    return nuevo_numero
    
    

def agregar_paciente(numero_telefono):
    
    if not numero_telefono:
        numero_telefono = 'Sin Teléfono'
    
    # Verificar si ya existe un paciente con el mismo numero
    paciente_toma = Paciente.objects.filter(numero_telefono=numero_telefono).first()
    
    if not paciente_toma:
        # Si no existe, crear el paciente
        paciente_toma = Paciente.objects.create(numero_telefono=numero_telefono)
        
    return paciente_toma
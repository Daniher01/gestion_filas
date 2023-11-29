# listaEspera/models.py
from django.db import models
from django.forms.models import model_to_dict

class Paciente(models.Model):
    numero_telefono = models.CharField(max_length=12 ,default='Sin Teléfono')
    fecha_creacion = models.DateTimeField(auto_now_add=True)  # Agrega la fecha de creación automáticamente

    def __str__(self):
        return self.numero_telefono

class TomaEspera(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    numero_espera = models.IntegerField()
    centro = models.CharField(max_length=1, default='T')
    fecha_toma = models.DateTimeField(auto_now_add=True)
    atendido = models.BooleanField(default=False)

    def __str__(self):
        return f"Número de espera: {self.ticket} - Paciente: {self.paciente}"
    
    def to_dict(self):
        # Convertir el objeto paciente a un diccionario
        paciente_data = model_to_dict(self.paciente)

        # Crear el diccionario manualmente incluyendo los campos necesarios
        data = {
            'id': self.id,
            'paciente': paciente_data,
            'numero_espera': self.numero_espera,
            'centro': self.centro,
            'fecha_toma': self.fecha_toma,  # Incluimos la fecha en formato ISO 8601
            'atendido': self.atendido,
            'ticket': self.ticket,
        }

        return data
    
    @property
    def ticket(self):
        return f"{self.centro}{self.numero_espera}"
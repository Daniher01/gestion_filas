# listaEspera/models.py
from django.db import models

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
        return f"Número de espera: {self.numero_espera} - Paciente: {self.paciente.numero_telefono}"
# listaEspera/models.py
from django.db import models

class Paciente(models.Model):
    rut_number = models.CharField(max_length=12)
    fecha_creacion = models.DateTimeField(auto_now_add=True)  # Agrega la fecha de creación automáticamente

    def __str__(self):
        return self.rut_number

class TomaEspera(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    numero_espera = models.IntegerField()
    fecha_toma = models.DateTimeField(auto_now_add=True)
    atendido = models.BooleanField(default=False)

    def __str__(self):
        return f"Número de espera: {self.numero_espera} - Paciente: {self.paciente.rut_number}"
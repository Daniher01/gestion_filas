# Generated by Django 4.2.7 on 2023-11-27 16:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listaEspera', '0002_rut_atendido_rut_fecha_creacion'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Rut',
            new_name='Paciente',
        ),
    ]

# Generated by Django 4.2.7 on 2023-11-28 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listaEspera', '0005_rename_rut_number_paciente_numero_telefono'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tomaespera',
            name='numero_espera',
            field=models.CharField(max_length=4),
        ),
    ]

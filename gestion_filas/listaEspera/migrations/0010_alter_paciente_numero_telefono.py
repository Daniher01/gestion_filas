# Generated by Django 4.2.7 on 2023-11-30 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listaEspera', '0009_alter_paciente_numero_telefono'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paciente',
            name='numero_telefono',
            field=models.CharField(max_length=12),
        ),
    ]

# Generated by Django 4.2.7 on 2023-11-28 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listaEspera', '0008_tomaespera_centro'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paciente',
            name='numero_telefono',
            field=models.CharField(default='Sin Teléfono', max_length=12),
        ),
    ]

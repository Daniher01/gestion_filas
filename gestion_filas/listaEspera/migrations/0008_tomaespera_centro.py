# Generated by Django 4.2.7 on 2023-11-28 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listaEspera', '0007_alter_tomaespera_numero_espera'),
    ]

    operations = [
        migrations.AddField(
            model_name='tomaespera',
            name='centro',
            field=models.CharField(default='T', max_length=1),
        ),
    ]

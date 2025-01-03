# Generated by Django 5.1.3 on 2024-12-28 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TiendaLuigui', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Productos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=200, verbose_name='Nombre')),
                ('descripcion', models.TextField(verbose_name='Descripción')),
                ('precio', models.DecimalField(decimal_places=0, max_digits=10, verbose_name='Precio')),
                ('categoria', models.CharField(choices=[('aseo', 'Aseo'), ('comestibles', 'Comestibles'), ('canastafamiliar', 'Canasta Familiar'), ('papeleria', 'Papelería')], max_length=20, verbose_name='Categoría')),
                ('imagen', models.ImageField(upload_to='products/', verbose_name='Imagen')),
                ('disponible', models.BooleanField(default=True, verbose_name='Disponible')),
            ],
        ),
    ]

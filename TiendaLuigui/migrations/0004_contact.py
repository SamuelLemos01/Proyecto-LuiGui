# Generated by Django 5.1.3 on 2024-12-29 01:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TiendaLuigui', '0003_rename_productos_products'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=60)),
                ('email', models.EmailField(max_length=254)),
                ('telefono', models.CharField(max_length=11)),
                ('mensaje', models.TextField()),
            ],
        ),
    ]

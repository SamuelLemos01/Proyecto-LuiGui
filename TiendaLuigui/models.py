from django.db import models #importamos modelos de bases de datos de django
from django.contrib.auth.models import User#importamos modelos de usuario predeterminados, este modelo trae campos basicos como el nombre de usuario, apellidos, contraseñas, etc

class UserProfile(models.Model): #Define el modelo UserProfile que extiende la información del usuario
    user = models.OneToOneField(User, on_delete=models.CASCADE) #creamos una relacion de uno a uno con el modelo usuario y despues si se elimina el usuario, se elimina el perfil. Luego user permite agregar campos extra que no vienen por defecto en la funcion user que importe antes
    numero = models.CharField(max_length=15)
    direccion = models.CharField(max_length=200)


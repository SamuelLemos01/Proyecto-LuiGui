from django.db import models #importamos modelos de bases de datos de django
from django.contrib.auth.models import User#importamos modelos de usuario predeterminados, este modelo trae campos basicos como el nombre de usuario, apellidos, contraseñas, etc

class UserProfile(models.Model): #Define el modelo UserProfile que extiende la información del usuario
    user = models.OneToOneField(User, on_delete=models.CASCADE) #creamos una relacion de uno a uno con el modelo usuario y despues si se elimina el usuario, se elimina el perfil. Luego user permite agregar campos extra que no vienen por defecto en la funcion user que importe antes
    
    numero = models.CharField(max_length=15)
    direccion = models.CharField(max_length=200)

def __str__(self):
        return self.user.username


class Products(models.Model):
    CATEGORIES = [
        ('aseo', 'Aseo'),
        ('comestibles', 'Comestibles'),
        ('canastafamiliar', 'Canasta Familiar'),
        ('papeleria', 'Papelería'),
    ]

    nombre = models.CharField(max_length=200, verbose_name="Nombre")
    descripcion = models.TextField(verbose_name="Descripción")
    precio = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="Precio")
    categoria = models.CharField(max_length=20, choices=CATEGORIES, verbose_name="Categoría")
    imagen = models.ImageField(upload_to='products/', verbose_name="Imagen")
    disponible = models.BooleanField(default=True, verbose_name="Disponible")

    def __str__(self):
        return self.nombre
    

class Contact(models.Model):
    nombre = models.CharField(max_length=60)
    email = models.EmailField()
    telefono = models.CharField(max_length=11)
    mensaje = models.TextField()

    def __str__(self):
        return self.nombre
    

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fechaCreado = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=0)
    domicilio = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username + id(self)

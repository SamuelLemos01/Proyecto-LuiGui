from django import forms #esta es la funcion para que django lea los formularios
from django.contrib.auth.forms import UserCreationForm #es la funcion base de django para crear usuarios y registrarlos
from django.contrib.auth.models import User #es el modelo predeterminado que trae django
from .models import UserProfile #este es un modelo personalizado para informacion adicional del usuario
 
class CustomUserCreationForm(UserCreationForm): #clase que hereda de la funcion que importamos antes para crear los formularios en django, es para campos adicionales 
    correo = forms.EmailField(required=True)
    numero = forms.CharField(max_length=15) #en estos tres declaro los campos con el tipo de datos que es, y con los caracteres maximos que puede ingresar el usuario
    direccion = forms.CharField(max_length=200)

    class Meta: #con esta clase especificamos que modelo vamos a usar, en este caso es User
        model = User #esto indica que estoy trabajando ene l modelo de usuario
        fields = ("username", "correo", "numero", "direccion", "password1", "password2") #especifico que campso se muestran segun el value de los inputs y que estos se guardaran

    def save(self, commit=True): #definimos una funcion save que primero guarde al usuario sin ningun comentario, commit crea un objeto usuario sin guardarlo en la base de datos
        user = super().save(commit=False)  #Permite modificar el objeto antes de guardarlo
        user.correo = self.cleaned_data["correo"] #le asignamos su correo
        if commit: #usamos el ciclo if para decirle que si se permite guardar el usuario, entonces guarde y cree un perfil, luego retorneme el usuaro creado
            user.save()
            # Crear el perfil de usuario
            UserProfile.objects.create(
                user=user,
                numero=self.cleaned_data.get('numero'), #se crea un perfin con telefono y direccion
                direccion=self.cleaned_data.get('direccion')
            )
        return user

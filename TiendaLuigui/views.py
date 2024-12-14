from django.shortcuts import render

# Create your views here.

def inicio(request):
    return render(request,'inicio.html')

def galeria(request):
    return render(request,'galeria.html')

def perfil(request):
    return render(request, 'perfil.html')

def catalogo(request):
    return render(request, 'catalogo.html')



from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from .forms import CustomUserCreationForm
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required

def register(request): #manejara los unuevos registro
    if request.method == "POST": #si es metodo post, ira al formulario a procesar los datos
        form = CustomUserCreationForm(request.POST)
        if form.is_valid(): #valida los datos ingresados
            user = form.save() #guarda el usuario
            #auth_login(request, user) #inicia sesion automaticamente
            messages.success(request, "Registro exitoso") #mensaje de exito
            return redirect('perfil') #si todo sale bien, devuelvame al login 
        else:
            messages.error(request, "Por favor corrije los siguientes errores:") #mensaje de error si salio mal
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}") #las ultimas tres lineas especificaran todos los errores que encontro la funcion segun los parametros ue tiene la autenticacion de django que importe antes, devuelvame al login al apartado de registro
    return render(request, 'perfil.html', {'register_mode': True})

def login(request): #maneja inicio de sesion 
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST) #va a los datos del method post y autentica que todo este bien, el authenticaform es un formulario de autenticacion de django
        if form.is_valid():
            username = form.cleaned_data.get('username') #trae nombre de usuario    
            password = form.cleaned_data.get('password') #trae contraseña, luego compara ambos
            user = authenticate(username=username, password=password) #verifica que nombre de usuario este bien en la base de datos y lo mismo con la contraseña
            if user is not None:
                auth_login(request, user)
                messages.success(request, f"Bienvenido {username}") #mensaje de bienvenida
                return redirect('perfil')
        else:
            messages.error(request, "Por favor registrate, no te encontramos en la base de datos")  #mensaje de inicio de ssesio fallido
    return render(request, 'login.html', {'register_mode': False}) 

def logout_perfil(request): #defino la funcion  
    logout(request) #importe una funcion de django que es logout, en esta le mando una petiion y le pido que me devuevla una redireccion a inicio
    return redirect('inicio')


@login_required(login_url='login') #funcion de django que solo deja entrar al perfil de usuario si esta logueado, si no esta logueado lo dirijira al login
def perfil(request):
    try:
        profile = request.user.profile
        context = {
            'user': request.user,
            'profile': profile
        }
        return render(request, 'perfil.html', context)
    except AttributeError:
        messages.error(request, "No se encontró el perfil del usuario")
        return render(request, 'perfil.html', {'profile': None})
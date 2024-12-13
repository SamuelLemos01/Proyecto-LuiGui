from django.shortcuts import render

# Create your views here.

def inicio(request):
    return render(request,'inicio.html')

def galeria(request):
    return render(request,'galeria.html')

def dashboard(request):
    return render(request, 'dashboard.html')

def catalogo(request):
    return render(request, 'catalogo.html')



from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from .forms import CustomUserCreationForm

def register(request): #manejara los unuevos registro
    if request.method == "POST": #si es metodo post, ira al formulario a procesar los datos
        form = CustomUserCreationForm(request.POST)
        if form.is_valid(): #valida los datos ingresados
            user = form.save() #guarda el usuario
            #auth_login(request, user) #inicia sesion automaticamente
            messages.success(request, "Registro exitoso") #mensaje de exito
            return redirect('dashboard') #si todo sale bien, devuelvame al login 
        else:
            messages.error(request, "Por favor corrije los siguientes errores:") #mensaje de error si salio mal
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}") #las ultimas tres lineas especificaran todos los errores que encontro la funcion segun los parametros ue tiene la autenticacion de django que importe antes, devuelvame al login al apartado de registro
    return render(request, 'dashboard.html', {'register_mode': True})

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
                return redirect('dashboard')
        else:
            messages.error(request, "Por favor registrate, no te encontramos en la base de datos")  #mensaje de inicio de ssesio fallido
    return render(request, 'login.html', {'register_mode': False}) 
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
from django.contrib.auth import login as auth_login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm  
from django.contrib import messages  # importo los mensajes para mostrar errores o confirmaciones
from django.contrib.auth.decorators import login_required  # importo el decorador para proteger vistas
from .forms import CustomUserCreationForm  # importo mi formulario personalizado de registro



def logout_perfil(request):  # defino la funcion para cerrar sesion
    logout(request)  # cierro la sesion del usuario
    return redirect('inicio')  # redirecciono al inicio

def register(request):  # Función para manejar el registro de nuevos usuarios
    if request.method == "POST":  # Si el método es POST procesa el formulario
        form = CustomUserCreationForm(request.POST)  # Crea una instancia del formulario con los datos enviados
        if form.is_valid():  # Valida que los datos cumplan con los requisitos
            user = form.save()  # Guarda el nuevo usuario en la base de datos
            messages.success(request, "Registro exitoso, Por favor inicia sesión")  # Muestra mensaje de éxito
            return redirect('login')  # Redirecciona al login
        else:  # Si hay errores en el formulario
            for field in form.errors:  # Itera sobre cada campo con error
                for error in form[field].errors:  # Itera sobre cada error del campo
                    messages.error(request, f"{field}: {error}")  # Muestra mensaje de error específico
    return render(request, 'perfil.html', {'register_mode': True})  # Renderiza la plantilla de registro

def login(request):  # Función para manejar el inicio de sesión
    if request.method == "POST":  # Si el método es POST, procesa el formulario
        form = AuthenticationForm(request, data=request.POST)  # Crea instancia del formulario con los datos
        if form.is_valid():  # Valida las credenciales
            username = form.cleaned_data.get('username')  # Obtiene el nombre de usuario
            password = form.cleaned_data.get('password')  # Obtiene la contraseña
            user = authenticate(username=username, password=password)  # Autentica al usuario
            if user is not None:  # Si el usuario existe y las credenciales son correctas
                auth_login(request, user)  # Inicia la sesión del usuario
                return redirect('perfil')  # Redirecciona al perfil
            else:  # Si las credenciales son incorrectas
                messages.error(request, "Usuario o contraseña incorrectos")  # Muestra mensaje de error
        else:  # Si el formulario no es válido
            messages.error(request, "Usuario o contraseña incorrectos")  # Muestra mensaje de error
    return render(request, 'login.html', {'register_mode': False})  # Renderiza la plantilla de login

@login_required(login_url='login')  # Decorator que requiere inicio de sesión para acceder
def perfil(request):  # Función para manejar el perfil del usuario
    if request.method == 'POST':  # Si el método es POST, procesa el formulario
        if 'delete_account' in request.POST:  # Si se solicita eliminar la cuenta
            request.user.delete()  # Elimina el usuario
            messages.success(request, "Cuenta eliminada exitosamente")  # Muestra mensaje de confirmación
            return redirect('inicio')  # Redirecciona al inicio
        elif 'change_password' in request.POST:  # Si se solicita cambiar la contraseña
            password_form = PasswordChangeForm(request.user, request.POST)  # Crea instancia del formulario
            if password_form.is_valid():  # Valida los datos del formulario
                user = password_form.save()  # Guarda la nueva contraseña
                messages.success(request, '¡Contraseña actualizada exitosamente!')  # Muestra mensaje de éxito
                logout(request)  # Cierra la sesión del usuario
                return redirect('login')  # Redirecciona al login
            else:  # Si hay errores en el formulario
                for error in password_form.errors.values():  # Itera sobre los errores
                    messages.error(request, error[0])  # Muestra mensaje de error
    else:  # Si el método es GET
        password_form = PasswordChangeForm(request.user)  # Crea formulario vacío

    try:  # Intenta obtener el perfil del usuario
        profile = request.user.userprofile  # Obtiene el perfil del usuario
        context = {  # Crea el contexto con los datos necesarios
            'user': request.user,
            'profile': profile,
            'password_form': password_form
        }
        return render(request, 'perfil.html', context)  # Renderiza la plantilla con el contexto
    except AttributeError:  # Si no existe el perfil
        return render(request, 'perfil.html', {'password_form': password_form})  # Renderiza sin datos de perfil
    


from django.http import JsonResponse
from .models import Products

def get_products(request): # Función para obtener los productos disponibles
    products = Products.objects.filter(disponible=True).values( # Filtra los productos disponibles
        'id', 'nombre', 'descripcion', 'precio', 
        'categoria', 'imagen'
    )
    print("Productos encontrados:", list(products)) # Imprime los productos encontrados
    return JsonResponse(list(products), safe=False) # Retorna los productos en formato JSON



from .forms import ContactForm
def contact(request):  # Función para manejar el formulario de contacto
    if request.method == 'POST':  # Si el método es POST, procesa el formulario
        form = ContactForm(request.POST)  # Crea instancia del formulario con los datos
        if form.is_valid():  # Valida los datos del formulario
            form.save()  # Guarda los datos en la base de datos
            messages.success(request, "Mensaje enviado")  # Muestra mensaje de éxito
            return redirect('contact')  # Redirecciona a la misma página
        else:  # Si hay errores en el formulario
            for field in form.errors:  # Itera sobre cada campo con error
                for error in form[field].errors:  # Itera sobre cada error del campo
                    messages.error(request, f"{field}: {error}")  # Muestra mensaje de error específico
    else:  # Si el método es GET
        form = ContactForm()  # Crea formulario vacío
    return render(request, 'inicio.html', {'form': form})  # Renderiza la plantilla con el formulario
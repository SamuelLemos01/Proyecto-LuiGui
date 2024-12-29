
from django.contrib import admin
from .models import UserProfile

# Definimos cómo se mostrará UserProfile en el admin
class UserProfileAdmin(admin.ModelAdmin):
    model = UserProfile
    list_display = ('user', 'numero', 'direccion')  # Campos que se mostrarán en la lista
admin.site.register(UserProfile, UserProfileAdmin)

# Definimos cómo se mostrará Productos en el admin
from .models import Products

@admin.register(Products)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'precio', 'disponible') #lo que se muestra en al tabla de products
    search_fields = ('nombre', 'descripcion') # por lo que se puede buscar

from .models import Contact
class ContactMessages (admin.ModelAdmin):
    list_display = ('nombre', 'email', 'telefono', 'mensaje')
admin.site.register(Contact, ContactMessages)


from django.contrib import admin
from .models import UserProfile

# Definimos cómo se mostrará UserProfile en el admin
class UserProfileAdmin(admin.ModelAdmin):
    model = UserProfile
    list_display = ('user', 'numero', 'direccion')  # Campos que se mostrarán en la lista
admin.site.register(UserProfile, UserProfileAdmin)


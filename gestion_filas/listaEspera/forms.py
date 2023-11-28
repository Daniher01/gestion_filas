from django import forms

class Atencion_con_numero_telefonico_form(forms.Form):
    numero_telefono = forms.CharField(max_length=10, widget=forms.TextInput(attrs={'placeholder': 'Ingrese su número telefónico', 'pattern': '9[0-9]{8}'}))

class Atencion_sin_numero_telefonico_form(forms.Form):
    # Agrega campos según tus necesidades para el segundo formulario
    pass
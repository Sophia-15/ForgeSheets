from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as login_django
from django.contrib.auth.decorators import login_required

def sign(request):
    if request.method == "POST":
        if 'login' in request.POST: 
            return login(request, request.POST.get('user'), request.POST.get('password'))
        elif 'register' in request.POST:
            return register(request, request.POST.get('user'), request.POST.get('email'), request.POST.get('password'))
    else:
        return render(request, 'sign.html')


def register(request, username, email, password):
    user = User.objects.filter(username=username).first()
    if user:
        return HttpResponse('Já existe um usuário com esse username')
    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()
    return HttpResponse('It runs 👍')

def login(request, username, password):
    print(username, password)
    user = authenticate(username=username, password=password)
    if user:
        login_django(request, user)
        return HttpResponse('It runs 👍')
    else:
        return HttpResponse('Usuário ou senha inválidos')
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from .forms import LoginForm, RegisterForm

def log_in(request):
    if request.method == 'GET':
         form = LoginForm()
         return render(request, 'login.html', { 'form': form})
    
    elif request.method == 'POST':
        form = LoginForm(request.POST)
        
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request,username=username, password=password)
            
            if user:
                login(request, user)
                return redirect('users:success')
        
        # form is not valid or user is not authenticated
        return render(request,'login.html',{'form': form})

def sign_up(request):
    if request.method == 'GET':
        form = RegisterForm()
        return render(request, 'register.html', { 'form': form})  
    
    if request.method == 'POST':
        form = RegisterForm(request.POST) 
        print(form.errors)
        
        if form.is_valid():
            user = form.save(commit=True)
            login(request, user)
            return redirect('users:success')
        else:
            return render(request, 'register.html', {'form': form})

def log_out():
    return redirect('login')

def success(request):
    return render(request, 'success.html')
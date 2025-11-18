from django.shortcuts import render
from django.http import JsonResponse
from .forms import GameForm
import requests
import json

api_key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzMjMzNTQ5LCJpYXQiOjE3MTQ1OTM1NDksImp0aSI6IjZjZTljZDJkN2ZmYjQ5YTk5NWMzNGNmZmQ0NmExMjc1IiwidXNlcl9pZCI6NjR9.XrI0lDw8manwu82W_VB-pBCu7GGobYw13WwUJO6gFsA"

def start(request):
    return render(request, 'start.html')

def worndly(request):
    board = [['A' for _ in range(5)] for _ in range(6)]
    
    if request.method == 'POST':
        form = GameForm(request.POST) 

        if form.is_valid():
           
            thing =form.save(commit=False)
            thing.save()            
        return  render(request, 'start.html')#, context=context)
    else:
        
        form = GameForm()

        context = {
       'board': board,
       'form': form,
   }

       # return render(request, 'worndly.html', { 'form': form}) 
    return render(request, 'worndly.html', context=context)#{'board': board})

def dashboard(request):
    return render(request, 'dashboard.html')

def shop(request):
    user = request.user
    user_balance = view_balance_for_user(api_key, user.email)
    
    context = {
        "balance": user_balance["amount"] if user_balance else "You don't have an account!"
    }
    
    return render(request, 'shop.html', context)

def purchase(request):
    if request.method == 'POST':
        user = request.user
        data = json.loads(request.body)
        amount = data.get('amount')
        
        response = user_pay(api_key, user.email, amount)
        if response:
            return JsonResponse(response)

def view_balance_for_user(access_token, email):
   # Use the access token to make an authenticated request
   headers = {
       'Authorization': f'Bearer {access_token}'
   }

   # Make a GET request with the authorization header
   api_response = requests.get(f"https://jcssantos.pythonanywhere.com/api/group23/group23/player/{email}/", headers=headers)

   if api_response.status_code == 200:
       # Process the data from the API
       return api_response.json()
   else:
       print("Failed to access the API endpoint to view all coins:", api_response.status_code)

def user_pay(access_token, email, amount):
   # Use the access token to make an authenticated request
   headers = {
       'Authorization': f'Bearer {access_token}'
   }
   data = {"amount": amount} # non-negative integer value to be decreased
   
   # Make a POST request with the authorization header and data payload
   api_response = requests.post(f"https://jcssantos.pythonanywhere.com/api/group23/group23/player/{email}/pay", headers=headers, data=data)

   if api_response.status_code == 200:
       # Process the data from the API
       return api_response.json()
   else:
       print("Failed to access the API endpoint to pay:", api_response.status_code)
       print(api_response.json())

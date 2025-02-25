from django.shortcuts import render, redirect
from .forms import RequestValidationForm
from django.http import JsonResponse
from django.views import View
from convert_json.main import only_params


class GetDynamicFieldsView(View):
    def get(self, request, *args, **kwargs):
        type_sk = request.GET.get('type_sk')
        fields = only_params.get(type_sk, {})
        return JsonResponse(fields)

def request_validation_view(request):
    if request.method == 'POST':
        form = RequestValidationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('http://127.0.0.1:8000/admin/request_validator_form/requestvalidation/')
    else:
        form = RequestValidationForm()
    return render(request, 'request_validation_form.html', {'form': form})
from django.db import models
from convert_json.js import param

params = ((param, param) for param in list(param.keys()))

class RequestValidation(models.Model):
    sender = models.CharField("Отправитель", max_length=255)
    date_send = models.DateTimeField("Дата и время отправки", auto_now_add=True)
    explanation = models.TextField("Пояснение", max_length=500)
    type_sk = models.CharField("Тип СК", choices=params, max_length=44)
    chapter = models.CharField("Раздел", max_length=50)
    release = models.IntegerField("Релиз")

    def __str__(self):
        return f"Запрос от {self.sender} ({self.type_sk})"
    

class Parameter(models.Model):
    request = models.ForeignKey(
        'RequestValidation', 
        on_delete=models.CASCADE, 
        related_name='parameters',
        unique=False
    )
    name = models.CharField("Имя параметра", max_length=255, unique=False)
    value = models.CharField("Значение параметра", max_length=255, unique=False)

    def __str__(self):
        return f"{self.name}: {self.value}"
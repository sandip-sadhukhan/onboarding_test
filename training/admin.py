from django.contrib import admin
from training import models

admin.site.register(models.UserActivityLog)
admin.site.register(models.UserActivity)

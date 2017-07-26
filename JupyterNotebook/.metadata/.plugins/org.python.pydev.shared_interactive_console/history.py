import sys; print('%s %s' % (sys.executable or sys.platform, sys.version))
import os; os.environ['DJANGO_SETTINGS_MODULE'] = 'DjangoPractice.settings'; import django
if django.get_version() < '1.5':
    from django.core import management
    import DjangoPractice.settings as settings
    management.setup_environ(settings)
if django.get_version() >= '1.7':
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
runserver
manage.py runserver
python manage.py runserver
manage.py
DjangoPractice/manage.py
hello
print("hello")
python /manage.py
python /manage.py runserver
python DjangoPractice/manage.py runserver
DjangoPractice/manage.py runserver
DjangoPractice/manage.py
manage.py
manage
help
from manage.py import runserver
runserver
manage.py runserver
manage.py runserver
manage.py

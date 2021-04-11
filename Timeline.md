# Boazar0.7 project timeline (Windows 10)

## 31-03-2021

### 04:05 PM

1. A `dir` has been created called `boazar0.7`
2. cd to `boazar0.7`
3. `pipenv shell` - to create a virtual env. (inside of your home dir)
4. If `pipenv` is not installed then - `pip install pipenv`
5. `pipenv install django`
6. `django-admin startproject core .` - create a django project in current dir.
7. `code .` to open the project dir in `vscode`
8. `file` -> `add folder to workspace`
9. `file` -> `save workspace`
10. `ctrl + shift + p` - select python interpreter.
11. `python manage.py startapp accounts` - custom user model
12. create a model called `User` extending `django.contrib.auth.models.AbstractUser`

- accounts.models.py

  ```python
    from django.db import models
    from django.contrib.auth.models import AbstractUser
    from django.core.validators import RegexValidator

    class User(AbstractUser):
        phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
        phone_number = models.CharField(validators=[phone_regex], max_length=15, blank=True) # validators should be a list
        is_phone_verified = models.BooleanField(default=False)
  ```

13. `python manage.py startapp vendors` - Vendors app is created

- vendor.models.py

  ```python
    from django.db import models
    from django.contrib.auth import get_user_model
    User = get_user_model()

    class Vendor(models.Model):
        name = models.CharField(max_length=80)
        user = models.ForeignKey(User, related_name='vendor', on_delete=models.CASCADE)
        is_active = models.BooleanField(default=True)
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)

        class Meta:
            ordering = ['name']

        def __str__(self):
            return self.name

        def username(self):
            return self.user.username

    class Staff(models.Model):
        vendor = models.ForeignKey(Vendor, related_name='staff', on_delete=models.CASCADE)
        user = models.OneToOneField(User, related_name='staff_user', on_delete=models.CASCADE)
        is_active = models.BooleanField(default=False)
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)

        def __str__(self):
            return self.user.username

  ```

14. `pipenv install pillow` - image handling app for django
15. `pipenv install django-mptt` - add to settings installed app section - `'mptt',`
16. `python manage.py startapp store`
17. Add to installed app section of settings.py file
18. Add models to `store app` - `Category(MPTTModel)`, `ProductType`, `ProductSpecification`, `Product`, `ProductSpecificationValue`, `ProductImage`
19. Add media to settings.py file -

```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media/'
```

20. in core.urls add the following code

```python
from django.conf import settings
from django.conf.urls.static import static
if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## 01-04-2021

### 06:34 AM

1. `python manage.py makemigrations`
2. `python manage.py migrate`

### 08:02 AM

1. Add DRF (Django Rest Framework)
   a. `pipenv install djangorestframework`
   b. add to core.settings installed app section -`'rest_framework'`
   c. add REST_FRAMEWORK settings
   d. create `urls.py`, `serializers.py` and `views`

## Next.js

### 09:00 AM

1. create a dir called `next` inside of our boazar0.7 project dir
2. `cd next`
3. `npx create-next-app` it will install `react` , `react-dom` and `next`
4. `cd core`
5. `npm run dev` - check dev server is ready or not

### Install Material-UI

1. `npm install @material-ui/core` inside of `next/core/` dir
2. create a dir `src` inside of `next/core/` dir
3. inside `src` create a file `theme.js`
4. copy contents from `https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/theme.js` to `theme.js`
5. copy contents from `https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js` and replace contents with `pages/_app.js`
6. create a file called `_document.js` inside of `pages` dir.
7. copy contents form `https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js` to `_document.js`.
8. in `_document.js` remove `<link>` in line number 13.
9. delete `styles/Home.module.css` file.
10. remove `import styles from '../styles/Home.module.css'` from `pages/index.js`.
11. remove all unwanted default code.
12. install material-ui icons `npm install @material-ui/icons`

### Create Header component

1. create `components` dir inside `core` dir
2. create `header.js` file.

### Create image API endpoints

1. create `ImageSerializer` inside of `store/serializer.py`

## 02-04-2021

### 03:35 PM

## Next.js Individual product page

1. Create `product` dir inside of `pages` dir
2. Create a dynamic link page called `[slug].js` inside of `product` dir
   to load individual products based on the `slug` field from the server

## 05-04-2021

### 02:50 PM

## JWT

1. Install pyjwt by - `pipenv install pyjwt`
2. user (accounts app) api `register, login, logout` is created
3. install django-cors-headers `pipenv install django-cors-headers`

4. uninstall jwt `pipenv uninstall pyjwt`

## 06-04-2021

### 06:09 AM

## Knox authentication

1. Install knox `pipenv install django-rest-knox`
2. add to installed apps in settings.py.
3. create accounts.urls for api auths using knox
4. create nextjs login.js and register.js in pages dir
5. populate template data from Material ui templates

### 02:37 PM

## Configure Typescript for next js

1. create `tsconfig.json` in next/core root dir
2. install typescript `npm install --save-dev typescript`

## 11:04:2021

### 08:27 AM

## Remove Next js (I found it complicated)

## install React only + Redux

1. create `frontend` in `boazar0.7` root
2. `npx create-react-app frontend`
3.

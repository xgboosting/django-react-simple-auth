from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_users.models import User, Profile, ValidationToken
# Create your tests here.
class AccountTests(APITestCase):

    def create_account(self):
        url = reverse('createUser')
        data = {'username':'test', 'password':'password', 'email':'email@example.com1'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Profile.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'email@example.com1')
        return response.data['token']

    def test_deletes_account(self):
        token = self.create_account()
        url = reverse('deleteUser')
        data = {'username':'test', 'password':'password', 'email':'email@example.com1'}
        response = self.client.post(url, data, format='multipart',
                                    HTTP_AUTHORIZATION='Token ' + token)
        self.assertEqual(Profile.objects.count(), 0)

    def test_validate_email(self):
        token = self.create_account()
        url = reverse('validateEmail')
        data = {'email':'email@example.com1'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(email='email@example.com1')
        profile = Profile.objects.get(user=user)
        validation_token = ValidationToken.objects.get(user_uuid=profile.uuid)
        url = reverse('validateEmail')
        data = {'token': str(validation_token.token)}
        response = self.client.put(url, data, format='json')
        self.assertEqual(Profile.objects.get(user=user).email_validated, True)
        return

    def test_recover_password(self):
        self.create_account()
        url = reverse('recoverPassword')
        data = {'email':'email@example.com1'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def xtest_login_logout(self):
        login_url = reverse('login')
        logout_url = reverse('logout')
        assert 0
        return

    def xtest_change_password(self):
        url = reverse('changePassword')
        assert 0
        return

    def xtest_change_data(self):
        url = reverse('changeData')
        assert 0
        return

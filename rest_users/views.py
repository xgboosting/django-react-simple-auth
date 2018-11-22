"""
this is the rest user auth and email validation
"""
import hashlib
import random
import uuid
import pytz
import datetime
#from django.shortcuts import render
#from django.core.mail import send_mail
#from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils import timezone

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from knox.models import AuthToken
from knox.auth import TokenAuthentication
# Create your views here.
from rest_users.models import Profile, ValidationToken

class ChangeData(APIView):
    """
    this changes the user data
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        """
        post request
        """
        try:
            user = request._auth.user
            if user.check_password(str(request.data['password'])) is True:
                if request.data['newEmail'] is not None:
                    user.username = request.data['newEmail']
                    user.email = request.data['newEmail']
                    user.save()
                    return Response({'message': 'email changed'}, status=status.HTTP_200_OK)
                elif request.data['firstName'] is not None:
                    user.first_name = request.data['firstName']
                    user.save()
                elif request.data['lastName'] is not None:
                    user.last_name = request.data['lastName']
                    user.save()
                elif request.data['phoneNumber'] is not None:
                    profile = Profile.objects.get(user=user)
                    profile.phone_number = request.data['phoneNumber']
                    profile.save()
                else:
                    return Response({'message':'no data provided'},
                                    status=status.HTTP_400_BAD_REQUEST)
            return Response({'message':'problem with authentication'},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e_e:
            print('change data post %s' % e_e)
            return Response({'message':'problem with authentication or data'},
                            status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    """deletes the users token"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = request._auth.user
            user.auth_token_set.all().delete()
            return Response({'token': 'user logged out'}, status=status.HTTP_200_OK)
        except Exception as e_e:
            print('logout get %s' % e_e)
            return Response({'message':'something went wrong please contact admins'},
                            status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    """login"""
    def post(self, request, format=None):
        try:
            user = request._auth.user
            profile = Profile.objects.get(user=user)
            if user is not None and profile.is_guest == True:
                user.auth_token_set.all().delete()
                user.delete()
                profile.delete()
            user = authenticate(username=request.data['email'], password=request.data['password'])
            if user is not None:
                user.auth_token_set.all().delete()
                token = AuthToken.objects.create(user)
                return Response({'token': token}, status=status.HTTP_200_OK)
            else:
                return Response({'message':'incorrect login info'},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e_e:
            print('login post %s' % e_e)
            return Response({'message':'something went wrong please contact admins'},
                            status=status.HTTP_400_BAD_REQUEST)

class ValidateToken(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, formant=None):
        user = request._auth.user
        profile = Profile.objects.get(user=user)
        user.auth_token_set.all().delete()
        token = AuthToken.objects.create(user)

        return Response({'token': token, 'is_guest': profile.is_guest},
                        status=status.HTTP_200_OK)


class ChangePassword(APIView):
    """changes the users password"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        try:
            user = request._auth.user
            #user = authenticate(username=request.data['email'], password=request.data['password'])
            if user.check_password(str(request.data['password'])) is True:
                user.set_password(request.data['newPassword'])
                user.save()
                return Response({'message': 'success'}, status=status.HTTP_200_OK)
            else:

                return Response({'message':'incorrect login info'},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e_e:
            print('change password post %s' % e_e)
            return Response({'message':'something went wrong please contact admins'},
                            status=status.HTTP_400_BAD_REQUEST)


class RecoverPassword(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        try:
            user = User.objects.get(email=request.data['email'])
            salt = hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()[:15]
            user.set_password(salt)
            user.save()
            message = 'this is your new password, please login and change it %s' % str(salt)
            #send_mail('btc buyer recover password', message,
                        #'defaultemail@email.com', [str(email)], fail_silently=False)
            return Response({'message': 'email sent'}, status=status.HTTP_200_OK)
        except Exception as e_e:
            print('recover password post %s' % e_e)
            return Response({'message':'there was an internal problem please contact admins'},
                            status=status.HTTP_400_BAD_REQUEST)


class DeleteUser(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        try:
            user = authenticate(username=request.data['email'], password=request.data['password'])
            if user is not None and request._auth.user == user:
                user.auth_token_set.all().delete()
                user.delete()
                return Response({'user': user.username, 'message': 'user deleted'},
                                status=status.HTTP_200_OK)
        except Exception as e_e:
            print('delete user post %s' % e_e)
            return Response({'message':'user deletion error'},
                            status=status.HTTP_400_BAD_REQUEST)


class DeleteGuest(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def delete(self, request, format=None):
        try:
            user = request._auth.user
            profile = Profile.objects.get(user=user)
            if user is not None and profile.is_guest == True:
                user.auth_token_set.all().delete()
                user.delete()
                profile.delete()
                return Response({'user': user.username, 'message': 'user deleted'},
                                status=status.HTTP_200_OK)
        except Exception as e_e:
            print('delete user post %s' % e_e)
            return Response({'message':'user deletion error'},
                            status=status.HTTP_400_BAD_REQUEST)

class CreateGuest(APIView):


    def post(self, formant=None):
        try:
            u_u = uuid.uuid4()
            email = '%s@example.com' % str(u_u)[:7]
            user = User.objects.create_user(str(u_u), 
                                            email=email,
                                            password=str(u_u)[:20],
                                            last_name=str(u_u)[:20],
                                            first_name=str(u_u)[:20])
            Profile.objects.create(user=user,
                                   phone_number='123123123',
                                   is_guest=True,
                                   outstanding_balance=0)
            token = AuthToken.objects.create(user)
            return Response({'token': token},
                             status=status.HTTP_200_OK)
        except Exception as e_e:
            print('create guest %s' % e_e)
            return Response({'message':"user creation failed"}, status=status.HTTP_400_BAD_REQUEST)

class CreateUser(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        try:
            return_data = Misc.create_user(self, request)
            user = request._auth.user
            profile = Profile.objects.get(user=user)
            if user is not None and profile.is_guest == True:
                user.auth_token_set.all().delete()
                user.delete()
                profile.delete()
            return Response(return_data, status=status.HTTP_200_OK)
        except Exception as e_e:
            print('create user post %s' % e_e)
            return Response({'message':'user creation failed'}, status=status.HTTP_400_BAD_REQUEST)

class ValidateEmail(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    """ so that I can send spam to poor hapless users"""
    def post(self, request, format=None):
        """this creates a token attached to an email"""
        try:
            user = User.objects.get(email=request.data['email'])
            profile = Profile.objects.get(user=user)
            Misc.send_validation_email(self, request.data['email'], profile.uuid)
            return Response({'message': 'email sent'}, status=status.HTTP_200_OK)
        except Exception as e_e:
            print('validate email post %s' % e_e)
            return Response({'message':'email failed to send'}, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, format=None):
        """
        validates the token if it's not too old
        """
        try:
            token = ValidationToken.objects.get(token=request.data['token'])
            if timezone.now() < token.expires:
                profile = Profile.objects.get(uuid=token.user_uuid)
                profile.email_validated = True
                token.delete()
                profile.save()
                return Response({'message': 'email validation success'}, status=status.HTTP_200_OK)
            return Response({'message':'that token is too old'},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e_e:
            print('validate email get %s' % e_e)
            return Response({'message':'problem retrieving user or token'},
                            status=status.HTTP_400_BAD_REQUEST)


class Misc(APIView):

    def create_user(self, request):
        try:
            if User.objects.filter(email=request.data['email']).exists() is False:
                try:
                    first_name = request.data['firstName']
                except:
                    first_name = ''
                try:
                    last_name = request.data['lastName']
                except:
                    last_name = ''
                user = User.objects.create_user(request.data['email'], email=request.data['email'],
                                                password=request.data['password'],
                                                last_name=last_name,
                                                first_name=first_name)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            try:
                phone_number = request.data['phone_number']
            except:
                phone_number = ''
            profile = Profile.objects.create(user=user,
                                             phone_number=phone_number,
                                             is_guest=False,
                                             outstanding_balance=0)
            Misc.send_validation_email(self, request.data['email'], profile.uuid)
            token = AuthToken.objects.create(user)
            return_data = {'user': user.email, 'message': 'email sent', 'token': token}
            return return_data
        except Exception as e_e:
            print('create user %s' % e_e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


    def send_validation_email(self, email, uuid):
        try:
            salt = hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()[:30]
            user = User.objects.get(email=email)
            if ValidationToken.objects.filter(user_uuid=uuid).exists() == True:
                ValidationToken.objects.filter(user_uuid=uuid).delete()
            expires = timezone.now() + datetime.timedelta(days=1)
            token = ValidationToken.objects.create(user_uuid=uuid, token=salt, expires=expires)
            #url = 'theurl.com/api/v1/validate/%s' % salt
            token.save()
            #send_mail('btc buyer email validation', url, \
                        #'defaultemail@email.com', [str(email)], fail_silently=False)
            return True
        except Exception as e_e:
            print('misc send_validation_email %s' % e_e)
            return False

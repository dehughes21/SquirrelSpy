from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login

from .models import Squirrel, User, Sighting
from .serializers import SquirrelSerializer, UserSerializer, UserRegistrationSerializer, UserLoginSerializer, SightingSerializer

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user.id}, status=200)
        return Response(serializer.errors, status=400)

class UserLoginView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                update_last_login(None, user)
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'user_id': user.id}, status=200)
        return Response({'error': 'Invalid Credentials'}, status=401)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = (permissions.IsAuthenticated,)

class SquirrelViewSet(viewsets.ModelViewSet):
    queryset = Squirrel.objects.all()
    serializer_class = SquirrelSerializer
    #permission_classes = (permissions.IsAuthenticated,)


class SightingViewSet(viewsets.ModelViewSet):
    queryset = Sighting.objects.all()
    serializer_class = SightingSerializer
    #permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    @action(detail=False, methods=['get'])
    def by_squirrel(self, request, *args, **kwargs):
        squirrel = request.query_params.get('squirrel')
        sightings = self.queryset.filter(squirrel=squirrel)
        serializer = self.get_serializer(sightings, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_user(self, request, *args, **kwargs):
        user = request.query_params.get('user')
        sightings = self.queryset.filter(user=user)
        serializer = self.get_serializer(sightings, many=True)
        return Response(serializer.data)
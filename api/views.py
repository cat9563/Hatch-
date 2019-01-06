# from django.shortcuts import render
from core.models import Post
from api.serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET', 'POST'])
def post_create_or_list(request):
    if request.method == 'POST':
        return create_post(request)
    return post_list(request)

@api_view(['GET'])
def post_list(request):
    posts = Post.objects.filter(author=request.user)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer_is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)
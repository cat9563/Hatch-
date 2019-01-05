from django.shortcuts import render
from core.models import Post
from api.serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def post_list(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)



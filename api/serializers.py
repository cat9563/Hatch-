from rest_framework import serializers
# from rest_framework.serializers import ModelSerializer
from core.models import Post,Response

class ResponseSerializer(serializers.ModelSerializer):
    author=serializers.StringRelatedField()

    class Meta:
        model = Response
        fields = ('id', 'author', 'post', 'text', 'created_at')

class PostSerializer(serializers.Serializer):
    responses = ResponseSerializer(many=True)
    author = serializers.StringRelatedField()

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'text', 'created_at')
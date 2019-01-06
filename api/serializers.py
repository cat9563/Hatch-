from rest_framework import serializers
from core.models import Post, Response


class CreateSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        try:
            value, _ = self.get_queryset().get_or_create(**{self.slug_field: data})
            return value
        except (TypeError, ValueError):
            self.fail("invalid")

class ResponseSerializer(serializers.ModelSerializer):
    author=serializers.StringRelatedField()

    class Meta:
        model = Response
        fields = (
                    'id', 
                    'author', 
                    'text', 
                    'created_at')

class PostSerializer(serializers.ModelSerializer):
    post = serializers.StringRelatedField()
    responses = ResponseSerializer(many=True, required=False)
    author = serializers.SlugRelatedField(slug_field="username", read_only=True)

    class Meta:
        model = Post
        fields = (
                    'id', 
                    'author', 
                    'title', 
                    'post', 
                    'text', 
                    'created_at', 
                    'responses')
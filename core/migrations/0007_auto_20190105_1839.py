# Generated by Django 2.1.4 on 2019-01-05 23:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20190105_1628'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='link',
            field=models.URLField(null=True),
        ),
    ]

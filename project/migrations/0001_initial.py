# Generated by Django 3.2.12 on 2022-03-11 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('repo_link', models.URLField()),
                ('working_users', models.ManyToManyField(to='users.User')),
            ],
        ),
    ]

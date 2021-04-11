# Generated by Django 3.1.7 on 2021-04-01 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='wholesale_quantity',
        ),
        migrations.AddField(
            model_name='product',
            name='wholesale_min_quantity',
            field=models.IntegerField(blank=True, help_text='Optional', null=True, verbose_name='Wholesale Minimum Quantity'),
        ),
        migrations.AlterField(
            model_name='product',
            name='discount_price',
            field=models.DecimalField(blank=True, decimal_places=2, error_messages={'name': {'max_length': 'The price must be between 0 and 99999.99 - Optional'}}, help_text='Maximum 99999.99', max_digits=7, null=True, verbose_name='Discount Price'),
        ),
        migrations.AlterField(
            model_name='product',
            name='wholesale_price',
            field=models.DecimalField(blank=True, decimal_places=2, error_messages={'name': {'max_length': 'The price must be between 0 and 99999.99 - Optional'}}, help_text='Maximum 99999.99', max_digits=7, null=True, verbose_name='Wholesale Price'),
        ),
    ]

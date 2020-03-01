from flask import Flask, send_from_directory 
from openpyxl import Workbook

def download_workbook(request):
    wb = create_workbook()
    populate_workbook(wb)
    wb.save('/tmp/sample.xlsx')
    return send_from_directory('/tmp', 'sample.xlsx')

def create_workbook():
    wb = Workbook()
    return wb

def populate_workbook(wb):
    pass

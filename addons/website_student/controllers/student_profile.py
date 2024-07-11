# noinspection PyUnresolvedReferences
from odoo import http
# noinspection PyUnresolvedReferences
from odoo.http import request


class Student(http.Controller):
    @http.route('/student', auth="public", type="json", methods=['POST'])
    def all_students(self):
        students = request.env['student.profile'].search_read([], ['name', 'age', 'group'])
        return students

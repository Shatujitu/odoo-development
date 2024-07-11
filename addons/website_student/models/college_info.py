# noinspection PyUnresolvedReferences
from odoo import models, fields
# noinspection PyUnresolvedReferences
from odoo.tools.translate import html_translate


class CollegeInfo(models.Model):
    _name = 'college.info'
    _description = 'College Model'
    _inherit = [
        'website.multi.mixin',
        'website.searchable.mixin',
    ]

    name = fields.Char(required=True)
    address = fields.Text()
    student_ids = fields.One2many('student.profile', 'college_id', 'Student Profile')


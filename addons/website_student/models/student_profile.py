# noinspection PyUnresolvedReferences
from odoo import models, fields
# noinspection PyUnresolvedReferences
from odoo.tools.translate import html_translate


class StudentProfile(models.Model):
    _name = 'student.profile'
    _description = 'Student Profile Model'
    _inherit = [
        'website.multi.mixin',
        'website.searchable.mixin',
    ]

    name = fields.Char(required=True)
    age = fields.Integer()
    group = fields.Char()
    college_id = fields.Many2one('college.info', 'College', required=True, ondelete='cascade',
                                 default=lambda self: self.env['college.info'].search([], limit=1))

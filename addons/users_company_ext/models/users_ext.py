from odoo import models, fields


class ResUsersExtension(models.Model):
    _inherit = 'res.users'

    blood_group = fields.Char(string='Blood Group')
    gender = fields.Selection([
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ], string='Gender')

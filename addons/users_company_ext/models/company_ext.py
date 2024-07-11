from odoo import models, fields


class ResCompanyExtension(models.Model):
    _inherit = 'res.company'

    com_type = fields.Selection(
        selection=[('private', 'Private'), ('public', 'Public')],
        string='Company Type',
    )

from odoo import models, fields


class ResCompanyExtension(models.Model):
    _inherit = 'res.company'

    new_selection_field = fields.Selection(
        selection=[('value1', 'Label 1'), ('value2', 'Label 2')],
        string='New Selection Field',
        help='Help text for the new selection field.',
    )

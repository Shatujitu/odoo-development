from odoo import models, fields
from odoo.tools.translate import html_translate
class ConsortiumPartner(models.Model):
    _name = 'consortium.partner'
    _description = 'Website Consortium Partner'

    name = fields.Text()
    content = fields.Html('Content', translate=html_translate, sanitize=False)
    logo = fields.Binary()
    website = fields.Char('Website')

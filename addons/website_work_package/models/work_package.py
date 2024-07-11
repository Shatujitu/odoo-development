from odoo import models, fields
from odoo.tools.translate import html_translate
class WorkPackage(models.Model):
    _name = 'work.package'
    _description = 'Website Work Package'

    name = fields.Char()
    title = fields.Text()
    content = fields.Html('Content', translate=html_translate, sanitize=False)
    icon = fields.Binary()

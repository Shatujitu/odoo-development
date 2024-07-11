from odoo import models, fields
from odoo.tools.translate import html_translate
class CaseStudy(models.Model):
    _name = 'case.study'
    _description = 'Website Case study'

    name = fields.Char()
    title = fields.Text()
    feature_image = fields.Binary(string="Image", compute='_compute_feature_image', readonly=False, store=True)
    content = fields.Html('Content', translate=html_translate, sanitize=False)
    content_image = fields.Binary(string="Image", compute='_compute_content_image', readonly=False, store=True)

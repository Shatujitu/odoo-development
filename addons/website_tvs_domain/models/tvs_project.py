# noinspection PyUnresolvedReferences
from odoo import models, fields
# noinspection PyUnresolvedReferences
from odoo.tools.translate import html_translate


class Project(models.Model):
    _name = 'tvs.project'
    _description = 'TVS project model'
    _order = 'sequence'

    sequence = fields.Integer("Project Sequence")
    name = fields.Char(string="Name", required=True)
    logo = fields.Image(string="Project Logo",  readonly=False, store=True)
    website_link = fields.Char(string="Website Link")
    description = fields.Html('Description', translate=html_translate, sanitize=False)
    partner_ids = fields.Many2many('tvs.partner', string="Partners")
    domain_ids = fields.Many2many('tvs.domain', string="Domains")

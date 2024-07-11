# noinspection PyUnresolvedReferences
from odoo import models, fields


class Partner(models.Model):
    _name = 'tvs.partner'
    _description = 'TVS partner model'
    _order = 'sequence'

    sequence = fields.Integer("Partner Sequence")
    name = fields.Char(string="Name", required=True)
    logo = fields.Image(string="Partner Logo", readonly=False, store=True)
    website_link = fields.Char(string="Website Link")
    project_ids = fields.Many2many('tvs.project', string="Projects")

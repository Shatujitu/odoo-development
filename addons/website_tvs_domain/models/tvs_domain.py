# noinspection PyUnresolvedReferences
from odoo import models, fields, api
# noinspection PyUnresolvedReferences
from odoo.tools.translate import html_translate
# noinspection PyUnresolvedReferences
from odoo.exceptions import ValidationError


class Domain(models.Model):
    _name = 'tvs.domain'
    _description = 'TVS website domains model'
    _order = 'sequence'
    _inherit = [
        'website.multi.mixin',
        'website.searchable.mixin',
    ]

    sequence = fields.Integer("Domain Sequence")
    name = fields.Char(string="Name", required=True)
    title = fields.Text(string="Title")
    description = fields.Html('Description', translate=html_translate, sanitize=False)
    banner_image = fields.Image(string="Banner Image", readonly=False, store=True)
    sub_domain_ids = fields.Many2many(
        'tvs.domain',
        'tvs_domain_rel',
        'parent_domain_id',
        'sub_domain_id',
        string='Sub Domains',
    )
    parent_domain_ids = fields.Many2many(
        'tvs.domain',
        'tvs_domain_rel',
        'sub_domain_id',
        'parent_domain_id',
        string='Parent Domains',
    )
    project_ids = fields.Many2many('tvs.project', string="Projects")
    topic_ids = fields.Many2many('tvs.topic', string="Domain Topics")
    slug = fields.Char(string="Slug", compute='_compute_slug',
                       help="Auto-generated unique slug based on the name")

    def get_short_description(self):
        if self.description and isinstance(self.description, str):
            return self.description[:300] + ' ...'
        return None

    def _compute_slug(self):
        self.slug = False
        for domain in self:
            domain.slug = domain.name.lower().replace(' ', '-')

    def open_page_button(self):
        return {
            'type': 'ir.actions.act_url',
            'url': f'/domain/{self.slug}',
            'target': 'new',
        }

    _sql_constraints = [
        ('unique_domain_name', 'unique (name)', 'Name must be unique!')
    ]


class Topic(models.Model):
    _name = 'tvs.topic'
    _description = 'TVS website domain topics model'
    _rec_name = 'title'
    _order = 'sequence'

    sequence = fields.Integer("Topic Sequence")
    title = fields.Char(string="Title", required=True)
    description = fields.Html('Description', translate=html_translate, sanitize=False)
    icon = fields.Binary(string="Topic Icon", readonly=False, store=True)
    domain_ids = fields.Many2many('tvs.domain', string="Domains")

    def get_short_description(self):
        if self.description and isinstance(self.description, str):
            return self.description[:150] + ' ...'
        return ''

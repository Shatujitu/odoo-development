from odoo import models, fields, api
from odoo.tools.translate import html_translate


class CustomEvent(models.Model):
    _name = 'custom.event'
    _description = 'Website Custom Event'

    title = fields.Text(string="Title")
    name = fields.Char(string="Name", compute="_compute_name")
    banner_image = fields.Image(string="Banner Image", readonly=False, store=True)
    content = fields.Html('Content', translate=html_translate, sanitize=False)
    note = fields.Text(string="Notes")
    reg_status = fields.Char(string="Card Title")
    datetime = fields.Datetime(string="Date & Time", required=True)
    time = fields.Char(string="Time")
    timezone = fields.Char(string="Time Zone")
    venue = fields.Char(string="Venue")
    link = fields.Char('Registration Link')
    button_id = fields.Many2one('custom.event.button')
    speaker_ids = fields.Many2many('custom.event.speaker')
    tag_ids = fields.Many2many('custom.event.tag')

    @api.depends('title')
    def _compute_name(self):
        self.name = False
        for rec in self:
            rec.name = rec.title


class CustomEventSpeaker(models.Model):
    _name = 'custom.event.speaker'

    name = fields.Char(string="Name")
    profile_image = fields.Image(string="Profile Photo", readonly=False, store=True)
    designation = fields.Char(string="Designation")
    description = fields.Html('Description', translate=html_translate, sanitize=False)


class CustomEventTag(models.Model):
    _name = 'custom.event.tag'

    name = fields.Char(string="Name")

    _sql_constraints = [
        ('unique_tag_name', 'unique (name)', 'Key must be unique!')
    ]


class CustomEventButton(models.Model):
    _name = 'custom.event.button'

    name = fields.Char(string="Name")

    _sql_constraints = [
        ('unique_button_name', 'unique (name)', 'Key must be unique!')
    ]

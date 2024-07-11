# noinspection PyUnresolvedReferences
from odoo import models, fields, api
# noinspection PyUnresolvedReferences
from odoo.tools.translate import html_translate


class Event(models.Model):
    _name = 'tvs.event'
    _description = 'TVS Website Event'
    _rec_name = 'title'

    title = fields.Text(string="Title", required=True)
    banner_image = fields.Image(string="Banner Image", required=True, readonly=False, store=True)
    content = fields.Html('Content', translate=html_translate, sanitize=False)
    note = fields.Text(string="Notes")
    reg_status = fields.Char(string="Card Title")
    datetime = fields.Datetime(string="Date & Time", required=True)
    time = fields.Char(string="Time")
    timezone = fields.Char(string="Time Zone")
    venue = fields.Char(string="Venue")
    link = fields.Char('Link')
    button_id = fields.Many2one('tvs.event.button')
    speaker_ids = fields.Many2many('tvs.event.speaker')
    tag_ids = fields.Many2many('tvs.event.tag')

    # start_date = fields.Date('Start Date', required=True)
    # end_date = fields.Date('End Date')


class EventSpeaker(models.Model):
    _name = 'tvs.event.speaker'
    _order = 'sequence'

    sequence = fields.Integer("Speaker Sequence")
    name = fields.Char(string="Name", required=True)
    profile_image = fields.Image(string="Profile Photo", readonly=False, store=True)
    designation = fields.Char(string="Designation")
    description = fields.Html('Description', translate=html_translate, sanitize=False)


class EventTag(models.Model):
    _name = 'tvs.event.tag'

    name = fields.Char(string="Name", required=True)

    _sql_constraints = [
        ('unique_tag_name', 'unique (name)', 'Key must be unique!')
    ]


class EventButton(models.Model):
    _name = 'tvs.event.button'

    name = fields.Char(string="Name", required=True)

    _sql_constraints = [
        ('unique_button_name', 'unique (name)', 'Key must be unique!')
    ]

# noinspection PyUnresolvedReferences
from odoo import http
# noinspection PyUnresolvedReferences
from odoo.http import request
# noinspection PyUnresolvedReferences
from datetime import datetime
# noinspection PyUnresolvedReferences
from odoo.tools.json import scriptsafe as json_safe


class WebsiteEventController(http.Controller):
    @http.route(['/event', '/event/all'], type='http', auth='public', website=True)
    def all_events(self, **kw):
        events = request.env['tvs.event'].search([])
        event_tags = request.env['tvs.event.tag'].search([])
        sorted_events = events.sorted(key=lambda x: x.datetime, reverse=True)

        return request.render("website_tvs_event.tvs_event_list_page", {
            'events': sorted_events,
            'tags': event_tags,
        })

    @http.route('/event/upcoming', type='http', auth="public", website=True)
    def upcoming_events(self, **kw):
        events = request.env['tvs.event'].search([])
        event_tags = request.env['tvs.event.tag'].search([])

        today = datetime.today()
        upcoming_events = events.search([('datetime', '>=', today)])

        return request.render("website_tvs_event.tvs_event_list_page", {
            'events': upcoming_events,
            'tags': event_tags,
        })

    @http.route('/event/past', type='http', auth="public", website=True)
    def past_events(self, **kw):
        events = request.env['tvs.event'].search([])
        event_tags = request.env['tvs.event.tag'].search([])

        today = datetime.today()
        past_events = events.search([('datetime', '<=', today)]).sorted(key=lambda x: x.datetime, reverse=True)

        return request.render("website_tvs_event.tvs_event_list_page", {
            'events': past_events,
            'tags': event_tags,
        })

    @http.route('/event/tag/<int:tag_id>', type='http', auth="public", website=True)
    def items_by_tag(self, tag_id, **kw):
        event_tags = request.env['tvs.event.tag']
        selected_tag = event_tags.browse(tag_id)
        events = request.env['tvs.event'].search([('tag_ids', 'in', selected_tag.id)])
        tags = event_tags.search([])
        active_tag_id = ...

        return request.render("website_tvs_event.tvs_event_list_page", {
            'events': events,
            'tags': tags,
            'active_tag_id': active_tag_id
        })

    @http.route(['/event/<model("tvs.event"):event>'], type='http', auth='public', website=True)
    def event_details(self, event):
        return request.render("website_tvs_event.tvs_event_details_page", {
            'event': event
        })

    @http.route('/featured-event', type="json", auth="public", methods=['POST'])
    def featured_event(self):
        events = request.env['tvs.event'].search([])

        today = datetime.today()
        featured_events = events.search_read([('datetime', '>=', today)], limit=1, order='datetime')
        past_featured_events = events.search_read([('datetime', '<', today)], limit=1, order='datetime desc')
        try:
            return featured_events[0]
        except IndexError:
            try:
                # If no upcoming events, return the latest past event
                return past_featured_events[0]
            except IndexError:
                # If no events found at all, return an empty dictionary
                return {}


from odoo import http
from odoo.http import request
from datetime import datetime
from odoo.tools.json import scriptsafe as json_safe


class CustomEvent(http.Controller):
    @http.route(['/custom-event', '/custom-event/all'], type='http', auth='public', website=True)
    def all_custom_events(self, **kw):
        custom_events = request.env['custom.event'].search([])
        event_tags = request.env['custom.event.tag'].search([])
        sorted_events = custom_events.sorted(key=lambda x: x.datetime, reverse=True)

        return request.render("website_custom_event.custom_event_list_page", {
            'events': sorted_events,
            'tags': event_tags,
        })

    @http.route('/custom-event/upcoming', type='http', auth="public", website=True)
    def upcoming_events(self, **kw):
        custom_events = request.env['custom.event'].search([])
        event_tags = request.env['custom.event.tag'].search([])

        today = datetime.today()
        events = custom_events.search([('datetime', '>=', today)])
        self.upcoming_event = events

        return request.render("website_custom_event.custom_event_list_page", {
            'events': events,
            'tags': event_tags,
        })

    @http.route('/custom-event/past', type='http', auth="public", website=True)
    def past_events(self, **kw):
        custom_events = request.env['custom.event'].search([])
        event_tags = request.env['custom.event.tag'].search([])

        today = datetime.today()
        events = custom_events.search([('datetime', '<=', today)]).sorted(key=lambda x: x.datetime, reverse=True)

        return request.render("website_custom_event.custom_event_list_page", {
            'events': events,
            'tags': event_tags,
        })

    @http.route('/custom-event/tag/<int:tag_id>', type='http', auth="public", website=True)
    def items_by_tag(self, tag_id, **kw):
        event_tags = request.env['custom.event.tag']
        selected_tag = event_tags.browse(tag_id)
        events = request.env['custom.event'].search([('tag_ids', 'in', selected_tag.id)])
        tags = event_tags.search([])
        active_tag_id = ...

        return request.render("website_custom_event.custom_event_list_page", {
            'events': events,
            'tags': tags,
            'active_tag_id': active_tag_id
        })

    @http.route(['/custom-event/<model("custom.event"):event>'], type='http', auth='public', website=True)
    def custom_event_detail(self, event):
        return request.render("website_custom_event.custom_event_details_page", {
            'event': event
        })

    @http.route('/featured-custom-event', type="json", auth="public", methods=['POST'])
    def featured_custom_event(self):
        custom_events = request.env['custom.event'].search([])

        today = datetime.today()
        featured_events = custom_events.search_read([('datetime', '>=', today)], limit=1, order='datetime')
        past_featured_events = custom_events.search_read([('datetime', '<', today)], limit=1, order='datetime desc')
        try:
            return featured_events[0]
        except IndexError:
            try:
                # If no upcoming events, return the latest past event
                return past_featured_events[0]
            except IndexError:
                # If no events found at all, return an empty dictionary
                return {}

    @http.route('/featured-custom-blog', type="json", auth="public", methods=['POST'])
    def featured_custom_blog(self):
        featured_blogs = request.env['blog.post'].search_read([('website_published', '=', True)], order='published_date desc')
        featured_blog = featured_blogs[0]

        properties = json_safe.loads(featured_blog.get('cover_properties'))
        img = properties.get('background-image', 'none')[4:-1].strip("'")

        try:
            return {
                'output': featured_blog,
                'background_image': img
            }
        except IndexError:
            return None

    @http.route('/other-custom-blogs', type="json", auth="public", methods=['POST'])
    def other_custom_blogs(self):
        other_blogs = request.env['blog.post'].search_read([('website_published', '=', True)], order='published_date desc')
        output_data = []

        for other_blog in other_blogs:
            properties = json_safe.loads(other_blog.get('cover_properties'))
            img = properties.get('background-image', 'none')[4:-1].strip("'")

            output_data.append({
                'output': other_blog,
                'background_image': img
            })

        try:
            return output_data[1:3]
        except IndexError:
            return None

    @http.route('/custom-event-blogs', type="json", auth="public", methods=['POST'])
    def custom_event_blogs(self):
        featured_event = self.featured_custom_event()
        featured_blog = self.featured_custom_blog()
        other_blogs = self.other_custom_blogs()

        result = {
            'featured_event': featured_event,
            'featured_blog': featured_blog,
            'other_blogs': other_blogs
        }

        return result

# noinspection PyUnresolvedReferences
from odoo import http
# noinspection PyUnresolvedReferences
from odoo.http import request
# noinspection PyUnresolvedReferences
from odoo.tools.json import scriptsafe as json_safe


class WebsiteBlogController(http.Controller):
    @http.route('/featured-blog', type="json", auth="public", methods=['POST'])
    def featured_blog(self):
        all_blogs = request.env['blog.post'].search_read([('website_published', '=', True)],
                                                         order='published_date desc')
        featured_blog = all_blogs[0]

        properties = json_safe.loads(featured_blog.get('cover_properties'))
        img = properties.get('background-image', 'none')[4:-1].strip("'")

        try:
            return {
                'output': featured_blog,
                'background_image': img
            }
        except IndexError:
            return None

    @http.route('/other-blogs', type="json", auth="public", methods=['POST'])
    def other_blogs(self):
        all_blogs = request.env['blog.post'].search_read([('website_published', '=', True)],
                                                           order='published_date desc')
        output_data = []

        for other_blog in all_blogs:
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

    @http.route('/all-blogs', type="json", auth="public", methods=['POST'])
    def all_blogs(self):
        featured_blog = self.featured_blog()
        other_blogs = self.other_blogs()

        result = {
            'featured_blog': featured_blog,
            'other_blogs': other_blogs
        }

        return result

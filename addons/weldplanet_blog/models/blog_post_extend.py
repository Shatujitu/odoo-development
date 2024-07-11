from odoo import api, models, fields
from odoo.addons.website.tools import text_from_html


class BlogPost(models.Model):
    _inherit = 'blog.post'

    teaser = fields.Text('Teaser', compute='_compute_teaser', inverse='_set_teaser')
    short_title = fields.Text('Short title', compute='_compute_short_title')

    @api.depends('content', 'teaser_manual')
    def _compute_teaser(self):
        for blog_post in self:
            if blog_post.teaser_manual:
                blog_post.teaser = blog_post.teaser_manual
            else:
                content = text_from_html(blog_post.content, True)
                blog_post.teaser = content[:100] + '...'

    @api.depends('name')
    def _compute_short_title(self):
        for blog_post in self:
            if len(blog_post.name) > 61:
                blog_post.short_title = blog_post.name[:58] + '...'
            else:
                blog_post.short_title = blog_post.name

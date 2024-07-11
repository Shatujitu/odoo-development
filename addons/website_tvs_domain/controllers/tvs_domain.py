# noinspection PyUnresolvedReferences
from odoo import http
# noinspection PyUnresolvedReferences
from odoo.http import request


class WebsiteDomainController(http.Controller):
    @http.route('/domain', type='http', auth='public', website=False)
    def all_domains(self, **kw):
        all_domains = request.env['tvs.domain'].search([])

        return request.render('website_tvs_domain.tvs_domain_list_page', {
            'all_domains': all_domains
        })

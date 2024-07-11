from odoo import http
from odoo.http import request


class CompanyExtension(http.Controller):
    @http.route('/company-extension', auth="public", type="json", methods=['POST'])
    def all_company_ext(self):
        company_ext = request.env['res.company'].search_read([])
        return company_ext

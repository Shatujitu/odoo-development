from odoo import http

class ConsortiumPartner(http.Controller):
    @http.route('/consortium-partner', auth="public", type="json", methods=['POST'])
    def all_consortium_partners(self):
        consortiumPartners = http.request.env['consortium.partner'].search_read([], ['name', 'content', 'logo', 'website'])
        return consortiumPartners

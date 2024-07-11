from odoo import http

class WorkPackage(http.Controller):
    @http.route('/work-package', auth="public", type="json", methods=['POST'])
    def all_work_packages(self):
        workPackages = http.request.env['work.package'].search_read([], ['name', 'title', 'content', 'icon'])
        return workPackages

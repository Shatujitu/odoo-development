from odoo import http

class CaseStudy(http.Controller):
    @http.route('/case-study', auth="public", type="json", methods=['POST'])
    def all_case_studies(self):
        caseStudies = http.request.env['case.study'].search_read([], ['name', 'title', 'feature_image', 'content', 'content_image'])
        return caseStudies
